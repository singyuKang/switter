import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import React,{useState} from "react";
import { authService, firebaseInstance} from "../fBase";

// import {signInWithPopup} from "fbase/auth"

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event)=>{
        // console.log(event.target.value);
        // console.log(event);
        const {target : {name,value}} = event;
        if(name==="email"){
            setEmail(value)
        }else if (name ==="password"){
            setPassword(value)
        }
    }
    const onSubmit = async(event)=>{
    event.preventDefault();
    try{ 
        let data;
        if(newAccount){
            //Create account
            data = await createUserWithEmailAndPassword(authService, email, password);
        }else{
            //Log in
            data = await signInWithEmailAndPassword(authService, email, password);
        }
        console.log(data);
    }catch(error){
        console.log(error.message);
        setError(error.message);
    }
    }
    const toggleAccount =() => setNewAccount((prev) => !prev);
    const onSocialClick = async(event) =>{
        const {target : {name},} = event;
        let provider;
        if(name ==="google"){
            // provider = new firebaseInstance.auth.GoogleAuthProvider();
            // await authService.signInWithPopup(new firebaseInstance.auth.GoogleAuthProvider());
             provider = new GoogleAuthProvider();
            //  console.log(provider);

        }else if(name ==="github"){
            // provider = new firebaseInstance.auth.GithubAuthProvider();
            // await authService.signInWithPopup(new firebaseInstance.auth.GithubAuthProvider())
            provider = new GithubAuthProvider();
            console.log(provider);

        }
        try{
            await signInWithPopup(authService,provider);


        }catch(error){
            console.log(error);
        }

        // console.log(data)
    }

return (
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" value={email} type="email" placeholder= "Email" onChange={onChange} required />
            <input name="password" value={password} type="password" placeholder= "Password" onChange={onChange} required />
            <input type="submit" value={newAccount ? "Create Account" : "Log In" }/>
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Create Account" : "Sign in"}</span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>
    </div>
)
};

export default Auth;