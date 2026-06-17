# 이게 뭔데? Emoji Quiz

이모지 조합을 보고 영화, 게임, 애니/웹툰, 학교생활을 맞히는 초간단 모바일 웹 퀴즈 게임입니다.

## 친구 테스트 빠른 시작

1. GitHub Pages 링크에 접속한다.
2. 먼저 혼자 플레이를 1판 진행한다.
3. `친구랑 같이하기`를 누른다.
4. 닉네임을 입력하고 방을 만든다.
5. `초대 링크 복사`를 눌러 친구에게 보낸다.
6. 친구는 링크로 접속한 뒤 닉네임을 입력하고 방에 참가한다.
7. 방장이 카테고리와 난이도를 선택하고 게임을 시작한다.
8. 먼저 정답을 맞힌 사람만 점수를 얻는지 확인한다.
9. 문제가 생기면 `게임 방법 > 버그 리포트 복사`를 눌러 내용을 공유한다.

## 실행 방법

1. `index.html` 파일을 브라우저로 엽니다.
2. `랜덤으로 시작` 또는 `카테고리 선택`을 누릅니다.
3. 이모지를 보고 정답을 입력합니다.

## 현재 구현된 기능

- 시작 화면
- 카테고리 선택
- 랜덤 문제 출제
- 정답 입력/판정
- 힌트 보기
- 정답 보기
- 점수 계산
- 결과 화면
- localStorage 최고 점수 저장
- 모바일 반응형 UI
- 난이도 선택

## 문제 데이터

- 총 200개 문제 적용
- 현재 활성 카테고리: 영화, 게임, 애니/웹툰, 학교생활
- 상황/밈 카테고리는 준비중
- 랜덤 모드에서는 현재 출제 중인 문제의 실제 카테고리가 표시됨
- 난이도: 전체, 쉬움, 보통, 어려움
- 싱글 플레이와 멀티플레이 모두 난이도 선택 가능
- 멀티플레이에서는 방장만 대기방에서 난이도를 변경할 수 있음

## 파일 구조

```text
emoji-quiz/
 ├─ index.html
 ├─ style.css
 ├─ script.js
 └─ README.md
```

## 배포

GitHub Pages에 올리면 무료 웹게임으로 바로 배포할 수 있습니다.

## GitHub Pages 배포 확인

1. GitHub 저장소의 Actions 또는 Pages 설정에서 최신 배포가 끝났는지 확인한다.
2. 배포 링크에 접속한다.
3. 메인 화면에서 버전이 최신인지 확인한다.
4. 이전 화면이 보이면 강력 새로고침한다.
5. 그래도 이전 화면이면 Service Worker를 삭제한다.

## 버전 확인 및 업데이트

앱 메인 화면에서 현재 버전을 확인할 수 있다.

PWA 또는 브라우저 캐시 때문에 이전 버전이 보이면:

1. 게임 방법 화면으로 이동
2. `최신 버전으로 업데이트` 버튼 클릭
3. 페이지가 자동 새로고침될 때까지 대기

그래도 이전 화면이 보이면 브라우저 개발자도구에서 Service Worker를 삭제한다.

## Firebase 멀티플레이 설정

1. Firebase 콘솔에서 프로젝트 생성
2. Realtime Database 생성
3. 앱 추가
4. Firebase SDK 설정값 복사
5. `firebase-config.example.js`를 복사해서 `firebase-config.js` 생성
6. `firebase-config.js` 안의 값을 본인 프로젝트 값으로 교체
7. GitHub Pages에 배포 후 친구와 방 코드로 테스트

주의:
현재 멀티플레이는 Firebase 설정이 있어야 동작합니다.
Firebase 설정이 없어도 싱글 플레이는 정상 작동해야 합니다.

## Firebase 필수 설정 체크리스트

멀티플레이 테스트 전 아래 항목을 확인한다.

- Firebase Web App이 생성되어 있어야 한다.
- `firebase-config.js`가 GitHub Pages에 포함되어 있어야 한다.
- Realtime Database가 생성되어 있어야 한다.
- Authentication > Sign-in method > Anonymous가 Enabled 상태여야 한다.
- Realtime Database Rules가 최신 상태여야 한다.
- 방 생성 시 Realtime Database의 `rooms/{roomCode}` 경로에 데이터가 생겨야 한다.
- 방 참가 시 `players/{auth.uid}` 데이터가 생겨야 한다.

## Firebase Anonymous Auth 설정

멀티플레이는 Firebase Anonymous Auth를 사용합니다.

Firebase 콘솔에서:

1. Build > Authentication
2. 시작하기
3. Sign-in method 탭
4. Anonymous 사용 설정
5. 저장

