{
  function isNumber(padding: number | string): padding is number {
    return typeof padding === 'number'
  }
  function isString(x: number | string): x is string {
    return typeof x === 'string'
  }
  function padLeft(value: string, padding: number | string) {
    if (isNumber(padding)) {
      return Array(padding + 1).join(" ") + value
    }
    if (isString(padding)) {
      return padding + value
    }
    throw new Error(`Expected string or number, got '${padding}'.`)
  }
  padLeft('Hello', 4) // "    Hello"
}

// p38