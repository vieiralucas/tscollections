export abstract class Option<T> {
  abstract isDefined(): boolean

  isEmpty(): boolean {
    return !this.isDefined()
  }

  abstract orElse(value: T): T

  abstract map<T2>(fn: (value: T) => T2): Option<T2>
}

export class Some<T> extends Option<T> {
  private value: T

  constructor(value: T) {
    super()
    this.value = value
  }

  isDefined() {
    return true
  }

  orElse(el: T): T {
    if (this.value === null) {
      return el
    }

    return this.value
  }

  map<T2>(fn: (value: T) => T2): Option<T2> {
    return new Some(fn(this.value))
  }

  get(): T {
    return this.value
  }
}

export class None<T> extends Option<T> {
  isDefined() {
    return false
  }

  orElse(value: T) {
    return value
  }

  map<T2>(fn: (value: T) => T2): Option<T2> {
    return new None()
  }
}
