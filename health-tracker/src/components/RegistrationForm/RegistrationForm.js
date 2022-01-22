import './RegistrationForm.css';
import { Navigate } from 'react-router-dom'

import React from 'react';

class RegistrationForm extends React.Component{
    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeBirthDate= this.onChangeBirthDate.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeResult= this.onChangeResult.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        
        if(localStorage.getItem('loggedIn')==="true"){
            this.state = {
                email:'',
                first_name:'',
                last_name:'',
                gender:'male',
                password:'',
                birth_date:'',
                weight:'',
                height:'',
                result:'',
                navigator:<Navigate replace to='/home'/>
            };
        }
        else{
            this.state = {
                email:'',
                first_name:'',
                last_name:'',
                gender:'male',
                password:'',
                birth_date:'',
                weight:'',
                height:'',
                result:'',
                navigator:''
            };
        }
    }
    handleClick = () => {
        window.location.reload();
      };
    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }
    onChangeFirstName(e){
        this.setState({first_name:e.target.value})
    }
    onChangeLastName(e){
        this.setState({last_name:e.target.value})
    }
    onChangeGender(e){
        this.setState({gender:e.target.value})
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    onChangeBirthDate(e) {
        this.setState({ birth_date: e.target.value })
    }
    onChangeResult(e) {
        this.setState({ result: e })
    }
    onChangeHeight(e) {
        this.setState({ height: e.target.value })
    }
    onChangeWeight(e){
        this.setState({weight: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        var user={};
        user["email"]=this.state.email;
        user["password"]=this.state.password;
        user["first_name"]=this.state.first_name;
        user["last_name"]=this.state.last_name;
        
        var gender = this.state.gender;
        if(gender==="male")
        {
            user["gender"]="1";
        }
        else{
            user["gender"]="0";
        }
        //user["gender"]=this.state.gender;
        //user["birth_date"]=this.state.birth_date;
        user["age"]="22";
        user["height"]=this.state.height;
        user["weight"]=this.state.weight;
        console.log(user)
        var email_reg=/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        var name_reg=/^[A-Za-z ,.'-]+$/;
        var height_reg=/^(0|[1-9]\d*)(,\d+)?$/;
        var weight_reg=/^(0|[1-9]\d*)(,\d+)?$/;
        var passwd_reg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{,20}$/;
        var isError=0;
        
        if(email_reg.test(this.state.email)===false){
            document.getElementById('email-error').innerHTML="Invalid email";
            document.getElementById('email-error').style.display="flex";
            isError=1;
        }
        else{
            document.getElementById('email-error').style.display="none";
        }

        if(name_reg.test(this.state.first_name)===false){
            document.getElementById('first-name-error').innerHTML="Invalid name";
            document.getElementById('first-name-error').style.display="flex";
            isError=1;
        }
        else{
            document.getElementById('first-name-error').display="none";
        }

        if(name_reg.test(this.state.last_name)===false){
            document.getElementById('last-name-error').innerHTML="Invalid name";
            document.getElementById('last-name-error').style.display="flex";
            isError=1;
        }
        else{
            document.getElementById('last-name-error').display="none";
        }

        if(this.state.birth_date.length===0){
            document.getElementById('birthdate-error').innerHTML="Required Field";
            document.getElementById('birthdate-error').style.display="flex";
            isError=1;
        }
        else{
            document.getElementById('birthdate-error').style.display="none";
        }


        if(height_reg.test(this.state.height)===false){
            document.getElementById('height-error').innerHTML="Invalid height.";
            document.getElementById('height-error').style.display="flex";
            isError=1;
        }
        else{
            document.getElementById('height-error').style.display="none";
        }

        if(weight_reg.test(this.state.weight)===false){
            document.getElementById('weight-error').innerHTML="Invalid weight.";
            document.getElementById('weight-error').style.display="flex"
            isError=1;
        }
        else{
            document.getElementById('weight-error').style.display="none";
        }

        if(this.state.password.length===0){
            document.getElementById('password-error').innerHTML="Required Field";
            document.getElementById('password-error').style.display="flex";
            isError=1;
        }else if(this.state.password.length>20){
            document.getElementById('password-error').innerHTML="Password is too long. Max Length is 20 characters";
            document.getElementById('password-error').style.display="flex";
            isError=1;
        }
        else{
            document.getElementById('password-error').style.display="none";
        }

        if(isError===1){
            console.log("false")
            return false
        }
        else{
        console.log(JSON.stringify(user))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user) 
        };
        fetch('users/register', requestOptions).then(result=>this.setState({result},() => 
            {console.log('result fetched...', result);
            if(result.statusText==='OK'){
                localStorage.setItem('loggedIn',true)
                localStorage.setItem('email',this.state.email);
                this.handleClick();
            }
            else if(result.statusText==='User already exists'){
                document.getElementById('email-error').innerHTML="User already exists";
                document.getElementById('email-error').style.display="flex";
            }
            else{
                document.getElementById('email-error').innerHTML="Error";
                document.getElementById('email-error').style.display="flex";
            }
        }
            )).catch(error=>{console.error(error)})

                 
     }  
               
        
    }

    render(){
        return (

    <div className="RegistrationForm">
        {this.state.navigator}
        <h1 className="headers">Create Account</h1>
        <span className="field-name">Email</span>
        <input className="field-input" id="email" type="text" value={this.state.email} onChange={this.onChangeEmail}></input>
        <span id="email-error" className="error"></span>

        <span className="field-name">Password</span>
        <input id="password" className="field-input" type="password" value={this.state.password} onChange={this.onChangePassword}></input>
        <span id="password-error" className="error"></span>

        <span className="field-name">First Name</span>
        <input className="field-input" id="first_name" type="text" value={this.state.first_name} onChange={this.onChangeFirstName}></input>
        <span id="first-name-error" className="error"></span>

        <span className="field-name">Last Name</span>
        <input className="field-input" id="last_name" type="text" value={this.state.last_name} onChange={this.onChangeLastName}></input>
        <span id="last-name-error" className="error"></span>

        <span className="field-name">Gender</span>
        <select className="field-input" id="gender" value={this.state.gender} onChange={this.onChangeGender}>
            <option value="male">male</option>
            <option value="female">female</option>
        </select>

        <span className="field-name">Date of Birth</span>
        <input id="birthdate" className="field-input" type="date" value={this.state.birth_date} onChange={this.onChangeBirthDate}></input>
        <span id="birthdate-error" className="error"></span>

        <span className="field-name">Height</span>
        <input className="field-input" id="height" type="number" min="0" value={this.state.height} onChange={this.onChangeHeight}></input>
        <span id="height-error" className="error"></span>

        <span className="field-name">Weight</span>
        <input className="field-input" id="weight" type="number" min="0" value={this.state.weight} onChange={this.onChangeWeight}></input>
        <span id="weight-error" className="error"></span>
        <button className="submit-btn" onClick={this.onSubmit}>Submit</button>
    </div>
  );
}
}

export default RegistrationForm;