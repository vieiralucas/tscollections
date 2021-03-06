import { expect } from 'chai'
import { Option, Some, Nothing } from '../src'

describe('Option', () => {
  describe('.isDefined', () => {
    it('should be true for Some', () => {
      const n = new Some(1)
      expect(n.isDefined()).to.be.true
    })

    it('should be false for Nothing', () => {
      const n = new Nothing()
      expect(n.isDefined()).to.be.false
    })
  })

  describe('.isEmpty', () => {
    it('should be false for Some', () => {
      const n = new Some(1)
      expect(n.isEmpty()).to.be.false
    })

    it('should be true for Nothing', () => {
      const n = new Nothing()
      expect(n.isEmpty()).to.be.true
    })
  })

  describe('.orElse', () => {
    it('should return value if it is a Some', () => {
      const s = new Some(2)
      const two = s.orElse(3)

      expect(two).to.equal(2)
    })

    it('should return else if it is a Nothing', () => {
      const n = new Nothing()
      const two = n.orElse(2)

      expect(two).to.equal(2)
    })
  })

  describe('.map', () => {
    it('should remain Nothing', () => {
      const n = new Nothing()
      const n2 = n.map(x => 2)

      expect(n2.isEmpty()).to.be.true
    })

    it('should map a Some', () => {
      const two = new Some(2)
      const three = two.map(n => 3)

      expect(three.orElse(1)).to.equal(3)
    })

    it('should enable mapping to another type', () => {
      const n = new Some(1)
      const s = n.map(n => String(n))

      expect(s.orElse('')).to.equal('1')
    })
  })

  describe('Some', () => {
    describe('.get', () => {
      it('should return the value', () => {
        expect(new Some(2).get()).to.equal(2)
      })
    })
  })
})
