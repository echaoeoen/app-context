import { Request, Response, NextFunction, RequestHandler } from "express"; // Import the 'Response' type from the 'express' module.
import AppContext from "../app-context";
export interface RequestContext<T> {
    req: Request;
    data: T;
}
/**
 * A middleware function that sets up an AppContext for the current request.
 * This context contains the request and response objects, and a data object
 * that can be used to store arbitrary data.
 * @param req The request object.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const expressAppContext: RequestHandler = <T>(req: Request, _res: Response, next: NextFunction) => {
  const context = AppContext.context<RequestContext<T>>();
  context.startContext(() => {
    context.set({
      req,
      data: {} as T,
    });
    next();
  });
}

/**
 * Gets the current express context.
 * @returns The current express context.
 */

export const getExpressContext = <T>() => {
    return AppContext.context<RequestContext<T>>().get();
}

/**
 * Sets the current express context.
 * @param contextData The context data to set.
 */

export const setExpressContext = <T>(contextData: Partial<RequestContext<T>>) => {
    AppContext.context<RequestContext<T>>().set(contextData);
}