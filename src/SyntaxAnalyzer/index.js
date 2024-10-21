import { Validator } from "../validator";

export class SyntaxAnalyzer {
  #defaultSeparatorPattern = `\,|\:`;

  /** @param {RegExp} separator */
  constructor(separator) {
    if (separator) {
      this.#defaultSeparatorPattern = separator;
    }
  }

  /** @param {string} input - 구문분석을 할 문자열 */
  syntaxAnalysis(input) {
    const { customSeparator, filteredInput } =
      this.#filterCustomSeparator(input);

    const pattern = customSeparator
      ? `${this.#defaultSeparatorPattern}|${customSeparator}`
      : this.#defaultSeparatorPattern;

    const regex = new RegExp(pattern);

    const numbers = filteredInput.split(regex);
    Validator.validationSyntax(numbers);

    return numbers;
  }

  /**
   * @param {string} input - 구분분석을 할 문자열
   * @returns {{customSeparator: string, filteredInput: string}}
   * */
  #filterCustomSeparator(input) {
    const CUSTOM_SEPARATOR_PATTERN = /^\/\/.+\\n/;

    const matchArray = input.match(CUSTOM_SEPARATOR_PATTERN);

    return {
      customSeparator: matchArray?.[0]?.replace("//", "")?.replace("\\n", ""),
      filteredInput: matchArray ? input.split(matchArray)?.[1] : input,
    };
  }
}
