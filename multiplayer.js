(() => {
  const PLAYER_ID_KEY = "emojiQuizPlayerId";
  const LAST_ROOM_KEY = "emojiQuizLastRoom";
  const unavailableMessage = "멀티플레이는 Firebase 설정 후 사용할 수 있습니다.";
  const authFailedMessage = "멀티플레이 인증에 실패했습니다. Firebase Anonymous Auth 설정을 확인해주세요.";
  const roundReadyMessage = "가장 먼저 맞히면 +10점";
  const ROUND_TIME_LIMIT_SECONDS = 20;
  const MAX_ROOM_PLAYERS = 6;

  let db = null;
  let auth = null;
  let authStateReadyPromise = null;
  let authReadyPromise = null;
  let currentRoomCode = "";
  let currentPlayerId = "";
  let currentPlayerName = "";
  let isHost = false;
  let roomRef = null;
  let latestRoom = null;
  let multiTimerId = null;
  let lastResultPlayers = {};
  let lastFirebaseError = "";
  let lastRoomStatus = "-";
  let lastCelebratedRoundKey = "";

  const multiplayerOpenBtn = document.querySelector("#multiplayer-open-btn");
  const createRoomBtn = document.querySelector("#create-room-btn");
  const joinRoomBtn = document.querySelector("#join-room-btn");
  const leaveRoomBtn = document.querySelector("#leave-room-btn");
  const multiLeaveBtn = document.querySelector("#multi-leave-btn");
  const startRoomGameBtn = document.querySelector("#start-room-game-btn");
  const playerNameInput = document.querySelector("#player-name-input");
  const roomCodeInput = document.querySelector("#room-code-input");
  const resumeRoomBox = document.querySelector("#resume-room-box");
  const resumeRoomText = document.querySelector("#resume-room-text");
  const resumeRoomBtn = document.querySelector("#resume-room-btn");
  const clearResumeRoomBtn = document.querySelector("#clear-resume-room-btn");
  const roomCodeDisplay = document.querySelector("#room-code-display");
  const copyRoomCodeBtn = document.querySelector("#copy-room-code-btn");
  const copyInviteLinkBtn = document.querySelector("#copy-invite-link-btn");
  const playerList = document.querySelector("#player-list");
  const playerCountText = document.querySelector("#player-count-text");
  const roomStatusText = document.querySelector("#room-status-text");
  const multiMenuStatus = document.querySelector("#multi-menu-status");
  const multiCategorySelect = document.querySelector("#multi-category-select");
  const multiDifficultySelect = document.querySelector("#multi-difficulty-select");
  const multiRoomLabel = document.querySelector("#multi-room-label");
  const multiDifficultyLabel = document.querySelector("#multi-difficulty-label");
  const multiQuestionCount = document.querySelector("#multi-question-count");
  const multiTimerText = document.querySelector("#multi-timer-text");
  const multiMyScore = document.querySelector("#multi-my-score");
  const multiQuizCard = document.querySelector("#multi-quiz-screen .quiz-card");
  const multiEmojiText = document.querySelector("#multi-emoji-text");
  const multiCorrectBurst = document.querySelector("#multi-correct-burst");
  const multiRoundStatus = document.querySelector("#multi-round-status");
  const multiAnswerInput = document.querySelector("#multi-answer-input");
  const multiSubmitBtn = document.querySelector("#multi-submit-btn");
  const multiNextBtn = document.querySelector("#multi-next-btn");
  const multiScoreboard = document.querySelector("#multi-scoreboard");
  const multiResultList = document.querySelector("#multi-result-list");
  const multiResultStatus = document.querySelector("#multi-result-status");
  const multiResultHomeBtn = document.querySelector("#multi-result-home-btn");
  const shareMultiResultBtn = document.querySelector("#share-multi-result-btn");
  const debugPanel = document.querySelector("#debug-panel");
  const debugToggleBtn = document.querySelector("#debug-toggle-btn");
  const debugFirebaseState = document.querySelector("#debug-firebase-state");
  const debugAuthState = document.querySelector("#debug-auth-state");
  const debugPlayerId = document.querySelector("#debug-player-id");
  const debugRoomCode = document.querySelector("#debug-room-code");
  const debugIsHost = document.querySelector("#debug-is-host");
  const debugRoomStatus = document.querySelector("#debug-room-status");
  const debugLastError = document.querySelector("#debug-last-error");

  function updateDebugPanel(room = latestRoom) {
    lastRoomStatus = room?.status || lastRoomStatus || "-";

    if (debugFirebaseState) {
      debugFirebaseState.textContent = db ? "connected" : "not ready";
    }

    if (debugAuthState) {
      debugAuthState.textContent = auth?.currentUser ? "signed in" : "signed out";
    }

    if (debugPlayerId) {
      debugPlayerId.textContent = currentPlayerId || "-";
    }

    if (debugRoomCode) {
      debugRoomCode.textContent = currentRoomCode || "-";
    }

    if (debugIsHost) {
      debugIsHost.textContent = String(Boolean(isHost));
    }

    if (debugRoomStatus) {
      debugRoomStatus.textContent = room?.status || lastRoomStatus || "-";
    }

    if (debugLastError) {
      debugLastError.textContent = lastFirebaseError || "-";
    }
  }

  function setLastFirebaseError(error) {
    lastFirebaseError = error?.message || String(error || "");
    updateDebugPanel();
  }

  function isFirebaseReady() {
    return Boolean(
      window.firebaseConfig &&
      window.firebase &&
      typeof window.firebase.initializeApp === "function" &&
      typeof window.firebase.auth === "function" &&
      typeof window.firebase.database === "function"
    );
  }

  function initFirebase() {
    if (!isFirebaseReady()) {
      updateDebugPanel();
      return false;
    }

    if (!window.firebase.apps.length) {
      window.firebase.initializeApp(window.firebaseConfig);
    }

    db = window.firebase.database();
    auth = window.firebase.auth();
    updateDebugPanel();
    return true;
  }

  function waitForAuthState() {
    if (!auth) return Promise.resolve(null);

    if (!authStateReadyPromise) {
      authStateReadyPromise = new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          unsubscribe();
          if (user?.uid) {
            currentPlayerId = user.uid;
          }
          updateDebugPanel();
          resolve(user);
        }, () => {
          unsubscribe();
          updateDebugPanel();
          resolve(null);
        });
      });
    }

    return authStateReadyPromise;
  }

  function getFallbackPlayerId() {
    const savedId = localStorage.getItem(PLAYER_ID_KEY);
    if (savedId) return savedId;

    const newId = `player_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(PLAYER_ID_KEY, newId);
    return newId;
  }

  function getCurrentPlayerId() {
    if (auth?.currentUser?.uid) {
      return auth.currentUser.uid;
    }

    return currentPlayerId || getFallbackPlayerId();
  }

  function saveLastRoomSession(roomCode, playerName) {
    if (!roomCode || !playerName) return;

    const payload = {
      roomCode,
      playerName,
      savedAt: Date.now(),
    };

    try {
      localStorage.setItem(LAST_ROOM_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn("Failed to save last room session", error);
    }
  }

  function clearLastRoomSession() {
    try {
      localStorage.removeItem(LAST_ROOM_KEY);
    } catch (error) {
      console.warn("Failed to clear last room session", error);
    }
  }

  function getLastRoomSession() {
    try {
      const raw = localStorage.getItem(LAST_ROOM_KEY);
      if (!raw) return null;

      const data = JSON.parse(raw);
      if (!data?.roomCode || !data?.playerName || !data?.savedAt) return null;

      const maxAge = 2 * 60 * 60 * 1000;
      if (Date.now() - data.savedAt > maxAge) {
        clearLastRoomSession();
        return null;
      }

      return data;
    } catch (error) {
      clearLastRoomSession();
      return null;
    }
  }

  function renderResumeRoomBox() {
    if (!resumeRoomBox) return;

    if (getRoomCodeFromUrl()) {
      resumeRoomBox.classList.add("hidden");
      return;
    }

    const lastRoom = getLastRoomSession();
    if (!lastRoom) {
      resumeRoomBox.classList.add("hidden");
      return;
    }

    resumeRoomBox.classList.remove("hidden");

    if (resumeRoomText) {
      resumeRoomText.textContent = `이전에 참가한 방 ${lastRoom.roomCode}가 있습니다. 닉네임 ${lastRoom.playerName}으로 복귀할 수 있습니다.`;
    }

    if (playerNameInput && !playerNameInput.value.trim()) {
      playerNameInput.value = lastRoom.playerName;
    }

    if (roomCodeInput && !roomCodeInput.value.trim()) {
      roomCodeInput.value = lastRoom.roomCode;
    }
  }

  function isLastRoomCode(roomCode) {
    const lastRoom = getLastRoomSession();
    return Boolean(lastRoom && lastRoom.roomCode === roomCode);
  }

  async function ensureAnonymousAuth() {
    if (!initFirebase()) {
      throw new Error("Firebase is not ready");
    }

    const restoredUser = await waitForAuthState();
    if (restoredUser?.uid) {
      currentPlayerId = restoredUser.uid;
      updateDebugPanel();
      return restoredUser;
    }

    if (auth.currentUser) {
      currentPlayerId = auth.currentUser.uid;
      updateDebugPanel();
      return auth.currentUser;
    }

    if (!authReadyPromise) {
      authReadyPromise = auth.signInAnonymously()
        .then((credential) => {
          currentPlayerId = credential.user.uid;
          updateDebugPanel();
          return credential.user;
        })
        .catch((error) => {
          authReadyPromise = null;
          setLastFirebaseError(error);
          throw error;
        });
    }

    const user = await authReadyPromise;
    currentPlayerId = user.uid;
    updateDebugPanel();
    return user;
  }

  function setText(element, text) {
    if (element) {
      element.textContent = text;
    }
  }

  function playMultiplayerWrongFeedback() {
    if (typeof window.playWrongFeedback === "function") {
      window.playWrongFeedback(multiAnswerInput);
      return;
    }

    if (typeof window.replayAnimation === "function") {
      window.replayAnimation(multiAnswerInput, "answer-shake");
    }
    if (typeof window.playFeedbackSound === "function") {
      window.playFeedbackSound("wrong");
    }
    if (typeof window.vibrateFeedback === "function") {
      window.vibrateFeedback([30, 40, 30]);
    }
  }

  function playMultiplayerCorrectFeedback(room, currentRound = room?.currentRound || {}) {
    if (!currentRound?.winnerId || currentRound.winnerId !== currentPlayerId) return;

    const roundIndex = currentRound.index ?? room?.currentQuestionIndex ?? 0;
    const roundKey = `${currentRoomCode}_${roundIndex}_${currentRound.winnerId}`;
    if (lastCelebratedRoundKey === roundKey) return;

    lastCelebratedRoundKey = roundKey;

    if (typeof window.playCorrectFeedback === "function") {
      window.playCorrectFeedback(multiQuizCard, multiCorrectBurst);
      return;
    }

    if (typeof window.replayAnimation === "function") {
      window.replayAnimation(multiQuizCard, "feedback-pop");
    }
    if (typeof window.showTemporaryElement === "function") {
      window.showTemporaryElement(multiCorrectBurst, 700);
    }
    if (typeof window.playFeedbackSound === "function") {
      window.playFeedbackSound("correct");
    }
    if (typeof window.vibrateFeedback === "function") {
      window.vibrateFeedback(40);
    }
  }

  function setStatusMessage(element, text, type = "") {
    if (!element) return;

    element.textContent = text;
    element.classList.toggle("success", type === "success");
    element.classList.toggle("error", type === "error");
  }

  function setMenuStatus(text, type = "") {
    setStatusMessage(multiMenuStatus, text, type);
  }

  function setRoomStatus(text, type = "") {
    setStatusMessage(roomStatusText, text, type);
  }

  function showScreenSafe(screenId) {
    if (typeof showScreen === "function") {
      showScreen(screenId);
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function shuffleValues(values) {
    if (typeof shuffle === "function") {
      return shuffle(values);
    }

    return [...values].sort(() => Math.random() - 0.5);
  }

  function normalizeMultiplayerAnswer(text) {
    if (typeof normalizeAnswer === "function") {
      return normalizeAnswer(text);
    }

    return text.toLowerCase().replace(/\s+/g, "").replace(/[.\-_'\"]/g, "");
  }

  function createRoomCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";

    for (let i = 0; i < 4; i += 1) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
  }

  function getPlayerName() {
    return playerNameInput?.value.trim() || "";
  }

  function normalizePlayerName(name) {
    return name.trim().replace(/\s+/g, "").toLowerCase();
  }

  function validatePlayerName(name) {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return "닉네임을 입력해주세요.";
    }

    if (trimmedName.length > 10) {
      return "닉네임은 10자 이하로 입력해주세요.";
    }

    return "";
  }

  function getRoomCodeInput() {
    return roomCodeInput?.value.trim().toUpperCase() || "";
  }

  function getRoomCodeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("room") || "").trim().toUpperCase();
  }

  function applyRoomCodeFromUrl(showMessage = false) {
    const roomCode = getRoomCodeFromUrl();

    if (!roomCode || !roomCodeInput) return false;

    roomCodeInput.value = roomCode;

    if (showMessage) {
      setMenuStatus("초대 링크의 방 코드가 입력되었습니다. 닉네임을 입력하고 참가하세요.", "success");
    }

    return true;
  }

  function getInviteLink(roomCode) {
    const url = new URL(window.location.href);
    url.searchParams.set("room", roomCode);
    return url.toString();
  }

  function copyTextWithFallback(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
    }
  }

  async function writeTextToClipboard(text) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (error) {
        console.warn("Clipboard API failed, trying fallback copy", error);
      }
    }

    if (!copyTextWithFallback(text)) {
      throw new Error("Fallback copy failed");
    }
  }

  async function copyTextToClipboard(text, successMessage) {
    try {
      await writeTextToClipboard(text);
      setRoomStatus(successMessage, "success");
    } catch (error) {
      setRoomStatus("복사에 실패했습니다. 직접 선택해서 복사해주세요.", "error");
    }
  }

  function getMultiplayerShareText(players) {
    const sortedPlayers = getSortedPlayers(players);
    const rankingLines = sortedPlayers.map((player, index) => (
      `${index + 1}위 ${player.name || "플레이어"} ${player.score || 0}점`
    ));

    return [
      "이게 뭔데? Emoji Quiz 멀티 결과",
      "",
      ...rankingLines,
      "",
      "친구랑 같이하기:",
      window.location.origin + window.location.pathname,
    ].join("\n");
  }

  async function shareMultiplayerResult() {
    try {
      await writeTextToClipboard(getMultiplayerShareText(lastResultPlayers));
      setStatusMessage(multiResultStatus, "결과가 복사되었습니다.", "success");
    } catch (error) {
      setStatusMessage(multiResultStatus, "복사에 실패했습니다. 직접 선택해서 복사해주세요.", "error");
    }
  }

  function getSelectedCategory() {
    return multiCategorySelect?.value || "random";
  }

  function getSelectedDifficulty() {
    return multiDifficultySelect?.value || "all";
  }

  function getQuestionLimit() {
    return typeof QUESTION_LIMIT === "number" ? QUESTION_LIMIT : 10;
  }

  function getMultiplayerQuestionIndexes(categoryId, difficultyId = "all") {
    if (!Array.isArray(quizData)) return [];

    let source = categoryId === "random" && typeof getEnabledCategoryIds === "function"
      ? quizData
        .map((quiz, index) => ({ quiz, index }))
        .filter((item) => getEnabledCategoryIds().includes(item.quiz.category))
        .map((item) => item.index)
      : categoryId === "random"
        ? quizData.map((_, index) => index)
      : quizData
        .map((quiz, index) => ({ quiz, index }))
        .filter((item) => item.quiz.category === categoryId)
        .map((item) => item.index);

    if (difficultyId !== "all") {
      source = source.filter((index) => quizData[index]?.difficulty === difficultyId);
    }

    return shuffleValues(source).slice(0, getQuestionLimit());
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

  function getSortedPlayers(players = {}) {
    return Object.values(players).sort((a, b) => {
      const scoreDiff = (b.score || 0) - (a.score || 0);
      if (scoreDiff !== 0) return scoreDiff;
      return (a.joinedAt || 0) - (b.joinedAt || 0);
    });
  }

  function renderPlayerBadges(player, hostId = latestRoom?.hostId) {
    const badges = [];

    if (player.id === hostId || player.isHost) {
      badges.push(`<span class="host-badge">방장</span>`);
    }

    if (player.id === currentPlayerId) {
      badges.push(`<span class="me-badge">나</span>`);
    }

    return badges.join("");
  }

  function clearRoomSubscription() {
    stopMultiplayerTimer();

    if (roomRef) {
      roomRef.off("value");
    }
  }

  function renderPlayers(players = {}) {
    const playerEntries = getSortedPlayers(players);

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
        <span class="player-name">${escapeHtml(player.name || "플레이어")}</span>
        <span class="player-score">${player.score || 0}점</span>
        ${renderPlayerBadges(player)}
      </div>
    `).join("");
  }

  function renderMultiplayerScoreboard(players = {}) {
    if (!multiScoreboard) return;

    const playerEntries = getSortedPlayers(players);

    if (!playerEntries.length) {
      multiScoreboard.innerHTML = `<p class="empty-player">점수 정보가 없습니다.</p>`;
      return;
    }

    multiScoreboard.innerHTML = playerEntries.map((player) => `
      <div class="player-row">
        <span class="player-name">${escapeHtml(player.name || "플레이어")}</span>
        <span class="player-score">${player.score || 0}점</span>
        ${renderPlayerBadges(player)}
      </div>
    `).join("");
  }

  function renderMultiplayerResult(players = {}) {
    if (!multiResultList) return;

    lastResultPlayers = players;
    const playerEntries = getSortedPlayers(players);

    if (!playerEntries.length) {
      multiResultList.innerHTML = `<p class="empty-player">결과가 없습니다.</p>`;
      return;
    }

    multiResultList.innerHTML = playerEntries.map((player, index) => `
      <div class="result-row ${index === 0 ? "top-rank" : ""}">
        <span class="rank-text">${index + 1}위</span>
        <span class="player-name">${escapeHtml(player.name || "플레이어")}</span>
        <strong>${player.score || 0}점</strong>
      </div>
    `).join("");

    setStatusMessage(multiResultStatus, "");
  }

  function updateHostControls(room = latestRoom) {
    if (multiCategorySelect) {
      multiCategorySelect.disabled = !isHost || room?.status !== "waiting";
    }

    if (multiDifficultySelect) {
      multiDifficultySelect.disabled = !isHost || room?.status !== "waiting";
    }

    if (!startRoomGameBtn) return;

    startRoomGameBtn.disabled = !isHost;
    startRoomGameBtn.textContent = isHost ? "게임 시작" : "방장이 시작할 때까지 대기";
  }

  function syncLocalRoomState(room) {
    latestRoom = room;
    isHost = Boolean(room?.hostId && room.hostId === currentPlayerId);
    setText(roomCodeDisplay, room?.code || currentRoomCode || "----");

    if (multiCategorySelect && room?.category) {
      multiCategorySelect.value = room.category;
    }

    if (multiDifficultySelect) {
      multiDifficultySelect.value = room?.difficulty || "all";
    }

    updateHostControls(room);
    updateDebugPanel(room);
  }

  function getCurrentQuestion(room) {
    const questionIndexes = Array.isArray(room?.questionIndexes) ? room.questionIndexes : [];
    const questionListIndex = room?.currentQuestionIndex || 0;
    const quizIndex = questionIndexes[questionListIndex];

    if (typeof quizIndex !== "number" || !Array.isArray(quizData)) {
      return null;
    }

    return quizData[quizIndex] || null;
  }

  function getRemainingSeconds(currentRound = {}) {
    const startedAt = currentRound.startedAt || Date.now();
    const timeLimitSeconds = currentRound.timeLimitSeconds || ROUND_TIME_LIMIT_SECONDS;
    const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);

    return Math.max(0, timeLimitSeconds - elapsedSeconds);
  }

  function renderTimerText(remainingSeconds) {
    if (!multiTimerText) return;

    multiTimerText.textContent = `남은 시간 ${remainingSeconds}초`;
    multiTimerText.classList.toggle("danger", remainingSeconds <= 5);
  }

  function stopMultiplayerTimer() {
    if (multiTimerId) {
      clearInterval(multiTimerId);
      multiTimerId = null;
    }
  }

  async function markCurrentRoundTimeOver(room) {
    if (!isHost || !currentRoomCode || !db) return;

    const question = getCurrentQuestion(room);
    if (!question) return;

    await db.ref(`rooms/${currentRoomCode}/currentRound`).transaction((currentRound) => {
      if (!currentRound || currentRound.winnerId || currentRound.isTimeOver) {
        return currentRound;
      }

      return {
        ...currentRound,
        isTimeOver: true,
        answer: question.answers[0],
        answeredAt: Date.now(),
      };
    });
  }

  function startMultiplayerTimer(room) {
    const currentRound = room?.currentRound || {};

    stopMultiplayerTimer();

    if (currentRound.winnerId || currentRound.isTimeOver) {
      renderTimerText(0);
      return;
    }

    const tick = () => {
      const remainingSeconds = getRemainingSeconds(currentRound);
      renderTimerText(remainingSeconds);

      if (remainingSeconds <= 0) {
        stopMultiplayerTimer();
        markCurrentRoundTimeOver(room).catch((error) => {
          setLastFirebaseError(error);
          if (multiRoundStatus) {
            multiRoundStatus.textContent = "시간 초과를 처리할 수 없습니다. 잠시 후 다시 시도해주세요.";
            multiRoundStatus.className = "feedback-text wrong";
          }
        });
      }
    };

    tick();
    multiTimerId = setInterval(tick, 1000);
  }

  function resetRoundInputIfNeeded(room) {
    if (!multiAnswerInput) return;

    const roundIndex = room?.currentRound?.index;
    if (multiAnswerInput.dataset.roundIndex !== String(roundIndex)) {
      multiAnswerInput.value = "";
      multiAnswerInput.dataset.roundIndex = String(roundIndex);
      multiQuizCard?.classList.remove("feedback-pop");
      multiAnswerInput.classList.remove("answer-shake");
      multiCorrectBurst?.classList.add("hidden");
    }
  }

  function renderMultiplayerQuestion(room) {
    const question = getCurrentQuestion(room);
    const players = room?.players || {};
    const me = players[currentPlayerId] || {};
    const currentIndex = room?.currentQuestionIndex || 0;
    const questionTotal = Array.isArray(room?.questionIndexes)
      ? room.questionIndexes.length
      : getQuestionLimit();
    const currentRound = room?.currentRound || {};
    const hasWinner = Boolean(currentRound.winnerId);
    const isTimeOver = Boolean(currentRound.isTimeOver);
    const roundEnded = hasWinner || isTimeOver;
    const actualCategoryName = typeof getCategoryName === "function"
      ? getCategoryName(question?.category)
      : question?.category || "랜덤";
    const selectedCategoryName = typeof getCategoryName === "function"
      ? getCategoryName(room?.category)
      : room?.category || "랜덤";
    const roomLabelCategory = room?.category === "random"
      ? `랜덤 · ${actualCategoryName}`
      : selectedCategoryName;

    resetRoundInputIfNeeded(room);
    setText(multiRoomLabel, `방 코드 ${currentRoomCode || room?.code || "----"} · ${roomLabelCategory}`);
    if (multiDifficultyLabel) {
      const difficulty = question?.difficulty || "normal";
      multiDifficultyLabel.textContent = typeof getDifficultyText === "function"
        ? getDifficultyText(difficulty)
        : difficulty;
      multiDifficultyLabel.className = `difficulty-label ${difficulty}`;
    }
    setText(multiQuestionCount, `문제 ${currentIndex + 1} / ${questionTotal}`);
    setText(multiMyScore, me.score || 0);
    setText(multiEmojiText, question?.emoji || "🎮");
    renderMultiplayerScoreboard(players);

    if (multiAnswerInput) {
      multiAnswerInput.disabled = roundEnded;
    }

    if (multiSubmitBtn) {
      multiSubmitBtn.disabled = roundEnded;
    }

    if (multiRoundStatus) {
      if (hasWinner) {
        multiRoundStatus.textContent = `${currentRound.winnerName || "누군가"}님이 먼저 맞혔습니다! 정답: ${currentRound.answer || ""}`;
        multiRoundStatus.className = "feedback-text correct";
      } else if (isTimeOver) {
        multiRoundStatus.textContent = `시간 초과! 정답: ${currentRound.answer || question?.answers?.[0] || ""}`;
        multiRoundStatus.className = "feedback-text wrong";
      } else {
        multiRoundStatus.textContent = roundReadyMessage;
        multiRoundStatus.className = "feedback-text";
      }
    }

    if (hasWinner) {
      playMultiplayerCorrectFeedback(room, currentRound);
    }

    if (multiNextBtn) {
      const isLastQuestion = currentIndex >= questionTotal - 1;
      multiNextBtn.textContent = isLastQuestion ? "결과 보기" : "다음 문제";
      multiNextBtn.classList.toggle("hidden", !isHost || !roundEnded);
      multiNextBtn.disabled = !isHost || !roundEnded;
    }

    if (roundEnded) {
      stopMultiplayerTimer();
      renderTimerText(isTimeOver ? 0 : getRemainingSeconds(currentRound));
    } else {
      startMultiplayerTimer(room);
    }
  }

  function renderRoomState(snapshot) {
    const room = snapshot.val();

    if (!room) {
      clearRoomSubscription();
      clearLastRoomSession();
      renderResumeRoomBox();
      latestRoom = null;
      currentRoomCode = "";
      isHost = false;
      lastRoomStatus = "-";
      lastCelebratedRoundKey = "";
      roomRef = null;
      updateDebugPanel(null);
      renderPlayers({});
      setText(roomCodeDisplay, "----");
      setRoomStatus("방이 종료되었습니다.");
      showScreenSafe("multiplayer-menu-screen");
      return;
    }

    syncLocalRoomState(room);
    renderPlayers(room.players || {});

    if (room.status === "waiting") {
      stopMultiplayerTimer();
      showScreenSafe("room-screen");
      return;
    }

    if (room.status === "playing") {
      showScreenSafe("multi-quiz-screen");
      renderMultiplayerQuestion(room);
      return;
    }

    if (room.status === "finished") {
      stopMultiplayerTimer();
      showScreenSafe("multi-result-screen");
      renderMultiplayerResult(room.players || {});
    }
  }

  function subscribeRoom(roomCode) {
    clearRoomSubscription();
    roomRef = db.ref(`rooms/${roomCode}`);
    roomRef.on("value", renderRoomState, (error) => {
      setLastFirebaseError(error);
      setRoomStatus("방 정보를 불러올 수 없습니다. 권한 또는 연결 상태를 확인해주세요.", "error");
    });
  }

  function enterRoomScreen(roomCode) {
    currentRoomCode = roomCode;
    lastCelebratedRoundKey = "";
    setText(roomCodeDisplay, roomCode);
    setRoomStatus("");
    updateDebugPanel();
    showScreenSafe("room-screen");
    subscribeRoom(roomCode);
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

  async function cleanupOldRooms() {
    if (!db) return;

    const sixHours = 6 * 60 * 60 * 1000;
    const cutoff = Date.now() - sixHours;
    const snapshot = await db.ref("rooms").once("value");
    const rooms = snapshot.val() || {};
    const updates = {};

    Object.entries(rooms).forEach(([roomCode, room]) => {
      if (room.createdAt && room.createdAt < cutoff) {
        updates[`rooms/${roomCode}`] = null;
      }
    });

    if (Object.keys(updates).length > 0) {
      await db.ref().update(updates);
    }
  }

  async function createRoom() {
    currentPlayerName = getPlayerName();
    const nameError = validatePlayerName(currentPlayerName);

    if (nameError) {
      setMenuStatus(nameError);
      return;
    }

    if (!initFirebase()) {
      setMenuStatus(unavailableMessage);
      return;
    }

    try {
      await ensureAnonymousAuth();
    } catch (error) {
      console.warn("Failed to sign in anonymously", error);
      setLastFirebaseError(error);
      setMenuStatus(authFailedMessage, "error");
      return;
    }

    currentPlayerId = getCurrentPlayerId();

    try {
      await cleanupOldRooms();
    } catch (error) {
      console.warn("Failed to cleanup old rooms", error);
      setLastFirebaseError(error);
    }

    const roomCode = await findAvailableRoomCode();
    const now = Date.now();
    const category = getSelectedCategory();
    const difficulty = getSelectedDifficulty();
    const roomData = {
      code: roomCode,
      status: "waiting",
      hostId: currentPlayerId,
      category,
      difficulty,
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
    saveLastRoomSession(roomCode, currentPlayerName);
    renderResumeRoomBox();
    updateDebugPanel(roomData);
    setMenuStatus("");
    enterRoomScreen(roomCode);
  }

  async function joinRoom(options = {}) {
    const isResume = Boolean(options.resume);
    currentPlayerName = getPlayerName();
    const roomCode = getRoomCodeInput();
    const nameError = validatePlayerName(currentPlayerName);

    if (nameError) {
      setMenuStatus(nameError);
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

    try {
      await ensureAnonymousAuth();
    } catch (error) {
      console.warn("Failed to sign in anonymously", error);
      setLastFirebaseError(error);
      setMenuStatus(authFailedMessage, "error");
      return;
    }

    currentPlayerId = getCurrentPlayerId();
    const roomSnapshot = await db.ref(`rooms/${roomCode}`).get();

    if (!roomSnapshot.exists()) {
      if (isResume || isLastRoomCode(roomCode)) {
        clearLastRoomSession();
        renderResumeRoomBox();
      }

      if (isResume) {
        setMenuStatus("이전 방이 더 이상 존재하지 않습니다.", "error");
      } else {
        setMenuStatus("존재하지 않는 방입니다.");
      }
      return;
    }

    const room = roomSnapshot.val();
    const players = room.players || {};
    const existingPlayer = players[currentPlayerId];
    const playerEntries = Object.values(players);

    if (room.status === "finished") {
      if (isResume || isLastRoomCode(roomCode)) {
        clearLastRoomSession();
        renderResumeRoomBox();
      }
      setMenuStatus(isResume ? "이전 방이 이미 종료되었습니다." : "이미 종료된 방입니다.", "error");
      return;
    }

    if (room.status !== "waiting" && !existingPlayer) {
      setMenuStatus("이미 시작되었거나 종료된 방입니다.");
      return;
    }

    if (room.status === "waiting" && playerEntries.length >= MAX_ROOM_PLAYERS && !existingPlayer) {
      setMenuStatus("방 인원이 가득 찼습니다.");
      return;
    }

    const normalizedName = normalizePlayerName(currentPlayerName);
    const duplicateNamePlayer = playerEntries.find((player) => (
      player.id !== currentPlayerId &&
      normalizePlayerName(player.name || "") === normalizedName
    ));

    if (duplicateNamePlayer) {
      setMenuStatus("이미 사용 중인 닉네임입니다.");
      return;
    }

    const playerData = {
      id: currentPlayerId,
      name: currentPlayerName,
      score: existingPlayer?.score ?? 0,
      isHost: existingPlayer?.isHost ?? false,
      joinedAt: existingPlayer?.joinedAt ?? Date.now(),
    };

    await db.ref(`rooms/${roomCode}/players/${currentPlayerId}`).set(playerData);
    isHost = room.hostId === currentPlayerId || playerData.isHost;
    saveLastRoomSession(roomCode, currentPlayerName);
    renderResumeRoomBox();
    updateDebugPanel(room);
    setMenuStatus("");
    enterRoomScreen(roomCode);
  }

  async function leaveCurrentRoom(goHome = false) {
    const roomCode = currentRoomCode;
    const playerId = currentPlayerId;
    const hostLeaving = isHost;

    clearLastRoomSession();
    clearRoomSubscription();

    if (db && roomCode && playerId) {
      if (!hostLeaving) {
        await db.ref(`rooms/${roomCode}/players/${playerId}`).remove();
      } else {
        const roomSnapshot = await db.ref(`rooms/${roomCode}`).get();
        const room = roomSnapshot.val();
        const players = room?.players || {};
        const remainingPlayers = Object.values(players)
          .filter((player) => player.id !== playerId)
          .sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0));

        if (!remainingPlayers.length) {
          await db.ref(`rooms/${roomCode}`).remove();
        } else {
          const newHost = remainingPlayers[0];
          await db.ref().update({
            [`rooms/${roomCode}/hostId`]: newHost.id,
            [`rooms/${roomCode}/players/${newHost.id}/isHost`]: true,
            [`rooms/${roomCode}/players/${playerId}`]: null,
          });
        }
      }
    }

    currentRoomCode = "";
    isHost = false;
    lastRoomStatus = "-";
    lastCelebratedRoundKey = "";
    roomRef = null;
    latestRoom = null;
    updateDebugPanel(null);
    renderPlayers({});
    renderMultiplayerScoreboard({});
    setText(roomCodeDisplay, "----");
    setRoomStatus("");
    renderResumeRoomBox();

    showScreenSafe(goHome ? "home-screen" : "multiplayer-menu-screen");
  }

  async function updateRoomCategory() {
    if (!roomRef || !isHost || latestRoom?.status !== "waiting") return;

    await roomRef.update({ category: getSelectedCategory() });
  }

  async function updateRoomDifficulty() {
    if (!roomRef || !isHost || latestRoom?.status !== "waiting") return;

    await roomRef.update({ difficulty: getSelectedDifficulty() });
  }

  async function startRoomGame() {
    if (!isHost || !currentRoomCode) return;

    if (!initFirebase()) {
      setRoomStatus(unavailableMessage);
      return;
    }

    const category = getSelectedCategory();
    const difficulty = getSelectedDifficulty();
    const questionIndexes = getMultiplayerQuestionIndexes(category, difficulty);

    if (!questionIndexes.length) {
      setRoomStatus("선택한 조건에 맞는 문제가 없습니다.");
      return;
    }

    await db.ref(`rooms/${currentRoomCode}`).update({
      status: "playing",
      category,
      difficulty,
      questionIndexes,
      currentQuestionIndex: 0,
      currentRound: {
        index: 0,
        winnerId: null,
        winnerName: null,
        answer: null,
        answeredAt: null,
        startedAt: Date.now(),
        timeLimitSeconds: ROUND_TIME_LIMIT_SECONDS,
        isTimeOver: false,
      },
    });
  }

  async function submitMultiplayerAnswer() {
    if (!currentRoomCode || !db || !multiAnswerInput) return;

    const roomSnapshot = await db.ref(`rooms/${currentRoomCode}`).get();
    const room = roomSnapshot.val();

    if (!room || room.status !== "playing") return;
    if (room.currentRound?.winnerId || room.currentRound?.isTimeOver) return;
    if (getRemainingSeconds(room.currentRound) <= 0) return;

    const question = getCurrentQuestion(room);
    const userAnswer = normalizeMultiplayerAnswer(multiAnswerInput.value.trim());

    if (!question || !userAnswer) return;

    const isCorrect = question.answers.some((answer) => (
      normalizeMultiplayerAnswer(answer) === userAnswer
    ));

    if (!isCorrect) {
      if (multiRoundStatus) {
        multiRoundStatus.textContent = "오답입니다. 다시 시도하세요.";
        multiRoundStatus.className = "feedback-text wrong";
      }
      playMultiplayerWrongFeedback();
      multiAnswerInput.select();
      return;
    }

    const roundRef = db.ref(`rooms/${currentRoomCode}/currentRound`);
    const transactionResult = await roundRef.transaction((currentRound) => {
      if (!currentRound || currentRound.winnerId || currentRound.isTimeOver) {
        return currentRound;
      }

      return {
        ...currentRound,
        winnerId: currentPlayerId,
        winnerName: currentPlayerName,
        answer: question.answers[0],
        answeredAt: Date.now(),
      };
    });

    const updatedRound = transactionResult.snapshot.val();
    const isWinner = transactionResult.committed && updatedRound?.winnerId === currentPlayerId;

    if (isWinner) {
      playMultiplayerCorrectFeedback(room, updatedRound);
      await db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}/score`).transaction((score) => (
        (score || 0) + 10
      ));
    }
  }

  async function goNextMultiplayerQuestion() {
    if (!isHost || !currentRoomCode || !db) return;

    const roomSnapshot = await db.ref(`rooms/${currentRoomCode}`).get();
    const room = roomSnapshot.val();

    if (!room?.currentRound?.winnerId && !room?.currentRound?.isTimeOver) return;

    const nextIndex = (room.currentQuestionIndex || 0) + 1;
    const questionTotal = Array.isArray(room.questionIndexes) ? room.questionIndexes.length : 0;

    if (nextIndex >= questionTotal) {
      await db.ref(`rooms/${currentRoomCode}`).update({ status: "finished" });
      return;
    }

    await db.ref(`rooms/${currentRoomCode}`).update({
      currentQuestionIndex: nextIndex,
      currentRound: {
        index: nextIndex,
        winnerId: null,
        winnerName: null,
        answer: null,
        answeredAt: null,
        startedAt: Date.now(),
        timeLimitSeconds: ROUND_TIME_LIMIT_SECONDS,
        isTimeOver: false,
      },
    });
  }

  function populateCategorySelect() {
    if (!multiCategorySelect || typeof categories === "undefined") return;

    multiCategorySelect.innerHTML = categories
      .filter((category) => !category.disabled)
      .map((category) => (
        `<option value="${category.id}">${escapeHtml(category.name)}</option>`
      ))
      .join("");
  }

  function populateDifficultySelect() {
    if (!multiDifficultySelect || typeof difficulties === "undefined") return;

    multiDifficultySelect.innerHTML = difficulties.map((difficulty) => (
      `<option value="${difficulty.id}">${escapeHtml(difficulty.name)}</option>`
    )).join("");
  }

  window.getMultiplayerDebugSnapshot = function getMultiplayerDebugSnapshot() {
    return {
      firebase: db ? "connected" : "not ready",
      auth: auth?.currentUser ? "signed in" : "signed out",
      playerId: currentPlayerId || "-",
      roomCode: currentRoomCode || "-",
      isHost: Boolean(isHost),
      roomStatus: lastRoomStatus || latestRoom?.status || "-",
      lastError: lastFirebaseError || "-",
    };
  };

  function bindEvents() {
    if (debugToggleBtn && debugPanel) {
      debugToggleBtn.addEventListener("click", () => {
        debugPanel.classList.toggle("collapsed");
      });
    }

    multiplayerOpenBtn?.addEventListener("click", () => {
      if (!applyRoomCodeFromUrl(true)) {
        setMenuStatus("");
      }
      renderResumeRoomBox();
      showScreenSafe("multiplayer-menu-screen");
    });

    resumeRoomBtn?.addEventListener("click", () => {
      const lastRoom = getLastRoomSession();

      if (!lastRoom) {
        setMenuStatus("복귀할 방 정보가 없습니다.", "error");
        renderResumeRoomBox();
        return;
      }

      if (playerNameInput) {
        playerNameInput.value = lastRoom.playerName;
      }

      if (roomCodeInput) {
        roomCodeInput.value = lastRoom.roomCode;
      }

      joinRoom({ resume: true }).catch((error) => {
        setLastFirebaseError(error);
        setMenuStatus("이전 방으로 복귀할 수 없습니다. 잠시 후 다시 시도해주세요.", "error");
      });
    });

    clearResumeRoomBtn?.addEventListener("click", () => {
      clearLastRoomSession();
      renderResumeRoomBox();
      setMenuStatus("이전 방 기록을 지웠습니다.", "success");
    });

    copyRoomCodeBtn?.addEventListener("click", () => {
      if (!currentRoomCode) {
        setRoomStatus("복사할 방 코드가 없습니다.", "error");
        return;
      }

      copyTextToClipboard(currentRoomCode, "방 코드가 복사되었습니다.");
    });

    copyInviteLinkBtn?.addEventListener("click", () => {
      if (!currentRoomCode) {
        setRoomStatus("복사할 초대 링크가 없습니다.", "error");
        return;
      }

      copyTextToClipboard(getInviteLink(currentRoomCode), "초대 링크가 복사되었습니다.");
    });

    createRoomBtn?.addEventListener("click", () => {
      createRoom().catch((error) => {
        setLastFirebaseError(error);
        setMenuStatus("방을 만들 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });

    joinRoomBtn?.addEventListener("click", () => {
      joinRoom().catch((error) => {
        setLastFirebaseError(error);
        setMenuStatus("방에 참가할 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });

    leaveRoomBtn?.addEventListener("click", () => {
      leaveCurrentRoom().catch((error) => {
        setLastFirebaseError(error);
        setRoomStatus("방을 나갈 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });

    multiLeaveBtn?.addEventListener("click", () => {
      leaveCurrentRoom().catch((error) => {
        setLastFirebaseError(error);
        setRoomStatus("방을 나갈 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });

    multiResultHomeBtn?.addEventListener("click", () => {
      leaveCurrentRoom(true).catch((error) => {
        setLastFirebaseError(error);
        showScreenSafe("home-screen");
      });
    });

    shareMultiResultBtn?.addEventListener("click", shareMultiplayerResult);

    startRoomGameBtn?.addEventListener("click", () => {
      startRoomGame().catch((error) => {
        setLastFirebaseError(error);
        setRoomStatus("게임을 시작할 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });

    multiSubmitBtn?.addEventListener("click", () => {
      submitMultiplayerAnswer().catch((error) => {
        setLastFirebaseError(error);
        if (multiRoundStatus) {
          multiRoundStatus.textContent = "정답을 제출할 수 없습니다. 잠시 후 다시 시도해주세요.";
          multiRoundStatus.className = "feedback-text wrong";
        }
      });
    });

    multiAnswerInput?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        submitMultiplayerAnswer().catch((error) => {
          setLastFirebaseError(error);
          if (multiRoundStatus) {
            multiRoundStatus.textContent = "정답을 제출할 수 없습니다. 잠시 후 다시 시도해주세요.";
            multiRoundStatus.className = "feedback-text wrong";
          }
        });
      }
    });

    multiNextBtn?.addEventListener("click", () => {
      goNextMultiplayerQuestion().catch((error) => {
        setLastFirebaseError(error);
        if (multiRoundStatus) {
          multiRoundStatus.textContent = "다음 문제로 이동할 수 없습니다. 잠시 후 다시 시도해주세요.";
          multiRoundStatus.className = "feedback-text wrong";
        }
      });
    });

    multiCategorySelect?.addEventListener("change", () => {
      updateRoomCategory().catch((error) => {
        setLastFirebaseError(error);
        setRoomStatus("카테고리를 변경할 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });

    multiDifficultySelect?.addEventListener("change", () => {
      updateRoomDifficulty().catch((error) => {
        setLastFirebaseError(error);
        setRoomStatus("난이도를 변경할 수 없습니다. 잠시 후 다시 시도해주세요.");
      });
    });
  }

  populateCategorySelect();
  populateDifficultySelect();
  updateDebugPanel();
  if (applyRoomCodeFromUrl(true)) {
    showScreenSafe("multiplayer-menu-screen");
  }
  renderResumeRoomBox();
  updateHostControls();
  bindEvents();
})();
