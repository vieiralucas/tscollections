export abstract class Option<T> {
  abstract isDefined(): boolean

  isEmpty(): boolean {
    return !this.isDefined()
  }

  abstract orElse(value: T): T

  abstract map<T2>(fn: (value: T) => T2): Option<T2>

  static from<T>(value: T | null | undefined) {
    if (value === null || value === undefined) {
      return new Nothing<T>()
    }

    return new Some<T>(value)
  }
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
    return this.value
  }

  map<T2>(fn: (value: T) => T2): Option<T2> {
    return new Some(fn(this.value))
  }

  get(): T {
    return this.value
  }
}

export class Nothing<T> extends Option<T> {
  isDefined() {
    return false
  }

  orElse(value: T) {
    return value
  }

  map<T2>(fn: (value: T) => T2): Option<T2> {
    return new Nothing()
  }
}
