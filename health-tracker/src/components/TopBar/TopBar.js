import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from 'react-router-dom';
import './TopBar.css'

class TopBar extends Component{
    constructor(props){
        super(props);
        this.onChangeLogStatus.bind(this);
        this.state={
            loggedIn:localStorage.getItem('loggedIn'),
            account:''
        }
        if(localStorage.getItem('loggedIn')==="true"){
            this.state={
                loggedIn:true,
                account:
            <div className="Account">
                <NavLink className="menu_button" to="/users/7">Profile</NavLink>
                 <button className="menu_button" onClick={this.logOut}>Logout</button>
             </div>
            }
        }
        else{
            this.state={
                loggedIn:false,
                account:
            <div className="Account">
                <NavLink className="menu_button" to="/login">Login</NavLink>
                <NavLink className="menu_button"to="/registration">Register</NavLink>
            </div>
            }
        }

        console.log(localStorage.getItem('loggedIn'))
        console.log(this.state.loggedIn)
        console.log(this.state.account)
    }

    onChangeLogStatus(e){
        console.log("state updated")
        this.setState({loggedIn:e});
    }
    logOut = () => {
        localStorage.setItem('loggedIn',false)
        localStorage.setItem('email',"")
        window.location.reload();
      };
    componentDidMount(){
        window.addEventListener("storage", e =>
        this.onChangeLogStatus(e.loggedIn))
    }
    render(){
         

        
        return(
            <div className="top_bar_container">
        <NavLink to='/home' className="menu_button"><FontAwesomeIcon className="icon" icon={faHome}/> Home</NavLink>
        {this.state.account}
    </div>
        );
}
}
export default TopBar;