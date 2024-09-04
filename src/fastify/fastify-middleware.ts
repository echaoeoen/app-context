import { FastifyInstance } from "fastify";
import * as middie from '@fastify/middie'
import { IncomingMessage, ServerResponse } from "http";
import AppContext, { ObjectType } from "../app-context";
type FastifyRequestContext<T extends ObjectType<T>> = T & {
    req: IncomingMessage & middie.IncomingMessageExtended;
}
/**
 * Registers the AppContext middleware with the given Fastify instance.
 * This middleware will start a new context for each incoming request,
 * and store the request and response objects, as well as an empty data object,
 * in the context.
 *
 * @param instance The Fastify instance to register the middleware with.
 * @returns A promise that resolves when the middleware has been registered.
 */

export const registerFastifyAppContext = async <T extends ObjectType<T>>(instance: FastifyInstance, preRequestFn: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void) => {
    await instance.register(middie);
    instance.use((req, res, next) => {
        const context = AppContext.context<FastifyRequestContext<T>>();
        context.startContext(async () => {
            context.set({
                req
            } as unknown as Partial<FastifyRequestContext<T>>);
            await Promise.resolve(preRequestFn(req, res));
            next();
        });
    })
}

/**
 * Gets the current Fastify context.
 * @returns The current Fastify context.
 */
export const getFastifyContext = <T extends ObjectType<T>>() => {
    return AppContext.context<FastifyRequestContext<T>>().get();
}

/**
 * Sets the current Fastify context.
 * @param contextData The context data to set.
 */
export const setFastifyContext = <T extends ObjectType<T>>(contextData: Partial<FastifyRequestContext<T>>) => {
    AppContext.context<FastifyRequestContext<T>>().set(contextData);
}