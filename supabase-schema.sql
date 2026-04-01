-- ===============================================================
-- EVENTUM PRO: SUPABASE SCHEMA
-- ===============================================================

-- 1. Attendees (Registro de Asistencia)
CREATE TABLE IF NOT EXISTS attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Anonymous Feedback (Sugerencias Anónimas)
-- Nota: No hay FK a attendees para proteger el anonimato real.
CREATE TABLE IF NOT EXISTS anonymous_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department TEXT NOT NULL,
  service TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Services (Catálogo de Servicios)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  keywords TEXT[],
  priority_order INT DEFAULT 0,
  days_to_start INT DEFAULT 1,
  days_to_complete INT DEFAULT 5
);

-- 4. Processes (Catálogo de Procesos)
CREATE TABLE IF NOT EXISTS processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Remitido', 'En proceso', 'Vencido', 'Concluido')),
  sla_days INT NOT NULL,
  service_id UUID REFERENCES services(id),
  department TEXT NOT NULL,
  entity TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Resources (Presentaciones y Documentos)
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- 'presentation', 'guide', 'policy'
  file_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. App Settings (Configuración Global)
CREATE TABLE IF NOT EXISTS app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_title TEXT NOT NULL DEFAULT 'Evento Institucional 2026',
  event_description TEXT NOT NULL DEFAULT 'Transformación Digital y Procesos Modernos',
  signup_qr_url TEXT,
  internal_app_qr_url TEXT,
  presentation_file_url TEXT
);

-- ===============================================================
-- SEED DATA (Ejemplo)
-- ===============================================================

INSERT INTO services (name, category, priority_order) VALUES 
('Atención al Ciudadano', 'Servicios Públicos', 1),
('Gestión Documental', 'Administración', 2),
('Soporte Técnico', 'TI', 3);

INSERT INTO processes (name, description, status, sla_days, department, entity) VALUES 
('Renovación de Licencias', 'Proceso de actualización de credenciales anuales.', 'En proceso', 15, 'Transporte', 'Dirección General'),
('Solicitud de Viáticos', 'Gestión de recursos para misiones oficiales.', 'Remitido', 5, 'Finanzas', 'Tesorería'),
('Auditoría Interna', 'Revisión de procesos del Q1.', 'Vencido', 30, 'Control', 'Auditoría');

INSERT INTO resources (title, type, file_url, description) VALUES 
('Presentación Estratégica 2026', 'presentation', '#', 'Documento oficial con los pilares de la transformación.');

INSERT INTO app_settings (event_title, signup_qr_url, internal_app_qr_url) VALUES 
('Evento de Innovación 2026', 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://eventum-pro.vercel.app/signup', 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://eventum-pro.vercel.app/dashboard');
