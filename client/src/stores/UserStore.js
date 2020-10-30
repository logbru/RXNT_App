import { extendObservable } from 'mobx'

class UserStore {
  constructor() {
    extendObservable(this, {
      loading: true,
      isLoggedIn: false,
      username: '',
      name: '',
      created: ''
    })
  }
}

export default new UserStore()