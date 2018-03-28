import React from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from '../helpers'

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.object.isRequired,
    addToOrder: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired,
  }
  render() {
    const { details, addToOrder, index } = this.props
    const isAvailable = details.status === 'available'
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!'
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button onClick={() => addToOrder(index)} disabled={!isAvailable}>
          {buttonText}
        </button>
      </li>
    )
  }
}

export default Fish
