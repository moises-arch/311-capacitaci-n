# Capacitación 311 - LNB (Eventum Pro)

Este es un sistema integral para la gestión de capacitaciones del Centro de Atención Ciudadana 311, dirigido a directores y jefes de la Lotería Nacional de Beneficencia.

## Características

- **Registro de Asistencia**: Formulario dinámico con validación y confeti al registrarse.
- **Buzón de Sugerencias**: Envío anónimo de retroalimentación sobre servicios y procesos.
- **Catálogo de Procesos**: Visualización inteligente de procesos y estados (Remitido, En proceso, Vencido, Concluido).
- **Panel Administrativo**: Gestión centralizada de datos con protección por clave.
- **Reportes**: Generación de listas de asistencia para impresión.

## Configuración del Backend (Supabase)

El proyecto utiliza **Supabase** como backend (Proyecto: `AIG`).

### Estructura de Datos
- `attendees`: Tabla para el registro de asistencia.
- `anonymous_feedback`: Tabla para sugerencias del buzón.
- `services` y `processes`: Catálogo de servicios y procesos institucionales.
- `app_settings`: Configuración global de la aplicación.

### Acceso Administrativo
- **Ruta**: `/admin`
- **Clave**: `@311`

## Ejecución Local

**Prerrequisitos:** Node.js

1. Instalar dependencias:
   `npm install`
2. Configurar el archivo `.env` con las credenciales de Supabase (URL y Anon Key).
3. Iniciar el servidor de desarrollo:
   `npm run dev`

---
Desarrollado para el Centro de Atención Ciudadana 311.
