import { Request, Response, Router } from "express";
import { Promisable } from "./common";
import { Fallible } from "./fallible";

export type RouterError = {
  status: number;
  message: string;
};

export type RouterHandlerReturnType<ResponseDataType> =
  Fallible<ResponseDataType, RouterError>;

export type RouterHandler<ResponseDataType> = (req: Request, res: Response) =>
  Promisable<RouterHandlerReturnType<ResponseDataType>>;

export type MapRouterReturnType = [
  string,
  keyof Router & ("get" | "post" | "put" | "delete"),
  RouterHandler<unknown>,
][];
