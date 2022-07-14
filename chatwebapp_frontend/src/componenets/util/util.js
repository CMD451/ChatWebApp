export function returnWaitIfLoading(loading,jsx){
    if(!loading){
        return jsx
    }
    return returnLoading()
}
export function returnLoading(){
    return(
        <div>
            <span>Loading...</span>
        </div>
    )
}