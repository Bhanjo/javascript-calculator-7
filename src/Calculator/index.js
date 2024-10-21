import { SyntaxAnalyzer } from "../util";
import { Viewer } from "../View";

export class Calculator {
  static async run() {
    const input = await Viewer.input("덧셈할 문자열을 입력해주세요\n");

    const syntaxAnalyzer = new SyntaxAnalyzer();
    const calcString = syntaxAnalyzer.syntaxAnalysis(input);

    const sum = calcString.reduce((sum, current) => (sum += +current), 0);

    return Viewer.print(`결과 : ${sum}`);
  }
}
