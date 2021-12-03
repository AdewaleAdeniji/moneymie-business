import { httpGet } from "../../requests/helper";

export const getUser = async() => {
    return httpGet('https://jsonplaceholder.typicode.com/users/1')
}