import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    MissionUtils.Console.print(await this.#calculator());
  }
  #CUSTOM_SEPARATOR_PATTERN = /^\/\/.+\\n/;

  async #calculator() {
    const input = await MissionUtils.Console.readLineAsync(
      "덧셈할 문자열을 입력해주세요\n"
    );

    const calcString = this.#syntaxAnalysis(input);

    return this.#printCalculateResult(calcString);
  }

  /** @param {string[]} calcString */
  #printCalculateResult(calcString) {
    return `결과 : ${calcString.reduce(
      (sum, current) => (sum += +current),
      0
    )}`;
  }

  /** @param {string} input - 구문분석을 할 문자열 */
  #syntaxAnalysis(input) {
    let pattern = `\,|\:`;
    const { customSeparator, filteredInput } =
      this.#filterCustomSeparator(input);

    const regex = new RegExp(
      customSeparator ? `${pattern}|${customSeparator}` : pattern
    );

    const numbers = filteredInput.split(regex);
    this.#validationSyntax(numbers);

    return numbers;
  }

  /**
   * @param {string} input - 구분분석을 할 문자열
   * @returns {{customSeparator: string, filteredInput: string}}
   * */
  #filterCustomSeparator(input) {
    const matchArray = input.match(this.#CUSTOM_SEPARATOR_PATTERN);
    return {
      customSeparator: matchArray?.[0]?.replace("//", "")?.replace("\\n", ""),
      filteredInput: matchArray ? input.split(matchArray)?.[1] : input,
    };
  }

  /** @param {string[]} input */
  #validationSyntax(input) {
    const ERROR_PREFIX = "[ERROR]";
    const startWithNumber = input[0].match(/[^0-9]/) === null;
    const allNumber = input.every((numOfChar) => numOfChar.match(/[0-9]/));

    if (!startWithNumber) {
      throw new Error(`${ERROR_PREFIX} 문자 앞에 -가 존재합니다 ${input}`);
    }

    if (!allNumber) {
      throw new Error(`${ERROR_PREFIX} 구분 기호가 잘못되었습니다 ${input}`);
    }
  }
}

export default App;
