import * as UUID from 'uuid';
import { AsyncLocalStorage } from 'async_hooks';

export type ObjectType<T> = { [key: string]: any } & (keyof T extends string ? {} : "T must only have string keys")

export default class AppContext<ContextDataType extends ObjectType<ContextDataType>> {
  context = new Map<string, Partial<ContextDataType>>();
  asyncLocalStorage = new AsyncLocalStorage<string>();
  static service: AppContext<any>;
  /**
   * Returns a singleton instance of AppContext.
   * The instance is specific for the given ContextDataType.
   * If no instance is found, a new one is created.
   * @returns The singleton instance of AppContext.
   */
  static context<ContextDataType extends ObjectType<ContextDataType>>(): AppContext<ContextDataType> {
    if (!this.service) {
      AppContext.service = new AppContext<ContextDataType>();
    }
    return AppContext.service as AppContext<ContextDataType>;
  }

  /**
   * Starts a new execution context, and passes a function to run in this context.
   * The function will have access to the context data, and the context data will be reset after the function completes.
   * @param fn The function to run. It can return a promise or not.
   * @returns The result of the function.
   */
  async startContext<PromiseType, ContextDataType extends ObjectType<ContextDataType>>(fn: () => void | Promise<PromiseType>): Promise<PromiseType> {
    const id = UUID.v4();
    this.context.set(id, {});
    const res = await this.asyncLocalStorage.run(id, fn);
    this.context.delete(id);
    return res as PromiseType;
  }

  /**
   * Returns the context data associated with the current execution context.
   * If no context is found, it throws an error.
   * @returns The context data.
   */
  get(): Partial<ContextDataType> {
    const id = this.asyncLocalStorage.getStore();
    if (!id) {
      throw new Error('No context found');
    }
    return this.context.get(id) || {};
  }

  /**
   * Sets the context data associated with the current execution context.
   * If no context is found, it throws an error.
   * @param contextData The context data to set.
   */
  set(contextData: Partial<ContextDataType>) {
    const id = this.asyncLocalStorage.getStore();
    const context = this.get();
    this.context.set(id, {
      ...context,
      ...contextData,
    });
  }
}
