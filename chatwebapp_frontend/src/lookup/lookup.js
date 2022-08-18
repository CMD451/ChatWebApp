import { fetchbackendlookup,token_backend_formData_lookup,token_backend_lookup } from "./backend_lookup";

export async function loginRequest(data){
    const endpoint = "/api/profiles/token/";
    return await fetchbackendlookup("POST",endpoint,data)
}
export async function registerRequest(data){
    const endpoint = "/api/profiles/register/";
    return await fetchbackendlookup("POST",endpoint,data)
}
export async function getCurrentUser(){
    const endpoint = "/api/profiles/";
    return await token_backend_lookup("GET",endpoint,null)
}
export async function getChatRoomMessages(chatId,page){
   const endpoint = `/api/chat/messages/?id=${chatId}&page=${page}`
   return await token_backend_lookup("GET",endpoint,null)
}
export async function getUserChatRooms(page){
    const endpoint = `/api/chat/room/?page=${page}`
    return await token_backend_lookup("GET",endpoint,null)
}
export async function searchForUsers(username,page){
    const endpoint = `/api/profiles/search/?phrase=${username}&page=${page}`
    return await token_backend_lookup("GET",endpoint,null)
}
export async function createChatRoom(data){
    const endpoint = '/api/chat/room/'
    return await token_backend_lookup("POST",endpoint,data)
}
export async function updateChatRoom(id,data){
    const endpoint = `/api/chat/room/${id}/`
    return await token_backend_lookup("PATCH",endpoint,data)
}
export async function updateProfile(data){
    const endpoint = '/api/profiles/';
    return await token_backend_lookup("PATCH",endpoint,data)
}
export async function uploadProfileImage(data){
    const endpoint = '/api/profiles/image/';
    return await token_backend_formData_lookup("PATCH",endpoint,data)
}