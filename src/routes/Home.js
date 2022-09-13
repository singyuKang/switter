import { dbService } from "fBase";
import React, {useState, useEffect} from "react";
import {addDoc, collection,query, onSnapshot, getDocs} from "firebase/firestore";


const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async() =>{
        const q =query(collection(dbService,"nweets"));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);
        querySnapshot.forEach((doc)=>{
            const nweetObj={
                ...doc.data(),
                id:doc.id,
            }
            console.log(nweetObj);
            setNweets(prev=>[nweetObj,...prev]);
        });
        console.log(nweets);
        

    };


    useEffect(()=>{
        getNweets();
    },[])

    const onSubmit = async(event) =>{
        event.preventDefault();
        try{
            const docRef = await addDoc(collection(dbService, "nweets"), {
                nweet,
                createdAt: Date.now(),
            });
        console.log("Document written with ID: ", docRef.id);

        }catch(error){
            console.error("Error adding document: ", error);
        }
    
        setNweet("");
    };
    const onChange = (event) =>{
        const { target:{value}} = event;
        setNweet(value);


    }
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120} />
            <input type="submit" value="Sweet" />
        </form>
        <div key={nweet.id}>
            {
                nweets.map((nweet)=> (
                <div>
                    <h4>{nweet.nweet}</h4>
                </div>))
            }
        </div>
    </div>
    )
}
export default Home;