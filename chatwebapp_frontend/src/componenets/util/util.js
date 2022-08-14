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

export function setTheme(bgColor,scColor){
    let colors = {
        'background':bgColor,
        'secondary':scColor
    }
    for (const [key, value] of Object.entries(colors)) {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    

}