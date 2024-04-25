"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PromoVerify = ({ promo }) => {
  const [userInput, setUserInput] = useState("");

  const router = useRouter();

  const handleVerify = () => {
    if (promo === userInput) {
      router.push("/manageBooking");
    } else {
      alert("Your promo code does not exist.");
    }
  };
  return (
    <div className="flex gap-2">
      <input
        placeholder="Promo Code"
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="mt-1 focus:outline-none px-4 py-2 shadow-sm sm:text-sm border border-gray-300 rounded-md"
      />
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded"
        onClick={handleVerify}
      >
        Book a room
      </button>
    </div>
  );
};

export default PromoVerify;
