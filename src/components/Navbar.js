// navbar code goes here
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"


class Navbar extends Component{

    render(){
        return(
            
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <a class="navbar-brand" href="#">
  </a>
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="/">Home <span class="sr-only">(current)</span></a>
      </div>
      <div class="navbar-nav ml-auto">
      <a class="nav-item nav-link" href="/login" >Login</a>
      <a class="nav-item nav-link" href="/register">Register</a>
    </div>
  </div>

  
</nav>
        )


    }

}

export default Navbar;