Anonymous Auth를 켜지 않으면 멀티플레이 방 만들기/참가가 실패할 수 있습니다.

## Realtime Database Rules 설정

멀티플레이 보안을 위해 Firebase Anonymous Auth 기반 Rules를 사용합니다.

Firebase 콘솔에서:

1. Realtime Database
2. Rules 탭
3. `database.rules.json` 내용을 복사
4. Rules 편집기에 붙여넣기
5. 게시

주의:

- Anonymous Auth가 꺼져 있으면 멀티플레이 write가 거부됩니다.
- Firebase Console > Authentication > Sign-in method > Anonymous를 반드시 활성화해야 합니다.
- Rules 적용 후 `PERMISSION_DENIED`가 나면 브라우저를 새로고침한 뒤 다시 로그인 상태를 확인합니다.

## 테스트용 상태 패널

멀티플레이 테스트 중 URL에 `?debug=1`을 붙이면 오른쪽 아래 `상태` 버튼으로 Firebase/Auth/Room 상태를 확인할 수 있습니다.

표시 항목:

- Firebase 연결 상태
- Auth 로그인 상태
- playerId
- roomCode
- 방장 여부
- 방 상태
- 마지막 Firebase 오류

배포 전에는 숨김 처리하거나 제거할 수 있습니다.

## 디버그 모드

일반 접속에서는 오른쪽 아래 상태 패널이 숨겨진다.

테스트 중 Firebase/Auth/Room 상태를 확인하려면 URL 뒤에 `?debug=1`을 붙인다.

예시:

https://baggu4402.github.io/emoji-quiz/?debug=1

방 초대 링크와 같이 쓰려면:

https://baggu4402.github.io/emoji-quiz/?room=ABCD&debug=1

디버그 패널에서 확인할 수 있는 정보:

- Firebase 연결 상태
- Anonymous Auth 로그인 상태
- playerId
- roomCode
- 방장 여부
- room status
- 마지막 Firebase 에러

## 멀티플레이 재접속

- 방에 참가하면 마지막 방 코드와 닉네임이 브라우저에 저장됩니다.
- 새로고침하거나 다시 접속하면 멀티플레이 메뉴에서 이전 방 복귀 안내가 표시됩니다.
- 게임이 이미 진행 중이어도 같은 Anonymous Auth 사용자라면 복귀할 수 있습니다.
- 명시적으로 방 나가기를 누르면 저장된 복귀 정보가 삭제됩니다.

## 멀티플레이 초대 방법

1. 방장이 방을 만든다.
2. `방 코드 복사` 또는 `초대 링크 복사`를 누른다.
3. 친구에게 코드를 보내거나 링크를 공유한다.
4. 친구는 닉네임을 입력하고 방 참가하기를 누른다.

초대 링크 예시:
https://baggu4402.github.io/emoji-quiz/?room=ABCD

## 멀티플레이 제한 사항

- 한 방 최대 6명
- 같은 방 안에서는 닉네임 중복 불가
- 게임이 시작된 방에는 새로 참가할 수 없음
- 방장이 나가면 남은 사람 중 먼저 들어온 사람이 방장이 됨

## 멀티플레이 라운드 규칙

- 방장은 대기방에서 문제 수와 문제별 제한시간을 선택할 수 있다.
- 게임 시작 전 3초 카운트다운이 표시된다.
- 각 문제 전환 전에도 3초 카운트다운이 표시된다.
- 카운트다운 중에는 정답 제출이 불가능하다.
- 문제 시작 후 제한시간이 흐른다.
- 제한시간이 5초 이하로 남으면 힌트가 자동 공개된다.
- 힌트 공개 전 정답자는 +10점, 힌트 공개 후 정답자는 +5점을 얻는다.
- 오답은 실시간 오답 로그에 표시된다.
- 정답자가 나오거나 시간이 초과되면 정답을 공개하고 2초 후 자동으로 다음 문제 또는 결과 화면으로 넘어간다.

## 결과 공유

- 싱글 플레이 결과 공유 가능
- 멀티플레이 최종 순위 공유 가능
- 공유 버튼은 결과 문구를 클립보드에 복사함

## 피드백 효과

- 정답 시 짧은 애니메이션, 효과음, 진동 피드백을 제공한다.
- 오답 시 입력창 흔들림 효과를 제공한다.
- 브라우저/기기 설정에 따라 효과음이나 진동은 동작하지 않을 수 있다.

## 친구 테스트 방법

