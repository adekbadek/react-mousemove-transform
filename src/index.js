import React from 'react'

import { getTransformValue, getDisplayName } from './utils/helpers'

export default (config = {}) => WrappedComponent => {
  class TransformedComponent extends React.Component {
    state = {
      position: [0, 0],
      maxs: [0, 0],
      addTransition: true,
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
      const rotateX = getTransformValue(this.state.position[1], this.state.maxs[1] / 2, config.maxTransform)
      const rotateY = getTransformValue(this.state.position[0], this.state.maxs[0] / 2, config.maxTransform)
      return (
        <div
          style={{
            transform: `
              rotateX(${-rotateX}deg)
              rotateY(${rotateY}deg)
            `,
            transition: this.state.addTransition ? 'all 200ms' : ''
          }}
          onMouseEnter={() => {
            setTimeout(() => {
              this.setState({addTransition: false})
            }, 300)
          }}
          onMouseLeave={() => {
            this.setState({addTransition: true})
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
