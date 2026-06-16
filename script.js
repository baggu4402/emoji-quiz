const QUESTION_LIMIT = 10;
const BEST_SCORE_KEY = "emojiQuizBestScore";

const categories = [
  { id: "random", name: "랜덤", icon: "🎲" },
  { id: "movie", name: "영화", icon: "🎬" },
  { id: "game", name: "게임", icon: "🎮" },
  { id: "anime", name: "애니/웹툰", icon: "📺" },
  { id: "school", name: "학교생활", icon: "🏫" },
  { id: "meme", name: "상황/밈", icon: "😂", disabled: true },
];

const difficulties = [
  { id: "all", name: "전체" },
  { id: "easy", name: "쉬움" },
  { id: "normal", name: "보통" },
  { id: "hard", name: "어려움" },
];

const quizData = [
  {
    "id": 1,
    "category": "movie",
    "emoji": "🕷️👨",
    "answers": [
      "스파이더맨",
      "스파이더 맨",
      "spiderman",
      "spider man"
    ],
    "hint": "마블의 거미줄 히어로",
    "difficulty": "easy"
  },
  {
    "id": 2,
    "category": "movie",
    "emoji": "🚢🧊💔",
    "answers": [
      "타이타닉",
      "titanic"
    ],
    "hint": "침몰한 배와 로맨스",
    "difficulty": "easy"
  },
  {
    "id": 3,
    "category": "movie",
    "emoji": "🧊👸❄️",
    "answers": [
      "겨울왕국",
      "겨울 왕국",
      "frozen"
    ],
    "hint": "엘사와 안나가 나오는 디즈니 애니메이션 영화",
    "difficulty": "easy"
  },
  {
    "id": 4,
    "category": "movie",
    "emoji": "⚡🧙‍♂️🪄",
    "answers": [
      "해리포터",
      "해리 포터",
      "harry potter"
    ],
    "hint": "마법 학교에 다니는 소년",
    "difficulty": "easy"
  },
  {
    "id": 5,
    "category": "movie",
    "emoji": "🦁👑",
    "answers": [
      "라이온킹",
      "라이온 킹",
      "the lion king",
      "lion king"
    ],
    "hint": "동물 왕국의 왕자",
    "difficulty": "easy"
  },
  {
    "id": 6,
    "category": "movie",
    "emoji": "🦖🏝️",
    "answers": [
      "쥬라기공원",
      "쥬라기 공원",
      "jurassic park"
    ],
    "hint": "공룡 테마파크 영화",
    "difficulty": "easy"
  },
  {
    "id": 7,
    "category": "movie",
    "emoji": "🦸‍♂️🦸‍♀️🌍",
    "answers": [
      "어벤져스",
      "avengers",
      "the avengers"
    ],
    "hint": "마블 히어로들이 모인 팀",
    "difficulty": "easy"
  },
  {
    "id": 8,
    "category": "movie",
    "emoji": "🦇👨🌃",
    "answers": [
      "배트맨",
      "batman"
    ],
    "hint": "고담시의 다크 히어로",
    "difficulty": "easy"
  },
  {
    "id": 9,
    "category": "movie",
    "emoji": "🦸‍♂️☀️",
    "answers": [
      "슈퍼맨",
      "superman"
    ],
    "hint": "하늘을 나는 DC 히어로",
    "difficulty": "easy"
  },
  {
    "id": 10,
    "category": "movie",
    "emoji": "🤖❤️🦸‍♂️",
    "answers": [
      "아이언맨",
      "아이언 맨",
      "iron man"
    ],
    "hint": "강철 슈트를 입은 마블 히어로",
    "difficulty": "easy"
  },
  {
    "id": 11,
    "category": "movie",
    "emoji": "🧸🤠🚀",
    "answers": [
      "토이스토리",
      "토이 스토리",
      "toy story"
    ],
    "hint": "장난감들이 살아 움직이는 영화",
    "difficulty": "easy"
  },
  {
    "id": 12,
    "category": "movie",
    "emoji": "🐠🔎🌊",
    "answers": [
      "니모를찾아서",
      "니모를 찾아서",
      "finding nemo"
    ],
    "hint": "잃어버린 물고기를 찾는 이야기",
    "difficulty": "easy"
  },
  {
    "id": 13,
    "category": "movie",
    "emoji": "🧞‍♂️🕌🪔",
    "answers": [
      "알라딘",
      "aladdin"
    ],
    "hint": "램프의 요정이 등장하는 디즈니 영화",
    "difficulty": "easy"
  },
  {
    "id": 14,
    "category": "movie",
    "emoji": "👸🌹🐻",
    "answers": [
      "미녀와야수",
      "미녀와 야수",
      "beauty and the beast"
    ],
    "hint": "장미와 야수가 나오는 동화 영화",
    "difficulty": "easy"
  },
  {
    "id": 15,
    "category": "movie",
    "emoji": "🏴‍☠️⚓🌊",
    "answers": [
      "캐리비안의해적",
      "캐리비안의 해적",
      "pirates of the caribbean"
    ],
    "hint": "잭 스패로우가 나오는 해적 영화",
    "difficulty": "easy"
  },
  {
    "id": 16,
    "category": "movie",
    "emoji": "🏠👦🎄",
    "answers": [
      "나홀로집에",
      "나 홀로 집에",
      "home alone"
    ],
    "hint": "크리스마스에 집에 혼자 남은 아이",
    "difficulty": "easy"
  },
  {
    "id": 17,
    "category": "movie",
    "emoji": "🦈🌊😱",
    "answers": [
      "죠스",
      "jaws"
    ],
    "hint": "상어 공포 영화의 고전",
    "difficulty": "easy"
  },
  {
    "id": 18,
    "category": "movie",
    "emoji": "🌀💤🏙️",
    "answers": [
      "인셉션",
      "inception"
    ],
    "hint": "꿈속의 꿈을 다루는 영화",
    "difficulty": "normal"
  },
  {
    "id": 19,
    "category": "movie",
    "emoji": "🚀🌌⏳",
    "answers": [
      "인터스텔라",
      "interstellar"
    ],
    "hint": "우주와 시간, 가족을 다룬 SF 영화",
    "difficulty": "normal"
  },
  {
    "id": 20,
    "category": "movie",
    "emoji": "🕶️💊💻",
    "answers": [
      "매트릭스",
      "matrix",
      "the matrix"
    ],
    "hint": "빨간 약과 파란 약이 나오는 SF 영화",
    "difficulty": "normal"
  },
  {
    "id": 21,
    "category": "movie",
    "emoji": "🎹💃🌃",
    "answers": [
      "라라랜드",
      "라라 랜드",
      "la la land",
      "lalaland"
    ],
    "hint": "음악과 춤이 중요한 로맨스 영화",
    "difficulty": "normal"
  },
  {
    "id": 22,
    "category": "movie",
    "emoji": "🏠🪳🏆",
    "answers": [
      "기생충",
      "parasite"
    ],
    "hint": "반지하 가족이 등장하는 한국 영화",
    "difficulty": "normal"
  },
  {
    "id": 23,
    "category": "movie",
    "emoji": "🦇🃏🌃",
    "answers": [
      "다크나이트",
      "다크 나이트",
      "the dark knight",
      "dark knight"
    ],
    "hint": "조커가 강렬하게 등장하는 배트맨 영화",
    "difficulty": "normal"
  },
  {
    "id": 24,
    "category": "movie",
    "emoji": "🍌👓💛",
    "answers": [
      "미니언즈",
      "minions"
    ],
    "hint": "노란 캐릭터들이 우르르 나오는 영화",
    "difficulty": "normal"
  },
  {
    "id": 25,
    "category": "movie",
    "emoji": "🟢👹👸",
    "answers": [
      "슈렉",
      "shrek"
    ],
    "hint": "초록 괴물이 주인공인 애니메이션 영화",
    "difficulty": "normal"
  },
  {
    "id": 26,
    "category": "movie",
    "emoji": "👽🚲🌕",
    "answers": [
      "이티",
      "E.T.",
      "et",
      "e t"
    ],
    "hint": "자전거와 달 장면으로 유명한 외계인 영화",
    "difficulty": "normal"
  },
  {
    "id": 27,
    "category": "movie",
    "emoji": "🎈🏠👴",
    "answers": [
      "업",
      "up"
    ],
    "hint": "풍선으로 집을 띄우는 픽사 영화",
    "difficulty": "normal"
  },
  {
    "id": 28,
    "category": "movie",
    "emoji": "🧠😊😢",
    "answers": [
      "인사이드아웃",
      "인사이드 아웃",
      "inside out"
    ],
    "hint": "감정들이 캐릭터로 등장하는 픽사 영화",
    "difficulty": "normal"
  },
  {
    "id": 29,
    "category": "movie",
    "emoji": "🎸💀🌼",
    "answers": [
      "코코",
      "coco"
    ],
    "hint": "죽은 자들의 세계와 음악을 다룬 영화",
    "difficulty": "normal"
  },
  {
    "id": 30,
    "category": "movie",
    "emoji": "🐰🦊🏙️",
    "answers": [
      "주토피아",
      "zootopia"
    ],
    "hint": "토끼 경찰과 여우가 나오는 도시 이야기",
    "difficulty": "normal"
  },
  {
    "id": 31,
    "category": "movie",
    "emoji": "💙🌳🌌",
    "answers": [
      "아바타",
      "avatar"
    ],
    "hint": "판도라 행성을 배경으로 한 SF 영화",
    "difficulty": "normal"
  },
  {
    "id": 32,
    "category": "movie",
    "emoji": "🐆👑🦸‍♂️",
    "answers": [
      "블랙팬서",
      "블랙 팬서",
      "black panther"
    ],
    "hint": "와칸다의 왕이자 히어로",
    "difficulty": "normal"
  },
  {
    "id": 33,
    "category": "movie",
    "emoji": "🧙‍♂️🌀⏳",
    "answers": [
      "닥터스트레인지",
      "닥터 스트레인지",
      "doctor strange",
      "dr strange"
    ],
    "hint": "마법과 차원을 다루는 마블 히어로",
    "difficulty": "normal"
  },
  {
    "id": 34,
    "category": "movie",
    "emoji": "🦖🏙️🔥",
    "answers": [
      "고질라",
      "godzilla"
    ],
    "hint": "도시를 뒤흔드는 거대 괴수",
    "difficulty": "normal"
  },
  {
    "id": 35,
    "category": "movie",
    "emoji": "🏜️🪱👑",
    "answers": [
      "듄",
      "dune"
    ],
    "hint": "사막 행성과 모래벌레가 나오는 SF 영화",
    "difficulty": "hard"
  },
  {
    "id": 36,
    "category": "movie",
    "emoji": "🥁🩸🎓",
    "answers": [
      "위플래쉬",
      "위플래시",
      "whiplash"
    ],
    "hint": "드럼과 혹독한 음악 교육을 다룬 영화",
    "difficulty": "hard"
  },
  {
    "id": 37,
    "category": "movie",
    "emoji": "🧠📸🔁",
    "answers": [
      "메멘토",
      "memento"
    ],
    "hint": "기억과 시간 순서가 중요한 영화",
    "difficulty": "hard"
  },
  {
    "id": 38,
    "category": "movie",
    "emoji": "👁️🚪🏃‍♂️",
    "answers": [
      "겟아웃",
      "겟 아웃",
      "get out"
    ],
    "hint": "수상한 가족 모임이 시작되는 공포 영화",
    "difficulty": "hard"
  },
  {
    "id": 39,
    "category": "movie",
    "emoji": "👽🛸🗣️",
    "answers": [
      "컨택트",
      "arrival",
      "어라이벌"
    ],
    "hint": "외계인의 언어를 해석하는 SF 영화",
    "difficulty": "hard"
  },
  {
    "id": 40,
    "category": "movie",
    "emoji": "🔨🍜📦",
    "answers": [
      "올드보이",
      "oldboy",
      "old boy"
    ],
    "hint": "감금과 복수를 다룬 한국 영화",
    "difficulty": "hard"
  },
  {
    "id": 41,
    "category": "movie",
    "emoji": "🚗🔥🏜️",
    "answers": [
      "매드맥스",
      "매드 맥스",
      "mad max"
    ],
    "hint": "사막 추격전으로 유명한 액션 영화",
    "difficulty": "hard"
  },
  {
    "id": 42,
    "category": "movie",
    "emoji": "👊🧼🤫",
    "answers": [
      "파이트클럽",
      "파이트 클럽",
      "fight club"
    ],
    "hint": "첫 번째 규칙을 말하면 안 되는 영화",
    "difficulty": "hard"
  },
  {
    "id": 43,
    "category": "movie",
    "emoji": "📺👨🌊",
    "answers": [
      "트루먼쇼",
      "트루먼 쇼",
      "the truman show",
      "truman show"
    ],
    "hint": "한 사람의 인생이 방송되는 영화",
    "difficulty": "hard"
  },
  {
    "id": 44,
    "category": "movie",
    "emoji": "🏨🛎️🍰",
    "answers": [
      "그랜드부다페스트호텔",
      "그랜드 부다페스트 호텔",
      "the grand budapest hotel",
      "grand budapest hotel"
    ],
    "hint": "분홍색 호텔과 컨시어지가 인상적인 영화",
    "difficulty": "hard"
  },
  {
    "id": 45,
    "category": "movie",
    "emoji": "⛓️🏃‍♂️🕳️",
    "answers": [
      "쇼생크탈출",
      "쇼생크 탈출",
      "the shawshank redemption",
      "shawshank redemption"
    ],
    "hint": "감옥 탈출 영화의 명작",
    "difficulty": "hard"
  },
  {
    "id": 46,
    "category": "movie",
    "emoji": "🪴🕶️🔫",
    "answers": [
      "레옹",
      "leon",
      "léon",
      "the professional"
    ],
    "hint": "킬러와 소녀, 화분이 기억나는 영화",
    "difficulty": "hard"
  },
  {
    "id": 47,
    "category": "movie",
    "emoji": "🐻❄️🩸",
    "answers": [
      "레버넌트",
      "레버넌트 죽음에서 돌아온 자",
      "the revenant",
      "revenant"
    ],
    "hint": "곰 습격과 생존을 다룬 영화",
    "difficulty": "hard"
  },
  {
    "id": 48,
    "category": "movie",
    "emoji": "🚗🎹📗",
    "answers": [
      "그린북",
      "그린 북",
      "green book"
    ],
    "hint": "운전사와 피아니스트의 여정을 그린 영화",
    "difficulty": "hard"
  },
  {
    "id": 49,
    "category": "movie",
    "emoji": "👰‍♀️🗡️🟡",
    "answers": [
      "킬빌",
      "킬 빌",
      "kill bill"
    ],
    "hint": "노란 트레이닝복과 복수극으로 유명한 영화",
    "difficulty": "hard"
  },
  {
    "id": 50,
    "category": "movie",
    "emoji": "👨📱❤️",
    "answers": [
      "그녀",
      "her"
    ],
    "hint": "운영체제와 사랑에 빠지는 영화",
    "difficulty": "hard"
  },
  {
    "id": 51,
    "category": "game",
    "emoji": "🎮🧱⛏️",
    "answers": [
      "마인크래프트",
      "마인 크래프트",
      "minecraft"
    ],
    "hint": "블록을 캐고 건축하는 샌드박스 게임",
    "difficulty": "easy"
  },
  {
    "id": 52,
    "category": "game",
    "emoji": "🍄👨‍🔧⭐",
    "answers": [
      "슈퍼마리오",
      "슈퍼 마리오",
      "super mario",
      "mario"
    ],
    "hint": "버섯과 배관공 캐릭터가 유명한 게임",
    "difficulty": "easy"
  },
  {
    "id": 53,
    "category": "game",
    "emoji": "⚡🐭🔴",
    "answers": [
      "포켓몬",
      "포켓몬스터",
      "pokemon",
      "pokémon"
    ],
    "hint": "몬스터를 잡고 배틀하는 게임",
    "difficulty": "easy"
  },
  {
    "id": 54,
    "category": "game",
    "emoji": "🧙‍♂️⚔️🏆",
    "answers": [
      "리그오브레전드",
      "리그 오브 레전드",
      "롤",
      "league of legends",
      "lol"
    ],
    "hint": "5대5 팀 대전으로 유명한 MOBA 게임",
    "difficulty": "easy"
  },
  {
    "id": 55,
    "category": "game",
    "emoji": "🔫🏝️👥",
    "answers": [
      "배틀그라운드",
      "배그",
      "pubg",
      "battlegrounds",
      "playerunknown's battlegrounds"
    ],
    "hint": "섬에서 최후의 1인을 노리는 배틀로얄 게임",
    "difficulty": "easy"
  },
  {
    "id": 56,
    "category": "game",
    "emoji": "🦍🔫🛡️",
    "answers": [
      "오버워치",
      "overwatch"
    ],
    "hint": "여러 영웅이 싸우는 팀 기반 슈팅 게임",
    "difficulty": "easy"
  },
  {
    "id": 57,
    "category": "game",
    "emoji": "🪂🔫🏗️",
    "answers": [
      "포트나이트",
      "fortnite"
    ],
    "hint": "건설과 배틀로얄이 결합된 게임",
    "difficulty": "easy"
  },
  {
    "id": 58,
    "category": "game",
    "emoji": "👨‍🚀🔪🚀",
    "answers": [
      "어몽어스",
      "어몽 어스",
      "among us"
    ],
    "hint": "우주선 안에서 임포스터를 찾는 게임",
    "difficulty": "easy"
  },
  {
    "id": 59,
    "category": "game",
    "emoji": "🧱🙂🎮",
    "answers": [
      "로블록스",
      "roblox"
    ],
    "hint": "다양한 유저 제작 게임을 즐기는 플랫폼",
    "difficulty": "easy"
  },
  {
    "id": 60,
    "category": "game",
    "emoji": "⚽🎮🏆",
    "answers": [
      "피파",
      "fifa",
      "fc",
      "ea sports fc",
      "이에이 스포츠 fc"
    ],
    "hint": "축구 게임 시리즈",
    "difficulty": "easy"
  },
  {
    "id": 61,
    "category": "game",
    "emoji": "🏠👨‍👩‍👧‍👦💚",
    "answers": [
      "심즈",
      "더심즈",
      "더 심즈",
      "the sims",
      "sims"
    ],
    "hint": "가상 인생을 살아가는 시뮬레이션 게임",
    "difficulty": "easy"
  },
  {
    "id": 62,
    "category": "game",
    "emoji": "🏝️🐶🏡",
    "answers": [
      "동물의숲",
      "동물의 숲",
      "animal crossing"
    ],
    "hint": "섬에서 동물 주민들과 생활하는 게임",
    "difficulty": "easy"
  },
  {
    "id": 63,
    "category": "game",
    "emoji": "🗡️🛡️🧝‍♂️",
    "answers": [
      "젤다",
      "젤다의전설",
      "젤다의 전설",
      "zelda",
      "the legend of zelda"
    ],
    "hint": "링크의 모험으로 유명한 게임 시리즈",
    "difficulty": "easy"
  },
  {
    "id": 64,
    "category": "game",
    "emoji": "🦔💨💍",
    "answers": [
      "소닉",
      "sonic",
      "sonic the hedgehog"
    ],
    "hint": "빠르게 달리는 파란 고슴도치 게임",
    "difficulty": "easy"
  },
  {
    "id": 65,
    "category": "game",
    "emoji": "🧩⬇️🎮",
    "answers": [
      "테트리스",
      "tetris"
    ],
    "hint": "블록을 맞춰 줄을 없애는 퍼즐 게임",
    "difficulty": "easy"
  },
  {
    "id": 66,
    "category": "game",
    "emoji": "👊🔥🎮",
    "answers": [
      "스트리트파이터",
      "스트리트 파이터",
      "street fighter"
    ],
    "hint": "격투 게임의 대표작",
    "difficulty": "easy"
  },
  {
    "id": 67,
    "category": "game",
    "emoji": "🟡👄👻",
    "answers": [
      "팩맨",
      "팩 맨",
      "pacman",
      "pac-man"
    ],
    "hint": "노란 캐릭터가 유령을 피해 점을 먹는 게임",
    "difficulty": "easy"
  },
  {
    "id": 68,
    "category": "game",
    "emoji": "🔫💥🧪",
    "answers": [
      "발로란트",
      "valorant"
    ],
    "hint": "스킬과 총격전이 결합된 5대5 FPS 게임",
    "difficulty": "normal"
  },
  {
    "id": 69,
    "category": "game",
    "emoji": "🌬️⚔️✨",
    "answers": [
      "원신",
      "genshin impact",
      "genshin"
    ],
    "hint": "오픈월드와 원소 전투가 특징인 게임",
    "difficulty": "normal"
  },
  {
    "id": 70,
    "category": "game",
    "emoji": "🛸👽⚔️",
    "answers": [
      "스타크래프트",
      "스타 크래프트",
      "starcraft"
    ],
    "hint": "테란, 저그, 프로토스가 싸우는 전략 게임",
    "difficulty": "normal"
  },
  {
    "id": 71,
    "category": "game",
    "emoji": "🍁⚔️🧙‍♂️",
    "answers": [
      "메이플스토리",
      "메이플 스토리",
      "메이플",
      "maplestory"
    ],
    "hint": "2D 횡스크롤 온라인 RPG",
    "difficulty": "normal"
  },
  {
    "id": 72,
    "category": "game",
    "emoji": "🏎️💨🛞",
    "answers": [
      "카트라이더",
      "카트 라이더",
      "kartrider"
    ],
    "hint": "카트를 타고 아이템전과 스피드전을 하는 게임",
    "difficulty": "normal"
  },
  {
    "id": 73,
    "category": "game",
    "emoji": "🔫🎯💥",
    "answers": [
      "서든어택",
      "서든 어택",
      "서든",
      "sudden attack"
    ],
    "hint": "국내에서 오래 사랑받은 온라인 FPS",
    "difficulty": "normal"
  },
  {
    "id": 74,
    "category": "game",
    "emoji": "🔫🏃‍♂️⚡",
    "answers": [
      "에이펙스레전드",
      "에이펙스 레전드",
      "apex legends",
      "apex"
    ],
    "hint": "개성 있는 레전드들이 싸우는 배틀로얄 FPS",
    "difficulty": "normal"
  },
  {
    "id": 75,
    "category": "game",
    "emoji": "🫘🏃‍♂️👑",
    "answers": [
      "폴가이즈",
      "폴 가이즈",
      "fall guys"
    ],
    "hint": "장애물 코스를 통과하는 파티 게임",
    "difficulty": "normal"
  },
  {
    "id": 76,
    "category": "game",
    "emoji": "⚽🚗🚀",
    "answers": [
      "로켓리그",
      "로켓 리그",
      "rocket league"
    ],
    "hint": "자동차로 축구를 하는 게임",
    "difficulty": "normal"
  },
  {
    "id": 77,
    "category": "game",
    "emoji": "🧟🔫🏚️",
    "answers": [
      "바이오하자드",
      "바이오 해저드",
      "resident evil"
    ],
    "hint": "좀비와 생존 공포로 유명한 시리즈",
    "difficulty": "normal"
  },
  {
    "id": 78,
    "category": "game",
    "emoji": "⚔️💀🔥",
    "answers": [
      "다크소울",
      "다크 소울",
      "dark souls"
    ],
    "hint": "높은 난이도로 유명한 액션 RPG",
    "difficulty": "normal"
  },
  {
    "id": 79,
    "category": "game",
    "emoji": "💍⚔️🌳",
    "answers": [
      "엘든링",
      "엘든 링",
      "elden ring"
    ],
    "hint": "거대한 오픈월드와 보스전이 유명한 게임",
    "difficulty": "normal"
  },
  {
    "id": 80,
    "category": "game",
    "emoji": "🪓👨‍👦⚡",
    "answers": [
      "갓오브워",
      "갓 오브 워",
      "god of war"
    ],
    "hint": "크레토스와 아들이 등장하는 액션 게임",
    "difficulty": "normal"
  },
  {
    "id": 81,
    "category": "game",
    "emoji": "🚗💰🔫",
    "answers": [
      "GTA",
      "gta",
      "그타",
      "grand theft auto"
    ],
    "hint": "오픈월드 범죄 액션 게임",
    "difficulty": "normal"
  },
  {
    "id": 82,
    "category": "game",
    "emoji": "🔫💣👮",
    "answers": [
      "카운터스트라이크",
      "카운터 스트라이크",
      "counter strike",
      "counter-strike",
      "cs"
    ],
    "hint": "폭탄 설치와 해체가 핵심인 FPS",
    "difficulty": "normal"
  },
  {
    "id": 83,
    "category": "game",
    "emoji": "🧙‍♂️🛡️⚔️",
    "answers": [
      "도타2",
      "도타 2",
      "dota2",
      "dota 2"
    ],
    "hint": "영웅을 골라 싸우는 MOBA 게임",
    "difficulty": "normal"
  },
  {
    "id": 84,
    "category": "game",
    "emoji": "🦑🎨🔫",
    "answers": [
      "스플래툰",
      "splatoon"
    ],
    "hint": "잉크를 칠하며 싸우는 닌텐도 슈팅 게임",
    "difficulty": "normal"
  },
  {
    "id": 85,
    "category": "game",
    "emoji": "🐞⚔️🕳️",
    "answers": [
      "할로우나이트",
      "할로우 나이트",
      "hollow knight"
    ],
    "hint": "벌레 왕국을 탐험하는 메트로배니아 게임",
    "difficulty": "hard"
  },
  {
    "id": 86,
    "category": "game",
    "emoji": "🌾🐓💎",
    "answers": [
      "스타듀밸리",
      "스타듀 밸리",
      "stardew valley"
    ],
    "hint": "농장 생활과 마을 교류를 즐기는 게임",
    "difficulty": "hard"
  },
  {
    "id": 87,
    "category": "game",
    "emoji": "❤️🐐💀",
    "answers": [
      "언더테일",
      "undertale"
    ],
    "hint": "몬스터와 대화하거나 싸우는 독특한 RPG",
    "difficulty": "hard"
  },
  {
    "id": 88,
    "category": "game",
    "emoji": "☕👹🎺",
    "answers": [
      "컵헤드",
      "cuphead"
    ],
    "hint": "고전 애니메이션풍 고난도 액션 게임",
    "difficulty": "hard"
  },
  {
    "id": 89,
    "category": "game",
    "emoji": "🔪🏃‍♀️🌙",
    "answers": [
      "데드바이데이라이트",
      "데드 바이 데이라이트",
      "데바데",
      "dead by daylight"
    ],
    "hint": "살인마와 생존자가 벌이는 비대칭 공포 게임",
    "difficulty": "hard"
  },
  {
    "id": 90,
    "category": "game",
    "emoji": "🔥🏛️💀",
    "answers": [
      "하데스",
      "hades"
    ],
    "hint": "그리스 신화를 배경으로 한 로그라이크 게임",
    "difficulty": "hard"
  },
  {
    "id": 91,
    "category": "game",
    "emoji": "🥷🗡️🦾",
    "answers": [
      "세키로",
      "sekiro",
      "sekiro shadows die twice"
    ],
    "hint": "외팔 닌자가 주인공인 고난도 액션 게임",
    "difficulty": "hard"
  },
  {
    "id": 92,
    "category": "game",
    "emoji": "🩸🦇🌕",
    "answers": [
      "블러드본",
      "bloodborne"
    ],
    "hint": "고딕 호러 분위기의 액션 RPG",
    "difficulty": "hard"
  },
  {
    "id": 93,
    "category": "game",
    "emoji": "🎭❤️🃏",
    "answers": [
      "페르소나5",
      "페르소나 5",
      "persona 5"
    ],
    "hint": "괴도단과 마음의 세계가 등장하는 JRPG",
    "difficulty": "hard"
  },
  {
    "id": 94,
    "category": "game",
    "emoji": "🤖🌃💿",
    "answers": [
      "사이버펑크2077",
      "사이버펑크 2077",
      "cyberpunk 2077"
    ],
    "hint": "미래 도시 나이트시티가 배경인 게임",
    "difficulty": "hard"
  },
  {
    "id": 95,
    "category": "game",
    "emoji": "🕵️‍♂️🧠🍷",
    "answers": [
      "디스코엘리시움",
      "디스코 엘리시움",
      "disco elysium"
    ],
    "hint": "기억을 잃은 형사가 사건을 추리하는 RPG",
    "difficulty": "hard"
  },
  {
    "id": 96,
    "category": "game",
    "emoji": "🍄🧟‍♀️👧",
    "answers": [
      "더라스트오브어스",
      "더 라스트 오브 어스",
      "라스트오브어스",
      "the last of us"
    ],
    "hint": "곰팡이 감염 이후의 생존 이야기를 다룬 게임",
    "difficulty": "hard"
  },
  {
    "id": 97,
    "category": "game",
    "emoji": "🌀🔫🧪",
    "answers": [
      "포탈",
      "portal"
    ],
    "hint": "포탈 건으로 퍼즐을 푸는 게임",
    "difficulty": "hard"
  },
  {
    "id": 98,
    "category": "game",
    "emoji": "🌊🏙️💉",
    "answers": [
      "바이오쇼크",
      "bioshock"
    ],
    "hint": "수중 도시와 초능력 주사가 등장하는 FPS",
    "difficulty": "hard"
  },
  {
    "id": 99,
    "category": "game",
    "emoji": "🌫️🏚️🔦",
    "answers": [
      "사일런트힐",
      "사일런트 힐",
      "silent hill"
    ],
    "hint": "안개 낀 마을을 배경으로 한 공포 게임",
    "difficulty": "hard"
  },
  {
    "id": 100,
    "category": "game",
    "emoji": "🐉⚔️🍖",
    "answers": [
      "몬스터헌터",
      "몬스터 헌터",
      "몬헌",
      "monster hunter"
    ],
    "hint": "거대한 몬스터를 사냥하고 장비를 만드는 게임",
    "difficulty": "hard"
  },
  {
    "id": 101,
    "category": "anime",
    "emoji": "🏴‍☠️👒🌊",
    "answers": [
      "원피스",
      "one piece"
    ],
    "hint": "밀짚모자 해적단의 모험",
    "difficulty": "easy"
  },
  {
    "id": 102,
    "category": "anime",
    "emoji": "🥷🍥🦊",
    "answers": [
      "나루토",
      "naruto"
    ],
    "hint": "닌자와 구미호가 중요한 애니",
    "difficulty": "easy"
  },
  {
    "id": 103,
    "category": "anime",
    "emoji": "🐉⭐🥋",
    "answers": [
      "드래곤볼",
      "드래곤 볼",
      "dragon ball"
    ],
    "hint": "드래곤볼을 모으고 강자들과 싸우는 애니",
    "difficulty": "easy"
  },
  {
    "id": 104,
    "category": "anime",
    "emoji": "⚔️👺🌸",
    "answers": [
      "귀멸의칼날",
      "귀멸의 칼날",
      "demon slayer"
    ],
    "hint": "도깨비와 싸우는 검사 이야기",
    "difficulty": "easy"
  },
  {
    "id": 105,
    "category": "anime",
    "emoji": "🧱👹⚔️",
    "answers": [
      "진격의거인",
      "진격의 거인",
      "attack on titan"
    ],
    "hint": "벽과 거인이 핵심인 애니",
    "difficulty": "easy"
  },
  {
    "id": 106,
    "category": "anime",
    "emoji": "🕵️‍♂️👓⚽",
    "answers": [
      "명탐정코난",
      "명탐정 코난",
      "코난",
      "detective conan",
      "case closed"
    ],
    "hint": "몸이 작아진 천재 탐정",
    "difficulty": "easy"
  },
  {
    "id": 107,
    "category": "anime",
    "emoji": "⚡🐭🔴",
    "answers": [
      "포켓몬스터",
      "포켓몬",
      "pokemon",
      "pokémon"
    ],
    "hint": "피카츄와 함께하는 모험",
    "difficulty": "easy"
  },
  {
    "id": 108,
    "category": "anime",
    "emoji": "🐱🤖🚪",
    "answers": [
      "도라에몽",
      "doraemon"
    ],
    "hint": "미래에서 온 고양이형 로봇",
    "difficulty": "easy"
  },
  {
    "id": 109,
    "category": "anime",
    "emoji": "👦🩲🖍️",
    "answers": [
      "짱구",
      "짱구는못말려",
      "짱구는 못말려",
      "crayon shinchan",
      "shinchan"
    ],
    "hint": "엉뚱한 유치원생이 주인공인 애니",
    "difficulty": "easy"
  },
  {
    "id": 110,
    "category": "anime",
    "emoji": "🏀🔥⛹️",
    "answers": [
      "슬램덩크",
      "슬램 덩크",
      "slam dunk"
    ],
    "hint": "농구부와 뜨거운 경기로 유명한 애니",
    "difficulty": "easy"
  },
  {
    "id": 111,
    "category": "anime",
    "emoji": "🏐🦅🔥",
    "answers": [
      "하이큐",
      "하이큐!!",
      "haikyuu",
      "haikyu"
    ],
    "hint": "고교 배구부의 성장 이야기",
    "difficulty": "easy"
  },
  {
    "id": 112,
    "category": "anime",
    "emoji": "🦸‍♂️🏫💥",
    "answers": [
      "나의히어로아카데미아",
      "나의 히어로 아카데미아",
      "히로아카",
      "my hero academia"
    ],
    "hint": "히어로 학교가 배경인 애니",
    "difficulty": "easy"
  },
  {
    "id": 113,
    "category": "anime",
    "emoji": "👻🧙‍♂️⚔️",
    "answers": [
      "주술회전",
      "jujutsu kaisen"
    ],
    "hint": "저주와 주술사가 등장하는 애니",
    "difficulty": "easy"
  },
  {
    "id": 114,
    "category": "anime",
    "emoji": "🕵️‍♂️👨‍👩‍👧🥜",
    "answers": [
      "스파이패밀리",
      "스파이 패밀리",
      "spy x family",
      "spy family"
    ],
    "hint": "스파이, 암살자, 초능력자가 가족이 되는 이야기",
    "difficulty": "easy"
  },
  {
    "id": 115,
    "category": "anime",
    "emoji": "🪚👨🩸",
    "answers": [
      "체인소맨",
      "체인소 맨",
      "chainsaw man"
    ],
    "hint": "전기톱 악마의 힘을 가진 주인공",
    "difficulty": "easy"
  },
  {
    "id": 116,
    "category": "anime",
    "emoji": "📓💀✍️",
    "answers": [
      "데스노트",
      "데스 노트",
      "death note"
    ],
    "hint": "이름을 쓰면 사람이 죽는 노트",
    "difficulty": "easy"
  },
  {
    "id": 117,
    "category": "anime",
    "emoji": "🌙👧✨",
    "answers": [
      "세일러문",
      "세일러 문",
      "sailor moon"
    ],
    "hint": "달의 힘으로 변신하는 마법소녀",
    "difficulty": "easy"
  },
  {
    "id": 118,
    "category": "anime",
    "emoji": "🌠👫🔄",
    "answers": [
      "너의이름은",
      "너의 이름은",
      "your name",
      "kimi no na wa"
    ],
    "hint": "몸이 바뀌는 두 학생의 이야기",
    "difficulty": "normal"
  },
  {
    "id": 119,
    "category": "anime",
    "emoji": "👧🐉🏮",
    "answers": [
      "센과치히로의행방불명",
      "센과 치히로의 행방불명",
      "spirited away"
    ],
    "hint": "신들의 세계에 들어간 소녀 이야기",
    "difficulty": "normal"
  },
  {
    "id": 120,
    "category": "anime",
    "emoji": "🌳🐰☂️",
    "answers": [
      "이웃집토토로",
      "이웃집 토토로",
      "토토로",
      "my neighbor totoro",
      "totoro"
    ],
    "hint": "숲의 정령과 우산 장면이 유명한 작품",
    "difficulty": "normal"
  },
  {
    "id": 121,
    "category": "anime",
    "emoji": "🏰🔥🧙‍♂️",
    "answers": [
      "하울의움직이는성",
      "하울의 움직이는 성",
      "howl's moving castle",
      "howls moving castle"
    ],
    "hint": "움직이는 성과 불꽃 악마가 등장하는 작품",
    "difficulty": "normal"
  },
  {
    "id": 122,
    "category": "anime",
    "emoji": "🤖🧒⚠️",
    "answers": [
      "에반게리온",
      "evangelion",
      "neon genesis evangelion"
    ],
    "hint": "거대 로봇과 소년 파일럿이 나오는 애니",
    "difficulty": "normal"
  },
  {
    "id": 123,
    "category": "anime",
    "emoji": "⚗️🦾👬",
    "answers": [
      "강철의연금술사",
      "강철의 연금술사",
      "fullmetal alchemist"
    ],
    "hint": "연금술과 형제의 여정을 다룬 애니",
    "difficulty": "normal"
  },
  {
    "id": 124,
    "category": "anime",
    "emoji": "🎣👦⚡",
    "answers": [
      "헌터헌터",
      "헌터x헌터",
      "헌터 헌터",
      "hunter x hunter",
      "hunter hunter"
    ],
    "hint": "헌터 시험과 모험이 시작되는 애니",
    "difficulty": "normal"
  },
  {
    "id": 125,
    "category": "anime",
    "emoji": "⚔️👻🧡",
    "answers": [
      "블리치",
      "bleach"
    ],
    "hint": "사신과 영혼 세계가 나오는 애니",
    "difficulty": "normal"
  },
  {
    "id": 126,
    "category": "anime",
    "emoji": "☕👹🩸",
    "answers": [
      "도쿄구울",
      "도쿄 구울",
      "tokyo ghoul"
    ],
    "hint": "구울과 인간 사이에서 갈등하는 이야기",
    "difficulty": "normal"
  },
  {
    "id": 127,
    "category": "anime",
    "emoji": "⚽🔒🔥",
    "answers": [
      "블루록",
      "블루 록",
      "blue lock"
    ],
    "hint": "스트라이커 육성 프로젝트를 다룬 축구 애니",
    "difficulty": "normal"
  },
  {
    "id": 128,
    "category": "anime",
    "emoji": "🍀📖🧙‍♂️",
    "answers": [
      "블랙클로버",
      "블랙 클로버",
      "black clover"
    ],
    "hint": "마법이 전부인 세계의 소년 이야기",
    "difficulty": "normal"
  },
  {
    "id": 129,
    "category": "anime",
    "emoji": "🧚‍♀️🔥🐱",
    "answers": [
      "페어리테일",
      "페어리 테일",
      "fairy tail"
    ],
    "hint": "마도사 길드의 모험을 그린 애니",
    "difficulty": "normal"
  },
  {
    "id": 130,
    "category": "anime",
    "emoji": "🗡️🎮🌐",
    "answers": [
      "소드아트온라인",
      "소드 아트 온라인",
      "sao",
      "sword art online"
    ],
    "hint": "가상현실 게임에 갇힌 사람들의 이야기",
    "difficulty": "normal"
  },
  {
    "id": 131,
    "category": "anime",
    "emoji": "🔁💀❄️",
    "answers": [
      "리제로",
      "re zero",
      "rezero",
      "re:zero",
      "re:제로"
    ],
    "hint": "죽으면 다시 시작하는 이세계 애니",
    "difficulty": "normal"
  },
  {
    "id": 132,
    "category": "anime",
    "emoji": "🎸🎀🏫",
    "answers": [
      "케이온",
      "케이온!",
      "k-on",
      "k on"
    ],
    "hint": "학교 밴드부 소녀들의 일상 애니",
    "difficulty": "normal"
  },
  {
    "id": 133,
    "category": "anime",
    "emoji": "🎤👧✨",
    "answers": [
      "러브라이브",
      "러브 라이브",
      "love live"
    ],
    "hint": "스쿨 아이돌을 주제로 한 애니",
    "difficulty": "normal"
  },
  {
    "id": 134,
    "category": "anime",
    "emoji": "🐙🏫🔫",
    "answers": [
      "암살교실",
      "암살 교실",
      "assassination classroom"
    ],
    "hint": "특이한 선생님을 암살해야 하는 반 이야기",
    "difficulty": "normal"
  },
  {
    "id": 135,
    "category": "anime",
    "emoji": "🚀🎷🤠",
    "answers": [
      "카우보이비밥",
      "카우보이 비밥",
      "cowboy bebop"
    ],
    "hint": "우주 현상금 사냥꾼과 재즈 분위기의 애니",
    "difficulty": "hard"
  },
  {
    "id": 136,
    "category": "anime",
    "emoji": "👑👁️♟️",
    "answers": [
      "코드기어스",
      "코드 기어스",
      "code geass"
    ],
    "hint": "특별한 눈의 힘과 반역이 핵심인 애니",
    "difficulty": "hard"
  },
  {
    "id": 137,
    "category": "anime",
    "emoji": "⏰🍌🧪",
    "answers": [
      "슈타인즈게이트",
      "슈타인즈 게이트",
      "steins gate",
      "steins;gate"
    ],
    "hint": "시간여행과 실험이 중요한 애니",
    "difficulty": "hard"
  },
  {
    "id": 138,
    "category": "anime",
    "emoji": "✉️🤖🌸",
    "answers": [
      "바이올렛에버가든",
      "바이올렛 에버가든",
      "violet evergarden"
    ],
    "hint": "편지를 쓰며 감정을 배워가는 이야기",
    "difficulty": "hard"
  },
  {
    "id": 139,
    "category": "anime",
    "emoji": "🕳️👧🤖",
    "answers": [
      "메이드인어비스",
      "메이드 인 어비스",
      "made in abyss"
    ],
    "hint": "거대한 구멍을 탐험하는 어두운 판타지",
    "difficulty": "hard"
  },
  {
    "id": 140,
    "category": "anime",
    "emoji": "🧠💯👻",
    "answers": [
      "모브사이코100",
      "모브 사이코 100",
      "mob psycho 100"
    ],
    "hint": "초능력을 가진 소년과 영혼 이야기",
    "difficulty": "hard"
  },
  {
    "id": 141,
    "category": "anime",
    "emoji": "⚔️🍓👽",
    "answers": [
      "은혼",
      "gintama"
    ],
    "hint": "사무라이와 외계인이 섞인 개그 액션 애니",
    "difficulty": "hard"
  },
  {
    "id": 142,
    "category": "anime",
    "emoji": "🦁♟️🌸",
    "answers": [
      "3월의라이온",
      "3월의 라이온",
      "삼월의라이온",
      "march comes in like a lion"
    ],
    "hint": "장기와 성장통을 다룬 잔잔한 작품",
    "difficulty": "hard"
  },
  {
    "id": 143,
    "category": "anime",
    "emoji": "🏠👧👦🚪",
    "answers": [
      "약속의네버랜드",
      "약속의 네버랜드",
      "the promised neverland",
      "promised neverland"
    ],
    "hint": "고아원에 숨겨진 비밀을 다룬 애니",
    "difficulty": "hard"
  },
  {
    "id": 144,
    "category": "anime",
    "emoji": "🖐️👽🩸",
    "answers": [
      "기생수",
      "기생수 세이의 격률",
      "parasyte"
    ],
    "hint": "손에 기생한 생명체와 공존하는 이야기",
    "difficulty": "hard"
  },
  {
    "id": 145,
    "category": "anime",
    "emoji": "🏍️💊💥",
    "answers": [
      "아키라",
      "akira"
    ],
    "hint": "오토바이와 폭주하는 힘으로 유명한 사이버펑크 애니",
    "difficulty": "hard"
  },
  {
    "id": 146,
    "category": "anime",
    "emoji": "🧠🔫⚖️",
    "answers": [
      "사이코패스",
      "사이코 패스",
      "psycho pass",
      "psycho-pass"
    ],
    "hint": "범죄 계수를 측정하는 미래 사회 애니",
    "difficulty": "hard"
  },
  {
    "id": 147,
    "category": "anime",
    "emoji": "🗡️🩸🌑",
    "answers": [
      "베르세르크",
      "berserk"
    ],
    "hint": "검은 검사와 어두운 판타지 세계",
    "difficulty": "hard"
  },
  {
    "id": 148,
    "category": "anime",
    "emoji": "🐛🌿👁️",
    "answers": [
      "충사",
      "mushishi"
    ],
    "hint": "벌레 같은 존재와 인간의 이야기를 다룬 작품",
    "difficulty": "hard"
  },
  {
    "id": 149,
    "category": "anime",
    "emoji": "🎸🚬👭",
    "answers": [
      "나나",
      "nana"
    ],
    "hint": "같은 이름의 두 여성이 만나는 음악 드라마",
    "difficulty": "hard"
  },
  {
    "id": 150,
    "category": "anime",
    "emoji": "🎀🪄💔",
    "answers": [
      "마법소녀마도카마기카",
      "마법소녀 마도카 마기카",
      "마마마",
      "madoka magica"
    ],
    "hint": "마법소녀 장르를 비튼 어두운 작품",
    "difficulty": "hard"
  },
  {
    "id": 151,
    "category": "school",
    "emoji": "🎒🏫🚶",
    "answers": [
      "등교",
      "학교가기",
      "학교 가기"
    ],
    "hint": "아침에 학교로 가는 것",
    "difficulty": "easy"
  },
  {
    "id": 152,
    "category": "school",
    "emoji": "🏫➡️🏠",
    "answers": [
      "하교",
      "집가기",
      "집 가기"
    ],
    "hint": "수업이 끝나고 집으로 가는 것",
    "difficulty": "easy"
  },
  {
    "id": 153,
    "category": "school",
    "emoji": "⏰🏃‍♂️💨",
    "answers": [
      "지각",
      "늦음",
      "late"
    ],
    "hint": "시간에 늦어서 뛰어가는 상황",
    "difficulty": "easy"
  },
  {
    "id": 154,
    "category": "school",
    "emoji": "📚😭☕",
    "answers": [
      "시험기간",
      "시험 기간"
    ],
    "hint": "공부와 카페인이 늘어나는 시기",
    "difficulty": "easy"
  },
  {
    "id": 155,
    "category": "school",
    "emoji": "📝🏠😵",
    "answers": [
      "숙제",
      "homework"
    ],
    "hint": "집에서 해야 하는 학교 과제",
    "difficulty": "easy"
  },
  {
    "id": 156,
    "category": "school",
    "emoji": "💻📄😫",
    "answers": [
      "과제",
      "assignment"
    ],
    "hint": "제출해야 하는 리포트나 작업",
    "difficulty": "easy"
  },
  {
    "id": 157,
    "category": "school",
    "emoji": "🍚🥄🏫",
    "answers": [
      "급식",
      "학교급식",
      "학교 급식"
    ],
    "hint": "학교에서 먹는 밥",
    "difficulty": "easy"
  },
  {
    "id": 158,
    "category": "school",
    "emoji": "⚽👟🏫",
    "answers": [
      "체육시간",
      "체육 시간",
      "체육"
    ],
    "hint": "운동장에서 몸을 움직이는 수업",
    "difficulty": "easy"
  },
  {
    "id": 159,
    "category": "school",
    "emoji": "🔔😆🏃‍♂️",
    "answers": [
      "쉬는시간",
      "쉬는 시간",
      "break time"
    ],
    "hint": "수업 사이의 짧은 자유 시간",
    "difficulty": "easy"
  },
  {
    "id": 160,
    "category": "school",
    "emoji": "🍱⏰😋",
    "answers": [
      "점심시간",
      "점심 시간",
      "lunch time"
    ],
    "hint": "밥 먹는 시간",
    "difficulty": "easy"
  },
  {
    "id": 161,
    "category": "school",
    "emoji": "👔🎒🏫",
    "answers": [
      "교복",
      "school uniform"
    ],
    "hint": "학교에서 입는 옷",
    "difficulty": "easy"
  },
  {
    "id": 162,
    "category": "school",
    "emoji": "📢👑🏫",
    "answers": [
      "반장",
      "class president"
    ],
    "hint": "반을 대표하는 학생",
    "difficulty": "easy"
  },
  {
    "id": 163,
    "category": "school",
    "emoji": "➗📐😵",
    "answers": [
      "수학시간",
      "수학 시간",
      "수학"
    ],
    "hint": "계산과 공식을 배우는 시간",
    "difficulty": "easy"
  },
  {
    "id": 164,
    "category": "school",
    "emoji": "🔤📖🇬🇧",
    "answers": [
      "영어시간",
      "영어 시간",
      "영어"
    ],
    "hint": "영어를 배우는 수업",
    "difficulty": "easy"
  },
  {
    "id": 165,
    "category": "school",
    "emoji": "🧪🥼🔥",
    "answers": [
      "과학실험",
      "과학 실험",
      "실험"
    ],
    "hint": "실험복과 약품이 떠오르는 수업 활동",
    "difficulty": "easy"
  },
  {
    "id": 166,
    "category": "school",
    "emoji": "🎤🎪🏫",
    "answers": [
      "학교축제",
      "학교 축제",
      "축제"
    ],
    "hint": "무대와 부스가 있는 학교 행사",
    "difficulty": "easy"
  },
  {
    "id": 167,
    "category": "school",
    "emoji": "🎓😭🌸",
    "answers": [
      "졸업식",
      "graduation"
    ],
    "hint": "학교를 떠나는 마지막 행사",
    "difficulty": "easy"
  },
  {
    "id": 168,
    "category": "school",
    "emoji": "🌙📚🏫",
    "answers": [
      "야자",
      "야간자율학습",
      "야간 자율 학습"
    ],
    "hint": "밤까지 학교에 남아 공부하는 것",
    "difficulty": "normal"
  },
  {
    "id": 169,
    "category": "school",
    "emoji": "📝⏱️😰",
    "answers": [
      "모의고사",
      "mock exam"
    ],
    "hint": "실전처럼 보는 큰 시험",
    "difficulty": "normal"
  },
  {
    "id": 170,
    "category": "school",
    "emoji": "🎤📊😵",
    "answers": [
      "수행평가",
      "수행 평가"
    ],
    "hint": "발표, 실습, 보고서 등으로 평가받는 것",
    "difficulty": "normal"
  },
  {
    "id": 171,
    "category": "school",
    "emoji": "👥💻😤",
    "answers": [
      "조별과제",
      "조별 과제",
      "팀플",
      "팀프로젝트",
      "팀 프로젝트"
    ],
    "hint": "여럿이 함께 해야 하는 과제",
    "difficulty": "normal"
  },
  {
    "id": 172,
    "category": "school",
    "emoji": "🎤🧑‍🏫😳",
    "answers": [
      "발표",
      "presentation"
    ],
    "hint": "앞에 나가 말해야 하는 상황",
    "difficulty": "normal"
  },
  {
    "id": 173,
    "category": "school",
    "emoji": "📚✏️🌙",
    "answers": [
      "시험공부",
      "시험 공부"
    ],
    "hint": "시험을 위해 밤늦게까지 공부하는 것",
    "difficulty": "normal"
  },
  {
    "id": 174,
    "category": "school",
    "emoji": "⚡📚☕",
    "answers": [
      "벼락치기",
      "cramming"
    ],
    "hint": "시험 직전에 몰아서 공부하는 것",
    "difficulty": "normal"
  },
  {
    "id": 175,
    "category": "school",
    "emoji": "💤📖😴",
    "answers": [
      "수업중졸기",
      "수업 중 졸기",
      "졸기"
    ],
    "hint": "수업 시간에 몰래 잠드는 상황",
    "difficulty": "normal"
  },
  {
    "id": 176,
    "category": "school",
    "emoji": "📝⬛📚",
    "answers": [
      "필기",
      "칠판필기",
      "칠판 필기",
      "노트필기",
      "노트 필기"
    ],
    "hint": "선생님이 적은 내용을 따라 적는 것",
    "difficulty": "normal"
  },
  {
    "id": 177,
    "category": "school",
    "emoji": "🧑‍🏫📢🚪",
    "answers": [
      "교무실호출",
      "교무실 호출"
    ],
    "hint": "선생님이 교무실로 부르는 상황",
    "difficulty": "normal"
  },
  {
    "id": 178,
    "category": "school",
    "emoji": "⚠️📄😨",
    "answers": [
      "벌점",
      "penalty point"
    ],
    "hint": "규칙을 어겼을 때 받는 점수",
    "difficulty": "normal"
  },
  {
    "id": 179,
    "category": "school",
    "emoji": "➕📚🏫",
    "answers": [
      "보충수업",
      "보충 수업",
      "보충"
    ],
    "hint": "부족한 공부를 추가로 하는 수업",
    "difficulty": "normal"
  },
  {
    "id": 180,
    "category": "school",
    "emoji": "🤫📚✏️",
    "answers": [
      "자습시간",
      "자습 시간",
      "자습"
    ],
    "hint": "조용히 스스로 공부하는 시간",
    "difficulty": "normal"
  },
  {
    "id": 181,
    "category": "school",
    "emoji": "🗄️🎒🔑",
    "answers": [
      "사물함",
      "locker"
    ],
    "hint": "책과 가방을 넣어두는 개인 보관함",
    "difficulty": "normal"
  },
  {
    "id": 182,
    "category": "school",
    "emoji": "🪑🔄👥",
    "answers": [
      "자리바꾸기",
      "자리 바꾸기",
      "자리변경",
      "자리 변경"
    ],
    "hint": "교실 좌석을 새로 정하는 일",
    "difficulty": "normal"
  },
  {
    "id": 183,
    "category": "school",
    "emoji": "🍚🚶‍♂️🚶‍♀️",
    "answers": [
      "급식줄",
      "급식 줄",
      "배식줄",
      "배식 줄"
    ],
    "hint": "급식을 받기 위해 서는 줄",
    "difficulty": "normal"
  },
  {
    "id": 184,
    "category": "school",
    "emoji": "🏃‍♂️🏆🏫",
    "answers": [
      "체육대회",
      "체육 대회",
      "sports day"
    ],
    "hint": "반 대항으로 운동 경기를 하는 행사",
    "difficulty": "normal"
  },
  {
    "id": 185,
    "category": "school",
    "emoji": "👮‍♂️🏫📋",
    "answers": [
      "선도부",
      "student guidance"
    ],
    "hint": "복장이나 규칙을 확인하는 학생 조직",
    "difficulty": "hard"
  },
  {
    "id": 186,
    "category": "school",
    "emoji": "📄🧑‍🎓⭐",
    "answers": [
      "생기부",
      "생활기록부",
      "생활 기록부"
    ],
    "hint": "학교생활 기록이 담기는 문서",
    "difficulty": "hard"
  },
  {
    "id": 187,
    "category": "school",
    "emoji": "📊📚🔥",
    "answers": [
      "내신관리",
      "내신 관리"
    ],
    "hint": "학교 성적을 꾸준히 챙기는 것",
    "difficulty": "hard"
  },
  {
    "id": 188,
    "category": "school",
    "emoji": "🏫👥🎲",
    "answers": [
      "반배정",
      "반 배정"
    ],
    "hint": "새 학년에 어느 반이 될지 정해지는 일",
    "difficulty": "hard"
  },
  {
    "id": 189,
    "category": "school",
    "emoji": "📝📚😱",
    "answers": [
      "중간고사",
      "중간 고사",
      "midterm"
    ],
    "hint": "학기 중간에 보는 큰 시험",
    "difficulty": "hard"
  },
  {
    "id": 190,
    "category": "school",
    "emoji": "📝📚💀",
    "answers": [
      "기말고사",
      "기말 고사",
      "final exam"
    ],
    "hint": "학기 끝에 보는 큰 시험",
    "difficulty": "hard"
  },
  {
    "id": 191,
    "category": "school",
    "emoji": "📚🤫💡",
    "answers": [
      "독서실",
      "study room"
    ],
    "hint": "조용히 공부하는 공간",
    "difficulty": "hard"
  },
  {
    "id": 192,
    "category": "school",
    "emoji": "🏫➡️🏢➡️🏠",
    "answers": [
      "학원뺑뺑이",
      "학원 뺑뺑이",
      "학원순회",
      "학원 순회"
    ],
    "hint": "학교 뒤에 여러 학원을 도는 생활",
    "difficulty": "hard"
  },
  {
    "id": 193,
    "category": "school",
    "emoji": "📖✏️😈",
    "answers": [
      "교과서낙서",
      "교과서 낙서",
      "낙서"
    ],
    "hint": "책에 몰래 그림이나 글을 그리는 것",
    "difficulty": "hard"
  },
  {
    "id": 194,
    "category": "school",
    "emoji": "📸👥🏫",
    "answers": [
      "단체사진",
      "단체 사진",
      "class photo"
    ],
    "hint": "반 친구들과 함께 찍는 사진",
    "difficulty": "hard"
  },
  {
    "id": 195,
    "category": "school",
    "emoji": "🎒🪑🤫",
    "answers": [
      "자리맡기",
      "자리 맡기"
    ],
    "hint": "가방으로 자리를 미리 잡아두는 행동",
    "difficulty": "hard"
  },
  {
    "id": 196,
    "category": "school",
    "emoji": "🍚📋👀",
    "answers": [
      "급식메뉴확인",
      "급식 메뉴 확인",
      "급식표보기",
      "급식표 보기"
    ],
    "hint": "오늘 급식이 뭔지 보는 행동",
    "difficulty": "hard"
  },
  {
    "id": 197,
    "category": "school",
    "emoji": "📝📚📏",
    "answers": [
      "시험범위",
      "시험 범위"
    ],
    "hint": "시험에 나오는 페이지와 단원",
    "difficulty": "hard"
  },
  {
    "id": 198,
    "category": "school",
    "emoji": "📊😭📄",
    "answers": [
      "성적표",
      "report card"
    ],
    "hint": "시험 결과와 등급이 적힌 종이",
    "difficulty": "hard"
  },
  {
    "id": 199,
    "category": "school",
    "emoji": "🏥🛏️🤒",
    "answers": [
      "보건실",
      "nurse's office",
      "nurse office"
    ],
    "hint": "아플 때 쉬러 가는 학교 공간",
    "difficulty": "hard"
  },
  {
    "id": 200,
    "category": "school",
    "emoji": "🏫👻🌙",
    "answers": [
      "학교괴담",
      "학교 괴담",
      "school ghost story"
    ],
    "hint": "밤의 학교에서 떠도는 무서운 이야기",
    "difficulty": "hard"
  }
];

