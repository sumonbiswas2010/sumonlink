import React, {useState, useEffect} from 'react'
import MyServicesData from '../Component/myServicesData'
import Loading from '../Component/Loading'

const MyServices =  () => {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState();
    const [loggedIn, setLoggedin]= useState(false);
    const [ok, setOk] = useState();
    let token = localStorage.getItem("token")

    const getData = async () => {
        setIsLoading(true);
        console.log("called");
        try{
        const response = await fetch('https://sumonlink-backend.herokuapp.com/api/myservices' , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        
        const responseData = await response.json();
        console.log(responseData)
        if(response.ok) {
            setLoggedin(true)
            setData(responseData)
            if(responseData.data.length > 0) {
                setOk(true)
            }
            else {
                setOk(false)
            }
            
        }
        else {
            console.log("Error")
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
                getData();
            }
            
        }, []);
    } 
    App();

    return (
        <div>
            <p>My Services</p>
            {isLoading && <Loading/>}
            {!loggedIn && <p>Please log in to view</p>}
            {!isLoading &&
            <div className="container">
            {data &&
            <div>
            <br></br>
            {!ok && <p className="center">You can view your links here, so please create one first at <b><a href="shorturl">here</a></b></p>}
            {ok && <MyServicesData data = {data}/>}
            </div>}
            </div>
            }
        </div>
    )

}

export default MyServices