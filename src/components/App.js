import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes.js'
import base from '../base'

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.addFish = this.addFish.bind(this)
    this.updateFish = this.updateFish.bind(this)
    this.removeFish = this.removeFish.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this)
    this.state = {
      fishes: {},
      order: {},
    }
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })
    this.ref = base.syncState(`${this.props.match.params.storeId}/order`, {
      context: this,
      state: 'order',
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish(fish) {
    // take a copy of fishes state
    const fishes = { ...this.state.fishes }
    // create unique id using Date.now
    const timestamp = Date.now()
    fishes[`fish-${timestamp}`] = fish
    // set state
    this.setState({ fishes })
  }

  updateFish(key, updatedFish) {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish
    this.setState({ fishes })
  }

  removeFish(key) {
    const fishes = { ...this.state.fishes }
    fishes[key] = null
    this.setState({ fishes })
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes,
    })
  }

  addToOrder(key) {
    // take a copy of order state
    const order = { ...this.state.order }
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1
    // set state
    this.setState({ order })
  }

  removeFromOrder(key) {
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
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} fishKey={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
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
