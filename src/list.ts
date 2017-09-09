import { Option, Some, None } from './option'

export class List<T> {
  private _head: Option<T>
  private _tail: Option<List<T>>

  constructor(...args: T[]) {
    if (args.length === 0) {
      this._head = new None()
      this._tail = new None()
    } else {
      this._head = new Some(args[0])
      this._tail = new Some(new List(...args.slice(1)))
    }
  }

  get head() {
    return this._head
  }

  get tail() {
    return this._tail
  }

  *[Symbol.iterator]() {
    let list = this
    if (list._head.isDefined()) {
      yield (this._head as Some<T>).get()
    }

    let _tail = list._tail.orElse(List.empty<T>())
    while (_tail._head.isDefined()) {
      yield (_tail._head as Some<T>).get()
      _tail = _tail._tail.orElse(List.empty<T>())
    }
  }

  isEmpty(): boolean {
    return this._head instanceof None
  }

  length(): number {
    let len = 0

    for (let el of this) {
      len++
    }

    return len
  }

  preppend(el: T) {
    const nL = new List(el)
    nL._tail = new Some(this)
    return nL
  }

  append(el: T): List<T> {
    return new List(...this.toArray().concat([el]))
  }

  reverse(): List<T> {
    return new List(...this.toArray().reverse())
  }

  toArray(): Array<T> {
    const arr = []
    for (let el of this) {
      arr.push(el)
    }

    return arr
  }

  static empty<T>() {
    return new List<T>()
  }
}
