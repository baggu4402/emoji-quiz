(() => {
  const PLAYER_ID_KEY = "emojiQuizPlayerId";
  const unavailableMessage = "멀티플레이는 Firebase 설정 후 사용할 수 있습니다.";

  let db = null;
  let currentRoomCode = "";
  let currentPlayerId = "";
  let currentPlayerName = "";
  let isHost = false;
  let roomRef = null;
  let playersRef = null;

  const multiplayerOpenBtn = document.querySelector("#multiplayer-open-btn");
  const createRoomBtn = document.querySelector("#create-room-btn");
  const joinRoomBtn = document.querySelector("#join-room-btn");
  const leaveRoomBtn = document.querySelector("#leave-room-btn");
  const multiLeaveBtn = document.querySelector("#multi-leave-btn");
  const startRoomGameBtn = document.querySelector("#start-room-game-btn");
  const playerNameInput = document.querySelector("#player-name-input");
  const roomCodeInput = document.querySelector("#room-code-input");
  const roomCodeDisplay = document.querySelector("#room-code-display");
  const playerList = document.querySelector("#player-list");
  const playerCountText = document.querySelector("#player-count-text");
  const roomStatusText = document.querySelector("#room-status-text");
  const multiMenuStatus = document.querySelector("#multi-menu-status");
  const multiCategorySelect = document.querySelector("#multi-category-select");

  function isFirebaseReady() {
    return Boolean(
      window.firebaseConfig &&
      window.firebase &&
      typeof firebase.initializeApp === "function" &&
      typeof firebase.database === "function"
    );
  }

  function initFirebase() {
    if (!isFirebaseReady()) {
      return false;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(window.firebaseConfig);
    }

    db = firebase.database();
    return true;
  }

  function setText(element, text) {
    if (element) {
      element.textContent = text;
    }
  }

  function setMenuStatus(text) {
    setText(multiMenuStatus, text);
  }

  function setRoomStatus(text) {
    setText(roomStatusText, text);
  }

  function showScreenSafe(screenId) {
    if (typeof showScreen === "function") {
      showScreen(screenId);
    }
  }

  function createRoomCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";

    for (let i = 0; i < 4; i += 1) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
  }

  function getOrCreatePlayerId() {
    const savedId = localStorage.getItem(PLAYER_ID_KEY);
    if (savedId) return savedId;

    const newId = `player_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(PLAYER_ID_KEY, newId);
    return newId;
  }

  function getPlayerName() {
    return playerNameInput?.value.trim() || "";
  }

  function getRoomCodeInput() {
    return roomCodeInput?.value.trim().toUpperCase() || "";
  }

  function getPlayerRecord(host) {
    return {
      id: currentPlayerId,
      name: currentPlayerName,
      score: 0,
      isHost: host,
      joinedAt: Date.now(),
    };
  }

  function clearRoomSubscription() {
    if (playersRef) {
      playersRef.off("value");
      playersRef = null;
    }
  }

  function renderPlayers(players = {}) {
    const playerEntries = Object.values(players);

    if (playerCountText) {
      playerCountText.textContent = `${playerEntries.length}명`;
    }

    if (!playerList) return;

    if (!playerEntries.length) {
      playerList.innerHTML = `<p class="empty-player">참가자가 없습니다.</p>`;
      return;
    }

    playerList.innerHTML = playerEntries.map((player) => `
      <div class="player-row">
        <span class="player-name">${player.name || "플레이어"}</span>
        <span class="player-score">${player.score || 0}점</span>
        ${player.isHost ? `<span class="host-badge">방장</span>` : ""}
      </div>
    `).join("");
  }

  function updateHostControls() {
    if (!startRoomGameBtn) return;

    startRoomGameBtn.disabled = !isHost;
    startRoomGameBtn.textContent = isHost ? "게임 시작" : "방장이 시작할 때까지 대기";
  }

  function enterRoomScreen(roomCode) {
    currentRoomCode = roomCode;
    roomRef = db.ref(`rooms/${roomCode}`);

    setText(roomCodeDisplay, roomCode);
    setRoomStatus("");
    updateHostControls();
    showScreenSafe("room-screen");
    subscribePlayers(roomCode);
  }

  function subscribePlayers(roomCode) {
    clearRoomSubscription();
    playersRef = db.ref(`rooms/${roomCode}/players`);
    playersRef.on("value", (snapshot) => {
      renderPlayers(snapshot.val() || {});
    });
  }

  async function findAvailableRoomCode() {
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const roomCode = createRoomCode();
      const snapshot = await db.ref(`rooms/${roomCode}`).get();

      if (!snapshot.exists()) {
        return roomCode;
      }
    }

    return createRoomCode();
  }

  async function createRoom() {
    currentPlayerName = getPlayerName();

    if (!currentPlayerName) {
      setMenuStatus("닉네임을 입력해주세요.");
      return;
    }

    if (!initFirebase()) {
      setMenuStatus(unavailableMessage);
      return;
    }

    currentPlayerId = getOrCreatePlayerId();
    const roomCode = await findAvailableRoomCode();
    const now = Date.now();
    const roomData = {
      code: roomCode,
      status: "waiting",
      hostId: currentPlayerId,
      category: "random",
      currentQuestionIndex: 0,
      createdAt: now,
      players: {
        [currentPlayerId]: {
          ...getPlayerRecord(true),
          joinedAt: now,
        },
      },
    };

    await db.ref(`rooms/${roomCode}`).set(roomData);
    isHost = true;
    setMenuStatus("");
    enterRoomScreen(roomCode);
  }

  async function joinRoom() {
    currentPlayerName = getPlayerName();
    const roomCode = getRoomCodeInput();

    if (!currentPlayerName) {
      setMenuStatus("닉네임을 입력해주세요.");
      return;
    }

    if (!roomCode) {
      setMenuStatus("방 코드를 입력해주세요.");
      return;
    }

    if (!initFirebase()) {
      setMenuStatus(unavailableMessage);
      return;
    }

    const roomSnapshot = await db.ref(`rooms/${roomCode}`).get();

    if (!roomSnapshot.exists()) {
      setMenuStatus("존재하지 않는 방입니다.");
      return;
    }

    const room = roomSnapshot.val();

    if (room.status !== "waiting") {
      setMenuStatus("이미 시작된 방입니다.");
      return;
    }

    currentPlayerId = getOrCreatePlayerId();
    await db.ref(`rooms/${roomCode}/players/${currentPlayerId}`).set(getPlayerRecord(false));
    isHost = false;
    setMenuStatus("");
    enterRoomScreen(roomCode);
  }

  async function leaveRoom() {
    if (!db || !currentRoomCode || !currentPlayerId) {
      clearRoomSubscription();
      showScreenSafe("multiplayer-menu-screen");
      return;
    }

    clearRoomSubscription();

    if (isHost) {
      await db.ref(`rooms/${currentRoomCode}`).remove();
    } else {
      await db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).remove();
    }

    currentRoomCode = "";
    isHost = false;
    roomRef = null;
    renderPlayers({});
    setText(roomCodeDisplay, "----");
    setRoomStatus("");
    showScreenSafe("multiplayer-menu-screen");
  }

  async function startRoomGame() {
    if (!roomRef || !isHost) return;

    await roomRef.update({ status: "playing" });
    setRoomStatus("게임 시작 준비 완료");
  }

  function populateCategorySelect() {
    if (!multiCategorySelect || typeof categories === "undefined") return;

    multiCategorySelect.innerHTML = categories.map((category) => (
      `<option value="${category.id}">${category.name}</option>`
    )).join("");
  }

  function bindEvents() {
    multiplayerOpenBtn?.addEventListener("click", () => {
      setMenuStatus("");
      showScreenSafe("multiplayer-menu-screen");
    });

    createRoomBtn?.addEventListener("click", () => {
      createRoom().catch(() => {
        setMenuStatus("방을 만들 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });

    joinRoomBtn?.addEventListener("click", () => {
      joinRoom().catch(() => {
        setMenuStatus("방에 참가할 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });

    leaveRoomBtn?.addEventListener("click", () => {
      leaveRoom().catch(() => {
        setRoomStatus("방을 나갈 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });

    multiLeaveBtn?.addEventListener("click", () => {
      leaveRoom().catch(() => {
        setRoomStatus("방을 나갈 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });

    startRoomGameBtn?.addEventListener("click", () => {
      startRoomGame().catch(() => {
        setRoomStatus("게임을 시작할 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });
  }

  populateCategorySelect();
  updateHostControls();
  bindEvents();
})();
