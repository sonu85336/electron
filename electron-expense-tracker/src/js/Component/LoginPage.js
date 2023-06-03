// import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
// function LoginPage() {
//     const history = useHistory()

//     const [isLogin,setIsLogin] =  useState(true);
//     const [isValid,setIsValid] = useState(false)
// const [password,setPassword] = useState('')
// const [confirmPassword,setconfirmPassword] =  useState('')

// const switchAuthModeHandler = ()=>{
//     setIsLogin((prevstate)=> !prevstate)
// }

// const validateConfirmPassword = (password,confirmPassword)=>{
//     return password == confirmPassword;
// }

// const handlePasswordchane = (event)=>{
//     setPassword(event.target.value)
// }
// const handleConfirmPasswordChange = (event)=>{
//     setconfirmPassword(event.target.value)
//     setIsValid(validateConfirmPassword(password,event.target.value))
// }

// const SubmitHandler = (e)=>{
//     e.preventDefault()
// }

//   return (
//     <React.Fragment>
//       <section> 
//         <div>
//             <h1>{isLogin ? "Login" : "Sign Up"}</h1>
// <form  onSubmit={SubmitHandler}>
//     <div>
//         <label htmlFor='email'>Email</label>
//         <input type='email' required></input>
//     </div>

//     <div>
//         <label htmlFor='password'>Password</label>
//         <input type='password' value={password} onChange={handlePasswordchane} required></input>
//     </div>

//     {!isLogin && (<div>
//         <label htmlFor='confirmpassword'>Confirm Password</label>
//         <input type='password' value={confirmPassword} onChange={handleConfirmPasswordChange} required></input>
// {isValid ? null : (<p style={{color:'red'}}> ! password do not match...</p>)}

//     </div>)}
//     <div>
//         <button>{isLogin ? "Login" :"Sing up"}</button>
//     </div>

// <div>
//     <button type='button' onClick={switchAuthModeHandler}> {isLogin ? "Create new account" : "Have an account Login"}</button></div>
// </form>
//         </div>
//       </section>
      
//     </React.Fragment>
//   )
// }

// export default LoginPage



/************************* */
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import classes from './css/login.module.css'
 // import loginimg from './asset/newLoginpage.jpg'
const LoginPage = () => {
 const history = useHistory()
  const onFinish = values => {
    console.log(values)
     const  {username,password} =  values
     axios.post('http://localhost:3001/validatePasswords',{username,password})
     .then((res)=>{
      if(res.data.validation){
       history.push('/expensepage')
      }else{
        alert('Your password is not correct')
        console.log('Your password is not correct')
      }
     })
  };
  return (
    <div >
      {/* <img src={loginimg} alt='login' />   */}
    <div  style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'40px'}}>
<div className={classes.header}>
   
</div>
    
    <div style={{width:"400px"}}>
    <h1>WELCOME</h1>
 <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link  to='/signup'>register now!</Link>
      </Form.Item>
    </Form>
     
    </div></div>
    </div>
  );
};

export default LoginPage;