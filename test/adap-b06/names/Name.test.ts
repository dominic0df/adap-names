import { describe, it, expect } from "vitest";
import {StringName} from "../../../src/adap-b06/names/StringName";
import {StringArrayName} from "../../../src/adap-b06/names/StringArrayName";
import {IllegalArgumentException} from "../../../src/adap-b06/common/IllegalArgumentException";

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    const n = new StringName("oss.fau.de");
    const updated = n.insert(1, "cs");
    expect(updated.asString()).toBe("oss.cs.fau.de");
    expect(n.asString()).toBe("oss.fau.de"); // Ensure immutability
  });

  it("test append", () => {
    const n = new StringName("oss.cs.fau");
    const updated = n.append("de");
    expect(updated.asString()).toBe("oss.cs.fau.de");
    expect(n.asString()).toBe("oss.cs.fau"); // Ensure immutability
  });

  it("test remove", () => {
    const n = new StringName("oss.cs.fau.de");
    const updated = n.remove(0);
    expect(updated.asString()).toBe("cs.fau.de");
    expect(n.asString()).toBe("oss.cs.fau.de"); // Ensure immutability
  });
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    const n = new StringArrayName(["oss", "fau", "de"]);
    const updated = n.insert(1, "cs");
    expect(updated.asString()).toBe("oss.cs.fau.de");
    expect(n.asString()).toBe("oss.fau.de"); // Ensure immutability
  });

  it("test append", () => {
    const n = new StringArrayName(["oss", "cs", "fau"]);
    const updated = n.append("de");
    expect(updated.asString()).toBe("oss.cs.fau.de");
    expect(n.asString()).toBe("oss.cs.fau"); // Ensure immutability
  });

  it("test remove", () => {
    const n = new StringArrayName(["oss", "cs", "fau", "de"]);
    const updated = n.remove(0);
    expect(updated.asString()).toBe("cs.fau.de");
    expect(n.asString()).toBe("oss.cs.fau.de"); // Ensure immutability
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    const n = new StringName("oss#fau#de", '#');
    const updated = n.insert(1, "cs");
    expect(updated.asString()).toBe("oss#cs#fau#de");
    expect(n.asString()).toBe("oss#fau#de"); // Ensure immutability
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    const n = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    const updated = n.append("people");
    expect(updated.asString()).toBe("oss.cs.fau.de#people");
    expect(n.asString()).toBe("oss.cs.fau.de"); // Ensure immutability
  });
});

describe("Equality and hash code tests", () => {
  it("test equality between identical StringName instances", () => {
    const name1 = new StringName("oss.cs.fau.de");
    const name2 = new StringName("oss.cs.fau.de");
    const name3 = new StringName("oss.cs");

    expect(name1.isEqual(name2)).toBe(true); // Equal
    expect(name1.isEqual(name3)).toBe(false); // Not equal
  });

  it("test hash code consistency", () => {
    const name1 = new StringName("oss.cs.fau.de");
    const name2 = new StringName("oss.cs.fau.de");

    expect(name1.getHashCode()).toBe(name2.getHashCode()); // Hash codes should match
  });

  it("test equality between identical StringArrayName instances", () => {
    const name1 = new StringArrayName(["oss", "cs", "fau", "de"]);
    const name2 = new StringArrayName(["oss", "cs", "fau", "de"]);
    const name3 = new StringArrayName(["oss", "cs"]);

    expect(name1.isEqual(name2)).toBe(true); // Equal
    expect(name1.isEqual(name3)).toBe(false); // Not equal
  });

  it("test hash code consistency for StringArrayName", () => {
    const name1 = new StringArrayName(["oss", "cs", "fau", "de"]);
    const name2 = new StringArrayName(["oss", "cs", "fau", "de"]);

    expect(name1.getHashCode()).toBe(name2.getHashCode()); // Hash codes should match
  });
});

describe("getComponents method tests", () => {
  it("test getComponents with StringName", () => {
    const n = new StringName("oss.cs.fau.de");
    const components = n.getComponents();
    expect(components).toEqual(["oss", "cs", "fau", "de"]);
  });

  it("test getComponents with StringArrayName", () => {
    const n = new StringArrayName(["oss", "cs", "fau", "de"]);
    const components = n.getComponents();
    expect(components).toEqual(["oss", "cs", "fau", "de"]);
  });

  it("test getComponents with custom delimiter in StringName", () => {
    const n = new StringName("oss#cs#fau#de", "#");
    const components = n.getComponents();
    expect(components).toEqual(["oss", "cs", "fau", "de"]);
  });

  it("test getComponents with escape characters in StringName", () => {
    const n = new StringName("oss\\.cs\\.fau\\.de", ".");
    const components = n.getComponents();
    expect(components).toEqual(["oss.cs.fau.de"]);
  });
});

describe("Exception handling tests", () => {
  it("throw IllegalArgumentException for invalid index in getComponent (StringName)", () => {
    const name = new StringName("oss.cs.fau.de");
    expect(() => name.getComponent(-1)).toThrow(IllegalArgumentException);
    expect(() => name.getComponent(10)).toThrow(IllegalArgumentException);
  });

  it("throw IllegalArgumentException for invalid index in getComponent (StringArrayName)", () => {
    const name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(() => name.getComponent(-1)).toThrow(IllegalArgumentException);
    expect(() => name.getComponent(10)).toThrow(IllegalArgumentException);
  });

  it("throw IllegalArgumentException for invalid index in insert (StringName)", () => {
    const name = new StringName("oss.cs.fau.de");
    expect(() => name.insert(-1, "test")).toThrow(IllegalArgumentException);
    expect(() => name.insert(10, "test")).toThrow(IllegalArgumentException);
  });

  it("throw IllegalArgumentException for invalid index in insert (StringArrayName)", () => {
    const name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(() => name.insert(-1, "test")).toThrow(IllegalArgumentException);
    expect(() => name.insert(10, "test")).toThrow(IllegalArgumentException);
  });

  it("throw IllegalArgumentException for invalid index in remove (StringName)", () => {
    const name = new StringName("oss.cs.fau.de");
    expect(() => name.remove(-1)).toThrow(IllegalArgumentException);
    expect(() => name.remove(10)).toThrow(IllegalArgumentException);
  });

  it("throw IllegalArgumentException for invalid index in remove (StringArrayName)", () => {
    const name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(() => name.remove(-1)).toThrow(IllegalArgumentException);
    expect(() => name.remove(10)).toThrow(IllegalArgumentException);
  });

  it("throw IllegalArgumentException for null component in insert (StringName)", () => {
    const name = new StringName("oss.cs.fau.de");
    expect(() => name.insert(1, null as unknown as string)).toThrow(IllegalArgumentException);
  });

  it("throw IllegalArgumentException for null component in insert (StringArrayName)", () => {
    const name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(() => name.insert(1, null as unknown as string)).toThrow(IllegalArgumentException);
  });
});
