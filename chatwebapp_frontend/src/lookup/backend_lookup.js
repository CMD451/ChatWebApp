
import { isExpired} from "react-jwt";

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

export async function fetchbackendlookup(method, endpoint, data) {
  const url = `http://127.0.0.1:8000${endpoint}`;
  let fetch_data = {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  if (data) {
    fetch_data['body'] = JSON.stringify(data);
  }
  let csrftoken = getCookie('csrftoken')
  if (csrftoken) {
    fetch_data['headers']['X-CSRFToken'] = csrftoken;
  }
  let token = window.localStorage.getItem('token');
  if(token != null){
    console.log(`JWT ${token}`)
    fetch_data['headers']['Authorization'] = `Bearer ${token}`;
  }
  if(window.localStorage.getItem('token')!=null){

  }
  let response = await fetch(url, fetch_data);
  return response.json()
}
async function renewToken() {
  console.log("odnawianie trwa")
  const endpoint = '/api/profiles/token/refresh/';
  const refresh = window.localStorage.getItem('refresh');
  const data = { 'refresh': refresh }

  let response = await fetchbackendlookup("POST", endpoint, data)
  if (response['access']) {
    window.localStorage.setItem("token", response['access'])
    return true
  }
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('refresh')
  return false
}

async function renewTokenIfexpired() {
  let token = window.localStorage.getItem("token")
  if (token != null) {
    if (isExpired(token)) {
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
  console.log("przekieruj do logowania")
}
export async function token_backend_lookup(method, endpoint, data){
  await renewTokenIfexpired()
  return await fetchbackendlookup(method,endpoint,data)
}