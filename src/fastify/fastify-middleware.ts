import fastify, { FastifyBaseLogger, FastifyInstance } from "fastify";
import * as middie from '@fastify/middie'
import { IncomingMessage } from "http";
import AppContext from "../app-context";
export interface RequestContext<T> {
    req: IncomingMessage;
    data: T;
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

export const registerFastifyAppContext = async <T>(instance: FastifyInstance) => {
    await instance.register(middie);
    instance.use((req, res, next) => {
        const context = AppContext.context<RequestContext<T>>();
        context.startContext(() => {
            context.set({
                req,
                data: {} as T,
            });
            next();
        });
    })
}

/**
 * Gets the current Fastify context.
 * @returns The current Fastify context.
 */
export const getFastifyContext = <T>() => {
    return AppContext.context<RequestContext<T>>().get();
}

/**
 * Sets the current Fastify context.
 * @param contextData The context data to set.
 */
export const setFastifyContext = <T>(contextData: Partial<RequestContext<T>>) => {
    AppContext.context<RequestContext<T>>().set(contextData);
}