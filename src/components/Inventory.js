import React from 'react'
import PropTypes from 'prop-types'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    addFish: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
  }

  render() {
    const { fishes, addFish, updateFish, removeFish, loadSamples } = this.props
    return (
      <div>
        <h2>Inventory</h2>
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
