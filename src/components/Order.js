import React from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class Order extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    fishes: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired,
  }

  renderOrder = (key) => {
    const { fishes, order, removeFromOrder } = this.props
    const fish = fishes[key]
    const count = order[key]
    const isAvailable = fish && fish.status === 'available'
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 },
    }

    if (!fish) return null
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry! {fish ? fish.name : 'fish'} is no longer available!{' '}
            <button onClick={() => removeFromOrder(key)}>&times;</button>
          </li>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            <span className="price">{formatPrice(count * fish.price)}</span>
            <button onClick={() => removeFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    )
  }
  render() {
    const { fishes, order } = this.props
    const orderIds = Object.keys(order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key]
      const count = order[key]
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal
    }, 0)
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order
