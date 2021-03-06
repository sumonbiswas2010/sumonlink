import React, {useState, useEffect} from 'react'
import './taskbar.css'
import { Redirect  } from 'react-router-dom';

const Taskbar = (props) => {

    const [loggedIn, setIsLoggedIn] = useState();
    const token = localStorage.getItem("token")
    function App() {
        useEffect(() => {
            setIsLoggedIn(props.login);
            if(token){
                setIsLoggedIn(true)
            }
        }, [token]);
    } 
    App();

    
    const logout = (e) => {
        if(loggedIn)
        {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        console.log("called")
        return (
            <Redirect to="users"/>
        )
        
        }
        
    }

    return(
        <div className="taskbar">
            <a href="/auth" onClick={logout}>{loggedIn? 'Logout': 'Login'}</a>
            {loggedIn &&<a href="/profile">My Profile</a>}
            <a href="/myservices">My Services</a>
            <a href="/shorturl">URL Shortener</a>
            
        </div>
    )
}

export default Taskbar