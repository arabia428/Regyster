/* ========== REGYSTER - NAVEGACIÓN DE PÁGINAS ========== */

      if(navigator.vibrate){
        navigator.vibrate([500, 200, 500, 200, 500]);
      }
    }
  }
  
  // Cargar configuración de notificaciones al iniciar
  function cargarConfigNotificaciones(){
    // Vibración (activa por defecto)
    const vibrar = localStorage.getItem('vibrarAlFichar');
    if(vibrar === null){
      localStorage.setItem('vibrarAlFichar', 'true');
    } else if(vibrar === 'false'){
      document.getElementById('toggleVibrar').classList.remove('activo');
    }
    
    // Sonido
    if(localStorage.getItem('sonidoAlFichar') === 'true'){
      document.getElementById('toggleSonido').classList.add('activo');
    }
    
    // Límite de horas
    if(localStorage.getItem('limiteHorasActivo') === 'true'){
      document.getElementById('toggleLimiteHoras').classList.add('activo');
      document.getElementById('configLimiteHoras').style.display = 'block';
    }
    const limite = localStorage.getItem('limiteHorasDiarias') || '10';
    document.getElementById('limiteHorasDiarias').value = limite;
    
    // Recordatorio
    if(localStorage.getItem('recordatorioActivo') === 'true'){
