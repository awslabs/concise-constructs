import {recombineTaggedTemplateArgs} from "./recombine-tagged-template-args";

const A = "A";
const B = "8";
const C = "Three";

function argumentsOf(quasis: TemplateStringsArray, ...rest: string[]): [TemplateStringsArray, ...string[]] {
  return [quasis, ...rest];
}

describe("Recombine Tagged Template Args", () => {
  it("Without Quasis", () => {
    expect.assertions(1);
    const withoutQuasis = argumentsOf`Nice kicks man... those Air Jordan Retros?`;
    expect(recombineTaggedTemplateArgs(...withoutQuasis)).toStrictEqual("Nice kicks man... those Air Jordan Retros?");
  });

  it("Starting With Quasis", () => {
    expect.assertions(1);
    const startingWithQuasis = argumentsOf`${A} good way to code is to just close your eyes & hope for the ${B}est.`;
    expect(recombineTaggedTemplateArgs(...startingWithQuasis)).toStrictEqual(
      `A good way to code is to just close your eyes & hope for the 8est.`,
    );
  });

  it("With Middle Quasis", () => {
    expect.assertions(1);
    const withMiddleQuasis = argumentsOf`The number "${B}", the letter "${A}", and the spelled-number "${C}"`;
    expect(recombineTaggedTemplateArgs(...withMiddleQuasis)).toStrictEqual(
      `The number "8", the letter "A", and the spelled-number "Three"`,
    );
  });

  it("Without Literal Quasis", () => {
    expect.assertions(1);
    const withLiteralQuasis = argumentsOf`Lorem ipsum ${"dolor"}...`;
    expect(recombineTaggedTemplateArgs(...withLiteralQuasis)).toStrictEqual("Lorem ipsum dolor...");
  });
});
