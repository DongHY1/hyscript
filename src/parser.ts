import { Tokenizer, TokenizerType } from './tokenizer'
import type { ITokenizer } from './tokenizer'

export enum LiteralType {
  NumberLiteral,
  StringLiteral,
}
export enum ProgramType {
  Program,
}
export enum StatementType {
  ExpressionStatement,
}
export interface ILiteral {
  type: LiteralType
  value: number | string
}
export interface IProgram {
  type: ProgramType
  body: IExpression[]
}
export interface IExpression {
  type: StatementType
  expression: ILiteral
}

export class Parser {
  private _tokenizer: Tokenizer
  private _lookahead: ITokenizer | null
  constructor() {
    this._tokenizer = new Tokenizer()
    this._lookahead = null
  }

  public parse(string: string) {
    this._tokenizer.init(string)
    this._lookahead = this._tokenizer.getNextToken()
    return this.program()
  }

  private program(): IProgram {
    return {
      type: ProgramType.Program,
      body: this.statementList(),
    }
  }

  private statementList(): IExpression[] {
    const statementList = [this.statement()]
    while (this._lookahead !== null)
      statementList.push(this.statement())

    return statementList
  }

  private statement(): IExpression {
    return this.expressionStatement()
  }

  private expressionStatement(): IExpression {
    const expression = this.expression()
    this.eat(TokenizerType.SemiColumn)
    return {
      type: StatementType.ExpressionStatement,
      expression,
    }
  }

  private expression(): ILiteral {
    return this.literal()
  }

  private literal(): ILiteral {
    switch (this._lookahead?.type) {
      case TokenizerType.Number:
        return this.numberLiteral()
      case TokenizerType.String:
        return this.stringLiteral()
      default:
        return {
          type: LiteralType.StringLiteral,
          value: '',
        }
    }
  }

  private numberLiteral(): ILiteral {
    const token = this.eat(TokenizerType.Number)
    return {
      type: LiteralType.NumberLiteral,
      value: Number(token.value),
    }
  }

  private stringLiteral(): ILiteral {
    const token = this.eat(TokenizerType.String)
    const value = token.value as string
    return {
      type: LiteralType.StringLiteral,
      // 去掉首尾的引号
      value: value.slice(1, -1),
    }
  }

  private eat(type: TokenizerType) {
    const token = this._lookahead
    if (token === null)
      throw new SyntaxError(`Unexpected end of the input,expect ${type}`)
    if (token.type !== type)
      throw new SyntaxError(`Unexpected token value ${token.value},please use ${type}`)

    // 将 _lookahead 指向下一个标记，以便在下次调用 eat() 方法时，能够访问到正确的标记。
    this._lookahead = this._tokenizer.getNextToken()
    return token
  }
}
