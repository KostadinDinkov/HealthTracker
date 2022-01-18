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
            loggedIn:true //false
        }
    }

    onChangeLogStatus(e){
        this.setState({loggedIn:e});
    }
    logOut = () => {
        localStorage.setItem('loggedIn',false)
        localStorage.setItem('user',{})
        window.location.reload();
      };
    componentDidMount(){
        window.addEventListener("storage", e =>
        this.onChangeLogStatus(e.loggedIn))
    }
    render(){
         
        var account=''
        //var user=localStorage.getItem('loggedIn');
        var user = this.state.loggedIn;
        console.log(user);
        if(user===true){
            account=<div className="Account">
                <NavLink className="menu_button" to="/users/7">Profile</NavLink>
                <button className="menu_button" onClick={this.logOut}>Logout</button>
            </div>
        }else{
            account=<div className="Account">
                <NavLink className="menu_button" to="/login">Login</NavLink>
                <NavLink className="menu_button"to="/registration">Register</NavLink>
            </div>
        }
        return(
            <div className="top_bar_container">
        <NavLink to='/home' className="menu_button"><FontAwesomeIcon className="icon" icon={faHome}/> Home</NavLink>
        {account}
    </div>
        );
}
}
export default TopBar;