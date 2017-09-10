import { expect, assert } from 'chai'
import { List } from '../src/list'
import { Some, Nothing } from '../src/option'

describe('List', () => {
  it('should be iterable', () => {
    let sum = 0
    for (let n of new List(1, 2, 3)) {
      sum += n
    }

    expect(sum).to.equal(6)
  })

  describe('.isEmpty', () => {
    it('should be true for empty list', () => {
      expect(List.empty().isEmpty()).to.be.true
    })

    it('should be false for non empty list', () => {
      expect(new List(1, 2, 3).isEmpty()).to.be.false
    })
  })

  describe('.length', () => {
    it('should be 0 for empty list', () => {
      expect(List.empty().length()).to.equal(0)
    })

    it('should return the length of the list', () => {
      const l = new List(1, 2)
      expect(l.length()).to.equal(2)
    })
  })

  describe('.toArray', () => {
    it('should convert empty list into empty array', () => {
      expect(List.empty().toArray()).to.deep.equal([])
    })

    it('should convert a List into an Array', () => {
      expect(new List(1, 2, 3).toArray()).to.deep.equal([1, 2, 3])
    })
  })

  describe('.reverse', () => {
    it('should preserve length', () => {
      expect(new List(1, 2, 3).reverse().length()).to.equal(3)
    })

    it('should reverse the list', () => {
      const ls = new List(1, 2, 3)
      expect(ls.reverse().toArray()).to.be.deep.equal([3, 2, 1])
    })
  })

  describe('.head', () => {
    it('should be Nothing if list is empty', () => {
      expect(List.empty().head).to.be.instanceof(Nothing)
    })

    it('should be the Some of first element', () => {
      const ls = new List(1, 2)
      const first = ls.head

      expect(first).to.be.instanceof(Some)
      expect(first.orElse(-1)).to.equal(1)
    })
  })

  describe('.tail', () => {
    it('should be Nothing for empty list', () => {
      expect(List.empty().tail).to.be.instanceof(Nothing)
    })

    it('should return a list without the first element', () => {
      const l = new List(1, 2, 3)
      const tail = l.tail.orElse(List.empty<number>())

      expect(tail.length()).to.equal(2)
      expect(tail.head.orElse(3)).to.equal(2)
    })
  })

  describe('.preppend', () => {
    it('should preppend the element to the List', () => {
      const ls = new List(1, 2, 3)
      const prep = ls.preppend(0)

      expect(prep.toArray()).to.be.deep.equal([0, 1, 2, 3])
    })

    it('should work for empty List', () => {
      const e = List.empty()
      const prep = e.preppend(1)

      expect(prep.toArray()).to.be.deep.equal([1])
    })
  })

  describe('.append', () => {
    it('should append the element to the List', () => {
      const ls = new List(1, 2, 3)
      const app = ls.append(4)

      expect(app.toArray()).to.be.deep.equal([1, 2, 3, 4])
    })

    it('should work for empty List', () => {
      const e = List.empty()
      const app = e.append(1)

      expect(app.toArray()).to.be.deep.equal([1])
    })
  })

  describe('.filter', () => {
    it('should filter elements based on function', () => {
      const numbers = new List(1, 2, 3, 4)
      const events = numbers.filter((n: number) => n % 2 === 0)

      expect(events.toArray()).to.be.deep.equal([2, 4])
    })
  })

  describe('.take', () => {
    it('should take the first n elements of a List', () => {
      const ls = new List(1, 2, 3)
      const oneTwo = ls.take(2)

      expect(oneTwo.toArray()).to.be.deep.equal([1, 2])
    })
  })

  describe('.drop', () => {
    it('should drop first n elements of a List', () => {
      const ls = new List(1, 2, 3)
      const one = ls.drop(2)

      expect(one.toArray()).to.be.deep.equal([1])
    })
  })

  describe('.map', () => {
    it('should create a new List with the results of calling the provided function on every element of the List', () => {
      const numbers = new List(1, 2, 3, 4)
      const dbl = numbers.map((n: number) => n * 2)

      expect(dbl.toArray()).to.be.deep.equal([2, 4, 6, 8])
    })
  })
})
