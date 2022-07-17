import { fetchbackendlookup,token_backend_lookup } from "./backend_lookup";

export async function loginRequest(data){
    const endpoint = "/api/profiles/token/";
    return await fetchbackendlookup("POST",endpoint,data)
}
export async function registerRequest(data){
    const endpoint = "/api/profiles/register/";
    return await fetchbackendlookup("POST",endpoint,data)
}
export async function getUserChatRooms(page){
    //todo pagination
    const endpoint = `/api/chat/room/?page=${page}`
    return await token_backend_lookup("GET",endpoint,null)
}
export async function searchForUsers(username,page){
    const endpoint = `/api/profiles/search/?phrase=${username}&page=${page}`
    return await token_backend_lookup("GET",endpoint,null)
}