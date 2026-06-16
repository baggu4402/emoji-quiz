(() => {
  const unavailableMessage = "멀티플레이는 Firebase 설정 후 사용할 수 있습니다.";

  function isFirebaseReady() {
    return Boolean(
      window.firebaseConfig &&
      window.firebase &&
      typeof window.firebase.initializeApp === "function" &&
      typeof window.firebase.database === "function"
    );
  }

  function setStatus(selector) {
    const status = document.querySelector(selector);

    if (status) {
      status.textContent = unavailableMessage;
    }
  }

  function guardButton(selector, statusSelector) {
    const button = document.querySelector(selector);

    if (!button) return;

    button.addEventListener("click", (event) => {
      if (isFirebaseReady()) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      setStatus(statusSelector);
    });
  }

  guardButton("#create-room-btn", "#multi-menu-status");
  guardButton("#join-room-btn", "#multi-menu-status");
  guardButton("#start-room-game-btn", "#room-status-text");
})();
