import { describe, expect, it } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("should validate and accept a valid contact form submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      contact: "+7 (999) 123-45-67",
      revenue: "50 млн руб.",
      situation: "Нужна помощь с НДС-2026",
      timestamp: new Date().toISOString(),
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("Contact form submitted successfully");
    expect(result.data.name).toBe("John Doe");
    expect(result.data.contact).toBe("+7 (999) 123-45-67");
  });

  it("should reject submission with empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "",
        contact: "+7 (999) 123-45-67",
        revenue: "50 млн руб.",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
      expect(String(error)).toContain("Name is required");
    }
  });

  it("should reject submission with empty contact", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "John Doe",
        contact: "",
        revenue: "50 млн руб.",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
      expect(String(error)).toContain("Contact is required");
    }
  });

  it("should reject submission with empty revenue", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "John Doe",
        contact: "+7 (999) 123-45-67",
        revenue: "",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
      expect(String(error)).toContain("Revenue is required");
    }
  });

  it("should accept submission with optional situation field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Jane Smith",
      contact: "@maxima_CFO_light",
      revenue: "100 млн руб.",
    });

    expect(result.success).toBe(true);
    expect(result.data.name).toBe("Jane Smith");
  });

  it("should handle very long input gracefully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const longSituation = "A".repeat(2000);

    const result = await caller.contact.submit({
      name: "Test User",
      contact: "test@example.com",
      revenue: "25 млн руб.",
      situation: longSituation,
    });

    expect(result.success).toBe(true);
  });

  it("should reject input exceeding maximum length", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const tooLongSituation = "A".repeat(2001);

    try {
      await caller.contact.submit({
        name: "Test User",
        contact: "test@example.com",
        revenue: "25 млн руб.",
        situation: tooLongSituation,
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
