import React, { useState } from "react";
import { motion } from "framer-motion";
import { signUpUser } from "../api/user";


export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Waitlist email submitted:", email);
    setSubmitted(true);

    const user = await signUpUser({userEmail: email});

    setEmail("");

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative bg-gradient-to-br from-blue-50 to-white">
      {/* 🌀 Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(-45deg, #dbeafe, #e0f2fe, #f0f9ff, #e0f2fe)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* ✨ Floating blobs */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 sm:w-72 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Navbar */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 py-4 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl font-extrabold text-blue-600"
        >
          Vendora
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm text-gray-600"
        >
          📣 Coming Soon
        </motion.div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl font-extrabold text-gray-900 max-w-3xl leading-tight"
        >
          Discover and Book <span className="text-blue-600">Campus Services</span> Easily
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-gray-600 max-w-xl"
        >
          Vendora connects you with students offering tutoring, event services, barbers, nail techs, and so much more — all right on your campus. Be among the first to experience it.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-2 text-base sm:text-lg text-gray-600 max-w-xl"
        >
          If you’re passionate about a side skill — whether you’re cutting fades as a barber, perfecting nail art, tutoring calculus, or planning events — and you’re eager to earn some extra change or sharpen your craft,{" "}
          <span className="font-semibold text-gray-800">
            get ready to turn your talents into opportunities.
          </span>
        </motion.p>

        {/* Waitlist form */}
        {!submitted ? (
          <form
          onSubmit={handleSubmit}  // ✅ Add this
          className="mt-8 w-full max-w-md mx-auto flex flex-col sm:flex-row sm:items-center sm:gap-3"
        >
          <input
            type="email"
            placeholder="Enter your school email"
            className="input input-bordered w-full sm:flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-primary mt-3 sm:mt-0 w-full sm:w-auto"
          >
            Join Waitlist
          </button>
        </form>
        
        
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-green-600 font-medium text-sm sm:text-base"
          >
            ✅ Thanks! You've been added to the waitlist.
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="py-6 text-center text-xs sm:text-sm text-gray-500 border-t relative z-10"
      >
        © {new Date().getFullYear()} Vendora. All rights reserved.
      </motion.footer>
    </div>
  );
}
