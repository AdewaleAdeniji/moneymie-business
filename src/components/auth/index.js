import { getCache } from "../cache/helper";

export const getLoggedInUser = () => {
    const user = getCache('user');
    return false;
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};
export const loggedIn = () => {
    const user = getCache('user');
    return user ? (typeof user == 'object' ? true : true ) : false;
}