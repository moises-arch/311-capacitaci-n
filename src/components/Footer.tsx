export default function Footer() {
  return (
    <footer className="text-center py-12 border-t border-white/5 mt-12 mb-24 md:mb-12">
      <div className="flex items-center justify-center gap-6 mb-6">
        <img 
          src="https://311.gob.pa/wp-content/themes/311-v2/images/footer/311-white.png" 
          alt="311 Logo" 
          className="h-10 opacity-50 grayscale hover:grayscale-0 transition-all px-4"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-700">
        Sistema de Monitoreo Institucional • 2026
      </p>
    </footer>
  );
}
