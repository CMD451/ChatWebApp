import { useEffect, useState, ReactDOM } from "react";
import { useFormData } from "../../login/hooks/useFormData";
import { useErrorManager } from '../utils/hooks/useErrorManager';
import { returnWaitIfLoading,setTheme } from "../../util/util";
import { updateProfile } from "../../../lookup/lookup";
import { useImage } from "../utils/hooks/useImage";

export function ProfileForm(props){
    const [errors, addError, clear, setErrors] = useErrorManager()
    const [isLoading, setIsLoading] = useState(false)
    const [data, addData] = useFormData()


    function validateData(){
        return true
    }
    function updateProfileRequest(){
        if(!validateData()){
            return 
        }
        setIsLoading(true)
        let requestData = {'profile':data}
        updateProfile(requestData)
        .then((response)=>{
            const status = response.status
            const body = response.body
            if(status === 200){
               const profile = body.profile
               setTheme(profile.backgroundColor,profile.secondaryColor);
            }
            setIsLoading(false)
            console.log(body)
        })
    }
    

    const handleButton = (e)=>{
        e.preventDefault()
        updateProfileRequest()
    }
   
    return(
        <form>
                
               
                <label htmlFor="name">description:</label>
                <input onChange={(e) => addData("description", e.target.value)} type="text" id="description" name="description" /><br />

                <label htmlFor="name">background color:</label>
                <input onChange={(e) => addData("backgroundColor", e.target.value)} type="color" id="bgColor" name="bgColor" /><br />

                <label htmlFor="name">secondary color:</label>
                <input onChange={(e) => addData("secondaryColor", e.target.value)} type="color" id="scColor" name="scColor" /><br />

                <button onClick={handleButton}>Update Profile</button>


        </form>
    )
}