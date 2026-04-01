import { motion } from 'motion/react';
import { QrCode, Download, ExternalLink, ShieldCheck, Share2, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AppSettings } from '../types';

export default function QRManager() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase.from('app_settings').select('*').single();
        if (error) throw error;
        setSettings(data);
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <header className="py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Gestión de Accesos QR</h1>
        <p className="text-zinc-500 font-light">Códigos oficiales para el registro y acceso a la plataforma.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          Array(2).fill(0).map((_, i) => (
            <div key={i} className="h-96 bg-zinc-900/40 border border-white/5 rounded-3xl animate-pulse" />
          ))
        ) : (
          <>
            <QRCard 
              title="Registro de Asistencia"
              description="QR para que nuevos asistentes completen su registro oficial."
              qrUrl={settings?.signup_qr_url || 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://eventum-pro.vercel.app/signup'}
              color="blue"
            />
            <QRCard 
              title="Acceso al Dashboard"
              description="QR para usuarios ya registrados que deseen entrar al centro de control."
              qrUrl={settings?.internal_app_qr_url || 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://eventum-pro.vercel.app/dashboard'}
              color="emerald"
            />
          </>
        )}
      </div>

      {/* Operational Note */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center border border-white/5 flex-shrink-0">
          <Share2 className="text-zinc-500 w-8 h-8" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold">Uso Operativo</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Estos códigos pueden ser impresos y colocados en los puntos de acceso del evento. El sistema detectará automáticamente si el usuario ya está registrado para agilizar el flujo de entrada.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function QRCard({ title, description, qrUrl, color }: { title: string; description: string; qrUrl: string; color: 'blue' | 'emerald' }) {
  const colors = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all group flex flex-col items-center text-center"
    >
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border mb-6", colors[color])}>
        <QrCode size={24} />
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-sm text-zinc-500 font-light mb-8 max-w-xs">
        {description}
      </p>

      {/* QR Code Container */}
      <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-black/50 mb-8 relative group-hover:scale-105 transition-transform duration-500">
        <img 
          src={qrUrl} 
          alt={title} 
          className="w-48 h-48"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
      </div>

      <div className="flex items-center gap-3 w-full">
        <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm">
          <Download size={16} />
          Descargar
        </button>
        <button className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center hover:bg-zinc-200 transition-all">
          <ExternalLink size={20} />
        </button>
      </div>
    </motion.div>
  );
}
