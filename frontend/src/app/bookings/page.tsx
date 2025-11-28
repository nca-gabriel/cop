"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Link from "next/link";

interface Booking {
  uuid: string;
  job_address: string;
  status: string;
  job_description: string;
  total_invoice_amount?: string;
  date: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get<Booking[]>("/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "work order":
        return "bg-green-100 text-green-800";
      case "quote":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-500">Loading bookings...</div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500">No bookings available.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <Link
              key={b.uuid}
              href={`/bookings/${b.uuid}`}
              className="flex flex-col justify-between p-5 bg-white border border-gray-100 rounded-lg shadow hover:shadow-xl transition hover:scale-[1.02]"
            >
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {b.job_address}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {b.job_description}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>
                {b.total_invoice_amount && (
                  <span className="text-sm font-medium text-gray-700">
                    ${parseFloat(b.total_invoice_amount).toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-gray-400">
                  {new Date(b.date).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
