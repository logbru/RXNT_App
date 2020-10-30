import React from 'react'
import { observer } from 'mobx-react'
import axios from 'axios'
import UserStore from './stores/UserStore.js'

import Container from './components/Container.js'
import LoginForm from './components/LoginForm.js'
import SubmitButton from './components/SubmitButton.js'

class App extends React.Component {

  async componentDidMount() {
    axios.get('/api/status')
      .then(({data}) => {
        if (data.success) {
          UserStore.loading = false
          UserStore.isLoggedIn = true
          UserStore.username = data.username
          UserStore.name = data.name
          UserStore.created = data.created
        } else {
          UserStore.loading = false
          UserStore.isLoggedIn = false
        }
      })
      .catch(e => {
        UserStore.loading = false
        UserStore.isLoggedIn = false
      })
  }

  async logout() {
    axios.get('/api/logout')
      .then(({data}) => {
        if (data.success) {
          UserStore.isLoggedIn = false
          UserStore.username = ''
          UserStore.name = ''
          UserStore.created = ''
        }
      })
      .catch(e => console.error(e))
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">
            App is loading
          </div>
        </div>
      )
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <Container>
              <div className="card my-5">
                <div className="card-body">
                  Welcome, <b>{UserStore.name}</b>
                  <br />
                  <br />
                  Username: <b>{UserStore.username}</b>
                  <br />
                  <br />
                  Creation Date: <b>{UserStore.created}</b>
                  <br />
                  <br />
                  <SubmitButton
                    text={"Logout"}
                    disabled={false}
                    onClick={() => this.logout()}
                  />
                </div>
              </div>
            </Container>
          </div>
        )
      } else {
        return (
          <div className="app">
            <Container>
              <LoginForm />
            </Container>
          </div>
        )
      }
    }
  }
}

export default observer(App)