let selectedCategory = "random";
let selectedDifficulty = "all";
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
const soloDifficultyList = document.querySelector("#solo-difficulty-list");
const categoryList = document.querySelector("#category-list");
const categoryStatusText = document.querySelector("#category-status-text");
const categoryLabel = document.querySelector("#category-label");
const difficultyLabel = document.querySelector("#difficulty-label");
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

function getDifficultyText(difficulty) {
  const labels = {
    easy: "쉬움",
    normal: "보통",
    hard: "어려움",
  };

  return labels[difficulty] || "보통";
}

function getEnabledCategoryIds() {
  return categories
    .filter((category) => !category.disabled && category.id !== "random")
    .map((category) => category.id);
}

function getQuestionsByCategory(categoryId) {
  if (categoryId === "random") {
    const enabledCategoryIds = getEnabledCategoryIds();
    return quizData.filter((quiz) => enabledCategoryIds.includes(quiz.category));
  }

  const category = categories.find((item) => item.id === categoryId);
  if (category?.disabled) {
    return [];
  }

  return quizData.filter((quiz) => quiz.category === categoryId);
}

function getQuestionsByCategoryAndDifficulty(categoryId, difficultyId = "all") {
  let source = getQuestionsByCategory(categoryId);

  if (difficultyId !== "all") {
    source = source.filter((quiz) => quiz.difficulty === difficultyId);
  }

  return source;
}

