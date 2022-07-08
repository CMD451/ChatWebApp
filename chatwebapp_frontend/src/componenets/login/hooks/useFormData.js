import { useEffect, useState } from "react";
export function useFormData(){
    const [data,setData] = useState({})
    function addData(name,value){
        let newData = data
        newData[name] = value
        setData(newData)
    }
    return [data,addData]
}