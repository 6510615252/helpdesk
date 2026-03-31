const ticketService = require("../src/services/ticketService");
const ticketRepository = require("../src/repositories/ticketRepository");

jest.mock("../src/db");
jest.mock("../src/repositories/ticketRepository");

describe("ticketService", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  // --- createTicket ---
  describe("createTicket", () => {
    test("should create ticket successfully", () => {
      const mockTicket = {
        id: 1,
        title: "Test",
        description: "Desc",
        contact: "test@email.com",
        status: "pending",
      };
      ticketRepository.create.mockReturnValue(mockTicket);

      const result = ticketService.createTicket({
        title: "Test",
        description: "Desc",
        contact: "test@email.com",
      });

      expect(result).toEqual(mockTicket);
      expect(ticketRepository.create).toHaveBeenCalledTimes(1);
    });

    test("should throw error if title is missing", () => {
      expect(() =>
        ticketService.createTicket({
          description: "Desc",
          contact: "test@email.com",
        }),
      ).toThrow("Title is required");
    });

    test("should throw error if description is missing", () => {
      expect(() =>
        ticketService.createTicket({
          title: "Test",
          contact: "test@email.com",
        }),
      ).toThrow("Description is required");
    });

    test("should throw error if contact is missing", () => {
      expect(() =>
        ticketService.createTicket({
          title: "Test",
          description: "Desc",
        }),
      ).toThrow("Contact is required");
    });

    test("should throw error if title is empty string", () => {
      expect(() =>
        ticketService.createTicket({
          title: "   ",
          description: "Desc",
          contact: "test@email.com",
        }),
      ).toThrow("Title is required");
    });
    test("should throw error if contact is whitespace", () => {
      expect(() =>
        ticketService.createTicket({
          title: "Test",
          description: "Desc",
          contact: "   ",
        }),
      ).toThrow("Contact is required");
    });
    test("should throw error if description is whitespace", () => {
      expect(() =>
        ticketService.createTicket({
          title: "Test",
          description: "   ",
          contact: "test@email.com",
        }),
      ).toThrow("Description is required");
    });
  });

  // --- getTicketById ---
  describe("getTicketById", () => {
    test("should return ticket if found", () => {
      const mockTicket = { id: 1, title: "Test" };
      ticketRepository.findById.mockReturnValue(mockTicket);

      const result = ticketService.getTicketById(1);
      expect(result).toEqual(mockTicket);
    });

    test("should throw error if ticket not found", () => {
      ticketRepository.findById.mockReturnValue(undefined);

      expect(() => ticketService.getTicketById(999)).toThrow(
        "Ticket id 999 not found",
      );
    });
  });

  // --- getAllTickets ---
  describe("getAllTickets", () => {
    test("should return all tickets", () => {
      const mockTickets = [{ id: 1 }, { id: 2 }];
      ticketRepository.findAll.mockReturnValue(mockTickets);

      const result = ticketService.getAllTickets();
      expect(result).toEqual(mockTickets);
    });

    test("should throw error if status is invalid", () => {
      expect(() => ticketService.getAllTickets({ status: "unknown" })).toThrow(
        "Invalid status",
      );
    });
  });

  // --- updateTicket ---
  describe("updateTicket", () => {
    test("should update ticket successfully", () => {
      const mockTicket = { id: 1, title: "Updated", status: "accepted" };
      ticketRepository.findById.mockReturnValue({ id: 1, title: "Old" });
      ticketRepository.update.mockReturnValue(mockTicket);

      const result = ticketService.updateTicket(1, { status: "accepted" });
      expect(result).toEqual(mockTicket);
    });

    test("should throw error if ticket not found", () => {
      ticketRepository.findById.mockReturnValue(undefined);

      expect(() =>
        ticketService.updateTicket(999, { status: "accepted" }),
      ).toThrow("Ticket id 999 not found");
    });

    test("should throw error if status is invalid", () => {
      ticketRepository.findById.mockReturnValue({ id: 1 });

      expect(() =>
        ticketService.updateTicket(1, { status: "unknown" }),
      ).toThrow("Invalid status");
    });
  });
});
