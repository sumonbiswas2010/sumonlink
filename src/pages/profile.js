import React, {useState, useEffect} from 'react'
import Loading from '../Component/Loading'
import UserProfile from '../Component/userProfile'

const Profile = () => {

    const [loading, setIsLoading] = useState()
    const [userFound, setUserFound] = useState()
    const [userData, setUserData] = useState()
    const token = localStorage.getItem("token")
    const getProfile = async () => {
        setIsLoading(true);
        //console.log("called");
        try{
        const response = await fetch('https://sumonlink-backend.vercel.app/api/profile' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        
        const responseData = await response.json();
        
        if(response.ok) {
            setUserFound(true)
            setUserData(responseData.data)
            console.log(userData)
        }
        else {
            console.log("Error")
        }
          
        }
        catch {
            console.log("oops")
        }
        setIsLoading(false)
    };

    function App() {
        useEffect(() => {
            getProfile()
        }, []);
      } 
      App();

    return(
        <div>
            <h2 className="center">My Profile</h2>
            {loading && <Loading />}
            {!loading && userFound && <UserProfile data={userData}/>}
            {!loading && <h3 className="center">Please Rate your Experience <a href="/rating">Here</a></h3>}
        </div>
    )
}

export default Profile