export function returnWaitIfLoading(loading,jsx){
    if(!loading){
        return jsx
    }
    return(
        <div>
            <span>Loading...</span>
        </div>
    )
}