const request = require("supertest");
const app = require("../server");
const db = require("../db");

beforeAll((done) => {
  db.query("DELETE FROM users", done); // 기존 데이터 삭제
});

describe("회원가입 및 로그인 API 테스트", () => {
  let token;

  it("회원가입 성공", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "password123",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe("회원가입 성공");
  });

  it("중복 회원가입 방지", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "password123",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("이미 존재하는 사용자입니다.");
  });

  it("로그인 성공 및 토큰 발급", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "testuser",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("잘못된 비밀번호 로그인 실패", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "testuser",
      password: "wrongpassword",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("비밀번호가 일치하지 않습니다.");
  });

  it("존재하지 않는 사용자 로그인 실패", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "unknownuser",
      password: "password123",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("사용자가 존재하지 않습니다.");
  });
});

afterAll(() => db.end());
