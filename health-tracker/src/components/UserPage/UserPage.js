import './UserPage.css';
import {BrowserRouter, Route,Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from 'react-router-dom';
import React from 'react';

class UserPage extends React.Component{
    constructor(props){
        super(props);  
        this.state={
            email: localStorage.getItem('email'),
                first_name: "Error",
                last_name: "Error",
                age: -1,
                height: -1,
                weight: -1,
                foods: [],
                exercises: []
        }

        
        //this.state = {user:{user_name:"Yordan Vladov",user_birthdate:"1999-08-09",user_height:"172",user_weight:"75.2"}}
    }
    componentDidMount(){
        var user = {}
        user["email"] = localStorage.getItem('email')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body:  JSON.stringify(user)
          };

          fetch('/users/details', requestOptions)
        .then(res => res.json())
        .then(res => 
          {
            console.log(res)
            this.setState({first_name : res["first_name"]})
            this.setState({last_name : res["last_name"]})
            this.setState({age : res["age"]})
            this.setState({height : res["height"]})
            this.setState({weight:res["weight"]})
            this.setState({foods:res["foods"]})
            this.setState({exercises : res["exercises"]})
          }
          )
        .catch(error=>{console.error(error)})
        
    }
    render(){
        return (
    <div className="UserPage">
        <div className="profile"> 
        <span className="username">Name: {this.state.first_name} {this.state.last_name}</span>
        <span className="date-of-birth">Age: {this.state.age}</span>
        <span className="height">Height: {this.state.height} cm</span>
        <span className="weight">Weight: {this.state.weight} kg</span>
        </div>
    </div>
  );
}
}

export default UserPage;