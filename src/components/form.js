import React, { useState } from "react";

export default function Form() {
  const [FormData, setFormData] = useState({
    firstName: "", 
    lastName: "", 
    gender: "", 
    email: "", 
    password: ""
  });

  const [LoginData, setLoginData] = useState ({
    email_login: "",
    password_login: ""
  })

  const [IsInvalidPassword, setIsInvalidPassword] = useState(false)
  const [IsInvalidName, setIsInvalidName] = useState(false)
  const [IsInvalidEmail, setIsInvalidEmail] = useState(false)
  const [HasSignedUp, setHasSignedUp] = useState(false)

  function handleChange(event){
    const {name, value} = event.target

    if (!name.includes("login")){
      setFormData(prevData => {
        return{
          ...prevData,
          [name]: value
        }
      })
    }
    else {
      setLoginData(prevData => {
        return{
          ...prevData,
          [name]: value
        }
      })
    }
    
    if (name.includes("password")){
      const passregex =  /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
      passregex.test(value)? setIsInvalidPassword(false) : setIsInvalidPassword(true)
    }
    if (name.includes("Name")){
      const nameregex = /^[a-zA-Z]+$/
      nameregex.test(value)? setIsInvalidName(false) : setIsInvalidName(true)
    }
    if (name.includes("email")){
      console.log("masuk sini")
      const mailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      mailregex.test(value)? setIsInvalidEmail(false) : setIsInvalidEmail(true)
    }
  }

  function handleSubmit(event){
    event.preventDefault()
    if (!IsInvalidEmail && !IsInvalidName && !IsInvalidPassword){
      console.log(FormData)
      alert("Sign Up Success! Welcome, " + FormData.firstName + " " + FormData.lastName)
    }
    setHasSignedUp(true)
  }

  function handleLogin(event){
    event.preventDefault()
    console.log(LoginData)
    if (LoginData.email_login === FormData.email && LoginData.password_login === FormData.password){
      alert("Welcome again, " + FormData.firstName + " " + FormData.lastName)
      setLoginData({email_login: "",
                    password_login: ""})
    }
    else {
      alert("Wrong email and/or password.")
    }
  }
 
  return (
    <div>
    { !HasSignedUp && <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}> 
        <label htmlFor="firstName">Name*: </label>
        <input 
          type="text" required
          placeholder = "First Name"
          name="firstName"
          value={FormData.firstName} onChange={handleChange}
        />
        <input 
          type="text" required
          placeholder="Last Name"
          name="lastName"
          value={FormData.lastName} onChange={handleChange}
        />
        {IsInvalidName && <span style={{color:"red", fontSize:"12px"}}> Name must only be letters.</span>}
        <br />

        <label htmlFor="gender"> Gender: </label>
        <select
          id="gender"
          value={FormData.gender} 
          onChange={handleChange}
          name="gender"
        >
          <option value=""></option>
          <option value="F">F</option>
          <option value="M">M</option>
        </select> 
        <br />
        <br />
        
        <label htmlFor="email"> Email*: </label>
        <input 
          type="text" required
          placeholder="Email"
          name="email"
          value={FormData.email} onChange={handleChange}
        />
        {IsInvalidEmail && <span style={{color:"red", fontSize:"12px"}}> Please enter a valid email address.</span>}
        <br />

        <label htmlFor="password"> Password*: </label>
        <input 
          type="password" required
          placeholder="Password"
          name="password"
          value={FormData.password} onChange={handleChange}
        />
        {IsInvalidPassword && <span style={{color:"red", fontSize:"12px"}}> Password must contain at least 8 characters with alphabet, digit, and special character.</span>}
        <br />

        <button type="submit">Sign Up</button>
      </form>
      </div>
    }

    {HasSignedUp && 
      <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}> 
      <label htmlFor="email"> Email*: </label>
        <input 
          type="email" required
          placeholder="Email"
          name="email_login"
          value={LoginData.email_login} onChange={handleChange}
        />
        {IsInvalidEmail && <span style={{color:"red", fontSize:"12px"}}> Please enter a valid email address.</span>}
        <br />

        <label htmlFor="password"> Password*: </label>
        <input 
          type="password" required
          placeholder="Password"
          name="password_login"
          value={LoginData.password_login} onChange={handleChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      </div>
      }
    </div>
    );
}