import {assert, IsExact} from "conditional-type-checks";
import {InRest} from "./in-rest";

describe("InRest", () => {
  it("Props", () => {
    expect.assertions(0);
    assert<IsExact<InRest.Props<string>, [props: string]>>(true);
    assert<IsExact<InRest.Props<string | undefined, false>, [] | [props: undefined] | [props: string]>>(true);
    assert<IsExact<InRest.Props<string | undefined>, [] | [props: string]>>(true);
    assert<IsExact<InRest.Props<undefined, false>, [] | [props: undefined]>>(true);
    assert<IsExact<InRest.Props<undefined>, []>>(true);
  });

  it("BasePropsOrMapper", () => {
    expect.assertions(0);
    assert<IsExact<InRest.BasePropsOrMapper<{b: number}, undefined>, []>>(true);
    assert<
      IsExact<
        InRest.BasePropsOrMapper<{b: number}, undefined | {a: string}>,
        | []
        | [
            mapToBase: (props: {
              b: number;
            }) => {
              a: string;
            },
          ]
        | [
            baseProps: {
              a: string;
            },
          ]
      >
    >(true);
    assert<
      IsExact<
        InRest.BasePropsOrMapper<{b: number}, {a: string}>,
        | [
            mapToBase: (props: {
              b: number;
            }) => {
              a: string;
            },
          ]
        | [
            baseProps: {
              a: string;
            },
          ]
      >
    >(true);
    assert<
      IsExact<
        InRest.BasePropsOrMapper<{b: number} | undefined, {a: string} | undefined>,
        | []
        | [
            mapToBase: (
              ...rest:
                | []
                | [
                    props: {
                      b: number;
                    },
                  ]
            ) => {
              a: string;
            },
          ]
        | [
            baseProps: {
              a: string;
            },
          ]
      >
    >(true);
    assert<
      IsExact<
        InRest.BasePropsOrMapper<undefined, {a: string} | undefined>,
        | []
        | [
            mapToBase: () => {
              a: string;
            },
          ]
        | [
            baseProps: {
              a: string;
            },
          ]
      >
    >(true);
  });
});
