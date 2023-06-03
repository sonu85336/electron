import React from 'react'
import  './index.css'
import ExpensePage from './Component/ExpensePage'
import LoginPage from './Component/LoginPage'
import { Redirect, Route, Switch } from 'react-router-dom'
import SignUpPage from './Component/SignUpPage'
function App() {
  return (
    <>
    <Switch>
    <Route  path='/' exact>
      <LoginPage/>
    </Route>
    <Route path='/signup'>
      <SignUpPage/>
    </Route>
    <Route path='/expensepage'>
     <ExpensePage/> 
     </Route>
     <Route path='*'>
      <Redirect to='/'></Redirect>
     </Route>
     </Switch>
    </>
  )
}

export default App
 