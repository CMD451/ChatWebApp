import { useEffect, useState } from "react";
export function useErrorManager(){
    const [errors,setErrors] = useState({})
    function addError(name,value){
        let newData = errors
        newData[name] = value
        setErrors(newData)
    }
    function clear(){
        setErrors({})
    }
    function replaceErrors(errors){
        setErrors(errors)
    }
    return [errors,addError,clear,replaceErrors]
}