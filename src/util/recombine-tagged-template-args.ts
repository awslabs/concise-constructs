export function recombineTaggedTemplateArgs(quasis: TemplateStringsArray, ...rest: string[]): string {
  return quasis.reduce((acc, e, i) => {
    return `${acc}${e}${rest[i] || ""}`;
  }, "");
}
