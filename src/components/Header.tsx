"use client";

interface HeaderProps {
  onBookClick: () => void;
}

export default function Header({ onBookClick }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="text-2xl font-serif text-[#d4af37] tracking-widest font-bold">
        SIRISHA MAKEOVERS
      </div>
      <nav className="flex gap-4">
        <button 
          onClick={onBookClick} 
          className="bg-gradient-to-r from-[#d4af37] to-[#f5e1a4] text-black px-6 py-2 rounded-full text-sm font-bold tracking-wider hover:scale-105 transition-all shadow-lg"
        >
          BOOK NOW
        </button>
      </nav>
    </header>
  );
}
