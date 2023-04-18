import { describe, expect, it } from 'vitest'
import type { IProgram } from '../src'
import { LiteralType, Parser, ProgramType } from '../src'

describe('Parser', () => {
  it('NumbericLiteral pure string number', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`123`)
    expect(res).toEqual({
      type: ProgramType.PROGRAM,
      body: {
        type: LiteralType.NUMBERLITERAL,
        value: 123,
      },
    })
  })
  it('NumbericLiteral single quote number', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`'123'`)
    expect(res).toEqual({
      type: ProgramType.PROGRAM,
      body: {
        type: LiteralType.STRINGLITERAL,
        value: '123',
      },
    })
  })
  it('NumbericLiteral double quote number', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`"123"`)
    expect(res).toEqual({
      type: ProgramType.PROGRAM,
      body: {
        type: LiteralType.STRINGLITERAL,
        // eslint-disable-next-line @typescript-eslint/quotes
        value: "123",
      },
    })
  })
  it('NumbericLiteral pure string with whitespace number', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`    123      `)
    expect(res).toEqual({
      type: ProgramType.PROGRAM,
      body: {
        type: LiteralType.NUMBERLITERAL,
        value: 123,
      },
    })
  })
  it('StringLiteral single quote string', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`'hello'`)
    expect(res).toEqual({
      type: ProgramType.PROGRAM,
      body: {
        type: LiteralType.STRINGLITERAL,
        value: 'hello',
      },
    })
  })
  it('StringLiteral double quote string', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`"hello"`)
    expect(res).toEqual({
      type: ProgramType.PROGRAM,
      body: {
        type: LiteralType.STRINGLITERAL,
        // eslint-disable-next-line @typescript-eslint/quotes
        value: "hello",
      },
    })
  })
})
