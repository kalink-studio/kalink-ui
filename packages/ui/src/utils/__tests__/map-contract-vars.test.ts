import { mapContractVars } from "@/utils/map-contract-vars.ts";
import { describe, test } from "@std/testing/bdd";
import { expect } from "@std/expect";

describe("mapContractVars", () => {
  test("should map contract vars", () => {
    const contract = {
      foo: "foo",
      bar: "bar",
    };

    const result = mapContractVars(contract, (key) => ({
      padding: `var(--${key})`,
      vars: {
        [`--${key}`]: contract[key],
      },
    }));

    expect(result).toEqual({
      foo: {
        padding: "var(--foo)",
        vars: {
          "--foo": "foo",
        },
      },
      bar: {
        padding: "var(--bar)",
        vars: {
          "--bar": "bar",
        },
      },
    });
  });
});
