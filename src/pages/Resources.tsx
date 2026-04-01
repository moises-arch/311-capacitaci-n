import { motion } from 'motion/react';
import { FileDown, FileText, Presentation, ShieldCheck, ExternalLink, Download, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Resource } from '../types';

const STATIC_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Guía Visual: Razones de Estatus 311',
    description: 'Infografía técnica sobre el ciclo de vida de los casos: Remitido (24h), En Proceso (30d) y Vencido. Esencial para el seguimiento operativo.',
    type: 'document',
    file_url: '/procesos-razon-status.png',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Presentación Institucional Estándar',
    description: 'Capacitación oficial sobre los pilares del servicio 311, flujos de atención ciudadana y estándares de calidad institucional.',
    type: 'presentation',
    file_url: '/presentacion-estandar-311.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Resumen de Gestión Institucional 2026',
    description: 'Reporte ejecutivo consolidado con indicadores clave (KPIs), satisfacción ciudadana y estadísticas de atención por sector.',
    type: 'document',
    file_url: '/reporte-gestion-institucional.png',
    created_at: new Date().toISOString()
  }
];

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        const { data, error } = await supabase.from('resources').select('*');
        if (error) throw error;
        // Combine Supabase resources with static ones for now, or just use static if preferred
        setResources([...STATIC_RESOURCES, ...(data || [])]);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setResources(STATIC_RESOURCES);
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <header className="py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Recursos del Evento</h1>
        <p className="text-zinc-500 font-light">Accede a la documentación oficial y presentaciones descargables.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-48 bg-zinc-900/40 border border-white/5 rounded-3xl animate-pulse" />
          ))
        ) : resources.length > 0 ? (
          resources.map((resource) => (
            <div key={resource.id}>
              <ResourceCard resource={resource} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto border border-white/5">
              <FileDown className="text-zinc-700 w-8 h-8" />
            </div>
            <p className="text-zinc-500">No hay recursos disponibles en este momento.</p>
          </div>
        )}
      </div>

      {/* Institutional Disclaimer */}
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
          <ShieldCheck className="text-white w-8 h-8" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold">Documentación Certificada</h3>
          <p className="text-sm text-blue-200/70 leading-relaxed">
            Todos los recursos compartidos en esta plataforma han sido validados por la Dirección de Procesos y cumplen con los estándares institucionales de seguridad de la información.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const isPresentation = resource.type === 'presentation';

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all group flex flex-col justify-between h-full"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center border",
            isPresentation ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          )}>
            {isPresentation ? <Presentation size={24} /> : <FileText size={24} />}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            {resource.type}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{resource.title}</h3>
          <p className="text-sm text-zinc-500 font-light leading-relaxed">
            {resource.description || 'Sin descripción disponible.'}
          </p>
        </div>
      </div>

      <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
        <a 
          href={resource.file_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-zinc-600 hover:text-blue-400 transition-colors"
        >
          <ExternalLink size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Ver Online</span>
        </a>
        <a 
          href={resource.file_url} 
          download 
          className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-zinc-200 transition-all flex items-center gap-2 text-xs"
        >
          <Download size={14} />
          Descargar
        </a>
      </div>
    </motion.div>
  );
}