function updateSoloDifficultyUI() {
  document.querySelectorAll(".difficulty-option-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.difficulty === selectedDifficulty);
  });
}

function buildSoloDifficultyButtons() {
  if (!soloDifficultyList) return;

  soloDifficultyList.innerHTML = difficulties.map((difficulty) => `
    <button class="difficulty-option-btn" data-difficulty="${difficulty.id}" type="button">
      ${difficulty.name}
    </button>
  `).join("");

  document.querySelectorAll(".difficulty-option-btn").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDifficulty = button.dataset.difficulty || "all";
      updateSoloDifficultyUI();
      buildCategoryButtons();

      if (categoryStatusText) {
        categoryStatusText.textContent = "";
        categoryStatusText.className = "status-text";
      }
    });
  });

  updateSoloDifficultyUI();
}

function buildCategoryButtons() {
  categoryList.innerHTML = categories.map((category) => {
    const count = getQuestionsByCategoryAndDifficulty(category.id, selectedDifficulty).length;
    const disabledClass = category.disabled ? " disabled-category" : "";
    const countText = category.disabled ? "준비중" : `문제 ${count}개`;
    return `
      <button class="category-btn${disabledClass}" data-category="${category.id}" type="button">
        <span class="icon">${category.icon}</span>
        <span class="name">${category.name}</span>
        <span class="count${category.disabled ? " coming-soon" : ""}">${countText}</span>
      </button>
    `;
  }).join("");

  document.querySelectorAll(".category-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const category = categories.find((item) => item.id === button.dataset.category);

      if (category?.disabled) {
        if (categoryStatusText) {
          categoryStatusText.textContent = `${category.name} 카테고리는 준비중입니다.`;
          categoryStatusText.className = "status-text error";
        }
        return;
      }

      if (categoryStatusText) {
        categoryStatusText.textContent = "";
        categoryStatusText.className = "status-text";
      }

      startGame(button.dataset.category, "category-screen");
    });
  });
}

