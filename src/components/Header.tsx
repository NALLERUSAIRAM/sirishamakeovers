"use client";
import { motion } from "framer-motion";

interface HeaderProps {
  onBookClick: () => void;
  onGalleryClick: () => void;
}

export default function Header({ onBookClick, onGalleryClick }: HeaderProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-8 py-1.5 bg-black/40 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center">
        <motion.img 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          src="/assets/logo.png" 
          alt="Sirisha Makeovers" 
          style={{ width: '110px', height: 'auto', display: 'block', mixBlendMode: 'screen' }} 
        />
      </div>

      <div className="hidden md:flex items-center space-x-6 text-gray-300">
        <a href="#" className="hover:text-[#d4af37] transition-colors text-[10px] font-bold tracking-[0.2em] uppercase">Home</a>
        <a href="#services" className="hover:text-[#d4af37] transition-colors text-[10px] font-bold tracking-[0.2em] uppercase">Services</a>
        
        {/* INSTAGRAM GALLERY BUTTON */}
        <motion.button
          onClick={onGalleryClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/5 border border-[#d4af37]/30 text-[#d4af37] px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.1em] uppercase flex items-center gap-2 hover:bg-[#d4af37] hover:text-black transition-all"
        >
          📸 GALLERY
        </motion.button>

        <button 
          onClick={onBookClick}
          className="bg-gradient-to-r from-[#d4af37] to-[#f5e1a4] text-black px-5 py-1.5 rounded-full text-[9px] font-black tracking-[0.1em] uppercase shadow-md hover:scale-105 transition-all"
        >
          Book Now
        </button>
      </div>
    </nav>
  );
}