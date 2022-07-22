import { useEffect, useState } from "react";
export function useErrorManager(){
    const [errors,setErrors] = useState({})
    function addError(name,value){
        let newData = data
        newData[name] = value
        setErrors(newData)
    }
    function clear(){
        setErrors({})
    }
    return [errors,addError,clear]
}