import { useState, useCallback  } from "react";
export function useImage(setIsLoading){
    const [uri,setUri] = useState({})
    
    function setEvent(event){
        if (event && event.target.files && event.target.files[0]) {
            setIsLoading(true)
            let reader = new FileReader();
            reader.onload = function (ev) {
                setUri(ev.target.result)
                console.log("załadowano")
                setIsLoading(false)
            }
            reader.readAsDataURL(event.target.files[0]);
        }
        
    }
    const setInitialUrl = useCallback((url)=>{
        setUri(url)
    },[])
    return [uri,setEvent,setInitialUrl] 
}