export type ProcessStatus = 'Remitido' | 'En proceso' | 'Vencido' | 'Concluido';

export interface Attendee {
  id: string;
  full_name: string;
  department: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface AnonymousFeedback {
  id: string;
  department: string;
  service: string;
  comment: string;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  keywords?: string[];
  priority_order: number;
  days_to_start: number;
  days_to_complete: number;
}

export interface Process {
  id: string;
  name: string;
  description: string;
  status: ProcessStatus;
  sla_days: number;
  service_id?: string;
  department: string;
  entity: string;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  title: string;
  type: string;
  file_url: string;
  description?: string;
  created_at: string;
}

export interface AppSettings {
  id: string;
  event_title: string;
  event_description: string;
  signup_qr_url?: string;
  internal_app_qr_url?: string;
  presentation_file_url?: string;
}

export interface DashboardStats {
  totalAttendees: number;
  totalFeedback: number;
  totalDepartments: number;
  totalProcesses: number;
}
