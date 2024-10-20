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

    // -1,2,3은 에러로 처리하지만 1,-2,1은 정상 출력을 위해 첫 번째 문자를 비교
    if (filteredInput[0].match(/[^0-9]/)) {
      throw new Error("[ERROR]");
    }

    return filteredInput.split(regex);
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
}

export default App;
