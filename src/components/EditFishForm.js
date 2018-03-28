import React from 'react'

class EditFishForm extends React.Component {
  handleChange = (event) => {
    const { index } = this.props
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    }
    this.props.updateFish(index, updatedFish)
  }
  render() {
    const { fish } = this.props
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
        <button onClick={() => this.props.removeFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    )
  }
}

export default EditFishForm
