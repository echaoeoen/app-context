import { Request, Response, RequestHandler } from "express";
import { ObjectType } from "../app-context";
type ExpressRequestContext<T extends ObjectType<T>> = T & {
    req: Request;
};
export declare const expressAppContext: <T extends ObjectType<T>>(preRequestFn: (req: Request, res?: Response) => void) => RequestHandler;
export declare const getExpressContext: <T extends ObjectType<T>>() => Partial<ExpressRequestContext<T>>;
export declare const setExpressContext: <T extends ObjectType<T>>(contextData: Partial<ExpressRequestContext<T>>) => void;
export {};
