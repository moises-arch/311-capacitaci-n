import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { 
  Users, MessageSquare, Download, Lock, ShieldCheck, 
  Search, Filter, Loader2, ChevronRight, Printer 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Attendee, AnonymousFeedback } from '../types';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'attendees' | 'feedback'>('attendees');
  
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [feedback, setFeedback] = useState<AnonymousFeedback[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '@311') {
      setIsAuthenticated(true);
      setError('');
      fetchData();
    } else {
      setError('Clave incorrecta');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [attendeesRes, feedbackRes] = await Promise.all([
        supabase.from('attendees').select('*').order('created_at', { ascending: false }),
        supabase.from('anonymous_feedback').select('*').order('created_at', { ascending: false })
      ]);

      if (attendeesRes.error) throw attendeesRes.error;
      if (feedbackRes.error) throw feedbackRes.error;

      setAttendees(attendeesRes.data || []);
      setFeedback(feedbackRes.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const printAttendance = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>Lista de Asistencia - 311</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            h1 { text-align: center; color: #1a365d; margin-bottom: 5px; }
            h2 { text-align: center; font-weight: normal; color: #4a5568; margin-top: 0; font-size: 14px; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; font-size: 12px; }
            th { background-color: #f7fafc; font-weight: bold; text-transform: uppercase; }
            .footer { margin-top: 50px; text-align: right; font-size: 10px; color: #a0aec0; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>Lista de Asistencia</h1>
          <h2>Capacitación Centro de Atención Ciudadana 311 - LNB</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Departamento</th>
                <th>Email</th>
                <th>Fecha de Registro</th>
              </tr>
            </thead>
            <tbody>
              ${attendees.map(a => `
                <tr>
                  <td>${a.full_name}</td>
                  <td>${a.department}</td>
                  <td>${a.email}</td>
                  <td>${new Date(a.created_at).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="footer">Generado el ${new Date().toLocaleString()}</div>
          <script>window.print();</script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-10 text-center"
        >
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 mx-auto mb-6">
            <Lock className="text-blue-400 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Acceso Administrativo</h1>
          <p className="text-zinc-500 text-sm mb-8">Ingresa la clave maestra para acceder a los registros.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-center text-xl tracking-widest focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all placeholder:text-zinc-800"
                autoFocus
              />
              {error && <p className="text-red-400 text-xs font-bold uppercase tracking-widest">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl transition-all"
            >
              Desbloquear Panel
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 py-8"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Panel de Control</h1>
          <p className="text-zinc-500 font-light">Gestión de asistencia y retroalimentación institucional.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={printAttendance}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all"
          >
            <Printer size={18} />
            Imprimir Lista
          </button>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-zinc-500 hover:text-white transition-all"
          >
            <Lock size={18} />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex p-1 bg-zinc-900/60 border border-white/5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('attendees')}
          className={cn(
            "px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
            activeTab === 'attendees' ? "bg-blue-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <Users size={18} />
          Asistencia ({attendees.length})
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={cn(
            "px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
            activeTab === 'feedback' ? "bg-blue-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          <MessageSquare size={18} />
          Sugerencias ({feedback.length})
        </button>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
        </div>
      ) : activeTab === 'attendees' ? (
        <div className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Nombre</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Departamento</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Email</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {attendees.map((attendee) => (
                  <tr key={attendee.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6 font-medium text-sm">{attendee.full_name}</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                        {attendee.department}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-zinc-400">{attendee.email}</td>
                    <td className="px-8 py-6 text-xs text-zinc-500">{new Date(attendee.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedback.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <MessageSquare className="text-emerald-400 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{item.department}</div>
                    <div className="text-sm font-bold text-white">{item.service}</div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-zinc-600">
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed font-light italic">
                "{item.comment}"
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
