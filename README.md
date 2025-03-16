# Node.js 회원가입 및 로그인 API (JWT, MySQL, Jest 테스트)

이 프로젝트는 **Node.js + Express + MySQL + JWT**를 활용하여 회원가입 및 로그인 기능을 구현한 API입니다.  
또한, **Jest + Supertest**를 이용해 API 테스트를 수행할 수 있습니다.

---

## 🚀 기능 목록

✅ 회원가입 (비밀번호 암호화 저장)  
✅ 로그인 (JWT 토큰 발급)  
✅ JWT 기반 인증  
✅ MySQL 데이터베이스 연동  
✅ Jest를 이용한 API 테스트  

## 📂 프로젝트 구조

📦 프로젝트 폴더 ├── 📂 routes # API 라우터 폴더 │ ├── auth.js # 회원가입 및 로그인 API 라우터
                ├── 📂 tests # Jest 테스트 코드 폴더 │ ├── auth.test.js # 회원가입/로그인 테스트 코드
                ├── 📄 server.js # Express 서버 설정
                ├── 📄 db.js # MySQL 데이터베이스 연결
                ├── 📄 .env # 환경 변수 설정 
                ├── 📄 package.json # 프로젝트 설정 파일
                └── 📄 README.md # 프로젝트 설명 파일
                
### 1️⃣ 필수 패키지 설치

npm install
