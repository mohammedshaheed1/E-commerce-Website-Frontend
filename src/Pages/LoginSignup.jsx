import React, { useState } from 'react'
import './CSS/LoginSignup.css'

function LoginSignup() {
  
       const[state,setState]=useState("Sign Up")
       const[formData,setFormData]=useState({
        username:"",
        password:"",
        email:""
       })
       const changeHandler = (e)=>{
            setFormData({...formData,[e.target.name]:e.target.value})
       }
       
       const login = async()=>{
          console.log("Login function Executed",formData)
          let responceData;
          await fetch('http://localhost:4000/login',{
            method:'post',
            headers:{
              Accept:'application/form-data',
              'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)

          }).then((response)=>response.json()).then((data)=>responceData=data)


          if(responceData.success){
            localStorage.setItem('auth-token',responceData.token)
            window.location.replace("/");
          }else{
            alert(responceData.errors)
          }
       }
       const signup =async()=>{
              console.log("signup function executed",formData)
              let responceData;
              await fetch('http://localhost:4000/signup',{
                method:'post',
                headers:{
                  Accept:'application/form-data',
                  'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)

              }).then((response)=>response.json()).then((data)=>responceData=data)


              if(responceData.success){
                localStorage.setItem('auth-token',responceData.token)
                window.location.replace("/");
              }else{
                alert(responceData.errors)
              }
       }
      

  return (
  <div className="loginsignup">

    <div className="loginsignup-container">
      <h1>{state}</h1>
      <div className="loginsignup-fields">
        {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name'/>:<></>}
        <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address'/>
        <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password'/>
      </div>
      <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
      {state==="Sign Up"?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>:<p className="loginsignup-login">Create An Account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
      <div className="loginsignup-agree">
        <input type='checkbox' name='' id=''/>
        <p>By continuing, i agree to the terms of use & privat policy</p>
      </div>
    </div>

  </div>



  )
}

export default LoginSignup