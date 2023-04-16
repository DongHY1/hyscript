import { Tokenizer, TokenizerType } from './tokenizer'
import type { ITokenizer } from './tokenizer'

export enum LiteralType {
  NUMBERLITERAL = 'NumberLiteral',
  STRINGLITERAL = 'StringLiteral',
}
export enum ProgramType {
  PROGRAM = 'Program',
}
export interface ILiteral {
  type: LiteralType
  value: number | string
}
export interface IProgram {
  type: ProgramType.PROGRAM
  body: ILiteral
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
      type: ProgramType.PROGRAM,
      body: this.literal(),
    }
  }

  private literal(): ILiteral {
    switch (this._lookahead?.type) {
      case TokenizerType.NUMBER:
        return this.numberLiteral()
      case TokenizerType.STRING:
        return this.stringLiteral()
      default:
        return {
          type: LiteralType.STRINGLITERAL,
          value: '',
        }
    }
  }

  private numberLiteral(): ILiteral {
    const token = this.eat(TokenizerType.NUMBER)
    return {
      type: LiteralType.NUMBERLITERAL,
      value: Number(token.value),
    }
  }

  private stringLiteral(): ILiteral {
    const token = this.eat(TokenizerType.STRING)
    const value = token.value as string
    return {
      type: LiteralType.STRINGLITERAL,
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
