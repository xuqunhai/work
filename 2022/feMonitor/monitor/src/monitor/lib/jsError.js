import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
export function injectJsError() {
  console.log('injectJsError');
  // 监听全局未捕获的错误
  window.addEventListener('error', function (event) {
    // console.log('error event', event);
    let lastEvent = getLastEvent();
    let log = {
      kind: 'stability',
      type: 'error',
      errorType: 'jsError',
      url: '',
      message: event.message,
      filename: event.filename,
      position: `${event.lineno}:${event.colno}`,
      stack: getLines(event.error.stack),
      selector: lastEvent ? getSelector(lastEvent.path) : ''
    };
    console.log('log', log);
  });
  function getLines(stack) {
    return stack
      .split('\n')
      .slice(1)
      .map((item) => item.replace(/^\s+at\s+/g, ''))
      .join('^');
  }
}
