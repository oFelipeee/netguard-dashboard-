import { describe, it, expect } from "vitest";
import { z } from "zod";

const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

const deviceSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  ip: z.string().refine((val) => ipRegex.test(val), "IP inválido"),
  type: z.enum(["router", "server", "switch", "ap"]),
  status: z.enum(["online", "warning", "offline"]),
  uptime: z.string(),
  location: z.string(),
});

const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["admin", "user"]),
});

describe("Device Schema Validation", () => {
  it("should validate a correct device", () => {
    const validDevice = {
      name: "Router Teste",
      ip: "192.168.1.1",
      type: "router",
      status: "online",
      uptime: "10d 5h",
      location: "Data Center",
    };

    const result = deviceSchema.safeParse(validDevice);
    expect(result.success).toBe(true);
  });

  it("should reject invalid IP", () => {
    const invalidDevice = {
      name: "Router Teste",
      ip: "invalid-ip",
      type: "router",
      status: "online",
      uptime: "10d 5h",
      location: "Data Center",
    };

    const result = deviceSchema.safeParse(invalidDevice);
    expect(result.success).toBe(false);
  });

  it("should reject name with less than 3 characters", () => {
    const invalidDevice = {
      name: "oi",
      ip: "192.168.1.1",
      type: "router",
      status: "online",
      uptime: "10d 5h",
      location: "Data Center",
    };

    const result = deviceSchema.safeParse(invalidDevice);
    expect(result.success).toBe(false);
  });

  it("should reject invalid type", () => {
    const invalidDevice = {
      name: "Router Teste",
      ip: "192.168.1.1",
      type: "invalid-type",
      status: "online",
      uptime: "10d 5h",
      location: "Data Center",
    };

    const result = deviceSchema.safeParse(invalidDevice);
    expect(result.success).toBe(false);
  });

  it("should reject invalid status", () => {
    const invalidDevice = {
      name: "Router Teste",
      ip: "192.168.1.1",
      type: "router",
      status: "invalid-status",
      uptime: "10d 5h",
      location: "Data Center",
    };

    const result = deviceSchema.safeParse(invalidDevice);
    expect(result.success).toBe(false);
  });
});

describe("User Schema Validation", () => {
  it("should validate a correct user", () => {
    const validUser = {
      name: "João Silva",
      email: "joao@teste.com",
      password: "123456",
      role: "user",
    };

    const result = createUserSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const invalidUser = {
      name: "João Silva",
      email: "invalid-email",
      password: "123456",
      role: "user",
    };

    const result = createUserSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it("should reject password with less than 6 characters", () => {
    const invalidUser = {
      name: "João Silva",
      email: "joao@teste.com",
      password: "123",
      role: "user",
    };

    const result = createUserSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it("should reject invalid role", () => {
    const invalidUser = {
      name: "João Silva",
      email: "joao@teste.com",
      password: "123456",
      role: "superadmin",
    };

    const result = createUserSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });
});