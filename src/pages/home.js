import React, {useState, useEffect} from 'react';
import './home.css'
import Loading from '../Component/Loading'

const Home = () => {

  const[isLoading, setIsLoading] =useState();
  const [temp, setTemp] =useState();
  const [aTemp, setAtemp] = useState();
  const [rating, setRating] = useState();

  const getWeather = async() => {
    setIsLoading(true)

    console.log("called");
    try{
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=e4bdd4326ac64b2987c93822211407&q=Dhaka&aqi=no' , {
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

    const getRating = async() => {
      setIsLoading(true)
  
      try{
      const response = await fetch('https://api.link.sumon.com.bd/api/ratings' , {
          method: 'POST'
          
      });
      const responseData = await response.json();
  
      if(response.ok) {
        setRating(responseData.rating)
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
        getRating()
    }, []);
  } 
  App();

  


    return(
      <div id="homeAll">
      {isLoading && <Loading />}
      {!isLoading &&
    <div className="App center">
      <h3>Homepage</h3>
      <p>You can shorten your custom URL <a href="/shorturl">Here</a></p>
      <p>Site Rating: {rating} Out of 5! You can rate <a href="/rating">Here</a></p>
      <img className="homeimg" src="../open-graph.png"></img>
      
      <br></br>
      <p><b>Current Temperature in Dhaka, Bangladesh: {temp}&#176;C</b></p>
      <p><b>Feels Like: {aTemp}&#176;C</b></p>
    </div>
    }
    </div>
    )
}
export default Home;