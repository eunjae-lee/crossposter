import { substringForTwitter, trimText, trimTextForTwitter } from "../utils";

describe("utils", () => {
  describe("trimText", () => {
    it("trims text and attach ellipsis", () => {
      expect(
        trimText({
          text: "abcdef",
          maximumLength: 3,
        })
      ).toEqual({ trimmed: true, text: "ab…" });
    });

    it("can become a shorter text than the maximum limit", () => {
      expect(
        trimText({
          text: "abcdefghij",
          maximumLength: 8,
          targetLengthAfterTrimming: 5,
        })
      ).toEqual({ trimmed: true, text: "abcd…" });
    });

    it("can have a different ellipsis text", () => {
      expect(
        trimText({
          text: "abcdefghij",
          maximumLength: 8,
          targetLengthAfterTrimming: 5,
          ellipsisText: "...",
        })
      ).toEqual({ trimmed: true, text: "ab..." });
    });
  });

  describe("substringForTwitter", () => {
    it("substrings English text correctly", () => {
      expect(substringForTwitter("abcdefg", 4)).toEqual("abcd");
    });

    it("substrings Korean text correctly", () => {
      expect(substringForTwitter("가나다라마바사", 4)).toEqual("가나");
    });

    it("substrings mixed text", () => {
      expect(substringForTwitter("a가나다라마바사", 4)).toEqual("a가");

      expect(substringForTwitter("a가나 cd다라마바사", 8)).toEqual("a가나 cd");

      expect(substringForTwitter("a가나 cd다라마바사", 9)).toEqual("a가나 cd");
    });
  });

  describe("trimTextForTwitter", () => {
    it("trims English text correctly", () => {
      expect(
        trimTextForTwitter({
          text: "abcdef",
          maximumLength: 4,
        })
      ).toEqual({ trimmed: true, text: "ab…" });
    });

    it("doesn't trim if limit is high", () => {
      expect(
        trimTextForTwitter({
          text: "가나다라마바사아",
          maximumLength: 16,
        })
      ).toEqual({ trimmed: false, text: "가나다라마바사아" });
    });

    it("trims Korean text correctly", () => {
      expect(
        trimTextForTwitter({
          text: "가나다라마바사아",
          maximumLength: 8,
        })
      ).toEqual({ trimmed: true, text: "가나다…" });

      expect(
        trimTextForTwitter({
          text: "가나다라마바사아",
          maximumLength: 12,
          targetLengthAfterTrimming: 6,
        })
      ).toEqual({ trimmed: true, text: "가나…" });
    });
  });
});