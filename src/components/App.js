import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes.js'
import base from '../base'

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { params } = this.props.match
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  componentDidUpdate() {
    const { params } = this.props.match
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = (fish) => {
    // take a copy of fishes state
    const fishes = { ...this.state.fishes }
    // create unique id using Date.now
    const timestamp = Date.now()
    fishes[`fish-${timestamp}`] = fish
    // set state
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish
    this.setState({ fishes })
  }

  removeFish = (key) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = null
    this.setState({ fishes })
  }

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes,
    })
  }

  addToOrder = (key) => {
    // take a copy of order state
    const order = { ...this.state.order }
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1
    // set state
    this.setState({ order })
  }

  removeFromOrder = (key) => {
    const order = { ...this.state.order }
    order[key] = null
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          removeFish={this.removeFish}
          updateFish={this.updateFish}
          loadSamples={this.loadSamples}
        />
      </div>
    )
  }
}

export default App
