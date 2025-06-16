import AppContext from "../src";

interface UserContext {
    username: string;
}

const appContext = AppContext.context<UserContext>()
const domainService = () => {
    const user = appContext.get();
    console.log('triggered', { user })
}

const asyncExecution = async () => {
    domainService()
};


const user: UserContext = {
    username: 'echaoeoen'
}

appContext.startContext(async () => {
    appContext.set(user);
    await asyncExecution()
});

