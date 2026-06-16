const QUESTION_LIMIT = 10;
const BEST_SCORE_KEY = "emojiQuizBestScore";

const categories = [
  { id: "random", name: "랜덤", icon: "🎲" },
  { id: "movie", name: "영화", icon: "🎬" },
  { id: "game", name: "게임", icon: "🎮" },
  { id: "anime", name: "애니/웹툰", icon: "📺" },
  { id: "school", name: "학교생활", icon: "🏫" },
  { id: "meme", name: "상황/밈", icon: "😂" },
];

const quizData = [
  { category: "movie", emoji: "🕷️👨", answers: ["스파이더맨", "스파이더 맨", "spiderman", "spider man"], hint: "마블 히어로" },
  { category: "movie", emoji: "🚢🧊💔", answers: ["타이타닉", "titanic"], hint: "유명한 로맨스 재난 영화" },
  { category: "movie", emoji: "🧊👸", answers: ["겨울왕국", "frozen"], hint: "렛잇고로 유명한 디즈니 애니메이션" },
  { category: "movie", emoji: "⚡🧙‍♂️🪄", answers: ["해리포터", "harrypotter", "harry potter"], hint: "마법 학교에 다니는 소년" },
  { category: "movie", emoji: "🦁👑", answers: ["라이온킹", "라이온 킹", "lionking", "lion king"], hint: "동물 왕국의 왕자" },
  { category: "movie", emoji: "🦖🏝️", answers: ["쥬라기공원", "쥬라기 공원", "jurassicpark", "jurassic park"], hint: "공룡이 나오는 섬" },
  { category: "movie", emoji: "👽🚲🌕", answers: ["이티", "et", "e.t", "e.t."], hint: "자전거와 달 장면으로 유명한 영화" },
  { category: "movie", emoji: "🤖🚗", answers: ["트랜스포머", "transformers", "transformer"], hint: "자동차가 로봇으로 변신" },
  { category: "movie", emoji: "🦇👨", answers: ["배트맨", "batman"], hint: "고담시의 히어로" },
  { category: "movie", emoji: "🧑‍🚀🌌", answers: ["인터스텔라", "interstellar"], hint: "우주와 시간에 관한 영화" },

  { category: "game", emoji: "🎮🧱⛏️", answers: ["마인크래프트", "minecraft"], hint: "블록을 캐고 건축하는 게임" },
  { category: "game", emoji: "🍄👨‍🔧⭐", answers: ["슈퍼마리오", "슈퍼 마리오", "supermario", "super mario", "마리오"], hint: "버섯과 배관공" },
  { category: "game", emoji: "🔫🏝️👥", answers: ["배틀그라운드", "배그", "pubg", "battleground"], hint: "섬에서 살아남는 배틀로얄" },
  { category: "game", emoji: "⚽🚗", answers: ["로켓리그", "로켓 리그", "rocketleague", "rocket league"], hint: "자동차로 축구하는 게임" },
  { category: "game", emoji: "🧟🔫🏚️", answers: ["바이오하자드", "레지던트 이블", "resident evil", "biohazard"], hint: "좀비와 생존 공포" },
  { category: "game", emoji: "🔵💨🦔", answers: ["소닉", "sonic"], hint: "파란 고슴도치" },
  { category: "game", emoji: "🗡️🛡️🐉", answers: ["젤다의 전설", "젤다", "zelda", "legend of zelda"], hint: "검과 방패, 모험" },
  { category: "game", emoji: "👻🔴🟡", answers: ["팩맨", "pacman", "pac-man"], hint: "유령을 피해 점을 먹는 게임" },
  { category: "game", emoji: "🐤🟨🏃", answers: ["카트라이더", "카트", "kartrider"], hint: "캐릭터들이 카트를 타고 달림" },
  { category: "game", emoji: "🧙‍♀️🃏⚔️", answers: ["하스스톤", "hearthstone"], hint: "블리자드 카드 게임" },

  { category: "anime", emoji: "🏴‍☠️👒", answers: ["원피스", "onepiece", "one piece"], hint: "밀짚모자 해적단" },
  { category: "anime", emoji: "🍥🥷", answers: ["나루토", "naruto"], hint: "닌자가 주인공" },
  { category: "anime", emoji: "⚔️🧣巨", answers: ["진격의거인", "진격의 거인", "attackontitan", "attack on titan"], hint: "거인과 싸우는 이야기" },
  { category: "anime", emoji: "🐉⚽🔥", answers: ["드래곤볼", "드래곤 볼", "dragonball", "dragon ball"], hint: "에네르기파" },
  { category: "anime", emoji: "👹⚔️🌊", answers: ["귀멸의칼날", "귀멸의 칼날", "demonslayer", "demon slayer"], hint: "호흡과 도깨비" },
  { category: "anime", emoji: "🎒🦸‍♂️🏫", answers: ["나의히어로아카데미아", "나의 히어로 아카데미아", "히로아카", "my hero academia"], hint: "히어로 학교" },
  { category: "anime", emoji: "📓☠️", answers: ["데스노트", "deathnote", "death note"], hint: "이름을 쓰면 죽는 노트" },
  { category: "anime", emoji: "🐭⚡", answers: ["피카츄", "pikachu", "포켓몬", "pokemon"], hint: "전기 타입 대표 캐릭터" },
  { category: "anime", emoji: "🧽⭐🦀", answers: ["스폰지밥", "spongebob", "sponge bob"], hint: "바닷속 노란 캐릭터" },
  { category: "anime", emoji: "🧑‍🍳🍜🔥", answers: ["식극의소마", "식극의 소마", "shokugeki no soma", "food wars"], hint: "요리 배틀 애니" },

  { category: "school", emoji: "📚😭☕", answers: ["시험기간", "시험 기간"], hint: "학생들이 가장 힘들어하는 시기" },
  { category: "school", emoji: "⏰🏃‍♂️💨", answers: ["지각", "늦잠", "지각함"], hint: "시간에 쫓기는 상황" },
  { category: "school", emoji: "📝😵‍💫", answers: ["과제", "숙제", "레포트"], hint: "제출 기한이 무서운 것" },
  { category: "school", emoji: "🎒🏫", answers: ["등교", "학교가는길", "학교 가는 길"], hint: "학교로 가는 일" },
  { category: "school", emoji: "💤📖", answers: ["수업중졸기", "수업 중 졸기", "졸기", "수업졸기"], hint: "책 앞에서 잠이 옴" },
  { category: "school", emoji: "🍱👥", answers: ["점심시간", "점심 시간", "급식"], hint: "친구들과 밥 먹는 시간" },
  { category: "school", emoji: "📢👨‍🏫", answers: ["조회", "종례", "공지"], hint: "선생님이 공지하는 시간" },
  { category: "school", emoji: "🧪🥼", answers: ["과학실험", "과학 실험", "실험"], hint: "가운을 입고 하는 수업" },
  { category: "school", emoji: "🎓📸", answers: ["졸업식", "졸업"], hint: "학교를 마치는 행사" },
  { category: "school", emoji: "🚌🏫", answers: ["통학버스", "통학 버스", "스쿨버스", "스쿨 버스"], hint: "학교에 갈 때 타는 버스" },

  { category: "meme", emoji: "👨‍💻☕🌙", answers: ["밤샘코딩", "밤샘 코딩", "코딩밤샘", "야간코딩"], hint: "새벽까지 개발하는 상황" },
  { category: "meme", emoji: "💸😭📦", answers: ["충동구매", "충동 구매"], hint: "사고 나서 후회하는 소비" },
  { category: "meme", emoji: "📱🔋0️⃣", answers: ["배터리없음", "배터리 없음", "폰배터리없음"], hint: "휴대폰이 곧 꺼지는 상황" },
  { category: "meme", emoji: "👀👄👀", answers: ["눈치보기", "눈치 보기"], hint: "분위기를 살피는 행동" },
  { category: "meme", emoji: "🔥🧠", answers: ["멘붕", "멘탈붕괴", "멘탈 붕괴"], hint: "정신이 무너지는 느낌" },
  { category: "meme", emoji: "🍗📺🛋️", answers: ["치맥", "치킨먹기", "치킨 먹기"], hint: "집에서 편하게 먹는 야식 느낌" },
  { category: "meme", emoji: "😴⏰🔁", answers: ["알람끄기", "알람 끄기", "5분만", "오분만"], hint: "아침마다 반복되는 유혹" },
  { category: "meme", emoji: "💬👻", answers: ["읽씹", "안읽씹", "답장안함", "답장 안함"], hint: "메시지 답장이 없는 상황" },
  { category: "meme", emoji: "🍜🌙", answers: ["야식", "라면야식", "밤에라면"], hint: "밤에 먹으면 더 맛있는 것" },
  { category: "meme", emoji: "🧊🥶❄️", answers: ["개춥다", "춥다", "너무춥다", "추움"], hint: "날씨 반응" },
];

