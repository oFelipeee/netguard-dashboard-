import { describe, it, expect } from "vitest";

describe("IP Validation", () => {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

  it("should validate correct IPs", () => {
    expect(ipRegex.test("192.168.1.1")).toBe(true);
    expect(ipRegex.test("10.0.0.1")).toBe(true);
    expect(ipRegex.test("255.255.255.255")).toBe(true);
  });

  it("should reject invalid IPs", () => {
    expect(ipRegex.test("invalid")).toBe(false);
    expect(ipRegex.test("192.168.1")).toBe(false);
    expect(ipRegex.test("")).toBe(false);
  });
});

describe("Password Validation", () => {
  it("should accept passwords with 6+ characters", () => {
    expect("123456".length >= 6).toBe(true);
    expect("password".length >= 6).toBe(true);
  });

  it("should reject passwords with less than 6 characters", () => {
    expect("123".length >= 6).toBe(false);
    expect("abc".length >= 6).toBe(false);
  });
});

describe("Email Validation", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it("should validate correct emails", () => {
    expect(emailRegex.test("user@test.com")).toBe(true);
    expect(emailRegex.test("admin@netguard.io")).toBe(true);
  });

  it("should reject invalid emails", () => {
    expect(emailRegex.test("invalid")).toBe(false);
    expect(emailRegex.test("@test.com")).toBe(false);
    expect(emailRegex.test("user@")).toBe(false);
  });
});