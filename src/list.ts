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

  foldr<T2>(folder: (curr: T, previous: T2) => T2, first: T2): T2 {
    return this.arr.reduceRight((p, c) => folder(c, p), first)
  }

  foldl<T2>(folder: (curr: T, previous: T2) => T2, first: T2): T2 {
    return this.arr.reduce((p, c) => folder(c, p), first)
  }

  all(predicate: (el: T) => boolean): boolean {
    return this.foldl((c, p) => p && predicate(c), true)
  }

  any(predicate: (el: T) => boolean): boolean {
    return this.foldl((c, p) => p || predicate(c), false)
  }

  sort(): List<T> {
    const arrCopy = this.arr.slice()
    return new List(...arrCopy.sort())
  }

  sortBy<T2>(mapper: (el: T) => T2): List<T> {
    const arrCopy = this.arr.slice()
    const sortedArr = arrCopy.sort((e1, e2) => {
      const mappedE1 = mapper(e1)
      const mappedE2 = mapper(e2)

      if (mappedE1 < mappedE2) {
        return -1
      } else if (mappedE1 > mappedE2) {
        return 1
      } else {
        return 0
      }
    })

    return new List(...sortedArr)
  }

  sortWith(comparison: (e1: T, e2: T) => number): List<T> {
    const arrCopy = this.arr.slice()
    const sortedArr = arrCopy.sort(comparison)

    return new List(...sortedArr)
  }

  static empty<T>() {
    return new List<T>()
  }
}
