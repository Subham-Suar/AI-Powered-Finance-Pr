import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Onboarding = ({ onFinish }) => {
  const [step, setStep] = useState(1);

  const content = [
    {
      title: "Master the Market",
      desc: "Institutional grade tools for retail traders.",
      color: "bg-indigo-600",
    },
    {
      title: "AI Driven Signals",
      desc: "Neural networks analyzing real-time price action.",
      color: "bg-blue-700",
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center text-white p-6 transition-colors duration-700 ${content[step - 1].color}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center max-w-md"
        >
          <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase">
            {content[step - 1].title}
          </h1>
          <p className="text-lg opacity-80 font-medium">
            {content[step - 1].desc}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-20 flex gap-4">
        {step < 2 ? (
          <button
            onClick={() => setStep(2)}
            className="px-10 py-4 bg-white text-indigo-600 font-black rounded-2xl uppercase tracking-widest shadow-xl"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="px-10 py-4 bg-white text-blue-700 font-black rounded-2xl uppercase tracking-widest shadow-xl"
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
