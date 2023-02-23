import { OrderStore } from "../../models/order";
import { UserStore } from "../../models/user";
import { ProductStore } from "../../models/product";

const store = new OrderStore();
const user = new UserStore();
const product = new ProductStore();

describe("Order Model", () => {
  it("should have index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have add Product to order method", () => {
    expect(store.addProduct).toBeDefined();
  });
  it("should have create order method", () => {
    expect(store.createOrder).toBeDefined();
  });
  it("should have get active order method", () => {
    expect(store.getActiveOrder).toBeDefined();
  });

  it("createOrder method shoud return orders for a user", async () => {
    const newUser = await user.create({
      firstname: "John",
      lastname: "Doe",
      email: "new@example.com",
      password: "123456789",
    });
    const order = await store.createOrder(newUser.id as number);
    expect(order).toEqual({
      id: 1,
      status: "active",
      user_id: "1",
    });
  });

  it("get acive order method shoud return active order for a user", async () => {
    const order = await store.getActiveOrder(1);
    expect(order).toEqual({
      id: 1,
      status: "active",
      user_id: "1",
    });
  });

  it("index method shoud return all orders for a user", async () => {
    const order = await store.index(1);
    expect(order).toEqual([
      {
        id: 1,
        status: "active",
        user_id: "1",
      },
    ]);
  });

  it("add Product method shoud  add product to order", async () => {
    const p = await product.create({
      name: "bmw",
      description: "this a car",
      price: 100,
      category: "cars",
    });
    const order = await store.addProduct("1", "1", 2);
    expect(order).toEqual({
      id: 1,
      quantity: 2,
      order_id: "1",
      product_id: "1",
    });
  });

  it("delete Product method shoud  delete product from order", async () => {
    const order = await store.deleteProduct("1", "1");
    expect(order).toEqual({
      id: 1,
      quantity: 2,
      order_id: "1",
      product_id: "1",
    });
  });
});
