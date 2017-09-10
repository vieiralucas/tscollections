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
      const evens = numbers.filter((n: number) => n % 2 === 0)

      expect(evens.toArray()).to.be.deep.equal([2, 4])
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

  describe('.foldr', () => {
    it('should reduce a list from the right', () => {
      const numbers = new List(1, 2, 3, 4)
      const string = numbers.foldr(
        (curr: number, previous: string) => previous + String(curr),
        ''
      )

      expect(string).to.equal('4321')
    })
  })

  describe('.foldl', () => {
    it('should reduce a list from the left', () => {
      const numbers = new List(1, 2, 3, 4)
      const string = numbers.foldl(
        (curr: number, previous: string) => previous + String(curr),
        ''
      )

      expect(string).to.equal('1234')
    })
  })

  describe('.all', () => {
    it('should be true if all elements satisfy the predicate', () => {
      const positive = new List(1, 2, 3, 4)
      const allPositive = positive.all((n: number) => n > 0)

      expect(allPositive).to.be.true
    })

    it('should be false if any element do not satisfy the predicate', () => {
      const positive = new List(1, 2, 3, 4, -2)
      const allPositive = positive.all((n: number) => n > 0)

      expect(allPositive).to.be.false
    })
  })

  describe('.any', () => {
    it('should be true if any element satisfy the predicate', () => {
      const n = new List(1, 2, 3, 4)
      const has3 = n.any((n: number) => n === 3)

      expect(has3).to.be.true
    })

    it('should be false if all elements do not satisfy the predicate', () => {
      const positive = new List(1, 2, 3, 4)
      const hasNegative = positive.any((n: number) => n < 0)

      expect(hasNegative).to.be.false
    })
  })

  describe('.sort', () => {
    it('should sort a List', () => {
      const n = new List(2, 1, 3, 4)
      const sorted = n.sort()

      expect(sorted.toArray()).to.be.deep.equal([1, 2, 3, 4])
    })

    it('should not mess with old List', () => {
      const n = new List(2, 1, 3, 4)
      const sorted = n.sort()

      expect(n.toArray()).to.be.deep.equal([2, 1, 3, 4])
    })
  })

  describe('.sortBy', () => {
    it('should sort a List by a derived property', () => {
      const john = { name: 'John', age: 37 }
      const anna = { name: 'Anna', age: 32 }
      const people = new List(john, anna)
      const byAge = people.sortBy(p => p.age)

      expect(byAge.toArray()).to.be.deep.equal([anna, john])
    })

    it('should not mess with old List', () => {
      const john = { name: 'John', age: 37 }
      const anna = { name: 'Anna', age: 32 }
      const people = new List(john, anna)
      const byAge = people.sortBy(p => p.age)

      expect(people.toArray()).to.be.deep.equal([john, anna])
    })
  })

  describe('.sortWith', () => {
    it('should sort a List with comparison function', () => {
      const n = new List(2, 1, 3, 4)
      const sorted = n.sortWith((n1, n2) => n2 - n1)

      expect(sorted.toArray()).to.be.deep.equal([4, 3, 2, 1])
    })

    it('should not mess with old List', () => {
      const n = new List(2, 1, 3, 4)
      const sorted = n.sortWith((n1, n2) => n2 - n1)

      expect(n.toArray()).to.be.deep.equal([2, 1, 3, 4])
    })
  })
})
