import { useEffect, useState } from "react";

function LoginForm(props) {

    function handleForm(e) {
        props.handleForm(e.value, e.name)
    }
    function submit(e){
        props.submit()
    }
    return (
        <div className="form">
            <form>
                <label for="fname">Username:</label><br />
                <input type="text"  name="username" onChange={handleForm}/><br />
                <label for="password">Password:</label><br />
                <input type="password"  name="password" onChange={handleForm} />
                <br />
                <button onClick={submit}>Login</button>
            </form>
        </div>
    );
}


