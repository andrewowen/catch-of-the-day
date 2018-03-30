import React from 'react'
import PropTypes from 'prop-types'

class EditFishForm extends React.Component {
  static propTypes = {
    index: PropTypes.string.isRequired,
    fish: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
  }

  handleChange = (event) => {
    const { index, fish, updateFish } = this.props
    const updatedFish = {
      ...fish,
      [event.currentTarget.name]: event.currentTarget.value,
    }
    updateFish(index, updatedFish)
  }
  render() {
    const { index, fish, removeFish } = this.props
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish Price"
          onChange={this.handleChange}
        />
        <select
          type="text"
          name="status"
          value={fish.status}
          placeholder="Fish Status"
          onChange={this.handleChange}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          value={fish.desc}
          placeholder="Fish Desc"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="image"
          value={fish.image}
          placeholder="Fish Image"
          onChange={this.handleChange}
        />
        <button onClick={() => removeFish(index)}>Remove Fish</button>
      </div>
    )
  }
}

export default EditFishForm
