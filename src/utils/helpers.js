export const mapRange = (x, inMin, inMax, outMin, outMax) => {
  return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

export const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export const getTransformValue = (pos, max, maxTransform = 5) => {
  return Math.round(mapRange(pos - max, -max, max, -maxTransform, maxTransform))
}
