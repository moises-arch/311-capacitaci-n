import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { Loader2, CheckCircle2, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const signupSchema = z.object({
  full_name: z.string().min(3, 'Nombre demasiado corto'),
  department: z.string().min(2, 'Ingresa tu departamento'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Teléfono inválido'),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const onSubmit = async (data: SignupForm) => {
    setLoading(true);
    setError(null);
    try {
      const { error: supabaseError } = await supabase
        .from('attendees')
        .insert([data]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      triggerConfetti();
      setTimeout(() => onSuccess(), 4000);
    } catch (err: any) {
      setError(err.message || 'Error al registrarse. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div 
            key="signup-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg z-10"
          >
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-8"
              >
                <img 
                  src="https://311.gob.pa/wp-content/themes/311-v2/images/footer/311-white.png" 
                  alt="Logo 311" 
                  className="h-16 md:h-20 object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                Bienvenido(a) a la capacitación del Centro de Atención Ciudadana 311
              </h1>
              
              <div className="space-y-4 text-zinc-400 font-light leading-relaxed">
                <p className="text-sm md:text-base border-l-2 border-blue-500/50 pl-4 py-1 bg-blue-500/5 rounded-r-lg">
                  Dirigida a directores y jefes nacionales de la <span className="text-blue-400 font-medium">Lotería Nacional de Beneficencia</span>.
                </p>
                <p className="text-sm md:text-base">
                  Por favor, complete el siguiente formulario para registrar su asistencia y acceder al contenido que hemos preparado para usted.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-zinc-900/40 p-6 md:p-8 rounded-[2rem] border border-white/5 backdrop-blur-sm">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 ml-1">Nombre Completo</label>
                <div className="relative group">
                  <input
                    {...register('full_name')}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all placeholder:text-zinc-700 text-zinc-200"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                </div>
                {errors.full_name && <p className="text-red-400 text-[10px] font-medium mt-1 ml-1 uppercase tracking-wider">{errors.full_name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 ml-1">Departamento / Área</label>
                <div className="relative group">
                  <input
                    {...register('department')}
                    placeholder="Ej. Dirección Nacional"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all placeholder:text-zinc-700 text-zinc-200"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                </div>
                {errors.department && <p className="text-red-400 text-[10px] font-medium mt-1 ml-1 uppercase tracking-wider">{errors.department.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 ml-1">Correo Electrónico</label>
                  <div className="relative group">
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="juan@empresa.com"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all placeholder:text-zinc-700 text-zinc-200"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                  </div>
                  {errors.email && <p className="text-red-400 text-[10px] font-medium mt-1 ml-1 uppercase tracking-wider">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 ml-1">Teléfono Móvil</label>
                  <div className="relative group">
                    <input
                      {...register('phone')}
                      placeholder="+507 6000-0000"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all placeholder:text-zinc-700 text-zinc-200"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                  </div>
                  {errors.phone && <p className="text-red-400 text-[10px] font-medium mt-1 ml-1 uppercase tracking-wider">{errors.phone.message}</p>}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    Confirmar Asistencia
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Hidden Skip Button for Admin/Testing */}
            <button 
              onClick={onSuccess}
              className="mt-8 w-full py-2 text-zinc-700/40 hover:text-blue-500/60 transition-colors cursor-pointer select-none text-[9px] uppercase tracking-[0.3em] font-medium"
              aria-hidden="true"
            >
              Acceso Directo • Admin
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 z-10"
          >
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="text-white w-12 h-12" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">¡Registro Exitoso!</h2>
              <p className="text-xl text-zinc-400 font-light max-w-md mx-auto">
                Muchas gracias por acompañarnos. Estamos preparando todo para tu experiencia.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium animate-pulse">
              <Heart className="w-5 h-5 fill-current" />
              <span>Redirigiendo al Dashboard...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
