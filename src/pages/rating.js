import React, {useState, useEffect} from 'react';
import './rating.css'
import Loading from '../Component/Loading'
import Home from './home'

const Rating = (props) => {

    const [rate, setRate] = useState(5);
    const [comment, setComment] = useState();
    const [loggedIn, setLoggedIn] = useState();
    const [loading, setIsLoading] = useState();
    const [msg, setMsg] = useState();
    const [done, setDone] = useState();
    const token = localStorage.getItem("token")
    
    const checkRating = async () => {
        console.log("called")
        setIsLoading(true)
        try{
        const response = await fetch('https://sumonlink-backend.vercel.app/api/checkrating' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
               
            })
            
        });
        //const resposneData = await response.json();
        console.log(response)
        if(response.ok) {
        }
        else if (response.status===500) {setMsg("Database Error!")}
        else if (response.status===400) {
            setMsg("You have rated already!")
            setDone(true)}
        else {setMsg("Something Bad, Contact Developers");}
        setIsLoading(false)
        
    }
    catch {
        setIsLoading(false)
    }
    }
    function App() {
        useEffect(() => {
            setLoggedIn(props.login);
            if(token) {
                setLoggedIn(true);
                checkRating();
            }
            
        }, []);
    } 
    App();
    const rateSubmit = async e =>{
        console.log("called")
        setIsLoading(true)
        e.preventDefault();
        try{
        const response = await fetch('https://sumonlink-backend.vercel.app/api/rating' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                rate, 
                suggestions: comment
            })
            
        });
        //const resposneData = await response.json();
        console.log(response)
        if(response.ok) {
            setMsg("Rating Successful")
            setDone(true)
        }
        else if (response.status===500) {setMsg("Database Error!")}
        else if (response.status===405) {setMsg("Please fill all the fields correctly!")}
        else {setMsg("Something Bad, Contact Developers");}
        setIsLoading(false)
        
    }
    catch {
        setIsLoading(false)
    }


    }

    const rateSet = e => {
        setRate(e.target.value)
    }
    const commentSet = e =>{
        setComment(e.target.value)
    }


    return (
        <React.Fragment>
            {loading && !done && <Loading />}
            {!loggedIn && !done && !loading && <p className="center">Please log in to rate!!</p>}
            {loggedIn && !done && !loading && <div>
                <h2 className="center">Rate Here</h2>
                <br></br>
                <label className="rateLabel">Please Rate Between 1 to 5</label>
                <select onChange={rateSet} className="rateLabel">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option selected value="5">5</option>
                </select>
                <br></br>
                <br></br>
                <label className="rateLabel">If you want to comment anything: </label>
                <input onChange={commentSet} className="rateLabel" type="textarea"></input>
                <br></br><br></br>
                <button onClick={rateSubmit} className="center btn" type="submit">Submit Review</button>
            </div>}
            {msg && <p>{msg}</p>}
            {done && <Home/>}
        </React.Fragment>
    )
}

export default Rating