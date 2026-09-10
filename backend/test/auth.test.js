const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const { app } = require("../index");

test("GET /auth/me rejects requests without a session cookie", async () => {
  const response = await request(app).get("/auth/me");

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, { message: "Authentication required." });
});

test("POST /auth/logout clears the session cookie", async () => {
  const response = await request(app).post("/auth/logout");

  assert.equal(response.status, 204);
  assert.match(response.headers["set-cookie"][0], /^tradexSession=;/);
});
