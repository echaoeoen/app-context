
import * as express from 'express';
import { Request, Response } from 'express'
import AppContext, { expressAppContext, getExpressContext, setExpressContext } from '../src';

const app = express();
interface UserData {
    username: string;
}
interface ContextData {
  user: UserData
}
// Pre-request function to be executed before each request is handled
const preRequestFn = async (req: Request, res?: Response) => {
  console.log('Pre-request function is called!');
//   const userData = await someRepo.getUser(req.session.userId);
    const userData = {
        username: 'echaoeoen'
    }
  setExpressContext({user: userData});
};

// Apply the AppContext middleware to handle context for each request
app.use(expressAppContext<ContextData>(preRequestFn));

// Example route
app.get('/user', (req: Request, res: Response) => {
  // Retrieve the current context, including request-specific data
  const context = getExpressContext<ContextData>();

  // Respond with the user ID from the context
  res.json({
    message: 'Hello, User!',
    userId: context.user,
  });
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:3000');
});