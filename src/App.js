import Navbar from './components/Navbar'
import Test from './components1/Test'
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

      <Route exact path="/">
            <Home />
      </Route>

      <Route exact path="/test">
            <Test />
      </Route>


      </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
