import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Send, Clock, CheckCircle2, AlertCircle, 
  ArrowRight, ShieldCheck, Activity, Info, X,
  MapPin, Calendar, MessageSquare, Building2, Tag, History
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PROCESS_STEPS, STATUS_REASONS, REAL_CASES } from '../constants';

export default function Processes() {
  const [selectedCase, setSelectedCase] = useState<any>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-20"
    >
      {/* Header */}
      <header className="relative py-12 px-8 rounded-[3rem] bg-zinc-900/40 border border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Activity size={180} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <ShieldCheck size={12} />
            Protocolo 311
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Estatus - Razón de Proceso</h1>
          <p className="text-zinc-500 text-lg font-light max-w-2xl leading-relaxed">
            Conoce el flujo operativo y los tiempos de respuesta establecidos para garantizar una atención ciudadana de excelencia.
          </p>
        </div>
      </header>

      {/* Main Flow Diagram */}
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500/20 via-amber-500/20 to-emerald-500/20 hidden md:block" />

          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-zinc-900 border-2 border-white/5 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:scale-105 transition-all duration-500 shadow-2xl relative z-10">
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                  {step.id}
                </div>
                {step.icon === 'Phone' && <Phone className="text-blue-400 w-8 h-8" />}
                {step.icon === 'Send' && <Send className="text-emerald-400 w-8 h-8" />}
                {step.icon === 'Clock' && <Clock className="text-amber-400 w-8 h-8" />}
                {step.icon === 'CheckCircle' && <CheckCircle2 className="text-purple-400 w-8 h-8" />}
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{step.title}</h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Status Reasons Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATUS_REASONS.map((reason, index) => (
          <motion.div
            key={reason.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "p-8 rounded-[2.5rem] border flex flex-col gap-6 transition-all hover:scale-[1.02]",
              reason.color === 'emerald' ? "bg-emerald-500/5 border-emerald-500/20" :
              reason.color === 'amber' ? "bg-amber-500/5 border-amber-500/20" :
              "bg-red-500/5 border-red-500/20"
            )}
          >
            <div className="flex items-center justify-between">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center",
                reason.color === 'emerald' ? "bg-emerald-500/20 text-emerald-400" :
                reason.color === 'amber' ? "bg-amber-500/20 text-amber-400" :
                "bg-red-500/20 text-red-400"
              )}>
                {reason.color === 'emerald' && <CheckCircle2 size={24} />}
                {reason.color === 'amber' && <AlertCircle size={24} />}
                {reason.color === 'red' && <Clock size={24} />}
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Tiempo Límite</div>
                <div className="text-lg font-mono font-bold text-white">{reason.time}</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold uppercase tracking-tight">{reason.label}</h4>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                {reason.description}
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              <Info size={12} />
              Protocolo de Gestión
            </div>
          </motion.div>
        ))}
      </section>

      {/* Recent Cases Table/List */}
      <section className="bg-zinc-900/40 border border-white/5 rounded-[3rem] p-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold">Casos Recientes en Proceso</h2>
            <p className="text-sm text-zinc-500">Listado de requerimientos activos en el sistema.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Caso ID</th>
                <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Servicio</th>
                <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Ubicación</th>
                <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Estatus</th>
                <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {REAL_CASES.map((c) => (
                <tr key={c.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 text-sm font-mono text-blue-400">{c.id}</td>
                  <td className="py-6">
                    <div className="text-sm font-bold text-white mb-1">{c.service}</div>
                    <div className="text-[10px] text-zinc-500">{c.type} • {c.date}</div>
                  </td>
                  <td className="py-6 text-sm text-zinc-400 font-light">{c.location}</td>
                  <td className="py-6">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                      {c.razon_estatus}
                    </span>
                  </td>
                  <td className="py-6">
                    <button 
                      onClick={() => setSelectedCase(c)}
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all group-hover:scale-110"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Case Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                      {selectedCase.type}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{selectedCase.id}</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">{selectedCase.service}</h2>
                </div>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <InfoItem icon={<Building2 size={16} />} label="Entidad" value={selectedCase.entidad} />
                    <InfoItem icon={<MapPin size={16} />} label="Sede / Ubicación" value={`${selectedCase.sede} • ${selectedCase.location}`} />
                    <InfoItem icon={<Tag size={16} />} label="Razón de Estatus" value={selectedCase.razon_estatus} highlight />
                  </div>
                  <div className="space-y-6">
                    <InfoItem icon={<MessageSquare size={16} />} label="Canal de Entrada" value={selectedCase.channel} />
                    <InfoItem icon={<Calendar size={16} />} label="Fecha de Creación" value={selectedCase.date} />
                    <InfoItem icon={<History size={16} />} label="Último Cambio" value={selectedCase.ultimo_cambio} />
                  </div>
                </div>

                {/* Detail Section */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Activity size={14} />
                    Detalle del Caso
                  </h3>
                  <p className="text-zinc-300 leading-relaxed font-light italic">
                    "{selectedCase.detail}"
                  </p>
                </div>

                {/* Technical Table (Detalle) */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Información Técnica</h3>
                  <div className="border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <tbody className="divide-y divide-white/5">
                        <tr className="bg-white/[0.02]">
                          <td className="p-4 font-bold text-zinc-400 w-1/3">Estatus General</td>
                          <td className="p-4 text-white">{selectedCase.status}</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-bold text-zinc-400">Tipo de Reporte</td>
                          <td className="p-4 text-white">{selectedCase.type}</td>
                        </tr>
                        <tr className="bg-white/[0.02]">
                          <td className="p-4 font-bold text-zinc-400">Canal Oficial</td>
                          <td className="p-4 text-white">{selectedCase.channel}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-zinc-950/50 border-t border-white/5 text-center">
                <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
                  Información Institucional Protegida • LNB 2026
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InfoItem({ icon, label, value, highlight }: any) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-zinc-500">
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-1">{label}</div>
        <div className={cn("text-sm font-medium", highlight ? "text-amber-400" : "text-zinc-300")}>
          {value}
        </div>
      </div>
    </div>
  );
}
