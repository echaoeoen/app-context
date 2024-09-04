
# AppContext Library

The `AppContext` library simplifies managing execution context across asynchronous function calls in Node.js applications. This eliminates the need to pass parameters through deeply nested function calls by using the `AsyncLocalStorage` API. With `AppContext`, you can store and access context-specific data (e.g., user authentication details, request IDs) throughout your application logic without passing them explicitly.

## Installation

Install the library via npm:

```bash
npm install node-application-context
```

You'll also need to install the `uuid` package as a peer dependency:

```bash
npm install uuid
```

## Usage

### Basic Setup

To use the `AppContext` library, define your context data type, initialize the context, and start using it within asynchronous functions.

```typescript
import AppContext from 'node-application-context';

// Define your context data structure
type MyContextType = {
  userId: string;
  requestId: string;
};

// Initialize the context
const appContext = AppContext.context<MyContextType>();

// Start a new context and run a function within it
appContext.startContext(async () => {
  // Set context data
  appContext.set({ userId: '12345', requestId: 'req-67890' });

  // Retrieve context data later in the same execution context
  const contextData = appContext.get();
  console.log(contextData); // { userId: '12345', requestId: 'req-67890' }
});
```

### API Reference

#### `startContext<PromiseType>(fn: () => void | Promise<PromiseType>)`

Starts a new execution context, running the provided function within this context. The function can be synchronous or asynchronous.

- **Returns:** `Promise<PromiseType>`

```typescript
appContext.startContext<Promise<void>>(() => {
  // Set and use context data
  appContext.set({ userId: '12345' });
});
```

#### `get(): Partial<ContextDataType>`

Retrieves the context data associated with the current execution context. Throws an error if no context is found.

- **Returns:** `Partial<ContextDataType>`

```typescript
const contextData = appContext.get();
```

#### `set(contextData: Partial<ContextDataType>)`

Sets or updates the context data for the current execution context.

```typescript
appContext.set({ userId: '67890' });
```

## Example Use Case

The `AppContext` library is particularly useful in scenarios where you need to manage shared context in applications with complex asynchronous workflows, such as:

- Request handling in an API server
- Managing user sessions or transaction data across multiple layers
- Storing request-specific data like tracking IDs or logging information

```typescript
import AppContext from 'node-application-context';

type RequestContext = {
  requestId: string;
  userId: string;
};

const requestContext = AppContext.context<RequestContext>();

async function handleRequest() {
  await requestContext.startContext(async () => {
    requestContext.set({ requestId: 'abc123', userId: 'user456' });
    
    const context = requestContext.get();
    console.log(`Request ID: ${context.requestId}, User ID: ${context.userId}`);
  });
}

handleRequest();
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
