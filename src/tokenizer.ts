export enum TokenizerType {
  NUMBER = 'Number',
  STRING = 'String',
}
export interface ITokenizer {
  type: TokenizerType
  value: string | number
}

export class Tokenizer {
  private _string: string
  private _cursor: number
  constructor() {
    this._string = ''
    this._cursor = 0
  }

  init(string: string) {
    this._string = string
  }

  private hasMoreToken(): boolean {
    return this._cursor < this._string.length
  }

  public getNextToken(): ITokenizer | null {
    if (!this.hasMoreToken())
      return null
    const string = this._string.slice(this._cursor)
    const firstElement = string[0]
    // 处理 Number
    if (this.isNumber(firstElement)) {
      const value = this.parseNumber(string)
      return {
        type: TokenizerType.NUMBER,
        value,
      }
    }
    // 处理String
    // TODO:only double quote
    if (this.isQuote(firstElement)) {
      let value = ''

      do
        value += string[this._cursor++]
      while (!this.isQuote(string[this._cursor]) && !this.isEOF())

      value += string[this._cursor++]
      return {
        type: TokenizerType.STRING,
        value,
      }
    }
    return null
  }

  private isNumber(value: string): boolean {
    return /[0-9]/.test(value)
  }

  private isEOF(): boolean {
    return this._cursor === this._string.length
  }

  private isQuote(value: string): boolean {
    return value === '"' || value === '\''
  }

  private parseNumber(string: string): string {
    let numStr = ''
    while (this.isNumber(string[this._cursor])) {
      numStr += string[this._cursor]
      this._cursor++
    }
    return numStr
  }
}
