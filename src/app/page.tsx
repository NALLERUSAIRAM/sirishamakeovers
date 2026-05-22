"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Header from '../components/Header';

export default function Home() {
  const [isLuminaChatOpen, setIsLuminaChatOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Lumina ✨. Need help with our services or want to book a session?" }
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [messages]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const newMsgs = [...messages, { role: 'user', text: userInput }];
    setMessages(newMsgs);
    setUserInput("");
    setTimeout(() => {
      setMessages([...newMsgs, { role: 'ai', text: "Thank you! Please click 'Book Now' to secure your date." }]);
    }, 800);
  };

  // బుకింగ్ హ్యాండిలర్ - API Call (Correct Path) + WhatsApp Redirect
  const handleBooking = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      // 1. Send Email via Backend API (Changed path to /bookings)
      await fetch('/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error("Failed to send email notification:", err);
    }

    // 2. Open WhatsApp for real-time contact
    const message = `New Booking Request:%0A- Name: ${data.fullName}%0A- Phone: ${data.phone}%0A- Service: ${data.service}%0A- Date: ${data.date}%0A- Requests: ${data.comments}`;
    window.open(`https://wa.me/918123534708?text=${message}`, "_blank"); 
    
    setIsSubmitting(false);
    setIsFormOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative selection:bg-[#d4af37]/30">
      
      {/* HEADER */}
      <Header onBookClick={() => setIsFormOpen(true)} />

      {/* BACKGROUND ORBS */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div animate={{ x: [0, 50, 0], y: [0, 40, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#d4af37]/10 blur-[120px] rounded-full" />
        <motion.div animate={{ x: [0, -50, 0], y: [0, 60, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] bg-[#b76e79]/10 blur-[150px] rounded-full" />
      </div>

      <section className="relative pt-60 pb-32 px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-[8.5rem] font-serif mb-8 tracking-tighter leading-none">
          Elevate Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5e1a4] to-[#d4af37]">Natural Beauty</span>
        </motion.h1>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="relative py-32 px-6 max-w-7xl mx-auto scroll-mt-24">
        <h2 className="text-4xl text-center text-[#d4af37] font-serif mb-20">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { t: 'Muhoortham', i: '🪷', d: 'Traditional and divine bridal makeover.' },
            { t: 'Reception', i: '👑', d: 'Elegant and sophisticated evening looks.' },
            { t: 'Engagement Look', i: '💍', d: 'Subtle and elegant styles for your special day.' },
            { t: 'Haldhi', i: '💛', d: 'Bright and glowing looks for pre-wedding rituals.' },
            { t: 'Cocktail', i: '🍸', d: 'Bold and glamorous makeup for evening parties.' },
            { t: 'Glam', i: '✨', d: 'Flawless high-definition makeup for a stunning appearance.' },
            { t: 'Hair Styling', i: '🌸', d: 'Modern and traditional hair artistry.' },
            { t: 'Saree Draping', i: '🥻', d: 'Professional draping in multiple elegant styles.' }
          ].map((s) => (
            <div key={s.t} className="bg-white/5 backdrop-blur-3xl p-8 rounded-[40px] border border-white/10 text-center hover:border-[#d4af37]/40 hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-6">{s.i}</div>
              <h4 className="text-xl font-bold mb-3 tracking-wide">{s.t}</h4>
              <p className="text-gray-500 italic text-xs leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING FORM MODAL */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFormOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[150]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30 }} className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#0a0a0a] backdrop-blur-3xl z-[200] border-l border-white/10 p-10 shadow-2xl overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-serif text-[#d4af37]">Reserve Session</h2>
                <button onClick={() => setIsFormOpen(false)} className="text-white/40 hover:text-white text-2xl">✕</button>
              </div>
              <form onSubmit={handleBooking} className="space-y-6">
                <div><label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2 block">Full Name</label><input name="fullName" required className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full focus:border-[#d4af37] outline-none text-sm" /></div>
                <div><label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2 block">Phone</label><input name="phone" required className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full focus:border-[#d4af37] outline-none text-sm" /></div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2 block">Service</label>
                  <select name="service" className="bg-[#101010] border border-white/10 p-4 rounded-2xl w-full text-gray-400 outline-none text-sm">
                    <option>Muhoortham</option>
                    <option>Reception</option>
                    <option>Engagement Look</option>
                    <option>Haldhi</option>
                    <option>Cocktail</option>
                    <option>Glam</option>
                    <option>Hair Styling</option>
                    <option>Saree Draping</option>
                  </select>
                </div>
                <div><label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2 block">Date</label><input name="date" type="date" required className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full text-gray-400 outline-none text-sm [color-scheme:dark]" /></div>
                <div><label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2 block">Special Requests</label><textarea name="comments" rows={4} className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full focus:border-[#d4af37] outline-none text-sm"></textarea></div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#d4af37] text-black py-5 rounded-2xl font-bold hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100">
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AI BOT CHAT */}
      <div className="fixed bottom-6 right-6 z-[200]">
        <motion.button onClick={() => setIsLuminaChatOpen(!isLuminaChatOpen)} whileHover={{ scale: 1.1 }} className="w-14 h-14 bg-gradient-to-tr from-[#d4af37] to-[#f5e1a4] rounded-full flex items-center justify-center text-black shadow-xl">✨</motion.button>
        <AnimatePresence>
          {isLuminaChatOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-20 right-0 w-80 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-[30px] overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-white/10 flex justify-between items-center">
                <span className="text-[#d4af37] font-bold text-[10px] uppercase">Lumina Assistant</span>
                <button onClick={() => setIsLuminaChatOpen(false)} className="text-[10px] text-white/40 font-black">Minimize</button>
              </div>
              <div className="h-60 overflow-y-auto p-5 space-y-3 scrollbar-hide">
                {messages.map((m, i) => (
                  <div key={i} className={`text-[12px] p-3 rounded-2xl ${m.role === 'user' ? 'bg-[#d4af37] text-black ml-auto' : 'bg-white/5 text-gray-300'}`}>{m.text}</div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="p-4 bg-white/5 flex gap-2">
                <input value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} className="bg-transparent border border-white/10 rounded-full px-4 py-2 text-[11px] flex-1 outline-none text-white" placeholder="Ask..." />
                <button onClick={handleSendMessage} className="bg-[#d4af37] text-black w-8 h-8 rounded-full font-bold">→</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
