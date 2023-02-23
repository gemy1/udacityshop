import { Request, Response } from "express";
import { OrderStore } from "../models/order";
import payload from "../utils/payload";
import { JwtPayload } from "jsonwebtoken";

const orderStore = new OrderStore();

export const ordersIndexController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = payload(req);
    //@ts-ignore
    const orders = await orderStore.index(user!.id);
    return res.status(200).json({ orders: orders });
  } catch (err) {
    return res.status(500).json({ error: "can not" });
  }
};

export const creatOrderController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    console.log(id);
    const order = await orderStore.createOrder(parseInt(id));
    return res.status(201).json({ order: order });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const ordersIndexByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const orders = await orderStore.index(parseInt(id));
    if (orders.length === 0) {
      throw new Error("no orders found");
    }
    return res.status(200).json({ orders: orders });
  } catch (err) {
    return res.status(500).json({ error: "No orders for this user" });
  }
};
