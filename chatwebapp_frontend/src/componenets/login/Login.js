import { useEffect, useState } from "react";
import {useFormData} from './hooks/useFormData';
import {returnWaitIfLoading} from '../util/util';
import {loginRequest} from '../../lookup/lookup';
import './login.css'


export function Login(props) {
    const [error,setError] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [data,addData] = useFormData()

    function handleData(e){
        addData(e.target.name,e.target.value)
    }
 
    function submit(e){
        // walidacja po stronie klienta
        // tu winna się znaleść
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("refresh")
        setIsLoading(true)
        loginRequest(data)
        .then((response)=>{
            let responseBody = response.body
            if(response.status == 200){
                window.localStorage.setItem("token",responseBody['access'])
                window.localStorage.setItem("refresh",responseBody['refresh'])

                props.onSucces();
            }
            setError("Incorrect username or password.")
            setIsLoading(false)
        })
    }
    const button = returnWaitIfLoading(isLoading,(
        <button onClick={submit}>Login</button>
    ))

    return (
        <div className="loginDiv">
            <span className="loginTitle">Login</span>
            <form>
                <label htmlFor="username">Username:</label><br />
                <input type="text" name="username" onChange={handleData} /><br />
                <label htmlFor="password">Password:</label><br />
                <input type="password" name="password" onChange={handleData} /> <br />
                {button}
                <span className="errorText"></span>
            </form>
            <span className="loginBottomText">{error}</span>
        </div>
    );
}


