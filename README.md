### 쇼핑몰 프로젝트
### 프로젝트 구조
#### client 폴더 : react 설치
#### server 폴더 : express 웹서버

<!-- 프런트와 서버 통신 -->
리엑트 : axios 설치
- npm install axios

서버 : cors() 설치
- npm i cors

#### 리엑트 라우팅
npm i react-router-dom

### 프런트엔드 프로그래밍
상품(프런트 개발)
- 상품 등록
- 상품 삭제
- 상품 수정
- 상품 목록(검색기능)

회원
- api개발(Rest API)
    - 회원 목록(get)
    - 회원 1건(get) - id, username(로그인)
    - 회원 가입(post)
- MySQL jsuser, jsdb
    - users 테이블
        - column: id(번호),<br>
                  username(아이디),<br>
                  password(비밀번호),<br>
                  email(이메일),<br>
                  role(권한),<br>
                  created_at(가입일)