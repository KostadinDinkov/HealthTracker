import './LoginForm.css';
import { useHistory } from 'react-router-dom'

import React from 'react';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
        this.onChangeResult= this.onChangeResult.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            email:'',
            password:'',
            result:''
        };
    }
    handleClick = () => {
        this.props.history.push("/home");
        window.location.reload();
      };
    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    onChangeResult(e) {
        this.setState({ result: e })
    }
    onSubmit(e) {
        e.preventDefault()
        var user={};
        user["email"]=this.state.email;
        user["password"]=this.state.password;
        var isError=0;
        var email_reg=/^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$/;

        if(email_reg.test(this.state.email)===false){
            document.getElementById('email-error').innerHTML="Invalid email";
            document.getElementById('email-error').style.display="flex";
            isError=1;
        }
        else{
            document.getElementById('email-error').style.display="none";
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
        fetch('/users/login', requestOptions)
            .then(res => res.json()).then(result=>this.setState({result},() => 
            {console.log('result fetched...', result);
            if(result.msg==='Login is successful'){
                localStorage.setItem('loggedIn',true)
                localStorage.setItem('user',JSON.stringify(result.user));
                this.handleClick();
            }
            else{
                document.getElementById('email-error').innerHTML="Login Unsuccessful. Email or Password incorrect.";
            document.getElementById('email-error').style.display="flex";
            }
        }
            )).catch(error=>{console.error(error)})           
     }  
               
        
    }

    render(){
        return (
    <div className="LoginForm">
        <h1 className="headers">Login</h1>
        <span className="field-name">Email</span>
        <input className="field-input" id="email" type="text" value={this.state.email} onChange={this.onChangeEmail}></input>
        <span id="email-error" className="error"></span>
        <span className="field-name">Password</span>
        <input id="password" className="field-input" type="password" value={this.state.password} onChange={this.onChangePassword}></input>
        <span id="password-error" className="error"></span>
        <button className="submit-btn" onClick={this.onSubmit}>Submit</button>
        
    </div>
  );
}
}

export default LoginForm;