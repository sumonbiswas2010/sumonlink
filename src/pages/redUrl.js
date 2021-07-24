import React, {useState, useEffect} from 'react'
import {Redirect, useParams, Link} from 'react-router-dom'

const RedUrl = () => {

    const [loading, setIsLoading] = useState()
    const [full, setFull] = useState()
    const[msg, setMsg] =useState()
    const {url} = useParams();

    const getUrl = async () => {
        console.log("called")
        setIsLoading(true);
        try{
        const response = await fetch(`https://sumonlink-backend.herokuapp.com/api/redurl/${url}` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(response)
        
        const responseData = await response.json();
        console.log(responseData)
        if(response.ok) {
            //setFull(responseData.data.full)
            // setMsg("Successfull")
            let fullUrl = responseData.data.full
            if(!fullUrl.includes("http")){
                fullUrl="http://"+fullUrl
            }
            window.location.href=fullUrl
            
        }
        else {
            console.log("Error")
            setMsg("Error")
        }
          
        }
        catch {
            console.log("Catch")
        }
        setIsLoading(false)
        
        
    };

    function App() {
        useEffect(() => {
            getUrl();
            
        }, []);
    } 
    App();

    return(
        

        <div>OK {url}
        {/* {full &&<Redirect to= {full}/>} */}
        <br></br><br></br><br></br>
        {full && <a href={full}>Click here: {full}</a>}
        <br></br><br></br><br></br>
        {msg && <p>{msg}</p>}
        </div>
    )
}

export default RedUrl