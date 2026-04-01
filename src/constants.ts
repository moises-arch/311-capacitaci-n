export const LNB_STATS = {
  totalCases: 3196,
  byCategory: [
    { name: 'Denuncia Chances Casados', value: 1081 },
    { name: 'Información General', value: 733 },
    { name: 'Servicio al Cliente', value: 689 },
    { name: 'Ideas y Sugerencias', value: 269 },
    { name: 'Otros', value: 324 },
  ],
  byBranch: [
    { name: 'Panamá', value: 2896 },
    { name: 'Chiriquí', value: 100 },
    { name: 'Veraguas', value: 60 },
    { name: 'Penonomé', value: 42 },
    { name: 'Chitre', value: 32 },
    { name: 'Otros', value: 66 },
  ],
  byStatus: [
    { name: 'Finalizado', value: 51 },
    { name: 'En Proceso', value: 9 },
  ],
  byProvince: [
    { name: 'Panamá', value: 44 },
    { name: 'Panamá Oeste', value: 9 },
    { name: 'Chiriquí', value: 2 },
    { name: 'Veraguas', value: 2 },
    { name: 'Otros', value: 3 },
  ]
};

export const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Ciudadano contacta al 3-1-1',
    description: 'El proceso inicia con el reporte del ciudadano a través de llamada, chatbot o redes sociales.',
    icon: 'Phone',
    time: 'Paso 1'
  },
  {
    id: 2,
    title: 'Se remite caso a entidad',
    description: 'El Centro de Atención Ciudadana valida y envía el caso a la Lotería Nacional de Beneficencia.',
    icon: 'Send',
    time: 'Paso 2'
  },
  {
    id: 3,
    title: 'Caso en proceso',
    description: 'La LNB gestiona internamente la investigación o solución del requerimiento.',
    icon: 'Clock',
    time: 'Paso 3'
  },
  {
    id: 4,
    title: 'Concluir caso',
    description: 'Se brinda respuesta oficial al ciudadano y se cierra el ticket en el sistema.',
    icon: 'CheckCircle',
    time: 'Paso 4'
  }
];

export const STATUS_REASONS = [
  {
    label: 'Remitido',
    time: '24 Horas',
    description: 'Reasignación a otra sede o devolver el caso al Call Center.',
    color: 'emerald'
  },
  {
    label: 'En Proceso',
    time: '30 Días Hábiles',
    description: 'Gestión activa de la entidad para resolver el caso.',
    color: 'amber'
  },
  {
    label: 'Vencido',
    time: '+30 Días Hábiles',
    description: 'Caso sin respuesta o sin atender, seguimiento del enlace operativo.',
    color: 'red'
  }
];

