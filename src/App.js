import Navbar from './components/Navbar'
import Profile from './components/Profile'
import LineChart from './components/LineChart'
import Register from './layouts/Register'
import Login from './layouts/Login'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './layouts/Home';




function App() {

  return (
    <Router>
    <div className="App">

      <Navbar/>

      <div class = "container">
      
      <Switch>
      
      <Route exact path="/register"> 
              <Register /> 
            </Route>

      <Route exact path="/login">
            <Login />
      </Route>

      <Route exact path="/" component={Home}>
            
      </Route>

      <Route exact path="/test">
        <LineChart/>
            
      </Route>

      <Route exact path="/participant_profile" component={Profile}>
            
      </Route>

      </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
