import { Option, Some, Nothing } from './option'

export class List<T> {
  private arr: Array<T>

  constructor(...args: T[]) {
    this.arr = args
  }

  get head(): Option<T> {
    return Option.from(this.arr[0])
  }

  get tail(): Option<List<T>> {
    if (this.length() > 1) {
      return new Some(new List(...this.arr.slice(1)))
    }

    return new Nothing()
  }

  *[Symbol.iterator]() {
    for (let el of this.arr) {
      yield el
    }
  }

  isEmpty(): boolean {
    return this.length() === 0
  }

  length(): number {
    return this.arr.length
  }

  preppend(el: T) {
    return new List(...[el, ...this.arr])
  }

  append(el: T): List<T> {
    return new List(...[...this.arr, el])
  }

  reverse(): List<T> {
    return new List(...this.arr.reverse())
  }

  toArray(): Array<T> {
    return this.arr
  }

  filter(test: (el: T) => boolean): List<T> {
    return new List(...this.arr.filter(test))
  }

  take(n: number): List<T> {
    return new List(...this.arr.slice(0, n))
  }

  drop(n: number): List<T> {
    return new List(...this.arr.slice(0, this.length() - n))
  }

  map<T2>(mapper: (el: T) => T2): List<T2> {
    return new List(...this.arr.map(mapper))
  }

  static empty<T>() {
    return new List<T>()
  }
}
