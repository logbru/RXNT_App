import React from 'react';
import axios from 'axios'
import UserStore from '../stores/UserStore.js'
import InputField from './InputField.js'
import SubmitButton from './SubmitButton.js'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      regUsername: '',
      regPassword: '',
      regName: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      username: '',
      password: '',
      regUsername: '',
      regPassword: '',
      regName: '',
      buttonDisabled: false
    })
  }

  async login() {
    this.setState({
      buttonDisabled: true
    })
    axios.post('/api/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(({ data }) => {
        if (data.success) {
          UserStore.isLoggedIn = true
          UserStore.username = data.username
          UserStore.name = data.name
          UserStore.created = data.created
        } else if (data.success === false) {
          this.resetForm()
          alert(data.msg)
        }
      })
      .catch(e => console.error(e))
  }

  async register() {
    this.setState({
      buttonDisabled: true
    })
    axios.post('/api/register', {
      username: this.state.regUsername,
      password: this.state.regPassword,
      name: this.state.regName
    })
      .then(({ data }) => {
        if (data.success) {
          UserStore.isLoggedIn = true
          UserStore.username = data.username
          UserStore.name = data.name
          UserStore.created = data.created
        } else if (data.success === false) {
          this.resetForm()
          alert(data.msg)
        }
      })
      .catch(e => console.error(e))
  }

  render() {
    return (
      <div className="loginForm">
        <div class="card my-5">
          <div class="card-body">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Register</a>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                <InputField
                  type="text"
                  name="username"
                  text="Username"
                  value={this.state.username}
                  onChange={(val) => this.setInputValue('username', val)}
                />
                <InputField
                  type="password"
                  name="password"
                  text="Password"
                  value={this.state.password}
                  onChange={(val) => this.setInputValue('password', val)}
                />
                <SubmitButton
                  text="Login"
                  disable={this.state.buttonDisabled}
                  onClick={() => this.login()}
                />
              </div>
              <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                <InputField
                  type="text"
                  name="regusername"
                  text="Username"
                  value={this.state.regUsername}
                  onChange={(val) => this.setInputValue('regUsername', val)}
                />
                <InputField
                  type="password"
                  name="regpassword"
                  text="Password"
                  value={this.state.regPassword}
                  onChange={(val) => this.setInputValue('regPassword', val)}
                />
                <InputField
                  type="text"
                  name="regname"
                  text="Name"
                  value={this.state.regName}
                  onChange={(val) => this.setInputValue('regName', val)}
                />
                <SubmitButton
                  text="Register"
                  disable={this.state.buttonDisabled}
                  onClick={() => this.register()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
