import AppRouter from "./Router";
import {useState,useEffect} from "react";
import fBase, { authService } from "../fBase"
import { getAuth } from "@firebase/auth";

function App() {
  // console.log(authService.currentUser);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      // console.log(user);
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
   }
  )
    

  // setInterval(()=>{
  //   console.log(authService.currentUser);
  // },2000);
  

  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing"}
    <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
    
  );
}

export default App;
