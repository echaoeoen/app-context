import e, { Request, Response, NextFunction, RequestHandler } from "express"; // Import the 'Response' type from the 'express' module.
import AppContext, { ObjectType } from "../app-context";
type ExpressRequestContext<T extends ObjectType<T>> = T & {
    req: Request;
}
/**
 * Creates an Express middleware that starts a new context for each incoming request.
 * The middleware calls the given preRequest function and waits for it to complete
 * before calling the next middleware in the chain.
 *
 * The context data is set to include the request object and an empty data object.
 * You can use AppContext.get() to retrieve the context data.
 *
 * @param preRequest A function to call before calling the next middleware.
 * @returns A middleware function that starts a new context and calls the given preRequest function.
 */
export const expressAppContext = <T extends ObjectType<T>>(preRequestFn: (req: Request, res?: Response) => void): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  const context = AppContext.context<ExpressRequestContext<T>>();

  context.startContext(async () => {
    context.set({ req } as Partial<ExpressRequestContext<T>>);
    await Promise.resolve(preRequestFn(req, res));
    next();
  });
}

/**
 * Gets the current express context.
 * @returns The current express context.
 */

export const getExpressContext = <T extends ObjectType<T>>() => {
    return AppContext.context<ExpressRequestContext<T>>().get();
}

/**
 * Sets the current express context.
 * @param contextData The context data to set.
 */

export const setExpressContext = <T extends ObjectType<T>>(contextData: Partial<ExpressRequestContext<T>>) => {
    AppContext.context<ExpressRequestContext<T>>().set(contextData);
}