import { Response, Request } from "express";
import { UserStore } from "../models/user";
import { OrderStore } from "../models/order";

const userStore = new UserStore();
const order = new OrderStore();

export const indexUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await userStore.index();
    return res.status(200).json({ users: users });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const showUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const user = await userStore.show(parseInt(id));

    if (!user) return res.status(404).json({ message: "user not found" });

    return res.status(200).json({ user: user });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const getOrdersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const o = await order.getActiveOrder(parseInt(id));

    if (!o)
      return res.status(404).json({ message: "No active order for this user" });

    return res.status(200).json({ user: o });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
