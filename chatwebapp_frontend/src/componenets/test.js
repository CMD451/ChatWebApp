import { useEffect } from "react";
import { backendLookup,fetchbackendlookup,token_backend_lookup } from '../lookup/backend_lookup';
const axios = require('axios');


function App() {

    useEffect(() => {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("refresh")
        const url = `http://127.0.0.1:8000/api/profiles/token/`;
        fetchbackendlookup("POST","/api/profiles/token/",{username:"user_8",password:'tobiasz123'})
        .then((response)=>{
            console.log(response)
            window.localStorage.setItem("token",response['access'])
            window.localStorage.setItem("refresh",response['refresh'])
        });   
    })
    function getIdentity(){
        token_backend_lookup("GET","/api/profiles/",null)
        .then((response)=>{
            console.log(response)
        })
    }
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    <button onClick={getIdentity}>Kliknij mnie!</button>
                </p>
            </header>
        </div>
    );
}

export default App;
