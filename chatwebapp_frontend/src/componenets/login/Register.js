import { useState } from "react";
import { returnWaitIfLoading } from "../util/util";
import { registerRequest } from "../../lookup/lookup";
import { useFormData } from './hooks/useFormData';

export function Register(props) {
    const [errors, setErrors] = useState({});
    const [data, addData] = useFormData()
    const [isLoading, setIsLoading] = useState(false)
    const button = returnWaitIfLoading(isLoading, (
        <button onClick={submit}>Sing in</button>
    ))
    function handleData(e) {
        addData(e.target.name, e.target.value)
    }
 
    function isDataEmpty(dataList) {
        let newErrors = {}
        dataList.forEach((value)=>{
            if(!data.hasOwnProperty(value)){
                newErrors[value] = "This field cannot be empty"
            }
        })
        return newErrors
    }
    function submit(e) {
        e.preventDefault()
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("refresh")
        setIsLoading(true)
        //walidacja po stronie klienta


        let newErrors = isDataEmpty(["username","password","password2"]);
        if(!newErrors['password2']&&!newErrors['password']){
            if(newErrors['password1']!=newErrors['password2']){
                newErrors['password2'] = "Passwords do not match";
            }
        }
       
       
        if(Object.keys(newErrors).length !== 0){
            setErrors(newErrors)
            setIsLoading(false)
            return
        }
        registerRequest(data)
            .then((response) => {
                console.log(response)
                let responseBody = response.body
                if (response.status == 201) {
                    props.onSucces();
                    return
                }
                let errorList = {}
                Object.keys(responseBody).forEach((key) => {
                    errorList[key] = responseBody[key]
                })
                setErrors(errorList)
                setIsLoading(false)
            })
    }
    return (
        <div className="loginDiv">

            <span className="loginTitle">Register</span>
            <form>
                <label htmlFor="username">Username:</label><br />
                <input type="text" name="username" onChange={handleData} /><br />
                <span className="errorText">{errors['username'] && errors['username']}</span><br />

                <label htmlFor="password">Password:</label><br />
                <input type="password" name="password" onChange={handleData} /> <br />
                <span className="errorText">{errors['password'] && errors['password']}</span><br />

                <label htmlFor="password2">Repeat Password:</label><br />
                <input type="password" name="password2" onChange={handleData} /> <br />
                <span className="errorText"> {errors['password2'] && errors['password2']} </span><br />

                {button}
                <span className="errorText"></span>
            </form>

        </div>
    );
}
export default Register;

