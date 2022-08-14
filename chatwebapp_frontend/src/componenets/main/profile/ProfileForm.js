import { useEffect, useState, ReactDOM } from "react";
import { useFormData } from "../../login/hooks/useFormData";
import { useErrorManager } from '../utils/hooks/useErrorManager';
import { returnWaitIfLoading } from "../../util/util";
import { updateProfile } from "../../../lookup/lookup";

export function ProfileForm(props){
    const [errors, addError, clear, setErrors] = useErrorManager()
    const [isLoading, setIsLoading] = useState(false)
    const [data, addData] = useFormData()


   

    function updateProfileRequest(){
        const profileId = props.userData.profile.id
        console.log(data)
        let dataD = {'profile':data}
        updateProfile(dataD)
        .then((response)=>{
            console.log(response)
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