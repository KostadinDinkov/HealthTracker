import './UserPage.css';
import {BrowserRouter, Route,Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from 'react-router-dom';
import React from 'react';

class UserPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {user:{user_name:"Yordan Vladov",user_birthdate:"1999-08-09",user_height:"172",user_weight:"75.2"}}
    }
    componentDidMount(){
        //fetch(`/api/users/${this.props.match.params.id}`)
        //.then(res=>res.json())
        //.then(user => this.setState({user},() => console.log('user fetched...', user)));
    }
    render(){
        return (
    <div className="UserPage">
        <div className="profile"> 
        <span className="username">Username:{this.state.user.user_name}</span>
        <span className="date-of-birth">Born:{this.state.user.user_birthdate}</span>
        <span className="height">{this.state.user.user_height} cm</span>
        <span className="weight">{this.state.user.user_weight} kg</span>
        </div>
    </div>
  );
}
}

export default UserPage;