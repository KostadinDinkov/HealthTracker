import './LoginForm.css';
import { Navigate } from 'react-router-dom'

import React from 'react';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
        this.onChangeResult= this.onChangeResult.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        if(localStorage.getItem('loggedIn')==="true"){
            this.state = {
                email:'',
                password:'',
                result:'',
                navigator:<Navigate replace to='/home'/>
            };
        }
        else{
            this.state = {
                email:'',
                password:'',
                result:'',
                navigator:''
            };
        }
    }
    handleClick = () => {
        
        var navigator = <Navigate replace to='/home'/>
        this.setState({navigator: navigator})
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
        var email_reg=/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        

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
        fetch('/users/login', requestOptions).then(result=>this.setState({result},() => 
            {console.log('result fetched...', result);
            if(result.statusText==='OK'){
                localStorage.setItem('loggedIn',true)
                localStorage.setItem('email',this.state.email);
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
        {this.state.navigator}
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