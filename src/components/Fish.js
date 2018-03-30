import React from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from '../helpers'

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }).isRequired,
    addToOrder: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired,
  }
  render() {
    const { addToOrder, index } = this.props
    const { image, name, price, desc, status } = this.props.details
    const isAvailable = status === 'available'
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!'
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button onClick={() => addToOrder(index)} disabled={!isAvailable}>
          {buttonText}
        </button>
      </li>
    )
  }
}

export default Fish
