# 과제 구현
## 1. Login / SignUp
### 구현
로그인: /auth/login
회원가입: /auth/signUp

### 테스트
- [x] 이메일 조건 : 최소 @, . 포함
- [x] 비밀번호 조건 : 8자 이상 입력
- [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼 활성화
- [x] 로그인 API를 호출하고, todo/list로 경로 이동
- [x] 응답으로 받은 토큰은 로컬 스토리지에 저장
- [x] 토큰이 존재한다면 루트 경로(todo/list)로 리다이렉트

## 2. Todo List
### 구현
todo/list
list 페이지에서 수정, 상세, 삭제, 편집 모두 한 화면에서 구현

### 테스트
- [x] Todo 목록
- [x] Todo 추가 버튼을 클릭하면 할 일이 추가
- [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소
- [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제
- [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영
- [x] 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인
- [x] 새로고침을 했을 때 현재 상태가 유지
- [ ] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회
