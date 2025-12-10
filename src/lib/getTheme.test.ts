import { describe, expect, it } from "vitest";
import { themes } from "../../themes";
import { getTheme } from "./getTheme";

describe("getTheme", () => {
  it("returns the theme object when the key exists", () => {
    const theme = getTheme("ocean");

    expect(theme).toBe(themes.ocean);
    expect(theme.links_button).toContain("cyan");
  });

  it("returns the default theme when the key does not exist", () => {
    const fallback = getTheme("non-existent");

    expect(fallback).toBe(themes.default);
    expect(fallback.links_button).toContain("glass");
  });

  it("falls back to default for empty theme keys", () => {
    const fallback = getTheme("");

    expect(fallback).toBe(themes.default);
  });
});