let selectedCategory = "random";
let questions = [];
let currentIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let hintUsed = false;
let answered = false;
let previousSoloScreen = "home-screen";

const screens = document.querySelectorAll(".screen");
const homeBestScore = document.querySelector("#home-best-score");
const categoryList = document.querySelector("#category-list");
const categoryLabel = document.querySelector("#category-label");
const questionCount = document.querySelector("#question-count");
const scoreText = document.querySelector("#score-text");
const emojiText = document.querySelector("#emoji-text");
const feedbackText = document.querySelector("#feedback-text");
const hintText = document.querySelector("#hint-text");
const answerInput = document.querySelector("#answer-input");
const submitBtn = document.querySelector("#submit-btn");
const hintBtn = document.querySelector("#hint-btn");
const showAnswerBtn = document.querySelector("#show-answer-btn");
const nextBtn = document.querySelector("#next-btn");
const soloBackBtn = document.querySelector("#solo-back-btn");
const shareSoloResultBtn = document.querySelector("#share-solo-result-btn");
const finalScore = document.querySelector("#final-score");
const bestMessage = document.querySelector("#best-message");
const correctCountText = document.querySelector("#correct-count");
const wrongCountText = document.querySelector("#wrong-count");

function showScreen(screenId) {
  screens.forEach((screen) => screen.classList.remove("active"));
  document.querySelector(`#${screenId}`).classList.add("active");
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

async function copyTextToClipboardForSolo(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  if (!copyTextWithFallback(text)) {
    throw new Error("Fallback copy failed");
  }
}

function getSoloShareText() {
  return [
    "이게 뭔데? Emoji Quiz",
    `내 점수: ${score}점`,
    `맞힌 문제: ${correctCount}개`,
    `틀린 문제: ${wrongCount}개`,
    "",
    "너도 풀어보기:",
    window.location.origin + window.location.pathname,
  ].join("\n");
}

async function shareSoloResult() {
  try {
    await copyTextToClipboardForSolo(getSoloShareText());
    bestMessage.textContent = "결과가 복사되었습니다.";
  } catch (error) {
    bestMessage.textContent = "복사에 실패했습니다. 직접 선택해서 복사해주세요.";
  }
}

function getBestScore() {
  return Number(localStorage.getItem(BEST_SCORE_KEY) || 0);
}

function setBestScore(value) {
  localStorage.setItem(BEST_SCORE_KEY, String(value));
}

function updateBestScoreUI() {
  homeBestScore.textContent = getBestScore();
}

function normalizeAnswer(text) {
  return text.toLowerCase().replace(/\s+/g, "").replace(/[.\-_'\"]/g, "");
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getCategoryName(categoryId) {
  return categories.find((category) => category.id === categoryId)?.name || "랜덤";
}

function getQuestionsByCategory(categoryId) {
  if (categoryId === "random") {
    return quizData;
  }
  return quizData.filter((quiz) => quiz.category === categoryId);
}

function buildCategoryButtons() {
  categoryList.innerHTML = categories.map((category) => {
    const count = getQuestionsByCategory(category.id).length;
    return `
      <button class="category-btn" data-category="${category.id}">
        <span class="icon">${category.icon}</span>
        <span class="name">${category.name}</span>
        <span class="count">문제 ${count}개</span>
      </button>
    `;
  }).join("");

  document.querySelectorAll(".category-btn").forEach((button) => {
    button.addEventListener("click", () => startGame(button.dataset.category, "category-screen"));
  });
}

function startGame(categoryId = "random", previousScreen = "home-screen") {
  previousSoloScreen = previousScreen;
  selectedCategory = categoryId;
  questions = shuffle(getQuestionsByCategory(categoryId)).slice(0, QUESTION_LIMIT);
  currentIndex = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  showScreen("quiz-screen");
  renderQuestion();
}

function renderQuestion() {
  const currentQuestion = questions[currentIndex];
  hintUsed = false;
  answered = false;

  categoryLabel.textContent = getCategoryName(selectedCategory);
  questionCount.textContent = `문제 ${currentIndex + 1} / ${questions.length}`;
  scoreText.textContent = score;
  emojiText.textContent = currentQuestion.emoji;
  feedbackText.textContent = "";
  feedbackText.className = "feedback-text";
  hintText.textContent = "";
  hintText.classList.add("hidden");
  answerInput.value = "";
  answerInput.disabled = false;
  submitBtn.classList.remove("hidden");
  hintBtn.classList.remove("hidden");
  showAnswerBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  answerInput.focus();
}

function finishCurrentQuestion(isCorrect) {
  answered = true;
  answerInput.disabled = true;
  submitBtn.classList.add("hidden");
  hintBtn.classList.add("hidden");
  showAnswerBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");

  if (isCorrect) {
    const earnedScore = hintUsed ? 5 : 10;
    score += earnedScore;
    correctCount += 1;
    scoreText.textContent = score;
    feedbackText.textContent = `정답! +${earnedScore}점`;
    feedbackText.className = "feedback-text correct";
  } else {
    wrongCount += 1;
  }
}

function submitAnswer() {
  if (answered) return;

  const currentQuestion = questions[currentIndex];
  const userAnswer = normalizeAnswer(answerInput.value.trim());

  if (!userAnswer) {
    feedbackText.textContent = "정답을 입력해주세요.";
    feedbackText.className = "feedback-text wrong";
    return;
  }

  const isCorrect = currentQuestion.answers.some((answer) => normalizeAnswer(answer) === userAnswer);

  if (isCorrect) {
    finishCurrentQuestion(true);
    return;
  }

  feedbackText.textContent = "아쉽습니다. 다시 생각해보세요!";
  feedbackText.className = "feedback-text wrong";
  answerInput.select();
}

function showHint() {
  if (answered) return;

  const currentQuestion = questions[currentIndex];
  hintUsed = true;
  hintText.textContent = `힌트: ${currentQuestion.hint}`;
  hintText.classList.remove("hidden");
}

function showAnswer() {
  if (answered) return;

  const currentQuestion = questions[currentIndex];
  feedbackText.textContent = `정답: ${currentQuestion.answers[0]}`;
  feedbackText.className = "feedback-text wrong";
  finishCurrentQuestion(false);
}

function goNextQuestion() {
  currentIndex += 1;

  if (currentIndex >= questions.length) {
    showResult();
    return;
  }

  renderQuestion();
}

function showResult() {
  const previousBest = getBestScore();
  const isNewBest = score > previousBest;

  if (isNewBest) {
    setBestScore(score);
  }

  finalScore.textContent = score;
  bestMessage.textContent = isNewBest ? "최고 점수를 갱신했습니다!" : `현재 최고 점수는 ${previousBest}점입니다.`;
  correctCountText.textContent = correctCount;
  wrongCountText.textContent = wrongCount;
  updateBestScoreUI();
  showScreen("result-screen");
}

function bindEvents() {
  document.querySelector("#quick-start-btn").addEventListener("click", () => startGame("random", "home-screen"));
  document.querySelector("#category-open-btn").addEventListener("click", () => showScreen("category-screen"));
  document.querySelector("#how-to-btn").addEventListener("click", () => showScreen("how-to-screen"));
  document.querySelector("#retry-btn").addEventListener("click", () => startGame(selectedCategory));
  document.querySelector("#home-btn").addEventListener("click", () => showScreen("home-screen"));
  shareSoloResultBtn?.addEventListener("click", shareSoloResult);
  if (soloBackBtn) {
    soloBackBtn.addEventListener("click", () => showScreen(previousSoloScreen || "home-screen"));
  }

  document.querySelectorAll(".back-btn[data-target]").forEach((button) => {
    button.addEventListener("click", () => showScreen(button.dataset.target));
  });

  submitBtn.addEventListener("click", submitAnswer);
  hintBtn.addEventListener("click", showHint);
  showAnswerBtn.addEventListener("click", showAnswer);
  nextBtn.addEventListener("click", goNextQuestion);

  answerInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (answered) {
        goNextQuestion();
      } else {
        submitAnswer();
      }
    }
  });
}

function init() {
  updateBestScoreUI();
  buildCategoryButtons();
  bindEvents();
}

init();

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js")
      .catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
  });
}

registerServiceWorker();
