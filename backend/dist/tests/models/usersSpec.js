"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const user = new user_1.UserStore();
describe("User model", () => {
    it("user model shoud have Create method", () => {
        expect(user.create).toBeDefined();
    });
    it("user model shoud have find by email  method", () => {
        expect(user.findUserByEmail).toBeDefined();
    });
    it("CREATE method shoud create a new user", async () => {
        const newUser = await user.create({
            firstname: "John",
            lastname: "Doe",
            email: "kenaa@example.com",
            password: "123456789",
        });
        expect(newUser).toEqual({
            id: 2,
            firstname: "John",
            lastname: "Doe",
            email: "kenaa@example.com",
            password: "123456789",
        });
    });
    it("find user by email shoud return user if exsist", async () => {
        const newUser = await user.findUserByEmail("kenaa@example.com");
        expect(newUser).toEqual({
            id: 2,
            firstname: "John",
            lastname: "Doe",
            email: "kenaa@example.com",
            password: "123456789",
        });
    });
    it("Index shoud return all users", async () => {
        const newUser = await user.index();
        expect(newUser.length).toEqual(2);
    });
});
