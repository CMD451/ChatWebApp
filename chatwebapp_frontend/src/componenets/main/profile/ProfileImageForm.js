import { useEffect, useState, ReactDOM } from "react";
import { useFormData } from "../../login/hooks/useFormData";
import { useErrorManager } from '../utils/hooks/useErrorManager';
import { returnWaitIfLoading,setTheme } from "../../util/util";
import { uploadProfileImage } from "../../../lookup/lookup";
import { useImage } from "../utils/hooks/useImage";

export function ProfileImageForm(props){
    const [isLoading, setIsLoading] = useState(false)
    const [isImageLoading,setIsImageLoading] = useState(false)
    const [uri,setEvent,setInital] = useImage(setIsImageLoading)
    const [error,setError] = useState(null)


  
    function uploadImageRequest(data){
        setIsLoading(true)
        uploadProfileImage(data)
        .then((response)=>{
            const status = response.status
            const body = response.body
            if(status === 200){
              //change user profile in context
              let new_user = {...props.userData}
              new_user.profile.image = body.image
              props.setUser(new_user)
              clearForm()
            }
            else{
                setError(body.error)
            }
            
            setIsLoading(false)
        })
    }
    function handleImageChange(e){
        e.preventDefault()
        setEvent(e)
    }
    function clearForm(){
        document.getElementById('imageForm').reset();
    }
    useEffect((()=>{
        setInital(props.userData.profile.image)
    }),[props.userData.profile.image,setInital])

    const buildImageTag = ()=>{
            if(isImageLoading){
                return null
            }
            return(
                <div className="profile-image-container" >
                    <img className="profile-image" src={uri} alt="profile"/>
                    <h4>Your profile picture</h4>
                </div>
                
            )  
    }
   
    const handleButton = (e)=>{
        e.preventDefault()
        const form = document.getElementById('imageForm');
        uploadImageRequest(new FormData(form))
    }

    const buttonTag = returnWaitIfLoading(isLoading,(
        <button onClick={handleButton}>Upload Image</button>
    ))
    console.log("re-render")
    const imageTag = buildImageTag()
    return(
        <form name="imageForm" id="imageForm">
                {imageTag}
                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange}/>
                <p>
                    {error}
                </p>
                {buttonTag}
        </form>
    )
}