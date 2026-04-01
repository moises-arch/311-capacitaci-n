import { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { MessageSquare, ShieldCheck, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const feedbackSchema = z.object({
  department: z.string().min(2, 'Selecciona un departamento'),
  service: z.string().min(2, 'Selecciona un servicio'),
  comment: z.string().min(10, 'El comentario debe tener al menos 10 caracteres'),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

export default function Feedback() {
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmitFeedback = async (data: FeedbackForm) => {
    setSubmittingFeedback(true);
    try {
      const { error } = await supabase.from('anonymous_feedback').insert([data]);
      if (error) throw error;
      setFeedbackSuccess(true);
      reset();
      setTimeout(() => setFeedbackSuccess(false), 3000);
    } catch (err) {
      console.error('Error sending feedback:', err);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8 py-8"
    >
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Buzón de Sugerencias</h1>
        <p className="text-zinc-500 font-light">Tu opinión nos ayuda a mejorar los procesos institucionales.</p>
      </header>

      <section className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <ShieldCheck size={160} />
        </div>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <MessageSquare className="text-emerald-400 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Envío Anónimo</h2>
            <p className="text-sm text-zinc-500">Garantizamos la protección de tu identidad.</p>
          </div>
        </div>

        <div className="mb-8 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
          <ShieldCheck className="text-blue-400 w-6 h-6 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-200/70 leading-relaxed">
            Toda la información suministrada es anónima y la identidad siempre va a estar protegida. 
            Este canal es exclusivo para sugerencias e ideas de mejora.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmitFeedback)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Departamento</label>
              <input 
                {...register('department')}
                placeholder="Ej. Tecnología, Operaciones..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500/50 focus:outline-none transition-all"
              />
              {errors.department && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.department.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Servicio Relacionado</label>
              <input 
                {...register('service')}
                placeholder="Ej. Atención al Ciudadano, Soporte..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500/50 focus:outline-none transition-all"
              />
              {errors.service && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.service.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Tu Sugerencia</label>
            <textarea 
              {...register('comment')}
              rows={6}
              placeholder="Describe detalladamente tu idea o sugerencia de mejora..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500/50 focus:outline-none transition-all resize-none placeholder:text-zinc-700"
            />
            {errors.comment && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.comment.message}</p>}
          </div>

          <button
            type="submit"
            disabled={submittingFeedback || feedbackSuccess}
            className={cn(
              "w-full py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-lg",
              feedbackSuccess 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            )}
          >
            {submittingFeedback ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : feedbackSuccess ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Enviado con éxito
              </>
            ) : (
              <>
                Enviar Sugerencia
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </section>
    </motion.div>
  );
}
