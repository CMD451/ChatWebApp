
import { isExpired} from "react-jwt";
import { useNavigate } from 'react-router-dom';


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export async function fetchbackendlookup(method, endpoint, data,isFormData) {
  const url = `http://127.0.0.1:8000${endpoint}`;
  let fetch_data = {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  if (data) {
    if(isFormData){
      fetch_data['body'] = data
    }
    else{
      fetch_data['headers']['Content-Type'] = 'application/json'
      fetch_data['body'] = JSON.stringify(data);
    }
  }
  let csrftoken = getCookie('csrftoken')
  if (csrftoken) {
    fetch_data['headers']['X-CSRFToken'] = csrftoken;
  }
  let token = window.localStorage.getItem('token');
  if(token != null){
    fetch_data['headers']['Authorization'] = `Bearer ${token}`;
  }
  if(window.localStorage.getItem('token')!=null){

  }
  let response = await fetch(url, fetch_data);
  let responseBody = await response.json();
  return {status:response.status,body:responseBody}
} 
async function renewToken() {
  console.log("odnawianie trwa")
  const endpoint = '/api/profiles/token/refresh/';
  const refresh = window.localStorage.getItem('refresh');
  const data = { 'refresh': refresh }

  let response = await fetchbackendlookup("POST", endpoint, data)
  if (response['body']['access']) {
    window.localStorage.setItem("token", response['body']['access'])
    return true
  }
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('refresh')
  return false
}

export async function renewTokenIfexpired() {
  let token = window.localStorage.getItem("token")
  if (token != null) {
    if (isExpired(token)) {
      console.log("odnawianie tokenu")
      let status = await renewToken()
      if (status) {
        return
      }
    }
    else {
      return
    }
  }
  //przekieruj do strony logowania
  console.log("przekieruj do logowania--renewToken")
}
export async function token_backend_lookup(method, endpoint, data){
  await renewTokenIfexpired()
  return await fetchbackendlookup(method,endpoint,data,false)
}
export async function token_backend_formData_lookup(method, endpoint, data){
  await renewTokenIfexpired()
  return await fetchbackendlookup(method,endpoint,data,true)
}