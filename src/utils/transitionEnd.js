const transitionEndEventName = () => {
  const transitions = {
    transition: 'transitionend',
    OTransition: 'otransitionend', // oTransitionEnd in very old Opera
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  }

  let transition = false
  if (typeof (window) !== 'undefined' && window.document) {
    Object.keys(transitions).forEach(key => {
      if (window.document.documentElement.style[key] !== undefined) {
        transition = transitions[key]
      }
    })
  }

  return transition
}

export default transitionEndEventName()
