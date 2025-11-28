"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";

interface Booking {
  uuid: string;
  job_address: string;
  status: string;
  date: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get<Booking[]>("/bookings");
        setBookings(res.data.slice(0, 5)); // show 5 recent bookings
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Welcome */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600 mt-2">
          Here&apos;s a summary of your recent activity.
        </p>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow text-center hover:shadow-lg transition">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-2xl font-bold text-gray-900">
            {bookings.length}
          </h2>
        </div>
        <div className="p-6 bg-white rounded-lg shadow text-center hover:shadow-lg transition">
          <p className="text-gray-500">Total Messages</p>
          <h2 className="text-2xl font-bold text-gray-900">3</h2>
        </div>
        <div className="p-6 bg-white rounded-lg shadow text-center hover:shadow-lg transition">
          <p className="text-gray-500">Attachments</p>
          <h2 className="text-2xl font-bold text-gray-900">5</h2>
        </div>
      </section>

      {/* Recent Bookings */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>

        {loading ? (
          <div className="text-gray-500">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-gray-500">No bookings yet.</div>
        ) : (
          <ul className="space-y-2">
            {bookings.map((b) => (
              <li
                key={b.uuid}
                onClick={() => router.push(`/bookings/${b.uuid}`)}
                className="p-4 bg-white rounded shadow hover:bg-gray-50 cursor-pointer transition flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{b.job_address}</p>
                  <p className="text-sm text-gray-500">{b.status}</p>
                </div>
                <div className="text-sm text-gray-400">{b.date}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
