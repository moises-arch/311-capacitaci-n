import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, Play, RefreshCcw, CheckCircle2, 
  AlertCircle, ArrowRight, MessageSquare, 
  User, Building2, Clock, ShieldCheck 
} from 'lucide-react';
import { cn } from '../lib/utils';

interface CaseStep {
  id: number;
  title: string;
  description: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const SIMULATION_CASES = [
  {
    id: 'case-process',
    title: 'Ciclo de Vida del Caso (LNB)',
    difficulty: 'Intermedio',
    description: 'Simula el proceso completo desde que entra la llamada hasta que se cierra el ticket en el sistema.',
    steps: [
      {
        id: 1,
        title: 'Paso 1: Remisión',
        description: 'El Centro de Atención Ciudadana (311) recibe una queja sobre un billetero. ¿Cuál es la primera acción del sistema?',
        options: [
          { text: 'Llamar al billetero directamente', isCorrect: false, feedback: 'El 311 no contacta a los sujetos de la queja, remite a la institución.' },
          { text: 'Remitir el caso a la Lotería Nacional de Beneficencia', isCorrect: true, feedback: '¡Correcto! El 311 actúa como puente y remite el caso a la LNB.' },
          { text: 'Cerrar el caso por falta de pruebas', isCorrect: false, feedback: 'Todo caso debe ser remitido para su investigación.' }
        ]
      },
      {
        id: 2,
        title: 'Paso 2: Recepción',
        description: 'La LNB recibe el caso en su bandeja. ¿Qué debe hacer el enlace institucional?',
        options: [
          { text: 'Ignorarlo hasta que el ciudadano llame de nuevo', isCorrect: false, feedback: 'Esto violaría los tiempos de respuesta (SLA).' },
          { text: 'Cambiar el estatus a "En Proceso" y asignar al departamento correspondiente', isCorrect: true, feedback: '¡Exacto! La recepción implica validar y asignar el caso internamente.' },
          { text: 'Borrar el registro si no le gusta el tono del ciudadano', isCorrect: false, feedback: 'Todos los casos deben ser gestionados profesionalmente.' }
        ]
      },
      {
        id: 3,
        title: 'Paso 3: Gestión y Respuesta',
        description: 'El departamento técnico resuelve el problema. ¿Cómo se debe documentar la respuesta?',
        options: [
          { text: 'Poner "Listo" en el comentario', isCorrect: false, feedback: 'La respuesta debe ser detallada y explicar qué se hizo.' },
          { text: 'Adjuntar evidencias y redactar una respuesta clara para el ciudadano', isCorrect: true, feedback: '¡Correcto! La transparencia es clave en el cierre del proceso.' },
          { text: 'No poner nada, el ciudadano se dará cuenta solo', isCorrect: false, feedback: 'El sistema requiere una respuesta formal para cerrar el ticket.' }
        ]
      }
    ]
  },
  {
    id: 'case-enlace',
    title: 'Simulación: El Enlace Institucional',
    difficulty: 'Avanzado',
    description: 'Toma el rol del enlace entre el 311 y la LNB. Gestiona la bandeja de entrada.',
    steps: [
      {
        id: 1,
        title: 'Recepción de Alerta',
        description: 'Llega un caso marcado como "URGENTE" sobre un posible fraude en un sorteo. ¿Qué haces primero?',
        options: [
          { text: 'Llamar a la prensa para informar', isCorrect: false, feedback: 'Esto viola la confidencialidad del proceso de investigación.' },
          { text: 'Validar la información y escalar de inmediato a la Dirección de Operaciones y Legal', isCorrect: true, feedback: '¡Correcto! Los casos de fraude requieren escalamiento inmediato a las áreas competentes.' },
          { text: 'Esperar a que termine el sorteo para ver qué pasa', isCorrect: false, feedback: 'La negligencia en casos urgentes puede tener consecuencias legales.' }
        ]
      },
      {
        id: 2,
        title: 'Respuesta al 311',
        description: 'El caso ha sido resuelto internamente. ¿Cómo cierras el ciclo con el 311?',
        options: [
          { text: 'Poner un comentario que diga "Resuelto internamente"', isCorrect: false, feedback: 'El 311 necesita una respuesta que pueda leerle al ciudadano.' },
          { text: 'Ingresar la resolución detallada en el sistema para que el agente 311 informe al ciudadano', isCorrect: true, feedback: '¡Exacto! El ciclo se cierra cuando el ciudadano recibe la respuesta oficial.' },
          { text: 'Llamar al ciudadano desde tu celular personal', isCorrect: false, feedback: 'Siempre usa los canales oficiales del sistema 311.' }
        ]
      }
    ]
  },
  {
    id: 'case-1',
    title: 'Reporte de luminaria dañada',
    difficulty: 'Básico',
    description: 'Un ciudadano llama reportando una luminaria frente a su casa que no enciende desde hace 3 días.',
    steps: [
      {
        id: 1,
        title: 'Clasificación del Caso',
        description: '¿Cómo debe clasificarse este reporte inicialmente?',
        options: [
          { text: 'Queja contra el municipio', isCorrect: false, feedback: 'No es una queja, es un reporte de servicio.' },
          { text: 'Reporte de Infraestructura / Alumbrado Público', isCorrect: true, feedback: '¡Correcto! Es un reporte técnico de infraestructura.' },
          { text: 'Sugerencia de mejora', isCorrect: false, feedback: 'Las sugerencias son para ideas, no para fallos existentes.' }
        ]
      },
      {
        id: 2,
        title: 'Información Requerida',
        description: '¿Qué dato es CRÍTICO solicitar al ciudadano?',
        options: [
          { text: 'Color de su casa', isCorrect: false, feedback: 'Ayuda, pero no es el dato técnico principal.' },
          { text: 'Número de poste o dirección exacta con puntos de referencia', isCorrect: true, feedback: '¡Exacto! Sin la ubicación precisa del poste, la cuadrilla no podrá encontrarlo.' },
          { text: 'Su fecha de nacimiento', isCorrect: false, feedback: 'Dato irrelevante para este tipo de reporte.' }
        ]
      }
    ]
  },
  {
    id: 'case-crisis',
    title: 'Manejo de Ciudadano Molesto',
    difficulty: 'Avanzado',
    description: 'Un ciudadano llama gritando porque su caso tiene 15 días sin respuesta.',
    steps: [
      {
        id: 1,
        title: 'Primer Contacto',
        description: '¿Cuál es la mejor forma de iniciar la conversación?',
        options: [
          { text: 'Decirle que se calle o le colgará la llamada', isCorrect: false, feedback: 'Esto escala el conflicto y viola el protocolo de atención.' },
          { text: 'Escuchar activamente, mantener la calma y validar su frustración', isCorrect: true, feedback: '¡Correcto! La empatía y la calma ayudan a desescalar la situación.' },
          { text: 'Gritar más fuerte para que lo escuche', isCorrect: false, feedback: 'Nunca se debe igualar el tono agresivo del ciudadano.' }
        ]
      },
      {
        id: 2,
        title: 'Resolución de Conflicto',
        description: 'Después de calmarlo, ¿qué acción sigue?',
        options: [
          { text: 'Darle un número de teléfono falso para que no moleste más', isCorrect: false, feedback: 'Falta de ética profesional.' },
          { text: 'Investigar el estatus real del caso y explicarle honestamente el retraso', isCorrect: true, feedback: '¡Exacto! La honestidad y la información real generan confianza.' },
          { text: 'Prometerle que se resolverá en 5 minutos (aunque sea mentira)', isCorrect: false, feedback: 'Nunca prometa tiempos que no puede cumplir.' }
        ]
      }
    ]
  },
  {
    id: 'quiz-sla',
    title: 'Quiz: Tiempos de Respuesta (SLA)',
    difficulty: 'Intermedio',
    description: '¿Conoces los plazos legales para responder a un ciudadano?',
    steps: [
      {
        id: 1,
        title: 'Plazo de Respuesta',
        description: 'Según el protocolo 311, ¿cuántos días hábiles tiene la institución para dar una respuesta final a un reporte de servicio estándar?',
        options: [
          { text: '30 días calendario', isCorrect: false, feedback: 'Demasiado tiempo para un reporte de servicio.' },
          { text: '15 días hábiles', isCorrect: true, feedback: '¡Correcto! Es el estándar para la mayoría de los servicios.' },
          { text: '24 horas', isCorrect: false, feedback: 'Sería ideal, pero el protocolo establece 15 días hábiles.' }
        ]
      }
    ]
  },
  {
    id: 'quiz-data',
    title: 'Quiz: Protección de Datos',
    difficulty: 'Avanzado',
    description: 'Pon a prueba tus conocimientos sobre la privacidad del ciudadano.',
    steps: [
      {
        id: 1,
        title: 'Información Sensible',
        description: 'Un ciudadano llama pidiendo el número de teléfono personal de un funcionario para una queja. ¿Qué debes hacer?',
        options: [
          { text: 'Dárselo si parece una emergencia', isCorrect: false, feedback: 'Nunca se deben compartir datos personales de funcionarios.' },
          { text: 'Negar la información y ofrecer el canal oficial de quejas', isCorrect: true, feedback: '¡Correcto! Protegemos la privacidad y canalizamos por la vía legal.' },
          { text: 'Colgar la llamada inmediatamente', isCorrect: false, feedback: 'Debes ser cortés y ofrecer la alternativa correcta.' }
        ]
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Solicitud de información sobre sorteos',
    difficulty: 'Básico',
    description: 'Un ciudadano desea saber los resultados del sorteo de la LNB del domingo pasado.',
    steps: [
      {
        id: 1,
        title: 'Canal de Respuesta',
        description: '¿Cuál es la acción más eficiente?',
        options: [
          { text: 'Transferir la llamada al Director General', isCorrect: false, feedback: 'No es necesario escalar una consulta de información pública a ese nivel.' },
          { text: 'Consultar la base de datos de resultados y dictar los números', isCorrect: true, feedback: '¡Correcto! El agente 311 tiene acceso a esta información inmediata.' },
          { text: 'Pedirle que llame mañana', isCorrect: false, feedback: 'Debemos brindar la información en el momento si está disponible.' }
        ]
      }
    ]
  }
];

export default function Playground() {
  const [selectedCase, setSelectedCase] = useState<typeof SIMULATION_CASES[0] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const startCase = (c: typeof SIMULATION_CASES[0]) => {
    setSelectedCase(c);
    setCurrentStepIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (selectedCase?.steps[currentStepIndex].options[index].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextStep = () => {
    if (!selectedCase) return;
    
    if (currentStepIndex < selectedCase.steps.length - 1) {
      setCurrentStepIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setSelectedCase(null);
    setCurrentStepIndex(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="space-y-8 py-8">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Gamepad2 className="text-blue-400 w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Simulador de Casos</h1>
        </div>
        <p className="text-zinc-500 font-light">Practica la gestión de procesos 311 en un entorno seguro.</p>
      </header>

      {!selectedCase ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SIMULATION_CASES.map((c) => (
            <motion.div 
              key={c.id}
              whileHover={{ y: -5 }}
              className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between group hover:border-blue-500/30 transition-all"
            >
                <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <Play className="text-zinc-500 group-hover:text-blue-400 w-6 h-6" />
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                    c.difficulty === 'Básico' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    c.difficulty === 'Intermedio' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                    "bg-red-500/10 text-red-400 border-red-500/20"
                  )}>
                    {c.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  {c.description}
                </p>
              </div>
              <button 
                onClick={() => startCase(c)}
                className="mt-8 w-full bg-white/5 hover:bg-blue-600 text-zinc-400 hover:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Iniciar Simulación
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div 
                key="step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">
                    Paso {currentStepIndex + 1} de {selectedCase.steps.length}
                  </div>
                  <button onClick={reset} className="text-zinc-600 hover:text-zinc-400 transition-colors">
                    <RefreshCcw size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{selectedCase.steps[currentStepIndex].title}</h2>
                  <p className="text-zinc-400 text-lg font-light leading-relaxed">
                    {selectedCase.steps[currentStepIndex].description}
                  </p>
                </div>

                <div className="space-y-3">
                  {selectedCase.steps[currentStepIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleOptionSelect(idx)}
                      className={cn(
                        "w-full p-6 rounded-2xl border text-left transition-all flex items-center justify-between group",
                        isAnswered 
                          ? option.isCorrect 
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : selectedOption === idx 
                              ? "bg-red-500/10 border-red-500/30 text-red-400"
                              : "bg-zinc-900/20 border-white/5 text-zinc-600 opacity-50"
                          : "bg-black/40 border-white/10 hover:border-blue-500/50 text-zinc-300"
                      )}
                    >
                      <span className="text-sm font-medium">{option.text}</span>
                      {isAnswered && option.isCorrect && <CheckCircle2 size={20} />}
                      {isAnswered && !option.isCorrect && selectedOption === idx && <AlertCircle size={20} />}
                    </button>
                  ))}
                </div>

                {isAnswered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-6 rounded-2xl border text-sm leading-relaxed",
                      selectedCase.steps[currentStepIndex].options[selectedOption!].isCorrect
                        ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-400/80"
                        : "bg-red-500/5 border-red-500/10 text-red-400/80"
                    )}
                  >
                    <span className="font-bold uppercase tracking-widest text-[10px] block mb-2">Retroalimentación:</span>
                    {selectedCase.steps[currentStepIndex].options[selectedOption!].feedback}
                  </motion.div>
                )}

                {isAnswered && (
                  <button
                    onClick={nextStep}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {currentStepIndex < selectedCase.steps.length - 1 ? 'Siguiente Paso' : 'Ver Resultados'}
                    <ArrowRight size={20} />
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-12 text-center space-y-8"
              >
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(37,99,235,0.4)]">
                  <CheckCircle2 className="text-white w-12 h-12" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">¡Simulación Completada!</h2>
                  <p className="text-zinc-500">Has finalizado el caso: <span className="text-zinc-300 font-medium">{selectedCase.title}</span></p>
                </div>

                <div className="flex justify-center gap-8 py-8 border-y border-white/5">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400">{score}/{selectedCase.steps.length}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mt-1">Puntuación</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-400">{Math.round((score/selectedCase.steps.length)*100)}%</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mt-1">Precisión</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => startCase(selectedCase)}
                    className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all"
                  >
                    Repetir Caso
                  </button>
                  <button 
                    onClick={reset}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all"
                  >
                    Otros Casos
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
