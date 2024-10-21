import { MissionUtils } from "@woowacourse/mission-utils";

export class Viewer {
  /**
   * @param {string} message
   * @return {Promise<string>}
   * */
  static input(message) {
    return MissionUtils.Console.readLineAsync(message);
  }

  /** @param {string} message */
  static print(message) {
    return MissionUtils.Console.print(message);
  }
}