export const REAL_CASES = [
  {
    id: '2026-25391',
    entidad: 'LNB - Lotería Nacional de Beneficencia',
    sede: 'LNB - Panamá Oeste',
    service: 'Denuncia por venta de chances y billetes casados - LNB',
    channel: 'AI chatbot',
    razon_estatus: 'En Proceso',
    ultimo_cambio: '2026-03-30 08:02:22',
    status: 'Abierto',
    date: '2026-03-29 20:24:43',
    type: 'Denuncia',
    location: 'Veracruz, Arraiján, Panamá Oeste',
    detail: 'Denuncia de una tienda que vende lotería clandestina.'
  },
  {
    id: '2026-25231',
    entidad: 'LNB - Lotería Nacional de Beneficencia, PN Policía Nacional',
    sede: 'LNB - Panamá, PN Panamá',
    service: 'Atención al Cliente (Clandestina)',
    channel: 'Llamada al 311',
    razon_estatus: 'En Proceso',
    ultimo_cambio: '2026-03-30 08:02:47',
    status: 'Abierto',
    date: '2026-03-28 11:06:47',
    type: 'Queja',
    location: '24 de Diciembre, Panamá',
    detail: 'Ciudadano Reporta: Que en el Minisuper La Pared, venden chances clandestinos. Desea la inspección.'
  },
  {
    id: '2026-24910',
    entidad: 'LNB - Lotería Nacional de Beneficencia',
    sede: 'LNB - Panamá',
    service: 'Atención al Cliente (sobreprecio)',
    channel: 'Llamada al 311',
    razon_estatus: 'En Proceso',
    ultimo_cambio: '2026-03-30 08:03:05',
    status: 'Abierto',
    date: '2026-03-27 08:58:37',
    type: 'Queja',
    location: 'Las Mañanitas, Panamá',
    detail: 'Ciudadano Reporta: que en el sector los billeteros estan vendiendo los billetes y los chances a 25 centavos adicional del precio regular. Desea que se investigue la situacion.'
  },
  {
    id: '2026-24501',
    entidad: 'LNB - Lotería Nacional de Beneficencia',
    sede: 'LNB - Panamá',
    service: 'Atención al Cliente (sobreprecio)',
    channel: 'Llamada al 311',
    razon_estatus: 'En Proceso',
    ultimo_cambio: '2026-03-26 11:10:17',
    status: 'Abierto',
    date: '2026-03-25 16:49:35',
    type: 'Queja',
    location: 'Calidonia, Panamá',
    detail: 'Ciudadano reporta: que se mantiene unos vendedores de Billete que venden la tira de chance a 1.50, Por lo que solicita la inspección.'
  },
  {
    id: '2026-22727',
    entidad: 'LNB - Lotería Nacional de Beneficencia',
    sede: 'LNB - Panamá',
    service: 'Pago de premios - LNB',
    channel: 'Llamada al 311',
    razon_estatus: 'En Proceso',
    ultimo_cambio: '2026-03-23 08:01:30',
    status: 'Abierto',
    date: '2026-03-19 15:59:06',
    type: 'Queja',
    location: 'Bella Vista, Panamá',
    detail: 'Reporte de irregularidad en pago de raspaditos. El cartón indicaba premio de B/.3,200.00 pero la cajera solo entregó B/.3.00.'
  },
  {
    id: '2026-24402',
    entidad: 'LNB - Lotería Nacional de Beneficencia',
    sede: 'LNB - Los Santos',
    service: 'Atención al Cliente',
    channel: 'Llamada al 311',
    razon_estatus: 'En Proceso',
    ultimo_cambio: '2026-03-26 11:11:10',
    status: 'Abierto',
    date: '2026-03-25 13:10:30',
    type: 'Queja',
    location: 'Las Tablas, Los Santos',
    detail: 'Vendedora reporta que no pudo retirar su libreta de Gordito porque le indicaron que cartera cerró antes del horario habitual.'
  },
  {
    id: '2026-22232',
    entidad: 'LNB - Lotería Nacional de Beneficencia',
    sede: 'LNB - Panamá Oeste',
    service: 'Atención al Cliente (Clandestina)',
    channel: 'Llamada al 311',
    razon_estatus: 'En Proceso',
    ultimo_cambio: '2026-03-18 15:35:36',
    status: 'Abierto',
    date: '2026-03-18 13:05:15',
    type: 'Queja',
    location: 'Arraiján, Panamá Oeste',
    detail: 'Ciudadano reporta venta de billetes de lotería ilícitos en el M/S treinta y ocho.'
  },
  {
    id: '2026-21260',
    entidad: 'LNB - Lotería Nacional de Beneficencia',
    sede: 'LNB - Panamá Oeste',
    service: 'Denuncia por venta de chances y billetes casados - LNB',
    channel: 'Llamada al 311',
    razon_estatus: 'En Proceso',
    ultimo_cambio: '2026-03-16 10:04:03',
    status: 'Abierto',
    date: '2026-03-14 16:55:33',
    type: 'Queja',
    location: 'Chame, Panamá Oeste',
    detail: 'Reporte de billeteros en Coronado vendiendo billetes con sobreprecio de B/1.25 o B/1.50.'
  },
  {
    id: '2026-20179',
    entidad: 'LNB - Lotería Nacional de Beneficencia',
    sede: 'LNB - Panamá',
    service: 'Denuncia por venta de chances y billetes casados - LNB',
    channel: 'Llamada al 311',
    razon_estatus: 'En Proceso',
    ultimo_cambio: '2026-03-12 08:11:15',
    status: 'Abierto',
    date: '2026-03-11 12:41:15',
    type: 'Queja',
    location: 'Betania, Panamá',
    detail: 'Venta de chances a 1.50 balboas en el área de La Arrocha de Betania.'
  },
  {
    id: '2026-19302',
    entidad: 'LNB - Lotería Nacional de Beneficencia',
    sede: 'LNB - Panamá',
    service: 'Denuncia por venta de chances y billetes casados - LNB',
    channel: 'Llamada al 311',
    razon_estatus: 'En Proceso',
    ultimo_cambio: '2026-03-10 20:16:15',
    status: 'Abierto',
    date: '2026-03-07 16:07:41',
    type: 'Queja',
    location: 'Juan Díaz, Panamá',
    detail: 'Inspección solicitada por venta de chances casados y sobreprecio frente al super 99 de Los Pueblos.'
  }
];
