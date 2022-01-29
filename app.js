const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const morgan = require("morgan");
const path = require("path");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const passport = require("passport");
const passportConfig = require("./passport");

// 라우터 선언
const indexRouter = require("./routers/index.js");
const authRouter = require("./routers/auth");
// 모든 URL에 대한 Router
const otherRouter = require("./routers/other.js");

const app = express();

// PORT setting
const PORT = 70;
app.set("port", process.env.PORT || PORT);

app.use("/", express.static(path.join(__dirname, "./build")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// req.session 객체 생성
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    // redis저장 설정
    // store: new RedisStore({ client: redisClient }),
  })
);

// passport setting
passportConfig();
// passport 설정 선언(req에 passport 설정 삽입) 위 use.session이라고 보면 댐
app.use(passport.initialize());
// req.session 에 passport 정보 저장 (req.session.num = 1 이런거라고 보면 댐)
app.use(passport.session());

// URL과 라우터 매칭
app.use("/", indexRouter);
app.use("/auth", authRouter);

// ERROR 메세지 창
app.use((err, req, res, next) => {
  res.status(err.static || 500);
  res.send(err);
});

app.use(otherRouter);

// PORT 연결상태 확인
app.listen(app.get("port"), () =>
  console.log(`Listening on port ${app.get("port")}`)
);
