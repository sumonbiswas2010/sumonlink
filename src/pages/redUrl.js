import React, {useState, useEffect} from 'react'
import {Redirect, useParams, Link} from 'react-router-dom'
import Loading from '../Component/Loading'
import './redUrl.css'
const RedUrl = () => {

    const [loading, setIsLoading] = useState()
    const [full, setFull] = useState()
    const[msg, setMsg] =useState()
    const {url} = useParams();

    const getUrl = async () => {
        console.log("called")
        setIsLoading(true);
        try{
        const response = await fetch(`https://api.link.sumon.com.bd/api/redurl/${url}` , {
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
            setMsg("No Link Found. <br> Maybe Create one at <a href='/shorturl'>Here</a>")
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

        <div id="redurlcontainer">
            {!msg && <Loading/>}
            {full && <a href={full}>Click here: {full}</a>}
            {msg && <h4 className="center nolinkfound" dangerouslySetInnerHTML={{__html: msg}} />}
        </div>
    )
}

export default RedUrl