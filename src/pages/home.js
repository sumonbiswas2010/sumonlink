import React, {useState, useEffect} from 'react';
import './home.css'
import Loading from '../Component/Loading'

const Home = () => {

  const[isLoading, setIsLoading] =useState();
  const [temp, setTemp] =useState();
  const [aTemp, setAtemp] = useState();
  const getWeather = async() => {
    setIsLoading(true)

    console.log("called");
    try{
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=e4bdd4326ac64b2987c93822211407&q=Bagerhat&aqi=no' , {
        method: 'GET'
        
    });
    const responseData = await response.json();

    if(response.ok) {
      setTemp(responseData.current.temp_c)
      
      setAtemp(responseData.current.feelslike_c)
    }
    setIsLoading(false)
    
    
    }
      catch {
        setIsLoading(false)
        console.log("catch")
      }
    }

  

  function App() {
    useEffect(() => {
        getWeather()
    }, []);
  } 
  App();

  


    return(
      <div>
      {isLoading && <Loading />}
      {!isLoading &&
    <div className="App">
      <div>HomePage</div>
      <p>You can shorten your custom URL <a href="/shorturl">Here</a></p>
      
      <br></br> <br></br>
      <p><b>Current Temperature in Bagerhat: {temp}</b></p>
      <p><b>Feels Like: {aTemp}</b></p>
    </div>
    }
    </div>
    )
}
export default Home;