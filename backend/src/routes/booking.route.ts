import { Response, Router } from "express";
import { serviceM8 } from "../utils/config";
import axios from "axios";
import { AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const response = await axios.get(
      "https://api.servicem8.com/api_1.0/job.json",
      {
        headers: {
          "X-API-Key": serviceM8,
        },
      }
    );

    let bookings: any = response.data;

    // Add mock jobs
    bookings.push(
      {
        uuid: "mock-1",
        job_address: "123 Mock Street",
        status: "Work Order",
        job_description: "This is a mock job for testing",
        total_invoice_amount: "100.00",
        date: "2025-11-29 10:00:00",
      },
      {
        uuid: "mock-2",
        job_address: "456 Test Avenue",
        status: "Quote",
        job_description: "Another mock job",
        total_invoice_amount: "200.00",
        date: "2025-12-01 14:00:00",
      }
    );

    res.json(bookings);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.get("/:uuid", async (req: AuthRequest, res: Response) => {
  const { uuid } = req.params;

  try {
    // Fetch all jobs from ServiceM8
    const response = await axios.get(
      "https://api.servicem8.com/api_1.0/job.json",
      { headers: { "X-API-Key": serviceM8 } }
    );

    let bookings: any[] = response.data as any[];

    // Add mock jobs
    bookings.push(
      {
        uuid: "mock-1",
        job_address: "123 Mock Street",
        status: "Work Order",
        job_description: "This is a mock job for testing",
        total_invoice_amount: "100.00",
        date: "2025-11-29 10:00:00",
      },
      {
        uuid: "mock-2",
        job_address: "456 Test Avenue",
        status: "Quote",
        job_description: "Another mock job",
        total_invoice_amount: "200.00",
        date: "2025-12-01 14:00:00",
      }
    );

    // Find the booking with the requested uuid
    const booking = bookings.find((b) => b.uuid === uuid);

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    res.json(booking);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch booking details" });
  }
});

export default router;
