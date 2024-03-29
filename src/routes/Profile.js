import React from 'react';
import { authService } from "../fBase";
import {useNavigate} from "react-router-dom";

export default () =>{
    const navigate = useNavigate();
    const onLogOutClick = () =>{
        authService.signOut();
        navigate("/");
    };

    return (
        <>
            <button  onClick={onLogOutClick}>Log out</button>
        </>

    )

}