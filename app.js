// app.js
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { Sequelize, DataTypes } = require("sequelize");

dotenv.config();
const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  dialect: process.env.DB_DIALECT,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
});

sequelize
  .authenticate()
  .then(() => console.log("DB 연결 성공"))
  .catch((err) => console.error("DB 연결 실패", err));

const app = express();

// app.use(morgan('dev'))
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("common"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

app.get("/user", async (req, res) => {
  await sequelize.sync({ force: true }); // 기존 테이블 초기화
  const newUser = await User.create({ name: "홍길동", age: 28 });
  res.json({ message: "유저 생성 완료", user: newUser.toJSON() });
});

app.get("/api/items", (req, res) => {
  res.json([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ]);
});

module.exports = app;
