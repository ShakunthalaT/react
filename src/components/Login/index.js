import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    Cookies.set('jwtToken', jwtToken, {
      expires: 30,
      path: '/',
    })
  }

  onFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://todoslist-nrn5.onrender.com/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'content-type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwtToken)
    } else {
      this.onFailure(data.errorMsg)
    }
  }

  render() {
    const {errorMsg} = this.state
    return (
      <div className="app-container">
        <h1>Login </h1>
        <form className="form" onSubmit={this.onSubmitForm}>
          <label htmlFor="username" className="label">
            Username
          </label>
          <br />
          <input
            id="username"
            type="text"
            className="input"
            onChange={this.onChangeUsername}
          />
          <br />
          <label htmlFor="password" className="label">
            Password
          </label>
          <br />
          <input
            id="password"
            type="password"
            className="input"
            onChange={this.onChangePassword}
          />
          <br />
          <button type="submit" className="button">
            Sign in
          </button>
          <p>{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
