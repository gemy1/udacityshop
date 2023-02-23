import supertest from "supertest";
import app from "../server";

const request = supertest(app);

const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJnLWdzQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6ImdhbWFsIiwibGFzdG5hbWUiOiJoYXJvdW4iLCJpYXQiOjE2NzU4ODc3NDd9.eVJQQ9Uu3DHCA2dxeu2JWmnrIFQNc6gemel_b4-SdqA";

describe("Test endpoint responses", () => {
  it("gets the api endpoint status (200)Ok", async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });
  it("gets all Products", async () => {
    const response = await request.get("/api/products");
    expect(response.status).toBe(200);
  });
  it("get product by id", async () => {
    const response = await request.get("/api/product/2");
    expect(response.status).toBe(200);
  });
  it("create product ", () => {
    const response = request
      .post("/api/product")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "book3",
        description: "a new book3",
        price: 58.5,
        category: "books",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it("update product ", () => {
    const response = request
      .patch("/api/product/2")
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 58.5,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("get product by category", async () => {
    const response = await request.get("/api/products/books");
    expect(response.status).toBe(400);
  });

  it("gets all users", async () => {
    const response = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("show user by id ", async () => {
    const response = await request
      .get("/api/user/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("create user ", () => {
    const response = request
      .post("/api/user")
      .send({
        firstname: "gamal",
        lastname: "haroun",
        email: "g-g22@gmail.com",
        password: "12345",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it("get Current Order by user", async () => {
    const response = await request
      .get("/api/user/1/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
