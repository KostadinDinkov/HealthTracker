import './UserPage.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import React from 'react';

class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeHeight = this.onChangeHeight.bind(this)
        this.onChangeWeight = this.onChangeWeight.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.editProfile = this.editProfile.bind(this)
        this.state = {
            email: localStorage.getItem('email'),
            first_name: "Error",
            last_name: "Error",
            gender:1,
            birthDate: -1,
            height: -1,
            weight: -1,
            foods: [],
            exercises: [],

            temp_first_name:'',
            temp_last_name:'',
            temp_height:'',
            temp_weight:''
        }
        //this.state = {user:{user_name:"Yordan Vladov",user_birthdate:"1999-08-09",user_height:"172",user_weight:"75.2"}}
    }
    componentDidMount() {
        var user = {}
        user["email"] = localStorage.getItem('email')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        fetch('/users/details', requestOptions)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({ first_name: res["first_name"] })
                this.setState({ last_name: res["last_name"] })
                this.setState({ birthDate: res["birthDate"] })
                this.setState({ height: res["height"] })
                this.setState({ weight: res["weight"] })
                this.setState({ foods: res["foods"] })
                this.setState({ exercises: res["exercises"] })
                this.setState({gender:res["gender"]})
            }
            )
            .catch(error => { console.error(error) })

    }
    editProfile(){
        document.getElementById('profile').style.display="none"
        document.getElementById('edit').style.display="flex"
    }

    onChangeFirstName(e){
        this.setState({temp_first_name: e.target.value})
    }
    onChangeLastName(e){
        this.setState({temp_last_name: e.target.value})
    }
    onChangeHeight(e) {
        this.setState({ temp_height: e.target.value })
    }
    onChangeWeight(e){
        this.setState({temp_weight: e.target.value})
    }
    onSubmit(e){
        e.preventDefault()

        var isChange = false
        var user = {}
        user["email"] = this.state.email
        user["first_name"] = this.state.first_name
        user["last_name"] = this.state.last_name
        user["birthDate"] = this.state.birthDate
        user["height"] = this.state.height
        user["weight"] = this.state.weight
        user["foods"] = this.state.foods
        user["exercises"] = this.state.exercises
        user["gender"] = this.state.gender

        var first_name = this.state.temp_first_name;
        if(first_name!==""){
            this.setState({first_name:first_name})
            user["first_name"] = first_name;
            isChange = true
        }

        var last_name = this.state.temp_last_name;
        if(last_name!==""){
            user["last"] = last_name;
            this.setState({last_name:last_name})
            isChange = true
        }

        var height = this.state.temp_height

        if(height!==""){
            user["height"] = height;
            this.setState({height:height})
            isChange = true
        }

        var weight = this.state.temp_weight

        if(weight!==""){
            user["weight"] = weight;
            this.setState({weight:weight})
            isChange = true
        }

        if(isChange){
            

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
    
            fetch('/users/update', requestOptions).then(res => res.text())
                .then(res => {
                    console.log(res)
                }
                )
                .catch(error => { console.error(error) })
        }
        document.getElementById('profile').style.display="flex"
        document.getElementById('edit').style.display="none"
    }

    render() {
        return (
            <div className="UserPage">
                <div id="profile" className="profile-tab">
                    <div className="profile-header">
                        <span>User Profile</span>
                        <button onClick={this.editProfile}><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></button>
                    </div>
                    <span className="username">Name: {this.state.first_name} {this.state.last_name}</span>
                    <span className="date-of-birth">Age: {this.state.birthDate}</span>
                    <span className="height">Height: {this.state.height} cm</span>
                    <span className="weight">Weight: {this.state.weight} kg</span>
                </div>

            <div id="edit" className="edit-tab">
                <span className="field-name">First Name</span>
                <input className="field-input" id="first_name" type="text" value={this.state.temp_first_name} onChange={this.onChangeFirstName}></input>

                <span className="field-name">Last Name</span>
                <input className="field-input" id="last_name" type="text" value={this.state.temp_last_name} onChange={this.onChangeLastName}></input>

                <span className="field-name">Height</span>
                <input className="field-input" id="height" type="number" min="0" value={this.state.temp_height} onChange={this.onChangeHeight}></input>

                <span className="field-name">Weight</span>
                <input className="field-input" id="weight" type="number" min="0" value={this.state.temp_weight} onChange={this.onChangeWeight}></input>

                <button className="submit-btn" onClick={this.onSubmit}>Update</button>
                </div>
            </div>
        );
    }
}

export default UserPage;
