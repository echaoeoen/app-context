import { FastifyInstance } from "fastify";
import * as middie from '@fastify/middie';
import { IncomingMessage, ServerResponse } from "http";
import { ObjectType } from "../app-context";
type FastifyRequestContext<T extends ObjectType<T>> = T & {
    req: IncomingMessage & middie.IncomingMessageExtended;
};
export declare const registerFastifyAppContext: <T extends ObjectType<T>>(instance: FastifyInstance, preRequestFn: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void) => Promise<void>;
export declare const getFastifyContext: <T extends ObjectType<T>>() => Partial<FastifyRequestContext<T>>;
export declare const setFastifyContext: <T extends ObjectType<T>>(contextData: Partial<FastifyRequestContext<T>>) => void;
export {};
