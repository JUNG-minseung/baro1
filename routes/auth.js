const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

// 🔹 회원가입 API
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 중복 확인
    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
      if (results.length > 0) return res.status(400).json({ message: "이미 존재하는 사용자입니다." });

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 10);

      // 새 사용자 저장
      db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: "회원가입 실패" });
        res.status(201).json({ message: "회원가입 성공" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 🔹 로그인 API
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 사용자 조회
  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (results.length === 0) return res.status(400).json({ message: "사용자가 존재하지 않습니다." });

    const user = results[0];

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });

    // JWT 토큰 발급
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  });
});

module.exports = router;
