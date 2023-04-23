import { describe, expect, it } from 'vitest'
import type { IProgram } from '../src'
import { LiteralType, Parser, ProgramType, StatementType } from '../src'

describe('Parser', () => {
  it('NumbericLiteral pure string number', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`123;`)
    expect(res).toEqual({
      type: ProgramType.Program,
      body: [{
        type: StatementType.ExpressionStatement,
        expression: {
          type: LiteralType.NumberLiteral,
          value: 123,
        },
      }],
    })
  })
  it('NumbericLiteral single quote number', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`'123';`)
    expect(res).toEqual({
      type: ProgramType.Program,
      body: [{
        type: StatementType.ExpressionStatement,
        expression: {
          type: LiteralType.StringLiteral,
          value: '123',
        },
      }],
    })
  })
  it('NumbericLiteral double quote number', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`"123";`)
    expect(res).toEqual({
      type: ProgramType.Program,
      body: [{
        type: StatementType.ExpressionStatement,
        expression: {
          type: LiteralType.StringLiteral,
          // eslint-disable-next-line @typescript-eslint/quotes
          value: "123",
        },
      }],
    })
  })
  it('StringLiteral single quote string', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`'hello';`)
    expect(res).toEqual({
      type: ProgramType.Program,
      body: [{
        type: StatementType.ExpressionStatement,
        expression: {
          type: LiteralType.StringLiteral,
          value: 'hello',
        },
      }],
    })
  })
  it('StringLiteral double quote string', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`"hello";`)
    expect(res).toEqual({
      type: ProgramType.Program,
      body: [{
        type: StatementType.ExpressionStatement,
        expression: {
          type: LiteralType.StringLiteral,
          // eslint-disable-next-line @typescript-eslint/quotes
          value: "hello",
        },
      }],
    })
  })
  it('number with whitespace', () => {
    const parser = new Parser()
    // eslint-disable-next-line @typescript-eslint/quotes
    const res: IProgram = parser.parse(`    123;      `)
    expect(res).toEqual({
      type: ProgramType.Program,
      body: [{
        type: StatementType.ExpressionStatement,
        expression: {
          type: LiteralType.NumberLiteral,
          value: 123,
        },
      }],
    })
  })
  it('with single comment', () => {
    const parser = new Parser()
    const res: IProgram = parser.parse(`
    // Hello
    "Hello";
    `)
    expect(res).toEqual({
      type: ProgramType.Program,
      body: [{
        type: StatementType.ExpressionStatement,
        expression: {
          type: LiteralType.StringLiteral,
          value: 'Hello',
        },
      }],
    })
  })
  it('with muti comment', () => {
    const parser = new Parser()
    const res: IProgram = parser.parse(`

    /*
     * Hello:
     */
    "Hello";

    `)
    expect(res).toEqual({
      type: ProgramType.Program,
      body: [{
        type: StatementType.ExpressionStatement,
        expression: {
          type: LiteralType.StringLiteral,
          value: 'Hello',
        },
      }],
    })
  })
  it('with semicoloum', () => {
    const parser = new Parser()
    const res: IProgram = parser.parse(`
      123;
      "Hello";
    `)
    expect(res).toEqual({
      type: ProgramType.Program,
      body: [
        {
          type: StatementType.ExpressionStatement,
          expression: {
            type: LiteralType.NumberLiteral,
            value: 123,
          },
        },
        {
          type: StatementType.ExpressionStatement,
          expression: {
            type: LiteralType.StringLiteral,
            value: 'Hello',
          },
        },
      ],
    })
  })
})
