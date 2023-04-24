export enum TokenizerType {
  WhiteSpace,
  Comment,
  Number,
  String,
  SemiColumn, // ;
  LeftBrace, // {
  RightBrace, // }
}
export interface ITokenizer {
  type: TokenizerType
  value: string | number
}
export class Tokenizer {
  private readonly tokenPatterns: Array<[RegExp, TokenizerType]> = [
    [/^\s+/, TokenizerType.WhiteSpace],
    [/^\/\/.*/, TokenizerType.Comment],
    [/^\/\*[\s\S]*?\*\//, TokenizerType.Comment],
    [/^;/, TokenizerType.SemiColumn],
    [/^{/, TokenizerType.LeftBrace],
    [/^}/, TokenizerType.RightBrace],
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
      // 处理空白字符和注释情况
      if (type === TokenizerType.WhiteSpace || type === TokenizerType.Comment)
        return this.getNextToken()
      return {
        type,
        value,
      }
    }
    throw new SyntaxError(`Unexpect token ${string[0]}`)
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
