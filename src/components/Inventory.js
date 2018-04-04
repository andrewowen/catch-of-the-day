import React from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login'
import base, { firebaseApp } from '../base'

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    addFish: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
  }

  state = {
    uid: null,
    owner: null,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authHandler = async (authData) => {
    const { storeId } = this.props
    // 1. Look up current store in FireBase
    const store = await base.fetch(storeId, { context: this })
    console.log(store)
    // 2. Claim it if no owner
    if (!store.owner) {
      await base.post(`${storeId}/owner`, {
        data: authData.user.uid,
      })
    }
    // 3. Set state for owner
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    })
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }

  logout = async () => {
    console.log('Logging out!')
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }

  render() {
    const { fishes, addFish, updateFish, removeFish, loadSamples } = this.props
    const logout = <button onClick={this.logout}>Logout</button>

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry! You are not the owner of this store!</p>
          {logout}
        </div>
      )
    }
    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(fishes).map((key) => (
          <EditFishForm
            key={key}
            index={key}
            fish={fishes[key]}
            updateFish={updateFish}
            removeFish={removeFish}
          />
        ))}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory
