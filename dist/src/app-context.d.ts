import { AsyncLocalStorage } from 'async_hooks';
export type ObjectType<T> = {
    [key: string]: any;
} & (keyof T extends string ? {} : "T must only have string keys");
export default class AppContext<ContextDataType extends ObjectType<ContextDataType>> {
    context: Map<string, Partial<ContextDataType>>;
    asyncLocalStorage: AsyncLocalStorage<string>;
    static service: AppContext<any>;
    static context<ContextDataType extends ObjectType<ContextDataType>>(): AppContext<ContextDataType>;
    startContext<PromiseType, ContextDataType extends ObjectType<ContextDataType>>(fn: () => void | Promise<PromiseType>): Promise<PromiseType>;
    get(): Partial<ContextDataType>;
    set(contextData: Partial<ContextDataType>): void;
}
