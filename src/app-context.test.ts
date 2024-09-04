import AppContext from "./app-context";

interface DataType {
  user: string;
}
describe(`src/app-context.ts`, () => {
    describe(`get()`, () => {
      it(`should return undefined when its called from outside context`, () => {
        expect(() => AppContext.context<DataType>().get()).toThrow('No context found');
      });
      it(`should return context object when its called from inside context`, () => {
        AppContext.context().startContext(() => {
          expect(AppContext.context<DataType>().get()).toBeDefined();
        });
      });
    });
    describe(`setContext()`, () => {
      let called = 1;
      function nested() {
        AppContext.context<DataType>().set({
          user: `user-${called}`,
        });
      }
      it(`should set context data only inside active context `, async () => {

        await AppContext.context<DataType>().startContext(() => {
          nested();
          expect(AppContext.context<DataType>().get().user).toBe(
            `user-1`
          );
        });
        called++;
        await AppContext.context<DataType>().startContext(() => {
          nested();
          expect(AppContext.context<DataType>().get().user).toBe(
            `user-2`
          );
        });
      });
    });
  });
  