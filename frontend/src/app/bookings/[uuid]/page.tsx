"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "@/utils/axios";

interface Booking {
  uuid: string;
  job_address: string;
  status: string;
  job_description: string;
  total_invoice_amount?: string;
  date: string;
}

interface Message {
  content: string;
  createdAt: string;
  userId: string;
}

interface Attachment {
  name: string;
  url: string;
}

export default function BookingDetailPage() {
  const params = useParams();
  const bookingId = params?.uuid;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Mocked attachments
  const mockAttachments: Attachment[] = [
    { name: "Job Photo 1.png", url: "#" },
    { name: "Quote.pdf", url: "#" },
    { name: "Permit.pdf", url: "#" },
  ];

  useEffect(() => {
    const fetchBookingAndMessages = async () => {
      if (!bookingId) return;

      try {
        const [bookingRes, messagesRes] = await Promise.all([
          axios.get<Booking>(`/bookings/${bookingId}`),
          axios.get<Message[]>(`/messages/${bookingId}`),
        ]);

        setBooking(bookingRes.data);
        setMessages(messagesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingAndMessages();
  }, [bookingId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || sending || !bookingId) return;

    setSending(true);
    try {
      const res = await axios.post<Message>(`/messages/${bookingId}`, {
        content: newMessage,
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-16 text-gray-500">Loading booking...</div>
    );
  if (!booking)
    return (
      <div className="text-center mt-16 text-red-500">Booking not found</div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Booking Info */}
      <div className="bg-white border border-gray-200 shadow rounded-lg p-6 space-y-3">
        <h1 className="text-2xl font-bold text-gray-800">Booking Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Address:</span>{" "}
              {booking.job_address}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Status:</span> {booking.status}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Date:</span>{" "}
              {new Date(booking.date).toLocaleString()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Invoice:</span>{" "}
              {booking.total_invoice_amount || "N/A"}
            </p>
          </div>
        </div>
        <p className="text-gray-600">
          <span className="font-medium">Description:</span>{" "}
          {booking.job_description}
        </p>
      </div>

      {/* Messages */}
      <div className="bg-white border border-gray-200 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {messages.map((m, idx) => (
            <li
              key={idx}
              className="p-3 bg-gray-50 border border-gray-100 rounded flex flex-col"
            >
              <span className="text-gray-400 text-xs mb-1">
                {new Date(m.createdAt).toLocaleString()}
              </span>
              <p className="text-gray-700">{m.content}</p>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={sending}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      {/* Attachments */}
      <div className="bg-white border border-gray-200 shadow rounded-lg p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">Attachments</h2>
        <ul className="space-y-2">
          {mockAttachments.map((att, idx) => (
            <li key={idx}>
              <a
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                {att.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