1. GitHub Pages 링크를 친구에게 공유한다.
2. 먼저 싱글 플레이를 1판 테스트한다.
3. 친구랑 같이하기에서 방을 만들고 초대 링크를 공유한다.
4. 2명 이상이 같은 방에 들어온 뒤 게임을 시작한다.
5. 먼저 맞힌 사람만 점수를 얻는지 확인한다.
6. 시간 초과, 다음 문제, 결과 공유를 확인한다.
7. 문제가 있으면 게임 방법 화면의 `버그 리포트 복사` 버튼을 누르고 내용을 공유한다.

## 최종 친구 테스트 체크리스트

### 1. 배포 확인

- GitHub Pages 링크가 정상 접속되는지 확인
- 메인 화면이 정상 표시되는지 확인
- 모바일 브라우저에서 화면이 깨지지 않는지 확인

### 2. 싱글 플레이 확인

- 랜덤 시작
- 카테고리 선택
- 난이도 선택
- 정답 제출
- 힌트 보기
- 정답 보기
- 결과 공유

### 3. 멀티플레이 확인

- 방 만들기
- 방 코드 복사
- 초대 링크 복사
- 다른 브라우저/시크릿 창에서 방 참가
- 방장만 카테고리/난이도 변경 가능
- 방장만 게임 시작 가능
- 게임 시작 전 모든 참가자에게 3, 2, 1 카운트다운 표시
- 카운트다운 중 입력창과 제출 버튼 비활성화
- 카운트다운 후 문제 제한시간 시작
- 모든 참가자에게 같은 문제 표시
- 먼저 맞힌 사람만 점수 획득
- 제한시간 5초 이하에서 힌트 자동 공개
- 시간 초과 후 정답 공개
- 다음 문제도 3초 카운트다운 후 시작
- 방장만 다음 문제 가능
- 최종 순위 표시
- 결과 공유

### 4. 안정성 확인

- 새로고침 후 이전 방 복귀
- 방장 나가기 후 방장 이양
- 비방장 나가기
- 게임 중 재접속
- 모바일에서 입력창/버튼 동작 확인

### 5. 오류 발생 시 확인 순서

1. URL에 `?debug=1`을 붙이고 오른쪽 아래 상태 패널을 연다.
2. Firebase가 connected인지 확인한다.
3. Auth가 signed in인지 확인한다.
4. Last Error에 PERMISSION_DENIED가 있는지 확인한다.
5. Anonymous Auth가 켜져 있는지 확인한다.
6. Realtime Database Rules가 최신인지 확인한다.
7. 브라우저 캐시 또는 Service Worker를 삭제하고 새로고침한다.
8. 버그 리포트 복사 버튼으로 내용을 공유한다.

## Firebase 설정 확인

멀티플레이 테스트 전 Firebase Console에서 아래 항목을 확인한다.

### Authentication

- Build > Authentication > Sign-in method
- Anonymous 제공자가 Enabled 상태인지 확인

### Realtime Database

- Build > Realtime Database > Rules
- database.rules.json 내용이 적용되어 있는지 확인

### 데이터 확인

- 방을 만들면 rooms/{roomCode} 데이터가 생성되어야 함
- players 아래에 auth.uid 기반 player 데이터가 생성되어야 함
- 게임 시작 시 status가 playing으로 바뀌어야 함

## 버그 리포트에 포함되는 정보

- 현재 URL
- 브라우저 정보
- 싱글 플레이 상태
- 멀티플레이 상태
- Firebase/Auth 상태
- 마지막 에러 메시지

## PWA 캐시 문제 해결

PWA와 Service Worker 때문에 이전 코드가 남아 보일 수 있다.

Chrome 기준:

1. F12 개발자도구 열기
2. Application 탭
3. Service Workers
4. Unregister 클릭
5. Storage > Clear site data 클릭
6. 페이지 새로고침

간단히는 Ctrl + F5 강력 새로고침을 먼저 시도한다.

## Service Worker 캐시 초기화

Chrome 기준:

1. F12 개발자도구 열기
2. Application 탭 이동
3. Service Workers 선택
4. Unregister 클릭
5. Storage 메뉴에서 Clear site data 클릭
6. 페이지 새로고침

간단하게는 먼저 Ctrl + F5를 시도한다.

## PWA 설치

이 프로젝트는 PWA 설치를 지원한다.

모바일 브라우저에서 접속 후:

- Android Chrome: 메뉴 > 홈 화면에 추가 또는 앱 설치
- iOS Safari: 공유 버튼 > 홈 화면에 추가

주의:

- 멀티플레이는 Firebase 연결이 필요하므로 오프라인에서는 정상 동작하지 않을 수 있다.
- 싱글 플레이는 캐시된 파일 기준으로 일부 오프라인 실행이 가능하다.
