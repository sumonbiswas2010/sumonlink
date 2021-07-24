import React from 'react';
import Home from './pages/home'
import DemoLogin from './pages/DemoLogin'
import Taskbar from './Component/taskbar'
import ShortUrl from './pages/shortUrl'
import Profile from './pages/profile'
import NotFound from './pages/notFound'
import RedUrl from './pages/redUrl'
import SocialLogin from './pages/socialLogin'
import MyServices from './pages/myServices';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';



const App = () => {
  return (
    <React.Fragment>
    <Taskbar/>
    <Router>
      <Switch>
      <Route path="/social" exact>
        <SocialLogin/>
      </Route>
      <Route path="/profile" exact>
        <Profile/>
      </Route>
      <Route path="/shorturl" exact>
        <ShortUrl/>
      </Route>

      <Route path="/myservices" exact>
        <MyServices/>
      </Route>

      <Route path="/" exact>
        <Home/>
      </Route>

      
      <Route path="/demo" exact>
        <DemoLogin/>
      </Route>
      <Route path="/:url" exact>
        <RedUrl/>
      </Route>

      <Route path="*">
        <NotFound/>
      </Route>
      </Switch>
      </Router>
      
      </React.Fragment>
  );
}

export default App;
