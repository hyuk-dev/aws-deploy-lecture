const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  it("기본 경로(/)는 200 상태코드와 함께 환영 메시지를 응답해야 합니다.", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello World from Express!");
  });
});
