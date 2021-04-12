// navbar code goes here
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Logout from '../layouts/Logout'
import logo from '../images/vandy_logo.png'


class Navbar extends Component{
  constructor(){
    super()
    // logic created to hide the logout button , if the storage/token is empty or not 
    var hideComponent;
    if (localStorage.getItem("token")!= null){
        hideComponent = false
    }
    else{
        hideComponent = true
    }


    this.state = {
        HideComp:hideComponent
    }


}

    render(){
        return(

          <div class="header">
            
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <a class="navbar-brand" href="/">
  <img src={logo} width="30" height="30" alt=""/>

  </a>
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="/">Home <span class="sr-only">(current)</span></a>
      </div>
      <div class="navbar-nav ml-auto">
      
      { this.state.HideComp ? null: <a class="nav-item nav-link"><Logout/></a> } 
    </div>
  </div>

  
</nav>
</div>
        )


    }

}

export default Navbar;