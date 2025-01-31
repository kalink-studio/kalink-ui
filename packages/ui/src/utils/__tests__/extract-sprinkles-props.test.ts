import { describe, test } from "@std/testing/bdd";
import { spy } from "@std/testing/mock";
import { expect } from "@std/expect";

import {
  extractSprinklesProps,
  type SprinklesFnBase,
} from "@/utils/extract-sprinkles-props.ts";

describe("extractSprinklesProps", () => {
  const mockSprinkles: SprinklesFnBase = {
    properties: new Set(["color", "fontSize", "padding"]),
  } as SprinklesFnBase;

  test("should correctly separate sprinkles props from component props", () => {
    const props = {
      color: "red",
      fontSize: "16px",
      padding: "10px",
      onClick: spy(),
      className: "custom-class",
    };

    const [sprinkleProps, componentProps] = extractSprinklesProps(
      props,
      mockSprinkles,
    );

    expect(sprinkleProps).toEqual({
      color: "red",
      fontSize: "16px",
      padding: "10px",
    });

    expect(componentProps).toEqual({
      onClick: expect.any(Function),
      className: "custom-class",
    });
  });

  test("should handle props with no sprinkles properties", () => {
    const props = {
      onClick: spy(),
      className: "custom-class",
    };

    const [sprinkleProps, componentProps] = extractSprinklesProps(
      props,
      mockSprinkles,
    );

    expect(sprinkleProps).toEqual({});
    expect(componentProps).toEqual(props);
  });

  test("should handle props with only sprinkles properties", () => {
    const props = {
      color: "blue",
      fontSize: "14px",
    };

    const [sprinkleProps, componentProps] = extractSprinklesProps(
      props,
      mockSprinkles,
    );

    expect(sprinkleProps).toEqual(props);
    expect(componentProps).toEqual({});
  });

  test("should handle empty props object", () => {
    const props = {};

    const [sprinkleProps, componentProps] = extractSprinklesProps(
      props,
      mockSprinkles,
    );

    expect(sprinkleProps).toEqual({});
    expect(componentProps).toEqual({});
  });

  test("should handle sprinkles function with empty properties set", () => {
    const emptySprinkles: SprinklesFnBase = {
      properties: new Set(),
    } as SprinklesFnBase;

    const props = {
      color: "green",
      onClick: spy(),
    };

    const [sprinkleProps, componentProps] = extractSprinklesProps(
      props,
      emptySprinkles,
    );

    expect(sprinkleProps).toEqual({});
    expect(componentProps).toEqual(props);
  });
});
