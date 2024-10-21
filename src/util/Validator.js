export class Validator {
  /** @param {string[]} input */
  static validationSyntax(input) {
    const getErrorMessage = (errorMessage) =>
      `[ERROR] ${errorMessage} ${input}`;

    const startWithNumber = input[0].match(/[^0-9]/) === null;
    const allNumber = input.every((numOfChar) => numOfChar.match(/[0-9]/));

    if (!startWithNumber) {
      throw new Error(getErrorMessage("문자 앞에 -가 존재합니다"));
    }

    if (!allNumber) {
      throw new Error(getErrorMessage("구분 기호가 잘못되었습니다"));
    }
  }
}
