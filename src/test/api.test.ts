import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock do Prisma
const mockPrisma = {
  device: {
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  user: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  passwordResetToken: {
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
  },
};

vi.mock("@/lib/prisma", () => ({
  prisma: mockPrisma,
}));

describe("Devices API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return all devices", async () => {
    const mockDevices = [
      { id: "1", name: "Router 1", ip: "192.168.1.1", type: "router", status: "online" },
      { id: "2", name: "Switch 1", ip: "192.168.1.2", type: "switch", status: "online" },
    ];

    mockPrisma.device.findMany.mockResolvedValue(mockDevices);

    const devices = await mockPrisma.device.findMany();
    expect(devices).toHaveLength(2);
    expect(devices[0].name).toBe("Router 1");
  });

  it("should create a new device", async () => {
    const newDevice = {
      name: "New Router",
      ip: "10.0.0.1",
      type: "router",
      status: "online",
      uptime: "0d 0h",
      location: "Test",
    };

    mockPrisma.device.create.mockResolvedValue({ id: "3", ...newDevice });

    const device = await mockPrisma.device.create({ data: newDevice });
    expect(device.name).toBe("New Router");
    expect(device.ip).toBe("10.0.0.1");
  });

  it("should update a device", async () => {
    const updatedDevice = {
      id: "1",
      name: "Updated Router",
      status: "offline",
    };

    mockPrisma.device.update.mockResolvedValue(updatedDevice);

    const device = await mockPrisma.device.update({
      where: { id: "1" },
      data: { name: "Updated Router", status: "offline" },
    });

    expect(device.name).toBe("Updated Router");
    expect(device.status).toBe("offline");
  });

  it("should delete a device", async () => {
    mockPrisma.device.delete.mockResolvedValue({ id: "1" });

    const result = await mockPrisma.device.delete({ where: { id: "1" } });
    expect(result.id).toBe("1");
  });
});

describe("Users API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return all users", async () => {
    const mockUsers = [
      { id: "1", name: "Admin", email: "admin@test.com", role: "admin" },
      { id: "2", name: "User", email: "user@test.com", role: "user" },
    ];

    mockPrisma.user.findMany.mockResolvedValue(mockUsers);

    const users = await mockPrisma.user.findMany();
    expect(users).toHaveLength(2);
    expect(users[0].role).toBe("admin");
  });

  it("should find user by email", async () => {
    const mockUser = {
      id: "1",
      name: "Admin",
      email: "admin@test.com",
      password: "hashed-password",
      role: "admin",
    };

    mockPrisma.user.findUnique.mockResolvedValue(mockUser);

    const user = await mockPrisma.user.findUnique({
      where: { email: "admin@test.com" },
    });

    expect(user.email).toBe("admin@test.com");
    expect(user.role).toBe("admin");
  });

  it("should create a new user", async () => {
    const newUser = {
      name: "New User",
      email: "new@test.com",
      password: "hashed-password",
      role: "user",
    };

    mockPrisma.user.create.mockResolvedValue({ id: "3", ...newUser });

    const user = await mockPrisma.user.create({ data: newUser });
    expect(user.name).toBe("New User");
    expect(user.email).toBe("new@test.com");
  });
});

describe("Password Reset API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a reset token", async () => {
    const mockToken = {
      id: "1",
      token: "abc123",
      email: "user@test.com",
      expiresAt: new Date(Date.now() + 3600000),
      used: false,
    };

    mockPrisma.passwordResetToken.create.mockResolvedValue(mockToken);

    const token = await mockPrisma.passwordResetToken.create({
      data: {
        token: "abc123",
        email: "user@test.com",
        expiresAt: mockToken.expiresAt,
      },
    });

    expect(token.token).toBe("abc123");
    expect(token.used).toBe(false);
  });

  it("should find reset token", async () => {
    const mockToken = {
      id: "1",
      token: "abc123",
      email: "user@test.com",
      expiresAt: new Date(Date.now() + 3600000),
      used: false,
    };

    mockPrisma.passwordResetToken.findUnique.mockResolvedValue(mockToken);

    const token = await mockPrisma.passwordResetToken.findUnique({
      where: { token: "abc123" },
    });

    expect(token.token).toBe("abc123");
    expect(token.used).toBe(false);
  });

  it("should mark token as used", async () => {
    const mockToken = {
      id: "1",
      token: "abc123",
      used: true,
    };

    mockPrisma.passwordResetToken.update.mockResolvedValue(mockToken);

    const token = await mockPrisma.passwordResetToken.update({
      where: { id: "1" },
      data: { used: true },
    });

    expect(token.used).toBe(true);
  });
});