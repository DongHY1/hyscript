import { Tokenizer, TokenizerType } from './tokenizer'
import type { ITokenizer } from './tokenizer'

export enum LiteralType {
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
}
export enum ProgramType {
  Program = 'Program',
}
export enum StatementType {
  EmptyStatement = 'EmptyStatement',
  BlockStatement = 'BlockStatement',
  ExpressionStatement = 'ExpressionStatement',
}
export enum OperatorType {
  Plus = '+',
  Sub = '-',
}
export enum ExpressionType {
  BinaryExpression = 'BinaryExpression',
}
export interface IBinary {
  type: ExpressionType.BinaryExpression
  operator: OperatorType
  left: ILiteral | IBinary
  right: ILiteral | IBinary
}
export interface ILiteral {
  type: LiteralType
  value: number | string
}
export interface IProgram {
  type: ProgramType
  body: Array<IStatement>
}
export type IStatement = IExpression | IBlock | IEmpty
export interface IExpression {
  type: StatementType.ExpressionStatement
  expression: ILiteral | IBinary
}
export interface IBlock {
  type: StatementType.BlockStatement
  body: IExpression[]
}
export interface IEmpty {
  type: StatementType.EmptyStatement
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

  private statementList(stopLookahead?: TokenizerType): Array<IStatement> {
    const statementList = [this.statement()]
    while (this._lookahead !== null && this._lookahead.type !== stopLookahead)
      statementList.push(this.statement())

    return statementList
  }

  private statement(): IStatement {
    switch (this._lookahead?.type) {
      case TokenizerType.SemiColumn:
        return this.emptyStatement()
      case TokenizerType.LeftBrace:
        return this.blockStatement()
      default:
        return this.expressionStatement()
    }
  }

  private emptyStatement(): IEmpty {
    this.eat(TokenizerType.SemiColumn)
    return {
      type: StatementType.EmptyStatement,
    }
  }

  private blockStatement(): IBlock {
    this.eat(TokenizerType.LeftBrace)
    const body = this._lookahead?.type !== TokenizerType.RightBrace ? this.statementList(TokenizerType.RightBrace) as IExpression[] : []
    this.eat(TokenizerType.RightBrace)
    return {
      type: StatementType.BlockStatement,
      body,
    }
  }

  private expressionStatement(): IExpression {
    const expression = this.expression()
    this.eat(TokenizerType.SemiColumn)
    return {
      type: StatementType.ExpressionStatement,
      expression,
    }
  }

  private expression(): ILiteral | IBinary {
    return this.addExpression()
  }

  private addExpression(): ILiteral | IBinary {
    let left = this.literal()
    while (this._lookahead?.type === TokenizerType.AdditiveOperator) {
      const operator = this.eat(TokenizerType.AdditiveOperator).value as OperatorType
      const right = this.literal()
      left = {
        type: ExpressionType.BinaryExpression,
        operator,
        left,
        right,
      }
    }
    return left
  }

  private literal(): ILiteral | IBinary {
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