function startGame(categoryId = "random", previousScreen = "home-screen") {
  const nextQuestions = shuffle(
    getQuestionsByCategoryAndDifficulty(categoryId, selectedDifficulty)
  ).slice(0, QUESTION_LIMIT);

  if (!nextQuestions.length) {
    if (categoryStatusText) {
      categoryStatusText.textContent = "선택한 조건에 맞는 문제가 없습니다.";
      categoryStatusText.className = "status-text error";
    }
    showScreen(previousScreen);
    return;
  }

  previousSoloScreen = previousScreen;
  selectedCategory = categoryId;
  questions = nextQuestions;
  currentIndex = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  showScreen("quiz-screen");
  renderQuestion();
}

function renderQuestion() {
  const currentQuestion = questions[currentIndex];
  const actualCategoryName = getCategoryName(currentQuestion.category);
  hintUsed = false;
  answered = false;

  categoryLabel.textContent = selectedCategory === "random"
    ? `랜덤 · ${actualCategoryName}`
    : getCategoryName(selectedCategory);
  if (difficultyLabel) {
    difficultyLabel.textContent = getDifficultyText(currentQuestion.difficulty);
    difficultyLabel.className = `difficulty-label ${currentQuestion.difficulty || "normal"}`;
  }
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
  document.querySelector("#category-open-btn").addEventListener("click", () => {
    if (categoryStatusText) {
      categoryStatusText.textContent = "";
      categoryStatusText.className = "status-text";
    }
    showScreen("category-screen");
  });
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
  buildSoloDifficultyButtons();
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
