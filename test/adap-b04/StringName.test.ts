import { describe, it, expect, test, toThrow } from "vitest";
import {StringName} from "../../src/adap-b04/names/StringName";
import {IllegalArgumentException} from "../../src/adap-b04/common/IllegalArgumentException";

describe("StringName Tests", () => {
    test("throw IllegalArgumentException for null string in constructor", () => {
        expect(() => new StringName(null)).toThrow(IllegalArgumentException);
    });

    test("throw IllegalArgumentException for invalid index in getComponent", () => {
        const name = new StringName("test");
        expect(() => name.getComponent(-1)).toThrow(IllegalArgumentException);
        expect(() => name.getComponent(10)).toThrow(IllegalArgumentException);
    });

    test("throw IllegalArgumentException for null component in setComponent", () => {
        const name = new StringName("test");
        expect(() => name.setComponent(0, null)).toThrow(IllegalArgumentException);
    });

    test("throw IllegalArgumentException for invalid index in insert", () => {
        const name = new StringName("test");
        expect(() => name.insert(-1, "new")).toThrow(IllegalArgumentException);
        expect(() => name.insert(10, "new")).toThrow(IllegalArgumentException);
    });

    test("throw IllegalArgumentException for null component in append", () => {
        const name = new StringName("test");
        expect(() => name.append(null)).toThrow(IllegalArgumentException);
    });

    test("throw IllegalArgumentException for invalid index in remove", () => {
        const name = new StringName("test");
        expect(() => name.remove(-1)).toThrow(IllegalArgumentException);
        expect(() => name.remove(10)).toThrow(IllegalArgumentException);
    });
});