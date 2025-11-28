"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "/", // backend login route
        { email, phone },
        { withCredentials: true } // send HTTP-only cookie
      );

      router.push("/"); // redirect after successful login
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-blue-100 to-blue-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Customer Portal
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="123-456-7890"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Enter your email and phone number to access your bookings
        </p>
      </div>
    </div>
  );
}
