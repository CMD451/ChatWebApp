import { fetchbackendlookup,token_backend_lookup } from "./backend_lookup";

export async function loginRequest(data){
    const endpoint = "/api/profiles/token/";
    return await fetchbackendlookup("POST",endpoint,data)
}
export async function registerRequest(data){
    const endpoint = "/api/profiles/register/";
    return await fetchbackendlookup("POST",endpoint,data)
}