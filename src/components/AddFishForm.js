import React from 'react'
import PropTypes from 'prop-types'

class AddFishForm extends React.Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired,
  }
  nameRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descRef = React.createRef()
  imageRef = React.createRef()

  createFish = (event) => {
    event.preventDefault()
    console.log('Gonna make some fish! 🎣')
    const { addFish } = this.props
    const fish = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value,
    }
    addFish(fish)
    event.currentTarget.reset()
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input ref={this.nameRef} type="text" placeholder="Fish Name" />
        <input ref={this.priceRef} type="text" placeholder="Fish Price" />
        <select ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={this.descRef} placeholder="Fish Desc" />
        <input ref={this.imageRef} type="text" placeholder="Fish Image" />
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

export default AddFishForm
