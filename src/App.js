import React, {useState, useEffect} from 'react';
import Home from './pages/home'
import DemoLogin from './pages/DemoLogin'
import Taskbar from './Component/taskbar'
import ShortUrl from './pages/shortUrl'
import Profile from './pages/profile'
import NotFound from './pages/notFound'
import RedUrl from './pages/redUrl'
import Rating from './pages/rating'
import SocialLogin from './pages/socialLogin'
import MyServices from './pages/myServices';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';



const App = () => {

  const [loggedIn, setLoggedIn] = useState();
  const [isLoading, setIsLoading] = useState();

  
  const token= localStorage.getItem("token")

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
    const responseData = await response.json();
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
const loginStatus = (x) => {
  setLoggedIn(x);
}

  return (
    <React.Fragment>
    <Router>
      <Switch>
      <Route path="/social" exact>
        <Taskbar login={loggedIn}/>
        <SocialLogin/>
      </Route>
      <Route path="/profile" exact>
      <Taskbar login={loggedIn}/>
        <Profile/>
      </Route>
      <Route path="/rating" exact>
      <Taskbar login={loggedIn}/>
        <Rating login={loggedIn}/>
      </Route>
      <Route path="/shorturl" exact>
      <Taskbar login={loggedIn}/>
        <ShortUrl/>
      </Route>

      <Route path="/myservices" exact>
      <Taskbar login={loggedIn}/>
        <MyServices login={loggedIn}/>
      </Route>

      <Route path="/" exact>
      <Taskbar login={loggedIn}/>
        <Home/>
      </Route>

      
      <Route path="/demo" exact>
      <Taskbar login={loggedIn}/>
        <DemoLogin login={loginStatus}/>
      </Route>
      <Route path="/:url" exact>
        <RedUrl/>
      </Route>

      <Route path="*">
      <Taskbar login={loggedIn}/>
        <NotFound/>
      </Route>
      </Switch>
      </Router>
      
      </React.Fragment>
  );
}

export default App;
