export enum LiteralType {
  NumbericLiteral,
  StringLiteral,
}
export interface ILiteral {
  type: LiteralType
  value: number | string
}

export class Parser {
  _string: string
  constructor(string: string) {
    this._string = string
  }

  parse() {
    return this.program()
  }

  program() {
    return this.NumbericLiteral()
  }

  NumbericLiteral(): ILiteral {
    return {
      type: LiteralType.NumbericLiteral,
      value: Number(this._string),
    }
  }
}
