/* ========== REGYSTER - APLICACIÓN PRINCIPAL ========== */

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.error('Error al registrar Service Worker:', err);
    });
  });
}

// Variables globales
let trabajando = false;
let horaInicioTrabajo = null;
let horaFinTrabajo = null;
let intervaloReloj = null;
let intervaloRelojDescanso = null;

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
  console.log('Regyster v2.0 - Iniciando...');
  
  // Cargar estado del cronómetro
  if (typeof recuperarEstadoCrono === 'function') {
    recuperarEstadoCrono();
  }
  
  // Cargar historial
  if (typeof mostrarUltimosRegistros === 'function') {
    mostrarUltimosRegistros();
  }
  
  // Cargar personalización
  if (typeof cargarPersonalizacion === 'function') {
    cargarPersonalizacion();
  }
  
  // Cargar configuraciones
  if (typeof cargarConfiguracionHorarios === 'function') {
    cargarConfiguracionHorarios();
  }
  
  if (typeof cargarConfigNotificaciones === 'function') {
    cargarConfigNotificaciones();
  }
  
  console.log('✅ Regyster iniciado correctamente');
});

// Exportar variables globales para otros módulos
window.app = {
  trabajando,
  horaInicioTrabajo,
  horaFinTrabajo,
  intervaloReloj,
  intervaloRelojDescanso
};
