import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    MissionUtils.Console.print(await this.#calculator());
  }

  async #calculator() {
    const input = await MissionUtils.Console.readLineAsync(
      "덧셈할 문자열을 입력해주세요\n"
    );

    try {
      const numbers = this.#syntaxAnalysis(input);

      /** @TODO 결과를 numberes에 대한 합으로 바꾸기 */
      return this.#printCalculateResult(numbers);
    } catch (error) {
      throw new Error("[ERROR]");
    }
  }

  /** @param {number[]} numbers */
  #printCalculateResult(numbers) {
    return `결과: ${numbers.reduce((sum, current) => (sum += current), 0)}`;
  }

  /** @param {string} input - 구문분석을 할 문자열 */
  #syntaxAnalysis(input) {
    const SEPARATORS = [",", '"'];
    this.#addCustomSeparator(input, SEPARATORS);
    /**
     * @TODO 콜론, 쉼표, 커스텀 구분자에 대한 정규식 만들기
     * @TODO 구문분석에 실패할 시 에러 throw
     */
    return [];
  }

  /**
   *  @param {string} input - 구분분석을 할 문자열
   *  @param {string[]} separators - 구분자 모음
   * */
  #addCustomSeparator(input, separators) {
    /**
     * @TODO 커스텀 구분자를 등록하는 함수 만들기
     */
  }
}

export default App;
