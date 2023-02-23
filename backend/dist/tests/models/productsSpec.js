"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const store = new product_1.ProductStore();
describe("Product Model", () => {
    it("should have index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have delete method", () => {
        expect(store.delete).toBeDefined();
    });
    it("should have update method", () => {
        expect(store.update).toBeDefined();
    });
    it("CREATE method shoud create a product", async () => {
        const products = await store.create({
            name: "bmw",
            description: "this a car",
            price: 100,
            category: "cars",
        });
        expect(products).toEqual({
            id: 2,
            name: "bmw",
            description: "this a car",
            price: 100,
            category: "cars",
        });
    });
    it("SHOW method shoud diplay a product", async () => {
        const products = await store.show("1");
        expect(products).toEqual({
            id: 1,
            name: "bmw",
            description: "this a car",
            price: 100,
            category: "cars",
        });
    });
    it("INDEX method shoud return a list of products", async () => {
        const products = await store.index();
        expect(products).toEqual([
            {
                id: 1,
                name: "bmw",
                description: "this a car",
                price: 100,
                category: "cars",
            },
            {
                id: 2,
                name: "bmw",
                description: "this a car",
                price: 100,
                category: "cars",
            },
        ]);
    });
    it("UPDATE method shoud update a product", async () => {
        const product = await store.update("1", {
            name: "bmw",
            description: "this a car",
            price: 88,
            category: "cars",
        });
        expect(product).toEqual({
            id: 1,
            name: "bmw",
            description: "this a car",
            price: 88,
            category: "cars",
        });
    });
    it("DELETE method shoud delete a product", async () => {
        const products = await store.delete("1");
        expect(products).toEqual({
            id: 1,
            name: "bmw",
            description: "this a car",
            price: 88,
            category: "cars",
        });
    });
});
