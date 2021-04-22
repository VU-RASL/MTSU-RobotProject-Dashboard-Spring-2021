// navbar code goes here
import { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Logout from '../layouts/Logout'
import logo from '../images/vandy_logo.png'
import Search from '../components/Search'



class Navbar extends Component {
  constructor() {
    super()
    // logic created to hide the logout button , if the storage/token is empty or not 
    var hideComponent;
    if (localStorage.getItem("token") != null) {
      hideComponent = false
    }
    else {
      hideComponent = true
    }


    this.state = {
      HideComp: hideComponent
    }


  }

  render() {
    return (

      <div className="header">

        <nav className="navbar navbar-expand-lg py-0 navbar-dark " style={{ backgroundColor: "black" }}>
          <a className="navbar-brand" href="/">
            <img src={logo} width="30" height="30" alt="" />

          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" style={{ borderColor: "gray" }} data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" style={{ color: '#FFD700' }} href="/">Home <span className="sr-only">(current)</span></a>
            </div>
            <div className="navbar-nav ml-auto">
              <div style={{ paddingRight: "40px" }}><Search /> </div>
              {this.state.HideComp ? null : <div style={{ width: "80px" }}> <Logout /> </div>}
            </div>
          </div>


        </nav>
      </div>
    )


  }

}

export default Navbar;