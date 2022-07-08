import { useEffect, useState } from "react";
import { Login } from './Login';
import { Register } from './Register';
import './login.css'

export function LoginRegisterHub() {
    const [active, setActive] = useState(0)

    const options = [
        { name: "Login", value: <Login/> },
        { name: "Register", value: <Register onSucces={setLoginActive}/> }
    ]

    function handleClick(e,key){
        setActive(parseInt(key))
    }
    function setLoginActive(){
        setActive(0)
    }

    let options_jsx = options.map((element, index) => {
       
        let classNames = "menuOption";
        if (index == active) {
            classNames += " selectedMenuOption"
        }
        return (
            <div key={index} className={classNames} onClick={event => handleClick(event,index)}>
                <span className="menuOptionSpan">{element['name']}</span>
            </div>
        )
    })
    let activeOption = options[active]['value']
    return (
        <div className="parentDiv">
            <div className="menu">
                {options_jsx}
            </div>
                {activeOption}
        </div>
    );
}
export default LoginRegisterHub;

