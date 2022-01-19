import './RegistrationForm.css';
import { useHistory } from 'react-router-dom'

import React from 'react';

class RegistrationForm extends React.Component{
    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bing(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeBirthDate= this.onChangeBirthDate.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeResult= this.onChangeResult.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            email:'',
            first_name:'',
            last_name:'',
            gender:'male',
            password:'',
            birth_date:'',
            weight:'',
            height:'',
            result:''
        };
    }
    handleClick = () => {
        this.props.history.push("/home");
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
        user["password"]=this.state.password;
        user["first_name"]=this.state.first_name;
        user["last_name"]=this.state.last_name;
        user["gender"]=this.state.gender;
        user["birth_date"]=this.state.birth_date;
        user["height"]=this.state.height;
        user["weight"]=this.state.weight;
        console.log(user)
        var email_reg=/^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$/;
        var name_reg=/^.+{,20}$/;
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
            document.getElementById('first-name-error').display="flex";
            isError=1;
        }
        else{
            document.getElementById('first-name-error').display="none";
        }

        if(name_reg.test(this.state.last_name)===false){
            document.getElementById('last-name-error').innerHTML="Invalid name";
            document.getElementById('last-name-error').display="flex";
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
            return false
        }
        else{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user) 
        };
        fetch('/users/register', requestOptions)
            .then(res => res.json()).then(result=>this.setState({result},() => 
            {console.log('result fetched...', result);
            if(result.msg==='OK'){
                localStorage.setItem('loggedIn',true)
                localStorage.setItem('email',email);
                this.handleClick();
            }
            else if(result.msg==='User already exists'){
                document.getElementById('email-error').innerHTML="User already exists";
                document.getElementById('email-error').style.display="flex";
            }
            else{
                document.getElementById('email-error').innerHTML="User already exists";
                document.getElementById('email-error').style.display="flex";
            }
        }
            )).catch(error=>{console.error(error)})

                 
     }  
               
        
    }

    render(){
        return (
    <div className="RegistrationForm">
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