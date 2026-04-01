import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  TrendingUp, Users, AlertCircle, CheckCircle2, Clock, 
  ArrowRight, ShieldCheck, Phone, Send, Activity, MapPin, Calendar, MessageSquare
} from 'lucide-react';
import { LNB_STATS, PROCESS_STEPS, REAL_CASES, STATUS_REASONS } from '../constants';
import { cn } from '../lib/utils';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#6366f1'];

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-12"
    >
      {/* Hero Section */}
      <header className="relative py-8 md:py-16 px-4 md:px-8 rounded-3xl md:rounded-[3rem] bg-gradient-to-br from-blue-600/20 to-emerald-600/10 border border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <TrendingUp size={240} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <ShieldCheck size={12} />
            Informe Institucional 2026
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Análisis de Gestión <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Centro de Atención 311
            </span>
          </h1>
          <p className="text-zinc-400 text-lg font-light leading-relaxed">
            Estudio detallado de la operatividad y respuesta ciudadana para la 
            <span className="text-white font-medium"> Lotería Nacional de Beneficencia</span>.
          </p>
        </div>
      </header>

      {/* Big Numbers */}
      <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-zinc-900/40 border border-white/5 p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] flex flex-col justify-between"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-4 md:mb-6">
            <Users className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-5xl font-bold tracking-tighter mb-1">{LNB_STATS.totalCases.toLocaleString()}</div>
            <div className="text-[8px] md:text-xs font-bold uppercase tracking-widest text-zinc-500">Casos Totales</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-zinc-900/40 border border-white/5 p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] flex flex-col justify-between"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-4 md:mb-6">
            <CheckCircle2 className="text-emerald-400 w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-5xl font-bold tracking-tighter mb-1">98.4%</div>
            <div className="text-[8px] md:text-xs font-bold uppercase tracking-widest text-zinc-500">Resolución</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-zinc-900/40 border border-white/5 p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] flex flex-col justify-between"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4 md:mb-6">
            <Activity className="text-amber-400 w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-5xl font-bold tracking-tighter mb-1">{REAL_CASES.length}</div>
            <div className="text-[8px] md:text-xs font-bold uppercase tracking-widest text-zinc-500">Casos en Proceso</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-zinc-900/40 border border-white/5 p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] flex flex-col justify-between"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-4 md:mb-6">
            <Clock className="text-purple-400 w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-5xl font-bold tracking-tighter mb-1">24h</div>
            <div className="text-[8px] md:text-xs font-bold uppercase tracking-widest text-zinc-500">Tiempo Remisión</div>
          </div>
        </motion.div>
      </section>

      {/* Process Flow Section - Repositioned */}
      <section className="bg-zinc-900/40 border border-white/5 rounded-[3rem] p-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Estatus - Razón de Proceso</h2>
          <p className="text-zinc-500 font-light">
            Flujo operativo estándar desde el contacto inicial hasta la resolución final del caso.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-8 left-0 w-full h-0.5 bg-zinc-800 hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:bg-blue-500/5 transition-all duration-500 shadow-xl">
                  {step.icon === 'Phone' && <Phone className="text-blue-400 w-6 h-6" />}
                  {step.icon === 'Send' && <Send className="text-emerald-400 w-6 h-6" />}
                  {step.icon === 'Clock' && <Clock className="text-amber-400 w-6 h-6" />}
                  {step.icon === 'CheckCircle' && <CheckCircle2 className="text-purple-400 w-6 h-6" />}
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">{step.time}</div>
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed px-4">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Chart */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-[3rem] p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold">Distribución por Categoría</h2>
              <p className="text-xs text-zinc-500">Principales motivos de contacto ciudadano.</p>
            </div>
            <AlertCircle className="text-zinc-700 w-6 h-6" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LNB_STATS.byCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#71717a" 
                  fontSize={10} 
                  width={120}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Real-time Status Chart */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-[3rem] p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold">Canales de Casos Activos</h2>
              <p className="text-xs text-zinc-500">Origen de los requerimientos en proceso.</p>
            </div>
            <Activity className="text-zinc-700 w-6 h-6" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'AI Chatbot', value: REAL_CASES.filter(c => c.channel.includes('chatbot')).length },
                    { name: 'Llamada 311', value: REAL_CASES.filter(c => c.channel.includes('311')).length },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Province Chart */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-[3rem] p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold">Distribución por Provincia</h2>
              <p className="text-xs text-zinc-500">Volumen de casos por región geográfica.</p>
            </div>
            <MapPin className="text-zinc-700 w-6 h-6" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={LNB_STATS.byProvince}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {LNB_STATS.byProvince.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Status Reasons - Integrated better */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATUS_REASONS.map((reason) => (
          <StatusReasonCard 
            key={reason.label}
            title={reason.label} 
            time={reason.time} 
            desc={reason.description}
            color={reason.color}
          />
        ))}
      </section>

      {/* Footer Info */}
    </motion.div>
  );
}

function StatusReasonCard({ title, time, desc, color }: any) {
  const colors: any = {
    emerald: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
    amber: "border-amber-500/20 bg-amber-500/5 text-amber-400",
    red: "border-red-500/20 bg-red-500/5 text-red-400",
  };

  return (
    <div className={cn("p-6 rounded-3xl border flex flex-col gap-4", colors[color])}>
      <div className="flex items-center justify-between">
        <h4 className="font-bold uppercase tracking-widest text-sm">{title}</h4>
        <div className="text-[10px] font-mono opacity-70">{time}</div>
      </div>
      <p className="text-xs text-white/60 leading-relaxed">{desc}</p>
    </div>
  );
}
