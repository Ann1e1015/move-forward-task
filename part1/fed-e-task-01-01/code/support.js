class Container {
  static of (val) {
    return new Container(val)
  }

  constructor (val) {
    this._value = val
  }

  map (fn) {
    return Container.of(fn(this._value))
  }
}

class Maybe {
  static of (val) {
    return new Maybe(val)
  }

  constructor (val) {
    this._value = val
  }

  isNothing () {
    return this._value === null || this._value === undefined
  }

  map (fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
}

module.exports = { Container, Maybe }