import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const authCardRef = useRef(null);

  // Entrance Animation using GSAP
  useEffect(() => {
    gsap.fromTo(
      authCardRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "expo.out" },
    );
  }, []);

  const validateAndSubmit = (e) => {
    e.preventDefault();
    const gmailRegex = /^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (gmailRegex.test(contact.toLowerCase()) || phoneRegex.test(contact)) {
      setError("");
      onAuthSuccess({ name: "User", identifier: contact });
    } else {
      setError("Please enter a valid Gmail or 10-digit number");
      // Shake animation on error
      gsap.fromTo(
        authCardRef.current,
        { x: -10 },
        { x: 0, duration: 0.1, repeat: 5, yoyo: true },
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#020617] overflow-hidden font-sans">
      {/* Background Mesh Animation */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[120px] animate-bounce"></div>
      </div>

      <div
        ref={authCardRef}
        className="relative bg-white/10 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/20 w-full max-w-md shadow-2xl text-white mx-4"
      >
        {/* Toggle Sign Up / Sign In */}
        <div className="flex bg-black/40 p-1 rounded-full mb-8 w-fit mx-auto border border-white/10">
          <button
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${!isLogin ? "bg-white text-black" : "text-slate-400"}`}
          >
            Sign up
          </button>
          <button
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${isLogin ? "bg-white text-black" : "text-slate-400"}`}
          >
            Sign in
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-2 tracking-tight text-center italic uppercase leading-none">
          {isLogin ? "Neural Login" : "Initialize ID"}
        </h2>
        <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">
          Secure Terminal Access
        </p>

        <form className="space-y-4" onSubmit={validateAndSubmit}>
          {!isLogin && (
            <div className="flex gap-4">
              <input
                type="text"
                required
                placeholder="First name"
                className="w-1/2 bg-white/5 border border-white/10 rounded-2xl py-3 px-5 outline-none focus:border-white/40 text-sm font-medium"
              />
              <input
                type="text"
                required
                placeholder="Last name"
                className="w-1/2 bg-white/5 border border-white/10 rounded-2xl py-3 px-5 outline-none focus:border-white/40 text-sm font-medium"
              />
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Gmail or Phone number"
              className={`w-full bg-white/5 border ${error ? "border-red-500" : "border-white/10"} rounded-2xl py-4 px-6 outline-none focus:border-white/40 text-sm font-medium transition-colors`}
            />
            {error && (
              <p className="text-[11px] text-red-400 font-medium mt-2 ml-2">
                {error}
              </p>
            )}
          </div>

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-white/40 text-sm font-medium"
          />

          <button className="w-full py-4 bg-white text-black rounded-2xl font-bold mt-4 hover:bg-slate-200 transition-all shadow-xl active:scale-95 italic uppercase tracking-widest text-[10px]">
            {isLogin ? "Enter Terminal →" : "Create Neural Identity"}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4 opacity-50">
          <div className="h-[1px] bg-white/10 flex-1"></div>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
            Or sync with
          </span>
          <div className="h-[1px] bg-white/10 flex-1"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            type="button"
            className="bg-white/5 border border-white/10 py-3 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all text-[10px] font-black tracking-widest uppercase italic"
          >
            Google
          </button>
          <button
            type="button"
            className="bg-white/5 border border-white/10 py-3 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all text-[10px] font-black tracking-widest uppercase italic"
          >
            Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
