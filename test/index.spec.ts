import { describe, expect, it } from 'vitest'
import { foo } from '../src'

describe('should', () => {
  it('exported', () => {
    expect(foo(1, 1)).toEqual(2)
  })
})
