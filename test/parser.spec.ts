import { describe, expect, it } from 'vitest'
import type { ILiteral } from '../src'
import { LiteralType, Parser } from '../src'

describe('Parser', () => {
  it('NumbericLiteral', () => {
    const parser = new Parser('1')
    const obj: ILiteral = parser.parse()
    expect(obj).toEqual({
      type: LiteralType.NumbericLiteral,
      value: 1,
    })
  })
})
