// export default {
//   name: 'functional-button',
//   functional: true,
//   render(createElement, context) {
//       return createElement('button', 'click me')
//   }
// }

// export default {
//   name: 'funtional-button',
//   functional: true,
//   render(createElement, { children }) {
//       return createElement('button', children)
//   }
// }

export default {
  functional: true,
  render(createElement, { props, listeners, children }) {
    return createElement(
      'button',
      {
        attrs: props,
        on: {
          click: listeners.click
        }
      },
      children
    );
  }
}