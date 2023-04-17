export enum TokenizerType {
  Number,
  String,
}
export interface ITokenizer {
  type: TokenizerType
  value: string | number
}
export class Tokenizer {
  private readonly tokenPatterns: Array<[RegExp, TokenizerType]> = [
    [/^\d+/, TokenizerType.Number],
    [/^"[^"]*"/, TokenizerType.String],
    [/^'[^']*'/, TokenizerType.String],
  ]

  private string: string
  private cursor: number
  constructor() {
    this.string = ''
    this.cursor = 0
  }

  init(string: string): void {
    this.string = string
  }

  private hasMoreToken(): boolean {
    return this.cursor < this.string.length
  }

  public getNextToken(): ITokenizer | null {
    if (!this.hasMoreToken())
      return null
    const string = this.string.slice(this.cursor)

    for (const [reg, type] of this.tokenPatterns) {
      const value = this.matchTokenPattern(reg, string)
      if (!value)
        continue
      return {
        type,
        value,
      }
    }
    return null
  }

  private matchTokenPattern(regex: RegExp, string: string): string | null {
    const matched = regex.exec(string)
    if (matched) {
      this.cursor += matched[0].length
      return matched[0]
    }
    return null
  }
}
