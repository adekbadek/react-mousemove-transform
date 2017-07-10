import React from 'react'

import { mapRange, getDisplayName } from './utils/helpers'

export default (config = {}) => WrappedComponent => {
  class TransformedComponent extends React.Component {
    state = {
      position: [0, 0],
      maxs: [0, 0],
    }
    getTransformValue = (pos, max) => {
      const MAX_TRANSFORM = config.maxTransform || 5
      const maxHalf = this.state.maxs[max] / 2
      const val = pos - maxHalf
      return Math.round(mapRange(val, -maxHalf, maxHalf, -MAX_TRANSFORM, MAX_TRANSFORM))
    }
    listen = (e) => {
      this.setState({position: [e.clientX, e.clientY]})
    }
    componentDidMount () {
      this.setState({
        maxs: [window.innerWidth, window.innerHeight]
      })
      document.addEventListener('mousemove', this.listen)
    }
    componentWillUnMount () {
      document.removeEventListener('mousemove', this.listen)
    }
    render () {
      return (
        <div
          style={{
            transform: `
              rotateY(${this.getTransformValue(this.state.position[0], 0)}deg)
              rotateX(${-this.getTransformValue(this.state.position[1], 1)}deg)
            `,
            transition: 'all 200ms'
          }}
        >
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }

  TransformedComponent.displayName = `MousemoveTransform(${getDisplayName(WrappedComponent)})`
  return TransformedComponent
}
