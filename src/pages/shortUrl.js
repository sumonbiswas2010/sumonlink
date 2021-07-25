import React, {useState} from 'react';
import Loading from '../Component/Loading'

const ShortUrl = () => {

    const [full, setFull] = useState()

    const [short, setShort] = useState()

    const [loading, setIsLoading] = useState()
    const [msg, setMsg] = useState()
    const [done, setDone] = useState()

    const fullChange = (e) => {
        setDone(false)
        setFull(e.target.value)
    }
    const shortChange = (e) => {
        setDone(false)
        setShort(e.target.value)
    }

    const token = localStorage.getItem("token")


    const urlShrink = async e => {
        setDone(false)
        console.log("called")
        setIsLoading(true)
        e.preventDefault();

        try{
        const response = await fetch('https://sumonlink-backend.herokuapp.com/api/shrink' , {
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
    

    return (

        <React.Fragment>

        {loading && <Loading />}

        {!loading && <div>
            <form>
            <br></br>
            <label className="url">Full URL: </label>
            <input value={full} onChange={fullChange} type="text" required></input>
            <br></br>
            <br></br>
            <label className="url">Desired Short URL: </label>
            <input value={short} onChange={shortChange}  type="text" required></input>
            <br></br><br></br>
            <button type="submit" onClick={urlShrink}>Shrink URL</button>
            </form>
        </div>}
        <br></br><br></br>
        <br></br>
        {msg && <p>{msg}</p>}
        {done &&
            <div>
                <p>Full URL: {full}</p>
                <p>Short URL: <a href={short}>{short}</a></p>
            </div>}

        </React.Fragment>
    )
}

export default ShortUrl