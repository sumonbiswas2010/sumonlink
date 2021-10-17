import React, {useState, useEffect} from 'react';
import Loading from '../Component/Loading'
import './shortUrl.css'

const ShortUrl = () => {

    const [full, setFull] = useState()

    const [short, setShort] = useState()

    const [loading, setIsLoading] = useState()
    const [msg, setMsg] = useState()
    const [done, setDone] = useState()
    const [loggedIn, setLoggedIn] = useState()

    const fullChange = (e) => {
        setDone(false)
        setFull(e.target.value)
        setShort(getRandomString(5))
    }
    const shortChange = (e) => {
        setDone(false)
        setShort(e.target.value)
    }

    const token = localStorage.getItem("token")
    const loginCheck = async () => {
        setIsLoading(true);
        console.log("called");
        try{
        const response = await fetch('https://sumonlink-backend.vercel.app/api/userlogincheck' , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        //const responseData = await response.json();
        if(response.ok) {
            setLoggedIn(true)
        }
        else {
            setLoggedIn(false)
            console.log("Token Error")
        }
        }
        catch {
            console.log("Catch")
        }
        setIsLoading(false)
    };
    function App() {
        useEffect(() => {
            if(token){
                loginCheck()
            }
            
        }, []);
    } 
    App();


    const urlShrink = async e => {
        setDone(false)
        console.log("called")
        setIsLoading(true)
        e.preventDefault();

        try{
        const response = await fetch('https://sumonlink-backend.vercel.app/api/shrink' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                full, short
            })
            
        });
        //const resposneData = await response.json();
        console.log(response)
        if(response.ok) {
            setDone(true);
            setMsg("Link Created Successfully")
        }
        else if (response.status===400) {setMsg("Short Link Already Exists, Try something else.")}
        else if (response.status===500) {setMsg("Database Error!")}
        else if (response.status===405) {setMsg("Please fill all the fields correctly!")}
        else {setMsg("Something Bad, Contact Developers");}
        setIsLoading(false)
        
    }
    catch {
        setIsLoading(false)
    }
    }

    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    console.log(getRandomString(5))
    

    return (

        <React.Fragment>

        {loading && <Loading />}

        {!loading && !loggedIn &&<div> <br></br> <h3 className="center">Please <a href="/auth">Login</a> to use the tool!</h3></div>}

        {!loading && loggedIn && <div id="main-content">
            <br></br>
            <p className="center">Please fill the fields as your desire or get a random short url!</p>
            <form id="shrink">
            <br></br>
            <label className="url">Full URL: </label>
            <input value={full} onChange={fullChange} type="text" placeholder="www.example.com/example/bigurl" required></input>
            <br></br>
            <br></br>
            <label className="url">Desired Short URL: </label>
            <input value={short} onChange={shortChange}  type="text" required placeholder="smallurl"></input>
            <br></br><br></br>
            <button className="shrinkbtn" type="submit" onClick={urlShrink}>Shrink URL</button>
            </form>
        </div>}
        <br></br><br></br>
        <br></br>
        {!loading && msg && <p className="center">{msg}</p>}
        {done && !loading &&
            <div className="center">
                <p>Full URL: {full}</p>
                <p>Short URL: <a href={short}>{short}</a></p>
                <h4>Now can go to {full} by clicking <a href={short}>sumonlink.netlify.app/{short}</a></h4>
            </div>}

        </React.Fragment>
    )
}

export default ShortUrl