/* ========== REGYSTER - FUNCIONES PRINCIPALES ========== */
/* Cronómetro, Historial, Calendario, Gráficas, Ajustes, Exportación */

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('SW error:', err);
      });
    });
  }

  // Función para calcular horas nocturnas (configurable)
  function calcularHorasNocturnas(timestampInicio, timestampFin){
    const HORA_INICIO_NOCTURNA = parseInt(localStorage.getItem('horaInicioNocturnas') || '22');
    const HORA_FIN_NOCTURNA = parseInt(localStorage.getItem('horaFinNocturnas') || '6');
    
    let horasNocturnas = 0;
    
    // Crear fechas desde los timestamps
    let inicio = new Date(timestampInicio);
    let fin = new Date(timestampFin);
    
    // Iterar minuto a minuto para mayor precisión
    let actual = new Date(inicio);
    
    while(actual < fin){
      const hora = actual.getHours();
      
      // Es nocturno si es >= 22:00 OR < 06:00
      if(hora >= HORA_INICIO_NOCTURNA || hora < HORA_FIN_NOCTURNA){
        horasNocturnas += 1/60; // Sumar 1 minuto en formato de hora
      }
      
      // Avanzar 1 minuto
      actual.setMinutes(actual.getMinutes() + 1);
    }
    
    return Math.round(horasNocturnas * 100) / 100; // Redondear a 2 decimales
  }

  // Función para obtener las horas nocturnas del día actual
  function obtenerHorasNocturnasDia(fecha){
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    const registrosDelDia = registrosCrono.filter(r => r.fecha === fecha && r.tipo === 'trabajo');
    
    let totalNocturnas = 0;
    registrosDelDia.forEach(r => {
      if(r.horasNocturnas !== undefined){
        totalNocturnas += r.horasNocturnas;
      }
    });
    
    return Math.round(totalNocturnas * 100) / 100;
  }

  // Actualizar display de horas nocturnas
  function actualizarDisplayNocturnas(){
    const fecha = document.getElementById('fecha').value || new Date().toISOString().split('T')[0];
    const horasNocturnas = obtenerHorasNocturnasDia(fecha);
    document.getElementById('nocturnasValor').textContent = formatearHorasDecimal(horasNocturnas);
  }

  // Actualizar cuando cambia la fecha
  document.getElementById('fecha').addEventListener('change', actualizarDisplayNocturnas);

  // Variables del cronómetro
  let cronometroTrabajando = false; // true = trabajando, false = descansando
  let horaInicioTrabajo = null;
  let ultimoFinTrabajo = null; // Para calcular descanso

  // Recuperar estado del cronómetro al cargar la página
  function recuperarEstadoCrono(){
    const estadoGuardado = localStorage.getItem('estadoCrono');
    if(estadoGuardado){
      const estado = JSON.parse(estadoGuardado);
      cronometroTrabajando = estado.trabajando;
      horaInicioTrabajo = estado.horaInicioTrabajo;
      ultimoFinTrabajo = estado.ultimoFinTrabajo;
      
      if(cronometroTrabajando){
        document.getElementById('botonCrono').textContent = '⏹ PARAR';
      } else {
        document.getElementById('botonCrono').textContent = '▶ INICIAR TRABAJO';
      }
      actualizarReloj();
    } else {
      // Buscar el último fin de trabajo en los registros
      const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
      const trabajos = registrosCrono.filter(r => r.tipo === 'trabajo').sort((a, b) => b.timestampFin - a.timestampFin);
      if(trabajos.length > 0){
        ultimoFinTrabajo = trabajos[0].timestampFin;
        // Guardar estado para mostrar descanso
        localStorage.setItem('estadoCrono', JSON.stringify({
          trabajando: false,
          horaInicioTrabajo: null,
          ultimoFinTrabajo: ultimoFinTrabajo
        }));
      }
      actualizarReloj();
    }
  }

  function formatearTiempo(ms){
    const totalSegundos = Math.floor(ms / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;
    return `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
  }
  
  function formatearTiempoLargo(ms){
    const totalSegundos = Math.floor(ms / 1000);
    const dias = Math.floor(totalSegundos / 86400);
    const horas = Math.floor((totalSegundos % 86400) / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;
    
    if(dias > 0){
      return `${dias}d ${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
    }
    return `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
  }

  // NUEVA FUNCIÓN: Convertir horas decimales a formato "Xh Ym Zs"
  function formatearHorasDecimal(horasDecimal){
    const totalSegundos = Math.round(horasDecimal * 3600);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;
    
    if(horas > 0){
      return `${horas}h ${minutos}m ${segundos}s`;
    } else if(minutos > 0){
      return `${minutos}m ${segundos}s`;
    } else {
      return `${segundos}s`;
    }
  }
  
  // Versión compacta sin segundos para estadísticas
  function formatearHorasCompacto(horasDecimal){
    const totalMinutos = Math.round(horasDecimal * 60);
    const horas = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;
    
    if(horas > 0){
      return `${horas}h ${minutos}m`;
    } else {
      return `${minutos}m`;
    }
  }

  function formatearHora(timestamp){
    const fecha = new Date(timestamp);
    return fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  
  function formatearFechaHora(timestamp){
    const fecha = new Date(timestamp);
    return fecha.toLocaleString('es-ES', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit', 
      minute: '2-digit'
    });
  }

  function actualizarReloj(){
    const tiempoReloj = document.getElementById('tiempoReloj');
    const iconoReloj = document.getElementById('iconoReloj');
    const estadoCrono = document.getElementById('estadoCrono');
    const reloj = document.getElementById('reloj');

    const ahora = Date.now();
    
    if(cronometroTrabajando && horaInicioTrabajo){
      // Mostrando trabajo en curso
      const total = ahora - horaInicioTrabajo;
      tiempoReloj.textContent = formatearTiempo(total);
      iconoReloj.textContent = '🔧';
      const horaInicioFormateada = formatearHora(horaInicioTrabajo);
      estadoCrono.textContent = `⏱️ Trabajando desde ${horaInicioFormateada}`;
      reloj.classList.add('activo');
    } else if(ultimoFinTrabajo){
      // Mostrando descanso en curso
      const total = ahora - ultimoFinTrabajo;
      tiempoReloj.textContent = formatearTiempoLargo(total);
      iconoReloj.textContent = '🛏️';
      const finFormateado = formatearFechaHora(ultimoFinTrabajo);
      estadoCrono.textContent = `😴 Descansando desde ${finFormateado}`;
      reloj.classList.remove('activo');
    } else {
      // Sin datos previos
      tiempoReloj.textContent = '00:00:00';
      iconoReloj.textContent = '⏸️';
      estadoCrono.textContent = 'Sin registros previos';
      reloj.classList.remove('activo');
    }
    
    requestAnimationFrame(actualizarReloj);
  }

  document.getElementById('botonCrono').onclick = function(){
    const ahora = Date.now();
    const fechaActual = new Date(ahora);
    const fechaStr = fechaActual.toISOString().split('T')[0];

    if(!cronometroTrabajando){
      // INICIAR TRABAJO
      
      // Si había un descanso en curso, guardarlo
      if(ultimoFinTrabajo){
        const tiempoDescanso = (ahora - ultimoFinTrabajo) / 1000 / 3600;
        
        // Determinar la fecha del descanso (usamos la fecha de inicio del descanso)
        const fechaInicioDescanso = new Date(ultimoFinTrabajo);
        const fechaDescansoStr = fechaInicioDescanso.toISOString().split('T')[0];
        
        const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
        
        registrosCrono.push({
          fecha: fechaDescansoStr,
          tipo: 'descanso',
          tiempo: Math.round(tiempoDescanso * 100) / 100,
          timestamp: ahora,
          horaInicio: formatearHora(ultimoFinTrabajo),
          horaFin: formatearHora(ahora),
          timestampInicio: ultimoFinTrabajo,
          timestampFin: ahora
        });
        
        localStorage.setItem('registrosCrono', JSON.stringify(registrosCrono));
      }
      
      // Empezar trabajo
      cronometroTrabajando = true;
      horaInicioTrabajo = ahora;
      ultimoFinTrabajo = null;
      
      localStorage.setItem('estadoCrono', JSON.stringify({
        trabajando: true,
        horaInicioTrabajo: horaInicioTrabajo,
        ultimoFinTrabajo: null
      }));
      
      // Efectos al fichar
      efectosAlFichar();
      
      this.textContent = '⏹ PARAR';
      
    } else {
      // PARAR TRABAJO
      
      const tiempoTotal = (ahora - horaInicioTrabajo) / 1000 / 3600;
      const horasNocturnas = calcularHorasNocturnas(horaInicioTrabajo, ahora);
      
      // Determinar la fecha del trabajo (usamos la fecha de inicio)
      const fechaInicioTrabajo = new Date(horaInicioTrabajo);
      const fechaTrabajoStr = fechaInicioTrabajo.toISOString().split('T')[0];

      const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
      
      registrosCrono.push({
        fecha: fechaTrabajoStr,
        tipo: 'trabajo',
        tiempo: Math.round(tiempoTotal * 100) / 100,
        timestamp: ahora,
        horaInicio: formatearHora(horaInicioTrabajo),
        horaFin: formatearHora(ahora),
        timestampInicio: horaInicioTrabajo,
        timestampFin: ahora,
        horasNocturnas: horasNocturnas
      });
      
      localStorage.setItem('registrosCrono', JSON.stringify(registrosCrono));
      
      // Empezar descanso automáticamente
      cronometroTrabajando = false;
      ultimoFinTrabajo = ahora;
      horaInicioTrabajo = null;
      
      localStorage.setItem('estadoCrono', JSON.stringify({
        trabajando: false,
        horaInicioTrabajo: null,
        ultimoFinTrabajo: ultimoFinTrabajo
      }));
      
      // Actualizar display de horas nocturnas
      actualizarDisplayNocturnas();
      
      // Efectos al fichar
      efectosAlFichar();
      
      // Verificar límite de horas
      verificarLimiteHoras();
      
      this.textContent = '▶ INICIAR TRABAJO';
    }
  };

  function cargarHistorial(){
    const cont = document.getElementById('historial');
    cont.innerHTML = "";
    const data = JSON.parse(localStorage.getItem('registros') || "[]");
    if(data.length === 0){
      cont.innerHTML = "<div class='entry'>No hay registros aún.</div>";
      return;
    }
    data.forEach(r => {
      const div = document.createElement('div');
      div.className = 'entry';
      div.innerHTML = `<b style="color: #ff8c42;">Fecha:</b> ${r.fecha}<br>
         <b style="color: #ff8c42;">Nocturnas:</b> ${r.nocturnas}h<br>
         <b style="color: #ff8c42;">Dieta:</b> ${r.dieta_pernocta}<br>
         <b style="color: #ff8c42;">Festivo:</b> ${r.festivo ? 'Sí' : 'No'}<br>
         <b style="color: #ff8c42;">Sexto:</b> ${r.sexto ? 'Sí' : 'No'}`;
      cont.appendChild(div);
    });
  }

  document.getElementById('botonGuardar').onclick = () => {
    const fecha = document.getElementById('fecha').value;
    const dieta = document.getElementById('dieta_pernocta').value;
    const fest = document.getElementById('festivo').checked;
    const sexto = document.getElementById('sexto').checked;

    if(!fecha){
      alert('Selecciona fecha');
      return;
    }

    // Guardar sin importar el estado del cronómetro - datos manuales independientes
    const registros = JSON.parse(localStorage.getItem('registros') || "[]");
    
    // Buscar si ya existe un registro para esta fecha
    const indiceExistente = registros.findIndex(r => r.fecha === fecha);
    
    if(indiceExistente !== -1){
      // Actualizar registro existente
      registros[indiceExistente].dieta_pernocta = dieta;
      registros[indiceExistente].festivo = fest;
      registros[indiceExistente].sexto = sexto;
    } else {
      // Crear nuevo registro
      registros.push({
        fecha: fecha, 
        nocturnas: 0, 
        dieta_pernocta: dieta, 
        festivo: fest, 
        sexto: sexto
      });
    }
    
    localStorage.setItem('registros', JSON.stringify(registros));

    cargarHistorial();
    alert('✅ Guardado correctamente');
  };

  // FUNCIONALIDAD DE BORRADO
  let registroSeleccionadoIndex = null;

  document.getElementById('botonBorrar').onclick = function(){
    mostrarUltimosRegistros();
    document.getElementById('modalBorrar').classList.add('active');
  };

  document.getElementById('cerrarModal').onclick = function(){
    document.getElementById('modalBorrar').classList.remove('active');
  };

  document.getElementById('cerrarDetalle').onclick = function(){
    document.getElementById('modalDetalle').classList.remove('active');
  };

  document.getElementById('modalBorrar').onclick = function(e){
    if(e.target === this){
      this.classList.remove('active');
    }
  };

  document.getElementById('modalDetalle').onclick = function(e){
    if(e.target === this){
      this.classList.remove('active');
    }
  };

  function mostrarUltimosRegistros(){
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    const fechasUnicas = new Set();
    const registrosCombinados = [];

    registros.forEach(r => {
      if(!fechasUnicas.has(r.fecha)){
        fechasUnicas.add(r.fecha);
        registrosCombinados.push({
          fecha: r.fecha,
          datosManual: r,
          datosCrono: registrosCrono.filter(rc => rc.fecha === r.fecha && rc.tipo === 'trabajo')
        });
      }
    });

    registrosCrono.forEach(rc => {
      if(!fechasUnicas.has(rc.fecha) && rc.tipo === 'trabajo'){
        fechasUnicas.add(rc.fecha);
        registrosCombinados.push({
          fecha: rc.fecha,
          datosManual: null,
          datosCrono: registrosCrono.filter(r => r.fecha === rc.fecha && r.tipo === 'trabajo')
        });
      }
    });

    registrosCombinados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const ultimos10 = registrosCombinados.slice(0, 10);

    const listaRegistros = document.getElementById('listaRegistros');
    
    if(ultimos10.length === 0){
      listaRegistros.innerHTML = '<div class="mensaje-vacio">📭 No hay registros para mostrar</div>';
      return;
    }

    listaRegistros.innerHTML = '';
    
    ultimos10.forEach((reg, index) => {
      const div = document.createElement('div');
      div.className = 'registro-item';
      
      const fechaFormateada = new Date(reg.fecha + 'T00:00:00').toLocaleDateString('es-ES');
      const horasTrabajadas = formatearHorasDecimal(reg.datosCrono.reduce((sum, rc) => sum + rc.tiempo, 0));
      
      div.innerHTML = `
        <div class="registro-fecha">📅 ${fechaFormateada}</div>
        <div class="registro-horas">⏱️ ${horasTrabajadas} trabajadas</div>
      `;
      
      div.onclick = () => mostrarDetalle(reg, index);
      listaRegistros.appendChild(div);
    });
  }

  function mostrarDetalle(registro, index){
    registroSeleccionadoIndex = index;
    
    const fechaFormateada = new Date(registro.fecha + 'T00:00:00').toLocaleDateString('es-ES');
    document.getElementById('detalleFecha').textContent = `📅 ${fechaFormateada}`;
    document.getElementById('detalleCheckbox').checked = false;
    
    let html = '';
    
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    const todosCrono = registrosCrono.filter(rc => rc.fecha === registro.fecha);
    
    if(todosCrono && todosCrono.length > 0){
      html += '<div class="detalle-seccion">';
      html += '<div class="detalle-seccion-titulo">⏱️ Datos del Cronómetro</div>';
      
      const trabajo = todosCrono.filter(c => c.tipo === 'trabajo');
      const descanso = todosCrono.filter(c => c.tipo === 'descanso');
      
      if(trabajo.length > 0){
        trabajo.forEach((crono, idx) => {
          if(trabajo.length > 1){
            html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
              <span class="detalle-dato-label">🔧 Sesión de Trabajo ${idx + 1}</span>
            </div>`;
          }
          if(crono.horaInicio){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🔧 Hora de inicio:</span>
              <span class="detalle-dato-valor">${crono.horaInicio}</span>
            </div>`;
          }
          if(crono.horaFin){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🔧 Hora de fin:</span>
              <span class="detalle-dato-valor">${crono.horaFin}</span>
            </div>`;
          }
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🔧 Horas trabajadas:</span>
            <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
          </div>`;
        });
        
        const totalTrabajo = trabajo.reduce((sum, rc) => sum + rc.tiempo, 0);
        if(trabajo.length > 1){
          html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
            <span class="detalle-dato-label">🔧 TOTAL TRABAJADAS:</span>
            <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalTrabajo)}</span>
          </div>`;
        }
      }
      
      if(descanso.length > 0){
        html += `<div style="height: 20px;"></div>`;
        descanso.forEach((crono, idx) => {
          if(descanso.length > 1){
            html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
              <span class="detalle-dato-label">🛏️ Sesión de Descanso ${idx + 1}</span>
            </div>`;
          }
          if(crono.horaInicio){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🛏️ Hora de inicio:</span>
              <span class="detalle-dato-valor">${crono.horaInicio}</span>
            </div>`;
          }
          if(crono.horaFin){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🛏️ Hora de fin:</span>
              <span class="detalle-dato-valor">${crono.horaFin}</span>
            </div>`;
          }
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🛏️ Horas descansadas:</span>
            <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
          </div>`;
        });
        
        const totalDescanso = descanso.reduce((sum, rc) => sum + rc.tiempo, 0);
        if(descanso.length > 1){
          html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
            <span class="detalle-dato-label">🛏️ TOTAL DESCANSADAS:</span>
            <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalDescanso)}</span>
          </div>`;
        }
      }
      
      html += '</div>';
    }
    
    if(registro.datosManual){
      html += '<div class="detalle-seccion">';
      html += '<div class="detalle-seccion-titulo">📝 Datos Manuales</div>';
      
      if(registro.datosManual.nocturnas && parseInt(registro.datosManual.nocturnas) > 0){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">🌙 Horas nocturnas:</span>
          <span class="detalle-dato-valor">${registro.datosManual.nocturnas} horas</span>
        </div>`;
      }
      
      html += `<div class="detalle-dato">
        <span class="detalle-dato-label">🛏️ Dieta pernocta:</span>
        <span class="detalle-dato-valor">${registro.datosManual.dieta_pernocta === 'camion' ? 'En camión' : 'En casa'}</span>
      </div>`;
      
      if(registro.datosManual.festivo){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">🎉 Festivo:</span>
          <span class="detalle-dato-valor">Sí</span>
        </div>`;
      }
      
      if(registro.datosManual.sexto){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">⚡ Sexto día consecutivo:</span>
          <span class="detalle-dato-valor">Sí</span>
        </div>`;
      }
      
      html += '</div>';
    }
    
    document.getElementById('detalleContenido').innerHTML = html;
    
    document.getElementById('modalBorrar').classList.remove('active');
    document.getElementById('modalDetalle').classList.add('active');
  }

  document.getElementById('btnBorrarDetalle').onclick = function(){
    const checkbox = document.getElementById('detalleCheckbox');
    
    if(!checkbox.checked){
      alert('⚠️ Marca el checkbox para confirmar el borrado');
      return;
    }
    
    if(!confirm('¿Seguro que quieres borrar este registro?')){
      return;
    }
    
    borrarRegistroActual();
  };

  function borrarRegistroActual(){
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    const fechaTexto = document.getElementById('detalleFecha').textContent.replace('📅 ', '');
    const [dia, mes, anio] = fechaTexto.split('/');
    const fechaBuscar = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    
    const registrosFiltrados = registros.filter(r => r.fecha !== fechaBuscar);
    const cronoFiltrados = registrosCrono.filter(rc => rc.fecha !== fechaBuscar);
    
    localStorage.setItem('registros', JSON.stringify(registrosFiltrados));
    localStorage.setItem('registrosCrono', JSON.stringify(cronoFiltrados));
    
    cargarHistorial();
    document.getElementById('modalDetalle').classList.remove('active');
    
    mostrarUltimosRegistros();
    
    const hayRegistros = registrosFiltrados.length > 0 || cronoFiltrados.length > 0;
    if(hayRegistros){
      document.getElementById('modalBorrar').classList.add('active');
    } else {
      document.getElementById('modalBorrar').classList.remove('active');
    }
    
    alert('✅ Registro borrado correctamente');
  }

  document.getElementById('resumenMes').onclick = function(){
    const mes = document.getElementById('mesResumen').value;
    if(!mes){ alert('Selecciona mes'); return; }
    
    const [anio, mesNum] = mes.split('-');
    const registros = JSON.parse(localStorage.getItem('registros') || "[]");
    
    const filtrados = registros.filter(r => r.fecha.startsWith(anio + '-' + mesNum));
    
    let html = '<div class="resumen"><h3>✨ Resumen ✨</h3>';
    html += '<div class="resumen-item"><span>Registros encontrados:</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + filtrados.length + '</span></div>';
    
    let totalNoc = 0;
    let festivos = 0;
    let sextos = 0;
    let camion = 0;
    let casa = 0;
    
    filtrados.forEach(r => {
      totalNoc += parseInt(r.nocturnas || 0);
      if(r.festivo) festivos++;
      if(r.sexto) sextos++;
      if(r.dieta_pernocta === 'camion') camion++;
      if(r.dieta_pernocta === 'casa') casa++;
    });
    
    html += '<div class="resumen-item"><span>Horas nocturnas:</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + totalNoc + 'h</span></div>';
    html += '<div class="resumen-item"><span>Días festivos:</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + festivos + '</span></div>';
    html += '<div class="resumen-item"><span>Sextos días:</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + sextos + '</span></div>';
    html += '<div class="resumen-item"><span>Días en camión:</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + camion + '</span></div>';
    html += '<div class="resumen-item"><span>Días en casa:</span> <span style="color: #000; font-weight: bold; font-size: 1.05em;">' + casa + '</span></div>';
    html += '</div>';
    
    document.getElementById('resumen').innerHTML = html;
  };

  // ========== CALENDARIO 26→25 ==========
  
  function obtenerDiasDelCiclo(mesSeleccionado){
    // mesSeleccionado viene en formato "YYYY-MM"
    const [anio, mes] = mesSeleccionado.split('-').map(Number);
    const diaInicio = parseInt(localStorage.getItem('diaInicioCiclo') || '26');
    const diaFin = diaInicio - 1 || 31; // El día anterior al inicio
    
    // Fecha inicio: día configurado del mes ANTERIOR
    let fechaInicio;
    if(mes === 1){
      // Si es enero, el mes anterior es diciembre del año anterior
      fechaInicio = new Date(anio - 1, 11, diaInicio);
    } else {
      fechaInicio = new Date(anio, mes - 2, diaInicio);
    }
    
    // Fecha fin: día anterior al inicio del mes seleccionado
    const fechaFin = new Date(anio, mes - 1, diaFin);
    
    // Generar array de días
    const dias = [];
    const fechaActual = new Date(fechaInicio);
    
    while(fechaActual <= fechaFin){
      dias.push(new Date(fechaActual));
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
    
    return dias;
  }
  
  function obtenerRegistrosDelDia(fecha){
    // Formatear fecha como YYYY-MM-DD
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const fechaStr = `${anio}-${mes}-${dia}`;
    
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    const registroManual = registros.find(r => r.fecha === fechaStr);
    const registrosCronoDelDia = registrosCrono.filter(rc => rc.fecha === fechaStr);
    
    // Solo contar como "trabajo" si hay registros de tipo trabajo o datos manuales
    const tieneTrabajosCrono = registrosCronoDelDia.some(rc => rc.tipo === 'trabajo');
    const tieneDatosManual = registroManual !== undefined;
    
    return {
      fecha: fechaStr,
      datosManual: registroManual || null,
      datosCrono: registrosCronoDelDia,
      tieneDatos: tieneDatosManual || tieneTrabajosCrono
    };
  }
  
  function generarCalendario26_25(mesSeleccionado){
    const dias = obtenerDiasDelCiclo(mesSeleccionado);
    const [anio, mes] = mesSeleccionado.split('-').map(Number);
    
    // Nombres de los meses
    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    // Calcular mes anterior para el título
    let mesAnterior, anioMesAnterior;
    if(mes === 1){
      mesAnterior = 12;
      anioMesAnterior = anio - 1;
    } else {
      mesAnterior = mes - 1;
      anioMesAnterior = anio;
    }
    
    let html = '<div class="calendario-container">';
    const diaInicio = parseInt(localStorage.getItem('diaInicioCiclo') || '26');
    const diaFin = diaInicio - 1 || 31;
    html += `<div class="calendario-header">📅 ${nombresMeses[mesAnterior - 1]} ${diaInicio} → ${nombresMeses[mes - 1]} ${diaFin} (${anio})</div>`;
    
    // Grid del calendario
    html += '<div class="calendario-grid">';
    
    // Headers de días de la semana (empezando por Lunes)
    const diasSemana = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
    diasSemana.forEach(dia => {
      html += `<div class="calendario-dia-header">${dia}</div>`;
    });
    
    // Calcular el día de la semana del primer día (0 = Domingo, 1 = Lunes, etc.)
    // Necesitamos ajustar para que Lunes sea 0
    let primerDiaSemana = dias[0].getDay();
    primerDiaSemana = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1; // Ajustar: Domingo (0) -> 6, Lunes (1) -> 0, etc.
    
    // Agregar celdas vacías al inicio
    for(let i = 0; i < primerDiaSemana; i++){
      html += '<div class="calendario-dia vacio"></div>';
    }
    
    // Contadores para estadísticas
    let diasTrabajados = 0;
    let diasDescanso = 0;
    
    // Agregar los días del ciclo
    dias.forEach(fecha => {
      const registro = obtenerRegistrosDelDia(fecha);
      const clase = registro.tieneDatos ? 'trabajo' : 'descanso';
      const diaNum = fecha.getDate();
      const mesCorto = nombresMeses[fecha.getMonth()].substring(0, 3).toUpperCase();
      const fechaStr = registro.fecha;
      
      if(registro.tieneDatos){
        diasTrabajados++;
      } else {
        diasDescanso++;
      }
      
      html += `<div class="calendario-dia ${clase}" data-fecha="${fechaStr}" onclick="mostrarDetalleCalendario('${fechaStr}')">
        <span class="dia-numero">${diaNum}</span>
        <span class="dia-mes">${mesCorto}</span>
      </div>`;
    });
    
    html += '</div>'; // Cerrar grid
    
    // Estadísticas
    html += '<div class="calendario-stats">';
    html += `<div class="stat-box">
      <div class="stat-numero">${diasTrabajados}</div>
      <div class="stat-label">🔧 Días Trabajados</div>
    </div>`;
    html += `<div class="stat-box">
      <div class="stat-numero">${diasDescanso}</div>
      <div class="stat-label">😴 Días de Descanso</div>
    </div>`;
    html += '</div>';
    
    html += '</div>'; // Cerrar container
    
    return html;
  }
  
  // Variable global para almacenar la fecha actual en edición
  let fechaEnEdicion = null;
  
  // Función para generar HTML de edición de sesiones de trabajo
  function generarEdicionSesionesTrabajo(datosCrono, fechaStr){
    const trabajo = datosCrono ? datosCrono.filter(c => c.tipo === 'trabajo') : [];
    let html = '';
    
    html += '<div class="edicion-seccion" id="seccion-trabajo">';
    html += '<div class="edicion-seccion-titulo">🔧 Sesiones de Trabajo</div>';
    
    if(trabajo.length > 0){
      trabajo.forEach((crono, idx) => {
        const horaInicioVal = crono.horaInicio ? crono.horaInicio.substring(0, 5) : '00:00';
        const horaFinVal = crono.horaFin ? crono.horaFin.substring(0, 5) : '00:00';
        
        html += `<div class="sesion-edicion" data-sesion-idx="${idx}" data-tipo="trabajo" data-existente="true">`;
        html += `<div class="sesion-edicion-header">
          <span class="sesion-edicion-titulo">Sesión ${idx + 1}</span>
          <button type="button" class="btn-eliminar-sesion" onclick="eliminarSesion(this, 'trabajo')" title="Eliminar sesión">🗑️</button>
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Hora inicio:</span>
          <input type="time" class="edicion-input edicion-hora-inicio" value="${horaInicioVal}" data-idx="${idx}" onchange="recalcularSesion(this, '${fechaStr}')">
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Hora fin:</span>
          <input type="time" class="edicion-input edicion-hora-fin" value="${horaFinVal}" data-idx="${idx}" onchange="recalcularSesion(this, '${fechaStr}')">
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Horas trabajadas:</span>
          <span class="edicion-valor-auto" id="horas-trabajo-${idx}">${formatearHorasDecimal(crono.tiempo)}</span>
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Horas nocturnas:</span>
          <span class="edicion-valor-auto" id="horas-nocturnas-${idx}">${formatearHorasDecimal(crono.horasNocturnas || 0)}</span>
        </div>`;
        
        html += '</div>';
      });
    } else {
      html += '<div class="mensaje-sin-sesiones" id="msg-sin-trabajo">No hay sesiones de trabajo registradas</div>';
    }
    
    // Contenedor para nuevas sesiones
    html += '<div id="nuevas-sesiones-trabajo"></div>';
    
    // Botón para añadir nueva sesión
    html += `<button type="button" class="btn-nueva-sesion" onclick="agregarNuevaSesionTrabajo('${fechaStr}')">
      <span>➕</span> Añadir Sesión de Trabajo
    </button>`;
    
    html += '</div>';
    
    return html;
  }
  
  // Función para generar HTML de edición de sesiones de descanso (solo visualización, se calcula automático)
  function generarEdicionSesionesDescanso(datosCrono, fechaStr){
    const descanso = datosCrono ? datosCrono.filter(c => c.tipo === 'descanso') : [];
    let html = '';
    
    if(descanso.length > 0){
      html += '<div class="edicion-seccion" id="seccion-descanso">';
      html += '<div class="edicion-seccion-titulo">🛏️ Descansos (automático)</div>';
      html += '<div class="mensaje-info-descanso">El descanso se calcula automáticamente entre sesiones de trabajo</div>';
      
      descanso.forEach((crono, idx) => {
        html += `<div class="sesion-edicion sesion-descanso-readonly" data-sesion-idx="${idx}" data-tipo="descanso">`;
        html += `<div class="sesion-edicion-titulo">Descanso ${idx + 1}</div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Inicio:</span>
          <span class="edicion-valor-auto">${crono.horaInicio || '--:--'}</span>
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Fin:</span>
          <span class="edicion-valor-auto">${crono.horaFin || '--:--'}</span>
        </div>`;
        
        html += `<div class="edicion-fila">
          <span class="edicion-label">Duración:</span>
          <span class="edicion-valor-auto">${formatearHorasDecimal(crono.tiempo)}</span>
        </div>`;
        
        html += '</div>';
      });
      
      html += '</div>';
    }
    
    return html;
  }
  
  // Función para generar HTML de edición de datos manuales
  function generarEdicionDatosManuales(datosManual){
    let html = '<div class="edicion-seccion">';
    html += '<div class="edicion-seccion-titulo">📝 Datos Manuales</div>';
    
    const dietaValor = datosManual ? datosManual.dieta_pernocta : 'casa';
    const festivoValor = datosManual ? datosManual.festivo : false;
    const sextoValor = datosManual ? datosManual.sexto : false;
    
    html += `<div class="edicion-fila">
      <span class="edicion-label">Dieta pernocta:</span>
      <select class="edicion-select" id="edicion-dieta">
        <option value="casa" ${dietaValor === 'casa' ? 'selected' : ''}>En casa</option>
        <option value="camion" ${dietaValor === 'camion' ? 'selected' : ''}>En camión</option>
      </select>
    </div>`;
    
    html += `<div class="edicion-fila">
      <label class="edicion-checkbox-container">
        <input type="checkbox" class="edicion-checkbox" id="edicion-festivo" ${festivoValor ? 'checked' : ''}>
        <span>🎉 Festivo</span>
      </label>
    </div>`;
    
    html += `<div class="edicion-fila">
      <label class="edicion-checkbox-container">
        <input type="checkbox" class="edicion-checkbox" id="edicion-sexto" ${sextoValor ? 'checked' : ''}>
        <span>6️⃣ Sexto día consecutivo</span>
      </label>
    </div>`;
    
    html += '</div>';
    return html;
  }
  
  // Función para recalcular sesión de trabajo
  window.recalcularSesion = function(input, fechaStr){
    const idx = input.dataset.idx;
    const container = input.closest('.sesion-edicion');
    const horaInicio = container.querySelector('.edicion-hora-inicio').value;
    const horaFin = container.querySelector('.edicion-hora-fin').value;
    
    if(horaInicio && horaFin){
      // Crear timestamps para calcular
      const fechaBase = new Date(fechaStr + 'T00:00:00');
      let timestampInicio = new Date(fechaStr + 'T' + horaInicio + ':00').getTime();
      let timestampFin = new Date(fechaStr + 'T' + horaFin + ':00').getTime();
      
      // Si la hora fin es menor que inicio, asumimos que es del día siguiente
      if(timestampFin <= timestampInicio){
        timestampFin += 24 * 60 * 60 * 1000;
      }
      
      const horasTrabajadas = (timestampFin - timestampInicio) / 1000 / 3600;
      const horasNocturnas = calcularHorasNocturnas(timestampInicio, timestampFin);
      
      document.getElementById('horas-trabajo-' + idx).textContent = formatearHorasDecimal(horasTrabajadas);
      document.getElementById('horas-nocturnas-' + idx).textContent = formatearHorasDecimal(horasNocturnas);
    }
  };
  
  // Contadores para nuevas sesiones
  let contadorNuevasTrabajo = 100;
  
  // Función para agregar nueva sesión de trabajo
  window.agregarNuevaSesionTrabajo = function(fechaStr){
    const contenedor = document.getElementById('nuevas-sesiones-trabajo');
    const msgSin = document.getElementById('msg-sin-trabajo');
    if(msgSin) msgSin.style.display = 'none';
    
    const idx = contadorNuevasTrabajo++;
    
    let html = `<div class="sesion-edicion nueva-sesion" data-sesion-idx="${idx}" data-tipo="trabajo" data-nueva="true">`;
    html += `<div class="sesion-edicion-header">
      <span class="sesion-edicion-titulo">🆕 Nueva Sesión de Trabajo</span>
      <button type="button" class="btn-eliminar-sesion" onclick="eliminarSesion(this, 'trabajo')" title="Eliminar sesión">🗑️</button>
    </div>`;
    
    html += `<div class="edicion-fila">
      <span class="edicion-label">Hora inicio:</span>
      <input type="time" class="edicion-input edicion-hora-inicio" value="08:00" data-idx="${idx}" onchange="recalcularNuevaSesion(this, '${fechaStr}', 'trabajo')">
    </div>`;
    
    html += `<div class="edicion-fila">
      <span class="edicion-label">Hora fin:</span>
      <input type="time" class="edicion-input edicion-hora-fin" value="16:00" data-idx="${idx}" onchange="recalcularNuevaSesion(this, '${fechaStr}', 'trabajo')">
    </div>`;
    
    html += `<div class="edicion-fila">
      <span class="edicion-label">Horas trabajadas:</span>
      <span class="edicion-valor-auto" id="horas-trabajo-${idx}">8.00h</span>
    </div>`;
    
    html += `<div class="edicion-fila">
      <span class="edicion-label">Horas nocturnas:</span>
      <span class="edicion-valor-auto" id="horas-nocturnas-${idx}">0.00h</span>
    </div>`;
    
    html += '</div>';
    
    contenedor.insertAdjacentHTML('beforeend', html);
    
    // Recalcular con valores por defecto
    const nuevoEl = contenedor.lastElementChild;
    recalcularNuevaSesion(nuevoEl.querySelector('.edicion-hora-inicio'), fechaStr, 'trabajo');
  };
  
  // Función para recalcular nueva sesión (solo trabajo)
  window.recalcularNuevaSesion = function(input, fechaStr, tipo){
    const container = input.closest('.sesion-edicion');
    const idx = container.dataset.sesionIdx;
    
    const horaInicio = container.querySelector('.edicion-hora-inicio').value;
    const horaFin = container.querySelector('.edicion-hora-fin').value;
    
    if(horaInicio && horaFin){
      let timestampInicio = new Date(fechaStr + 'T' + horaInicio + ':00').getTime();
      let timestampFin = new Date(fechaStr + 'T' + horaFin + ':00').getTime();
      
      if(timestampFin <= timestampInicio){
        timestampFin += 24 * 60 * 60 * 1000;
      }
      
      const horasTrabajadas = (timestampFin - timestampInicio) / 1000 / 3600;
      const horasNocturnas = calcularHorasNocturnas(timestampInicio, timestampFin);
      
      document.getElementById('horas-trabajo-' + idx).textContent = formatearHorasDecimal(horasTrabajadas);
      document.getElementById('horas-nocturnas-' + idx).textContent = formatearHorasDecimal(horasNocturnas);
    }
  };
  
  // Función para eliminar sesión
  window.eliminarSesion = function(btn, tipo){
    const sesion = btn.closest('.sesion-edicion');
    sesion.classList.add('eliminada');
    sesion.style.display = 'none';
    sesion.dataset.eliminada = 'true';
  };
  
  // Función para guardar edición
  window.guardarEdicionDia = function(fechaStr){
    let registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    
    // 1. Eliminar sesiones marcadas como eliminadas
    const sesionesEliminadas = document.querySelectorAll('.sesion-edicion[data-eliminada="true"][data-existente="true"]');
    sesionesEliminadas.forEach(sesion => {
      const tipo = sesion.dataset.tipo;
      const idx = parseInt(sesion.dataset.sesionIdx);
      const sesionesActuales = registrosCrono.filter(r => r.fecha === fechaStr && r.tipo === tipo);
      
      if(sesionesActuales[idx]){
        const indexOriginal = registrosCrono.findIndex(r => 
          r.fecha === fechaStr && 
          r.tipo === tipo && 
          r.timestampInicio === sesionesActuales[idx].timestampInicio
        );
        if(indexOriginal !== -1){
          registrosCrono.splice(indexOriginal, 1);
        }
      }
    });
    
    // 2. Actualizar sesiones de trabajo existentes (no eliminadas)
    const sesionesTrabajoExistentes = document.querySelectorAll('.sesion-edicion[data-tipo="trabajo"][data-existente="true"]:not([data-eliminada="true"])');
    const trabajoActuales = registrosCrono.filter(r => r.fecha === fechaStr && r.tipo === 'trabajo');
    
    sesionesTrabajoExistentes.forEach((sesion) => {
      const idx = parseInt(sesion.dataset.sesionIdx);
      if(trabajoActuales[idx]){
        const horaInicio = sesion.querySelector('.edicion-hora-inicio').value;
        const horaFin = sesion.querySelector('.edicion-hora-fin').value;
        
        let timestampInicio = new Date(fechaStr + 'T' + horaInicio + ':00').getTime();
        let timestampFin = new Date(fechaStr + 'T' + horaFin + ':00').getTime();
        
        if(timestampFin <= timestampInicio){
          timestampFin += 24 * 60 * 60 * 1000;
        }
        
        const horasTrabajadas = (timestampFin - timestampInicio) / 1000 / 3600;
        const horasNocturnas = calcularHorasNocturnas(timestampInicio, timestampFin);
        
        const indexOriginal = registrosCrono.findIndex(r => 
          r.fecha === fechaStr && 
          r.tipo === 'trabajo' && 
          r.timestampInicio === trabajoActuales[idx].timestampInicio
        );
        
        if(indexOriginal !== -1){
          registrosCrono[indexOriginal].horaInicio = horaInicio + ':00';
          registrosCrono[indexOriginal].horaFin = horaFin + ':00';
          registrosCrono[indexOriginal].tiempo = Math.round(horasTrabajadas * 100) / 100;
          registrosCrono[indexOriginal].horasNocturnas = horasNocturnas;
          registrosCrono[indexOriginal].timestampInicio = timestampInicio;
          registrosCrono[indexOriginal].timestampFin = timestampFin;
        }
      }
    });
    
    // 3. Añadir nuevas sesiones de trabajo
    const nuevasTrabajoUI = document.querySelectorAll('.sesion-edicion[data-tipo="trabajo"][data-nueva="true"]:not([data-eliminada="true"])');
    nuevasTrabajoUI.forEach(sesion => {
      const horaInicio = sesion.querySelector('.edicion-hora-inicio').value;
      const horaFin = sesion.querySelector('.edicion-hora-fin').value;
      
      if(horaInicio && horaFin){
        let timestampInicio = new Date(fechaStr + 'T' + horaInicio + ':00').getTime();
        let timestampFin = new Date(fechaStr + 'T' + horaFin + ':00').getTime();
        
        if(timestampFin <= timestampInicio){
          timestampFin += 24 * 60 * 60 * 1000;
        }
        
        const horasTrabajadas = (timestampFin - timestampInicio) / 1000 / 3600;
        const horasNocturnas = calcularHorasNocturnas(timestampInicio, timestampFin);
        
        registrosCrono.push({
          fecha: fechaStr,
          tipo: 'trabajo',
          tiempo: Math.round(horasTrabajadas * 100) / 100,
          timestamp: Date.now(),
          horaInicio: horaInicio + ':00',
          horaFin: horaFin + ':00',
          timestampInicio: timestampInicio,
          timestampFin: timestampFin,
          horasNocturnas: horasNocturnas
        });
      }
    });
    
    // 4. Los descansos ya no se editan manualmente - se calculan automáticamente
    // Solo mantenemos los descansos existentes sin modificar
    
    // 5. Actualizar datos manuales
    const dieta = document.getElementById('edicion-dieta').value;
    const festivo = document.getElementById('edicion-festivo').checked;
    const sexto = document.getElementById('edicion-sexto').checked;
    
    const indexManual = registros.findIndex(r => r.fecha === fechaStr);
    
    // Recalcular horas nocturnas totales del día
    const trabajosDelDia = registrosCrono.filter(r => r.fecha === fechaStr && r.tipo === 'trabajo');
    const totalNocturnas = trabajosDelDia.reduce((sum, r) => sum + (r.horasNocturnas || 0), 0);
    
    if(indexManual !== -1){
      registros[indexManual].dieta_pernocta = dieta;
      registros[indexManual].festivo = festivo;
      registros[indexManual].sexto = sexto;
      registros[indexManual].nocturnas = Math.round(totalNocturnas * 100) / 100;
    } else {
      registros.push({
        fecha: fechaStr,
        nocturnas: Math.round(totalNocturnas * 100) / 100,
        dieta_pernocta: dieta,
        festivo: festivo,
        sexto: sexto
      });
    }
    
    // 7. Guardar todo
    localStorage.setItem('registrosCrono', JSON.stringify(registrosCrono));
    localStorage.setItem('registros', JSON.stringify(registros));
    
    // 8. Actualizar interfaz
    actualizarDisplayNocturnas();
    cargarHistorial();
    
    document.getElementById('modalDetalleCalendario').classList.remove('active');
    
    const mesSeleccionado = document.getElementById('mesResumenReal').value;
    if(mesSeleccionado){
      const calendarioHTML = generarCalendario26_25(mesSeleccionado);
      document.getElementById('resumenRealResultado').innerHTML = calendarioHTML;
    }
    
    alert('✅ Datos guardados correctamente');
  };
  
  // Función global para mostrar detalle del calendario
  window.mostrarDetalleCalendario = function(fechaStr){
    fechaEnEdicion = fechaStr;
    const fecha = new Date(fechaStr + 'T00:00:00');
    const registro = obtenerRegistrosDelDia(fecha);
    
    const fechaFormateada = fecha.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    document.getElementById('detalleFechaCalendario').textContent = `📅 ${fechaFormateada}`;
    
    let html = '';
    
    if(!registro.tieneDatos){
      html = '<div class="detalle-seccion">';
      html += '<div class="detalle-seccion-titulo">😴 Día de Descanso</div>';
      html += '<div class="detalle-dato">';
      html += '<span class="detalle-dato-valor">No hay registros para este día. ¡Disfrute de la vida!</span>';
      html += '</div>';
      html += '</div>';
    } else {
      // Sección de cronómetro
      if(registro.datosCrono && registro.datosCrono.length > 0){
        html += '<div class="detalle-seccion">';
        html += '<div class="detalle-seccion-titulo">⏱️ Registro del Cronómetro</div>';
        
        const trabajo = registro.datosCrono.filter(c => c.tipo === 'trabajo');
        const descanso = registro.datosCrono.filter(c => c.tipo === 'descanso');
        
        if(trabajo.length > 0){
          let totalNocturnas = 0;
          trabajo.forEach((crono, idx) => {
            if(trabajo.length > 1){
              html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
                <span class="detalle-dato-label">🔧 Sesión de Trabajo ${idx + 1}</span>
              </div>`;
            }
            if(crono.horaInicio){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🔧 Hora de inicio:</span>
                <span class="detalle-dato-valor">${crono.horaInicio}</span>
              </div>`;
            }
            if(crono.horaFin){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🔧 Hora de fin:</span>
                <span class="detalle-dato-valor">${crono.horaFin}</span>
              </div>`;
            }
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🔧 Horas trabajadas:</span>
              <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
            </div>`;
            if(crono.horasNocturnas !== undefined && crono.horasNocturnas > 0){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🌙 Horas nocturnas:</span>
                <span class="detalle-dato-valor">${formatearHorasDecimal(crono.horasNocturnas)}</span>
              </div>`;
              totalNocturnas += crono.horasNocturnas;
            }
          });
          
          const totalTrabajo = trabajo.reduce((sum, rc) => sum + rc.tiempo, 0);
          if(trabajo.length > 1){
            html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
              <span class="detalle-dato-label">🔧 TOTAL TRABAJADAS:</span>
              <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalTrabajo)}</span>
            </div>`;
            if(totalNocturnas > 0){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🌙 TOTAL NOCTURNAS:</span>
                <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalNocturnas)}</span>
              </div>`;
            }
          }
        }
        
        if(descanso.length > 0){
          html += `<div style="height: 20px;"></div>`;
          descanso.forEach((crono, idx) => {
            if(descanso.length > 1){
              html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
                <span class="detalle-dato-label">🛏️ Sesión de Descanso ${idx + 1}</span>
              </div>`;
            }
            if(crono.horaInicio){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🛏️ Hora de inicio:</span>
                <span class="detalle-dato-valor">${crono.horaInicio}</span>
              </div>`;
            }
            if(crono.horaFin){
              html += `<div class="detalle-dato">
                <span class="detalle-dato-label">🛏️ Hora de fin:</span>
                <span class="detalle-dato-valor">${crono.horaFin}</span>
              </div>`;
            }
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🛏️ Horas descansadas:</span>
              <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
            </div>`;
          });
          
          const totalDescanso = descanso.reduce((sum, rc) => sum + rc.tiempo, 0);
          if(descanso.length > 1){
            html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
              <span class="detalle-dato-label">🛏️ TOTAL DESCANSADAS:</span>
              <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalDescanso)}</span>
            </div>`;
          }
        }
        
        html += '</div>';
      }
      
      // Sección de datos manuales
      if(registro.datosManual){
        html += '<div class="detalle-seccion">';
        html += '<div class="detalle-seccion-titulo">📝 Datos Manuales</div>';
        
        if(registro.datosManual.nocturnas && parseInt(registro.datosManual.nocturnas) > 0){
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🌙 Horas nocturnas:</span>
            <span class="detalle-dato-valor">${registro.datosManual.nocturnas} horas</span>
          </div>`;
        }
        
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">🛏️ Dieta pernocta:</span>
          <span class="detalle-dato-valor">${registro.datosManual.dieta_pernocta === 'camion' ? 'En camión' : 'En casa'}</span>
        </div>`;
        
        if(registro.datosManual.festivo){
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🎉 Festivo:</span>
            <span class="detalle-dato-valor">Sí</span>
          </div>`;
        }
        
        if(registro.datosManual.sexto){
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">⚡ Sexto día consecutivo:</span>
            <span class="detalle-dato-valor">Sí</span>
          </div>`;
        }
        
        html += '</div>';
      }
    }
    
    // Botón para desplegar edición
    html += `<button class="btn-toggle-edicion" id="btnToggleEdicion" onclick="toggleEdicion('${fechaStr}')">
      <span class="flecha">▼</span> Editar Datos
    </button>`;
    
    // Contenedor de edición (oculto por defecto)
    html += `<div class="edicion-container" id="edicionContainer">`;
    
    // Generar formulario de edición - siempre mostrar las secciones
    html += generarEdicionSesionesTrabajo(registro.datosCrono || [], fechaStr);
    html += generarEdicionSesionesDescanso(registro.datosCrono || [], fechaStr);
    html += generarEdicionDatosManuales(registro.datosManual);
    
    // Botón guardar
    html += `<button class="btn-guardar-edicion" onclick="guardarEdicionDia('${fechaStr}')">💾 GUARDAR CAMBIOS</button>`;
    
    html += '</div>';
    
    document.getElementById('detalleContenidoCalendario').innerHTML = html;
    document.getElementById('modalDetalleCalendario').classList.add('active');
  };
  
  // Función para mostrar/ocultar edición
  window.toggleEdicion = function(fechaStr){
    const btn = document.getElementById('btnToggleEdicion');
    const container = document.getElementById('edicionContainer');
    
    btn.classList.toggle('activo');
    container.classList.toggle('visible');
  };
  
  document.getElementById('cerrarDetalleCalendario').onclick = function(){
    document.getElementById('modalDetalleCalendario').classList.remove('active');
  };
  
  document.getElementById('modalDetalleCalendario').onclick = function(e){
    if(e.target === this){
      this.classList.remove('active');
    }
  };
  
  document.getElementById('resumenReal').onclick = function(){
    const mes = document.getElementById('mesResumenReal').value;
    if(!mes){ 
      alert('Selecciona mes'); 
      return; 
    }
    
    const calendarioHTML = generarCalendario26_25(mes);
    document.getElementById('resumenRealResultado').innerHTML = calendarioHTML;
  };

  // FUNCIONALIDAD DE RESUMEN DIARIO (Últimos 10 días)
  document.getElementById('btnMostrarDiarios').onclick = function(){
    cargarUltimosDias();
  };

  function cargarUltimosDias(){
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    const fechasUnicas = new Set();
    const registrosCombinados = [];

    registros.forEach(r => {
      if(!fechasUnicas.has(r.fecha)){
        fechasUnicas.add(r.fecha);
        registrosCombinados.push({
          fecha: r.fecha,
          datosManual: r,
          datosCrono: registrosCrono.filter(rc => rc.fecha === r.fecha)
        });
      }
    });

    registrosCrono.forEach(rc => {
      if(!fechasUnicas.has(rc.fecha)){
        fechasUnicas.add(rc.fecha);
        registrosCombinados.push({
          fecha: rc.fecha,
          datosManual: null,
          datosCrono: registrosCrono.filter(r => r.fecha === rc.fecha)
        });
      }
    });

    registrosCombinados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const ultimos10 = registrosCombinados.slice(0, 10);

    const listaDias = document.getElementById('listaDiasResumen');
    
    if(ultimos10.length === 0){
      listaDias.innerHTML = '<div class="mensaje-vacio">📭 No hay registros para mostrar</div>';
      return;
    }

    listaDias.innerHTML = '';
    
    ultimos10.forEach((reg) => {
      const div = document.createElement('div');
      div.className = 'registro-item';
      
      const fechaFormateada = new Date(reg.fecha + 'T00:00:00').toLocaleDateString('es-ES');
      const trabajo = reg.datosCrono.filter(c => c.tipo === 'trabajo');
      const horasTrabajadas = formatearHorasDecimal(trabajo.reduce((sum, rc) => sum + rc.tiempo, 0));
      
      div.innerHTML = `
        <div class="registro-fecha">📅 ${fechaFormateada}</div>
        <div class="registro-horas">⏱️ ${horasTrabajadas} trabajadas</div>
      `;
      
      div.onclick = () => mostrarDetalleDiario(reg);
      listaDias.appendChild(div);
    });
  }

  function mostrarDetalleDiario(registro){
    const fechaFormateada = new Date(registro.fecha + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('detalleFechaDiario').textContent = `📅 ${fechaFormateada}`;
    
    let html = '';
    
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    const todosCrono = registrosCrono.filter(rc => rc.fecha === registro.fecha);
    
    if(todosCrono && todosCrono.length > 0){
      html += '<div class="detalle-seccion">';
      html += '<div class="detalle-seccion-titulo">⏱️ Registro del Cronómetro</div>';
      
      const trabajo = todosCrono.filter(c => c.tipo === 'trabajo');
      const descanso = todosCrono.filter(c => c.tipo === 'descanso');
      
      if(trabajo.length > 0){
        trabajo.forEach((crono, idx) => {
          if(trabajo.length > 1){
            html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
              <span class="detalle-dato-label">🔧 Sesión de Trabajo ${idx + 1}</span>
            </div>`;
          }
          if(crono.horaInicio){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🔧 Hora de inicio:</span>
              <span class="detalle-dato-valor">${crono.horaInicio}</span>
            </div>`;
          }
          if(crono.horaFin){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🔧 Hora de fin:</span>
              <span class="detalle-dato-valor">${crono.horaFin}</span>
            </div>`;
          }
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🔧 Horas trabajadas:</span>
            <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
          </div>`;
        });
        
        const totalTrabajo = trabajo.reduce((sum, rc) => sum + rc.tiempo, 0);
        if(trabajo.length > 1){
          html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
            <span class="detalle-dato-label">🔧 TOTAL TRABAJADAS:</span>
            <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalTrabajo)}</span>
          </div>`;
        }
      }
      
      if(descanso.length > 0){
        html += `<div style="height: 20px;"></div>`;
        descanso.forEach((crono, idx) => {
          if(descanso.length > 1){
            html += `<div class="detalle-dato" style="margin-top: ${idx > 0 ? '15px' : '0'}; padding-top: ${idx > 0 ? '15px' : '0'}; border-top: ${idx > 0 ? '1px solid rgba(255, 140, 66, 0.2)' : 'none'};">
              <span class="detalle-dato-label">🛏️ Sesión de Descanso ${idx + 1}</span>
            </div>`;
          }
          if(crono.horaInicio){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🛏️ Hora de inicio:</span>
              <span class="detalle-dato-valor">${crono.horaInicio}</span>
            </div>`;
          }
          if(crono.horaFin){
            html += `<div class="detalle-dato">
              <span class="detalle-dato-label">🛏️ Hora de fin:</span>
              <span class="detalle-dato-valor">${crono.horaFin}</span>
            </div>`;
          }
          html += `<div class="detalle-dato">
            <span class="detalle-dato-label">🛏️ Horas descansadas:</span>
            <span class="detalle-dato-valor">${formatearHorasDecimal(crono.tiempo)}</span>
          </div>`;
        });
        
        const totalDescanso = descanso.reduce((sum, rc) => sum + rc.tiempo, 0);
        if(descanso.length > 1){
          html += `<div class="detalle-dato" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 140, 66, 0.3);">
            <span class="detalle-dato-label">🛏️ TOTAL DESCANSADAS:</span>
            <span class="detalle-dato-valor" style="font-size: 1.1em;">${formatearHorasDecimal(totalDescanso)}</span>
          </div>`;
        }
      }
      
      html += '</div>';
    }
    
    if(registro.datosManual){
      html += '<div class="detalle-seccion">';
      html += '<div class="detalle-seccion-titulo">📝 Datos Manuales</div>';
      
      if(registro.datosManual.nocturnas && parseInt(registro.datosManual.nocturnas) > 0){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">🌙 Horas nocturnas:</span>
          <span class="detalle-dato-valor">${registro.datosManual.nocturnas} horas</span>
        </div>`;
      }
      
      html += `<div class="detalle-dato">
        <span class="detalle-dato-label">🛏️ Dieta pernocta:</span>
        <span class="detalle-dato-valor">${registro.datosManual.dieta_pernocta === 'camion' ? 'En camión' : 'En casa'}</span>
      </div>`;
      
      if(registro.datosManual.festivo){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">🎉 Festivo:</span>
          <span class="detalle-dato-valor">Sí</span>
        </div>`;
      }
      
      if(registro.datosManual.sexto){
        html += `<div class="detalle-dato">
          <span class="detalle-dato-label">⚡ Sexto día consecutivo:</span>
          <span class="detalle-dato-valor">Sí</span>
        </div>`;
      }
      
      html += '</div>';
    }
    
    document.getElementById('detalleContenidoDiario').innerHTML = html;
    document.getElementById('modalDetalleDiario').classList.add('active');
  }

  document.getElementById('cerrarDetalleDiario').onclick = function(){
    document.getElementById('modalDetalleDiario').classList.remove('active');
  };

  document.getElementById('modalDetalleDiario').onclick = function(e){
    if(e.target === this){
      this.classList.remove('active');
    }
  };

  cargarHistorial();
  recuperarEstadoCrono();
  actualizarDisplayNocturnas();
  cargarPersonalizacion();

  // ========== NAVEGACIÓN POR PÁGINAS ==========
  function cambiarPagina(idPagina){
    // Ocultar todas las páginas
    document.querySelectorAll('.pagina').forEach(p => p.classList.remove('active'));
    // Mostrar la página seleccionada
    document.getElementById(idPagina).classList.add('active');
    
    // Actualizar botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.nav-btn[data-pagina="${idPagina}"]`).classList.add('active');
    
    // Scroll arriba
    window.scrollTo(0, 0);
    
    // Si es la página de gráficas, actualizar
    if(idPagina === 'paginaGraficas'){
      actualizarGraficas('semana');
    }
  }
  window.cambiarPagina = cambiarPagina;

  // ========== GRÁFICAS ==========
  let chartTrabajo = null;
  let chartDescanso = null;

  // Selector de período
  document.querySelectorAll('.periodo-btn').forEach(btn => {
    btn.addEventListener('click', function(){
      document.querySelectorAll('.periodo-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      actualizarGraficas(this.dataset.periodo);
    });
  });

  function obtenerDatosGrafica(periodo){
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    const ahora = new Date();
    let fechaInicio;
    
    switch(periodo){
      case 'semana':
        fechaInicio = new Date(ahora);
        fechaInicio.setDate(fechaInicio.getDate() - 7);
        break;
      case 'mes':
        fechaInicio = new Date(ahora);
        fechaInicio.setMonth(fechaInicio.getMonth() - 1);
        break;
      case 'anio':
        fechaInicio = new Date(ahora);
        fechaInicio.setFullYear(fechaInicio.getFullYear() - 1);
        break;
      case 'todo':
        fechaInicio = new Date(2020, 0, 1);
        break;
    }
    
    // Filtrar registros por período
    const trabajos = registrosCrono.filter(r => {
      const fecha = new Date(r.fecha);
      return r.tipo === 'trabajo' && fecha >= fechaInicio && fecha <= ahora;
    });
    
    const descansos = registrosCrono.filter(r => {
      const fecha = new Date(r.fecha);
      return r.tipo === 'descanso' && fecha >= fechaInicio && fecha <= ahora;
    });
    
    // Agrupar por día
    const trabajoPorDia = {};
    const descansoPorDia = {};
    
    trabajos.forEach(r => {
      if(!trabajoPorDia[r.fecha]) trabajoPorDia[r.fecha] = 0;
      trabajoPorDia[r.fecha] += r.tiempo;
    });
    
    descansos.forEach(r => {
      if(!descansoPorDia[r.fecha]) descansoPorDia[r.fecha] = 0;
      descansoPorDia[r.fecha] += r.tiempo;
    });
    
    // Convertir a arrays ordenados
    const fechasTrabajo = Object.keys(trabajoPorDia).sort();
    const fechasDescanso = Object.keys(descansoPorDia).sort();
    
    const labelsTrabajo = fechasTrabajo.map(f => {
      const d = new Date(f + 'T00:00:00');
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    });
    
    const labelsDescanso = fechasDescanso.map(f => {
      const d = new Date(f + 'T00:00:00');
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    });
    
    const datosTrabajo = fechasTrabajo.map(f => Math.round(trabajoPorDia[f] * 100) / 100);
    const datosDescanso = fechasDescanso.map(f => Math.round(descansoPorDia[f] * 100) / 100);
    
    // Calcular estadísticas
    const totalTrabajo = datosTrabajo.reduce((a, b) => a + b, 0);
    const totalDescanso = datosDescanso.reduce((a, b) => a + b, 0);
    const promedioTrabajo = datosTrabajo.length > 0 ? totalTrabajo / datosTrabajo.length : 0;
    const promedioDescanso = datosDescanso.length > 0 ? totalDescanso / datosDescanso.length : 0;
    
    return {
      trabajo: { labels: labelsTrabajo, datos: datosTrabajo, total: totalTrabajo, promedio: promedioTrabajo, dias: fechasTrabajo.length },
      descanso: { labels: labelsDescanso, datos: datosDescanso, total: totalDescanso, promedio: promedioDescanso, dias: fechasDescanso.length }
    };
  }

  function actualizarGraficas(periodo){
    const datos = obtenerDatosGrafica(periodo);
    
    // Actualizar estadísticas
    document.getElementById('totalHorasTrabajo').textContent = formatearHorasCompacto(datos.trabajo.total);
    document.getElementById('promedioTrabajo').textContent = formatearHorasCompacto(datos.trabajo.promedio);
    document.getElementById('diasTrabajados').textContent = datos.trabajo.dias;
    
    document.getElementById('totalHorasDescanso').textContent = formatearHorasCompacto(datos.descanso.total);
    document.getElementById('promedioDescanso').textContent = formatearHorasCompacto(datos.descanso.promedio);
    document.getElementById('diasDescanso').textContent = datos.descanso.dias;
    
    // Destruir gráficas anteriores
    if(chartTrabajo) chartTrabajo.destroy();
    if(chartDescanso) chartDescanso.destroy();
    
    // Crear gráfica de trabajo
    const ctxTrabajo = document.getElementById('graficaTrabajo').getContext('2d');
    chartTrabajo = new Chart(ctxTrabajo, {
      type: 'line',
      data: {
        labels: datos.trabajo.labels,
        datasets: [{
          label: 'Horas Trabajadas',
          data: datos.trabajo.datos,
          borderColor: '#ff8c42',
          backgroundColor: 'rgba(255, 140, 66, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#ff8c42',
          pointBorderColor: '#fff',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 140, 66, 0.1)' },
            ticks: { color: '#e0e0e0' }
          },
          x: {
            grid: { color: 'rgba(255, 140, 66, 0.1)' },
            ticks: { color: '#e0e0e0', maxRotation: 45 }
          }
        }
      }
    });
    
    // Crear gráfica de descanso
    const ctxDescanso = document.getElementById('graficaDescanso').getContext('2d');
    chartDescanso = new Chart(ctxDescanso, {
      type: 'line',
      data: {
        labels: datos.descanso.labels,
        datasets: [{
          label: 'Horas de Descanso',
          data: datos.descanso.datos,
          borderColor: '#66BB6A',
          backgroundColor: 'rgba(102, 187, 106, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#66BB6A',
          pointBorderColor: '#fff',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(102, 187, 106, 0.1)' },
            ticks: { color: '#e0e0e0' }
          },
          x: {
            grid: { color: 'rgba(102, 187, 106, 0.1)' },
            ticks: { color: '#e0e0e0', maxRotation: 45 }
          }
        }
      }
    });
  }

  // ========== AJUSTES - PERSONALIZACIÓN ==========
  document.getElementById('colorPrincipal').addEventListener('input', function(){
    document.getElementById('colorPrincipalHex').textContent = this.value;
  });
  
  document.getElementById('tamanoTexto').addEventListener('input', function(){
    document.getElementById('tamanoTextoValor').textContent = this.value + 'px';
  });

  function aplicarPersonalizacion(){
    const color = document.getElementById('colorPrincipal').value;
    const tamano = document.getElementById('tamanoTexto').value;
    const fuente = document.getElementById('fuenteTexto').value;
    
    // Guardar en localStorage
    localStorage.setItem('personalizacion', JSON.stringify({ color, tamano, fuente }));
    
    // Aplicar estilos
    document.documentElement.style.setProperty('--color-principal', color);
    document.body.style.fontSize = tamano + 'px';
    document.body.style.fontFamily = fuente;
    
    alert('✨ Personalización aplicada');
  }
  window.aplicarPersonalizacion = aplicarPersonalizacion;

  function resetearPersonalizacion(){
    localStorage.removeItem('personalizacion');
    document.getElementById('colorPrincipal').value = '#ff8c42';
    document.getElementById('colorPrincipalHex').textContent = '#ff8c42';
    document.getElementById('tamanoTexto').value = '16';
    document.getElementById('tamanoTextoValor').textContent = '16px';
    document.getElementById('fuenteTexto').value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    
    document.body.style.fontSize = '';
    document.body.style.fontFamily = '';
    
    alert('🔄 Personalización restaurada');
  }
  window.resetearPersonalizacion = resetearPersonalizacion;

  function cargarPersonalizacion(){
    const guardado = localStorage.getItem('personalizacion');
    if(guardado){
      const { color, tamano, fuente } = JSON.parse(guardado);
      
      document.getElementById('colorPrincipal').value = color;
      document.getElementById('colorPrincipalHex').textContent = color;
      document.getElementById('tamanoTexto').value = tamano;
      document.getElementById('tamanoTextoValor').textContent = tamano + 'px';
      document.getElementById('fuenteTexto').value = fuente;
      
      document.body.style.fontSize = tamano + 'px';
      document.body.style.fontFamily = fuente;
    }
  }

  // ========== AJUSTES - EXPORTAR DATOS ==========
  function exportarDatos(tipo){
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    let datosExportar = { registros: [], registrosCrono: [] };
    let nombreArchivo = 'regyster_';
    
    if(tipo === 'mes'){
      const mesSeleccionado = document.getElementById('mesExportar').value;
      if(!mesSeleccionado){
        alert('⚠️ Selecciona un mes para exportar');
        return;
      }
      
      datosExportar.registros = registros.filter(r => r.fecha.startsWith(mesSeleccionado));
      datosExportar.registrosCrono = registrosCrono.filter(r => r.fecha.startsWith(mesSeleccionado));
      nombreArchivo += mesSeleccionado;
    } else {
      datosExportar.registros = registros;
      datosExportar.registrosCrono = registrosCrono;
      nombreArchivo += 'completo_' + new Date().toISOString().split('T')[0];
    }
    
    // Añadir metadatos
    datosExportar.metadata = {
      exportadoEl: new Date().toISOString(),
      version: '2.0',
      totalRegistros: datosExportar.registros.length,
      totalCrono: datosExportar.registrosCrono.length
    };
    
    // Calcular resúmenes
    const trabajos = datosExportar.registrosCrono.filter(r => r.tipo === 'trabajo');
    const descansos = datosExportar.registrosCrono.filter(r => r.tipo === 'descanso');
    
    const totalTrabajo = trabajos.reduce((sum, r) => sum + r.tiempo, 0);
    const totalDescanso = descansos.reduce((sum, r) => sum + r.tiempo, 0);
    const totalNocturnas = trabajos.reduce((sum, r) => sum + (r.horasNocturnas || 0), 0);
    
    datosExportar.resumen = {
      totalHorasTrabajo: formatearHorasDecimal(totalTrabajo),
      totalHorasTrabajoDecimal: totalTrabajo.toFixed(2),
      totalHorasDescanso: formatearHorasDecimal(totalDescanso),
      totalHorasDescansoDecimal: totalDescanso.toFixed(2),
      totalHorasNocturnas: formatearHorasDecimal(totalNocturnas),
      totalHorasNocturnasDecimal: totalNocturnas.toFixed(2),
      diasTrabajados: new Set(trabajos.map(r => r.fecha)).size,
      diasDescanso: new Set(descansos.map(r => r.fecha)).size,
      diasFestivos: datosExportar.registros.filter(r => r.festivo).length,
      diasSexto: datosExportar.registros.filter(r => r.sexto).length,
      diasCamion: datosExportar.registros.filter(r => r.dieta_pernocta === 'camion').length,
      diasCasa: datosExportar.registros.filter(r => r.dieta_pernocta === 'casa').length
    };
    
    // Crear archivo y descargar
    const blob = new Blob([JSON.stringify(datosExportar, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Datos exportados correctamente');
  }
  window.exportarDatos = exportarDatos;

  // ========== EXPORTAR A PDF ==========
  function exportarPDF(tipo){
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');

    let registrosFiltrados = [];
    let registrosCronoFiltrados = [];
    let nombreArchivo = 'regyster_';
    let tituloDocumento = '';

    if(tipo === 'mes'){
      const mesSeleccionado = document.getElementById('mesExportar').value;
      if(!mesSeleccionado){
        alert('⚠️ Selecciona un mes para exportar');
        return;
      }

      registrosFiltrados = registros.filter(r => r.fecha.startsWith(mesSeleccionado));
      registrosCronoFiltrados = registrosCrono.filter(r => r.fecha.startsWith(mesSeleccionado));
      nombreArchivo += mesSeleccionado;

      // Formatear mes para el título
      const [year, month] = mesSeleccionado.split('-');
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      tituloDocumento = `Registro de ${meses[parseInt(month)-1]} ${year}`;
    } else {
      registrosFiltrados = registros;
      registrosCronoFiltrados = registrosCrono;
      nombreArchivo += 'completo_' + new Date().toISOString().split('T')[0];
      tituloDocumento = 'Registro Completo de Trabajo';
    }

    // Validar que haya datos para exportar
    if(registrosCronoFiltrados.length === 0 && registrosFiltrados.length === 0){
      alert('⚠️ No hay registros para exportar en el período seleccionado');
      return;
    }

    // Calcular resúmenes
    const trabajos = registrosCronoFiltrados.filter(r => r.tipo === 'trabajo');
    const descansos = registrosCronoFiltrados.filter(r => r.tipo === 'descanso');

    const totalTrabajo = trabajos.reduce((sum, r) => sum + r.tiempo, 0);
    const totalDescanso = descansos.reduce((sum, r) => sum + r.tiempo, 0);
    const totalNocturnas = trabajos.reduce((sum, r) => sum + (r.horasNocturnas || 0), 0);

    // Crear contenido HTML para el PDF
    let htmlContent = `
<div id="pdf-content" style="font-family: Arial, sans-serif; padding: 20px; background: white; color: #000;">
  <div style="text-align: center; margin-bottom: 25px; border-bottom: 3px solid #ff8c42; padding-bottom: 15px;">
    <h1 style="color: #ff8c42; font-size: 24px; margin-bottom: 8px;">📊 ${tituloDocumento}</h1>
    <p style="color: #666; font-size: 11px;">Generado el ${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las ${new Date().toLocaleTimeString('es-ES')}</p>
  </div>

  <div style="background: #f5f5f5; border: 2px solid #ff8c42; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
    <h2 style="color: #ff8c42; font-size: 18px; margin-bottom: 12px; text-align: center;">📈 Resumen Global</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">⏰ Horas de Trabajo</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${formatearHorasDecimal(totalTrabajo)}</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">💤 Horas de Descanso</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${formatearHorasDecimal(totalDescanso)}</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">🌙 Horas Nocturnas</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${formatearHorasDecimal(totalNocturnas)}</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">📅 Días Trabajados</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${new Set(trabajos.map(r => r.fecha)).size} días</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">🎉 Días Festivos</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${registrosFiltrados.filter(r => r.festivo).length} días</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">📆 Sextos Días</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${registrosFiltrados.filter(r => r.sexto).length} días</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">🚛 Pernoctas Camión</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${registrosFiltrados.filter(r => r.dieta_pernocta === 'camion').length} días</span>
      </div>
      <div style="background: white; padding: 10px; border-left: 4px solid #ff8c42; border-radius: 4px;">
        <strong style="color: #ff8c42; display: block; margin-bottom: 4px; font-size: 11px;">🏠 Pernoctas Casa</strong>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${registrosFiltrados.filter(r => r.dieta_pernocta === 'casa').length} días</span>
      </div>
    </div>
  </div>
`;

    // Registros cronómetro agrupados por fecha
    if(registrosCronoFiltrados.length > 0){
      htmlContent += `
  <div style="margin-bottom: 25px;">
    <h3 style="color: #ff8c42; font-size: 16px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #ff8c42;">⏱️ Registros de Cronómetro</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
      <thead>
        <tr>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Fecha</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Tipo</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Hora Inicio</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Hora Fin</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Duración</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Nocturnas</th>
        </tr>
      </thead>
      <tbody>
`;

      // Ordenar por fecha descendente
      registrosCronoFiltrados.sort((a, b) => b.fecha.localeCompare(a.fecha) || b.horaInicio.localeCompare(a.horaInicio));

      registrosCronoFiltrados.forEach((r, index) => {
        const fechaFormateada = new Date(r.fecha + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short' });
        const bgColor = index % 2 === 0 ? '#f9f9f9' : 'white';
        const badgeColor = r.tipo === 'trabajo' ? '#4CAF50' : '#2196F3';
        const badgeText = r.tipo === 'trabajo' ? '⏰ TRABAJO' : '💤 DESCANSO';

        htmlContent += `
        <tr style="background: ${bgColor};">
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${fechaFormateada}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;"><span style="display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 9px; font-weight: bold; background: ${badgeColor}; color: white;">${badgeText}</span></td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.horaInicio}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.horaFin}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;"><strong>${formatearHorasDecimal(r.tiempo)}</strong></td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.horasNocturnas ? formatearHorasDecimal(r.horasNocturnas) : '-'}</td>
        </tr>
`;
      });

      htmlContent += `
      </tbody>
    </table>
  </div>
`;
    }

    // Registros manuales
    if(registrosFiltrados.length > 0){
      htmlContent += `
  <div style="margin-bottom: 25px;">
    <h3 style="color: #ff8c42; font-size: 16px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #ff8c42;">📝 Registros Manuales</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
      <thead>
        <tr>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Fecha</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Pernocta/Dieta</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Festivo</th>
          <th style="background: #ff8c42; color: white; padding: 8px; text-align: left; font-size: 11px;">Sexto Día</th>
        </tr>
      </thead>
      <tbody>
`;

      // Ordenar por fecha descendente
      registrosFiltrados.sort((a, b) => b.fecha.localeCompare(a.fecha));

      registrosFiltrados.forEach((r, index) => {
        const fechaFormateada = new Date(r.fecha + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
        const bgColor = index % 2 === 0 ? '#f9f9f9' : 'white';

        htmlContent += `
        <tr style="background: ${bgColor};">
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${fechaFormateada}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.dieta_pernocta === 'camion' ? '🚛 Camión' : (r.dieta_pernocta === 'casa' ? '🏠 Casa' : '-')}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.festivo ? '✅ Sí' : '-'}</td>
          <td style="padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px;">${r.sexto ? '✅ Sí' : '-'}</td>
        </tr>
`;
      });

      htmlContent += `
      </tbody>
    </table>
  </div>
`;
    }

    htmlContent += `
  <div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 2px solid #ddd; color: #666; font-size: 10px;">
    <p><strong>Regyster</strong> - Sistema de Registro de Trabajo v2.0</p>
    <p>Documento generado automáticamente - Todos los derechos reservados</p>
  </div>
</div>
`;

    // Crear elemento temporal en el DOM
    const elemento = document.createElement('div');
    elemento.innerHTML = htmlContent;
    elemento.style.position = 'absolute';
    elemento.style.left = '-9999px';
    document.body.appendChild(elemento);

    // Mostrar mensaje de generación
    const loadingMsg = document.createElement('div');
    loadingMsg.textContent = '📄 Generando PDF...';
    loadingMsg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ff8c42; color: white; padding: 20px 40px; border-radius: 10px; font-size: 18px; font-weight: bold; z-index: 10000; box-shadow: 0 4px 20px rgba(0,0,0,0.3);';
    document.body.appendChild(loadingMsg);

    // Detectar si es móvil
    const esMobil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const esIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Configuración de html2pdf
    const opciones = {
      margin: 10,
      filename: nombreArchivo + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: esMobil ? 1.5 : 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generar PDF
    html2pdf().set(opciones).from(elemento.querySelector('#pdf-content')).outputPdf('blob').then((pdfBlob) => {
      // Limpiar elemento temporal
      document.body.removeChild(elemento);

      // Crear blob con tipo correcto
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const nombreCompleto = nombreArchivo + '.pdf';

      // Si es iOS y soporta Web Share API, ofrecer compartir
      if (esIOS && navigator.share) {
        // Crear File desde Blob para compartir en iOS
        const file = new File([blob], nombreCompleto, { type: 'application/pdf' });

        navigator.share({
          title: 'Regyster - ' + tituloDocumento,
          text: 'Exportación de registros de trabajo',
          files: [file]
        }).then(() => {
          document.body.removeChild(loadingMsg);
          console.log('PDF compartido correctamente');
        }).catch((error) => {
          // Si falla compartir, intentar descarga normal
          console.log('No se pudo compartir, descargando...', error);
          descargarPDF(url, nombreCompleto);
        });
      } else {
        // Descarga normal para Android y escritorio
        descargarPDF(url, nombreCompleto);
      }

      // Función auxiliar para descargar
      function descargarPDF(url, nombre) {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = nombre;
        document.body.appendChild(a);
        a.click();

        // Limpiar
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          document.body.removeChild(loadingMsg);

          // Mensaje específico según plataforma
          if (esMobil) {
            alert('✅ PDF guardado en Descargas: ' + nombre + '\n\n📁 Revisa la carpeta de Descargas de tu dispositivo.');
          } else {
            alert('✅ PDF exportado correctamente: ' + nombre);
          }
        }, 100);
      }
    }).catch(error => {
      console.error('Error al generar PDF:', error);
      document.body.removeChild(elemento);
      if (document.body.contains(loadingMsg)) {
        document.body.removeChild(loadingMsg);
      }
      alert('❌ Error al generar el PDF. Por favor, inténtalo de nuevo.\n\nDetalles: ' + error.message);
    });
  }
  window.exportarPDF = exportarPDF;

  // ========== AJUSTES - BORRAR DATOS ==========
  function borrarTodosDatos(){
    if(!confirm('⚠️ ¿Estás SEGURO de que quieres borrar TODOS los datos?\n\nEsta acción NO se puede deshacer.')){
      return;
    }
    
    if(!confirm('🚨 ÚLTIMA ADVERTENCIA 🚨\n\n¿Realmente quieres borrar TODO?\n\nEscribe "BORRAR" mentalmente y pulsa Aceptar...')){
      return;
    }
    
    localStorage.removeItem('registros');
    localStorage.removeItem('registrosCrono');
    localStorage.removeItem('estadoCrono');
    
    cargarHistorial();
    actualizarDisplayNocturnas();
    
    alert('🗑️ Todos los datos han sido borrados');
    cambiarPagina('paginaInicio');
  }
  window.borrarTodosDatos = borrarTodosDatos;

  function limpiarCache(){
    if(!confirm('¿Limpiar caché de la aplicación?\n\nLa app se recargará.')){
      return;
    }
    
    if('caches' in window){
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    if('serviceWorker' in navigator){
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
        });
      });
    }
    
    alert('🧹 Caché limpiada. La página se recargará.');
    location.reload(true);
  }
  window.limpiarCache = limpiarCache;

  // ========== NUEVOS AJUSTES - TANDA 1 ==========
  
  // Toggle Modo Claro/Oscuro
  function toggleModoClaro(){
    const toggle = document.getElementById('toggleModoClaro');
    toggle.classList.toggle('activo');
    document.body.classList.toggle('modo-claro');
    
    // Guardar preferencia
    localStorage.setItem('modoClaro', document.body.classList.contains('modo-claro'));
  }
  window.toggleModoClaro = toggleModoClaro;
  
  // Toggle Efectos Neón
  function toggleNeon(){
    const toggle = document.getElementById('toggleNeon');
    toggle.classList.toggle('activo');
    document.body.classList.toggle('neon-off');
    
    // Guardar preferencia (activo = neón encendido)
    localStorage.setItem('neonOff', document.body.classList.contains('neon-off'));
  }
  window.toggleNeon = toggleNeon;
  
  // Cambiar Velocidad de Animaciones
  function cambiarVelocidadAnimaciones(){
    const velocidad = document.getElementById('velocidadAnimaciones').value;
    
    // Quitar todas las clases de animación
    document.body.classList.remove('anim-rapidas', 'anim-lentas', 'anim-off');
    
    // Añadir la clase correspondiente
    if(velocidad === 'rapidas'){
      document.body.classList.add('anim-rapidas');
    } else if(velocidad === 'lentas'){
      document.body.classList.add('anim-lentas');
    } else if(velocidad === 'off'){
      document.body.classList.add('anim-off');
    }
    
    // Guardar preferencia
    localStorage.setItem('velocidadAnimaciones', velocidad);
  }
  window.cambiarVelocidadAnimaciones = cambiarVelocidadAnimaciones;
  
  // Cambiar Formato de Horas
  function cambiarFormatoHoras(){
    const formato = document.getElementById('formatoHoras').value;
    localStorage.setItem('formatoHoras', formato);
    
    // Actualizar displays
    actualizarDisplayNocturnas();
  }
  window.cambiarFormatoHoras = cambiarFormatoHoras;
  
  // Función modificada para formatear horas según preferencia
  window.formatearHorasSegunPreferencia = function(horasDecimal){
    const formato = localStorage.getItem('formatoHoras') || 'tradicional';
    
    if(formato === 'decimal'){
      return horasDecimal.toFixed(2) + 'h';
    } else {
      return formatearHorasDecimal(horasDecimal);
    }
  };
  
  // Cargar ajustes guardados al iniciar
  function cargarAjustesNuevos(){
    // Modo claro
    const modoClaro = localStorage.getItem('modoClaro') === 'true';
    if(modoClaro){
      document.body.classList.add('modo-claro');
      document.getElementById('toggleModoClaro').classList.add('activo');
    }
    
    // Neón
    const neonOff = localStorage.getItem('neonOff') === 'true';
    if(neonOff){
      document.body.classList.add('neon-off');
      document.getElementById('toggleNeon').classList.remove('activo');
    }
    
    // Velocidad animaciones
    const velocidad = localStorage.getItem('velocidadAnimaciones') || 'normales';
    document.getElementById('velocidadAnimaciones').value = velocidad;
    if(velocidad !== 'normales'){
      cambiarVelocidadAnimaciones();
    }
    
    // Formato horas
    const formato = localStorage.getItem('formatoHoras') || 'tradicional';
    document.getElementById('formatoHoras').value = formato;
  }
  
  // Ejecutar al cargar la página
  cargarAjustesNuevos();

  // ========== TANDA 2: HORARIOS Y CICLOS ==========
  
  // Guardar configuración de horarios
  function guardarConfigHorarios(){
    const horaInicio = document.getElementById('horaInicioNocturnas').value;
    const horaFin = document.getElementById('horaFinNocturnas').value;
    const diaInicio = document.getElementById('diaInicioCiclo').value;
    
    localStorage.setItem('horaInicioNocturnas', horaInicio);
    localStorage.setItem('horaFinNocturnas', horaFin);
    localStorage.setItem('diaInicioCiclo', diaInicio);
    
    // Actualizar el display de nocturnas
    actualizarDisplayNocturnas();
  }
  window.guardarConfigHorarios = guardarConfigHorarios;
  
  // Cargar configuración de horarios al iniciar
  function cargarConfigHorarios(){
    const horaInicio = localStorage.getItem('horaInicioNocturnas') || '22';
    const horaFin = localStorage.getItem('horaFinNocturnas') || '6';
    const diaInicio = localStorage.getItem('diaInicioCiclo') || '26';
    
    document.getElementById('horaInicioNocturnas').value = horaInicio;
    document.getElementById('horaFinNocturnas').value = horaFin;
    document.getElementById('diaInicioCiclo').value = diaInicio;
  }
  cargarConfigHorarios();
  
  // Importar datos desde archivo JSON
  function importarDatos(event){
    const archivo = event.target.files[0];
    if(!archivo){
      return;
    }
    
    if(!archivo.name.endsWith('.json')){
      alert('⚠️ Por favor selecciona un archivo .json válido');
      return;
    }
    
    if(!confirm('⚠️ ATENCIÓN: Esto reemplazará TODOS tus datos actuales.\n\n¿Estás seguro de que quieres continuar?')){
      event.target.value = '';
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e){
      try {
        const datos = JSON.parse(e.target.result);
        
        // Validar estructura del archivo
        if(!datos.registros && !datos.registrosCrono){
          throw new Error('Estructura de archivo inválida');
        }
        
        // Importar registros
        if(datos.registros){
          localStorage.setItem('registros', JSON.stringify(datos.registros));
        }
        
        // Importar registros del cronómetro
        if(datos.registrosCrono){
          localStorage.setItem('registrosCrono', JSON.stringify(datos.registrosCrono));
        }
        
        // Mostrar resumen de importación
        const totalRegistros = datos.registros ? datos.registros.length : 0;
        const totalCrono = datos.registrosCrono ? datos.registrosCrono.length : 0;
        
        alert(`✅ Datos importados correctamente!\n\n📋 Registros manuales: ${totalRegistros}\n⏱️ Registros cronómetro: ${totalCrono}\n\nLa página se recargará para aplicar los cambios.`);
        
        // Recargar página
        location.reload();
        
      } catch(error){
        alert('❌ Error al importar: El archivo no tiene un formato válido.\n\nAsegúrate de que sea un archivo exportado desde Regyster.');
        console.error('Error de importación:', error);
      }
    };
    
    reader.onerror = function(){
      alert('❌ Error al leer el archivo');
    };
    
    reader.readAsText(archivo);
    event.target.value = '';
  }
  window.importarDatos = importarDatos;

  // ========== TANDA 3: NOTIFICACIONES Y ALERTAS ==========
  
  // Toggle Vibración
  function toggleVibrar(){
    const toggle = document.getElementById('toggleVibrar');
    toggle.classList.toggle('activo');
    localStorage.setItem('vibrarAlFichar', toggle.classList.contains('activo'));
  }
  window.toggleVibrar = toggleVibrar;
  
  // Toggle Sonido
  function toggleSonido(){
    const toggle = document.getElementById('toggleSonido');
    toggle.classList.toggle('activo');
    localStorage.setItem('sonidoAlFichar', toggle.classList.contains('activo'));
  }
  window.toggleSonido = toggleSonido;
  
  // Toggle Límite de Horas
  function toggleLimiteHoras(){
    const toggle = document.getElementById('toggleLimiteHoras');
    toggle.classList.toggle('activo');
    const activo = toggle.classList.contains('activo');
    localStorage.setItem('limiteHorasActivo', activo);
    document.getElementById('configLimiteHoras').style.display = activo ? 'block' : 'none';
  }
  window.toggleLimiteHoras = toggleLimiteHoras;
  
  function guardarLimiteHoras(){
    const limite = document.getElementById('limiteHorasDiarias').value;
    localStorage.setItem('limiteHorasDiarias', limite);
  }
  window.guardarLimiteHoras = guardarLimiteHoras;
  
  // Toggle Recordatorio
  function toggleRecordatorio(){
    const toggle = document.getElementById('toggleRecordatorio');
    toggle.classList.toggle('activo');
    const activo = toggle.classList.contains('activo');
    localStorage.setItem('recordatorioActivo', activo);
    document.getElementById('configRecordatorio').style.display = activo ? 'block' : 'none';
    
    if(activo){
      iniciarRecordatorio();
    } else {
      detenerRecordatorio();
    }
  }
  window.toggleRecordatorio = toggleRecordatorio;
  
  function guardarRecordatorio(){
    const tiempo = document.getElementById('tiempoRecordatorio').value;
    localStorage.setItem('tiempoRecordatorio', tiempo);
    if(localStorage.getItem('recordatorioActivo') === 'true'){
      iniciarRecordatorio();
    }
  }
  window.guardarRecordatorio = guardarRecordatorio;
  
  // Sistema de recordatorio
  let intervaloRecordatorio = null;
  
  function iniciarRecordatorio(){
    detenerRecordatorio();
    const minutos = parseInt(localStorage.getItem('tiempoRecordatorio') || '60');
    
    intervaloRecordatorio = setInterval(() => {
      // Verificar si hay actividad reciente
      const estadoCrono = JSON.parse(localStorage.getItem('estadoCrono') || '{}');
      const ahora = Date.now();
      
      // Si está trabajando, no mostrar recordatorio
      if(estadoCrono.trabajando) return;
      
      // Si hay un último fin de trabajo, verificar tiempo transcurrido
      if(estadoCrono.ultimoFinTrabajo){
        const tiempoTranscurrido = (ahora - estadoCrono.ultimoFinTrabajo) / 1000 / 60;
        if(tiempoTranscurrido >= minutos){
          mostrarRecordatorio();
        }
      }
    }, 60000); // Verificar cada minuto
  }
  
  function detenerRecordatorio(){
    if(intervaloRecordatorio){
      clearInterval(intervaloRecordatorio);
      intervaloRecordatorio = null;
    }
  }
  
  function mostrarRecordatorio(){
    if('Notification' in window && Notification.permission === 'granted'){
      new Notification('⏰ Regyster - Recordatorio', {
        body: '¿Has empezado a trabajar? No olvides fichar.',
        icon: 'icons/icon-192.png'
      });
    } else {
      // Fallback: vibración si está activa
      if(localStorage.getItem('vibrarAlFichar') === 'true' && navigator.vibrate){
        navigator.vibrate([200, 100, 200, 100, 200]);
      }
    }
  }
  
  // Función para ejecutar al fichar (vibración y sonido)
  function efectosAlFichar(){
    // Vibración
    if(localStorage.getItem('vibrarAlFichar') === 'true' && navigator.vibrate){
      navigator.vibrate(200);
    }
    
    // Sonido
    if(localStorage.getItem('sonidoAlFichar') === 'true'){
      reproducirSonidoFichaje();
    }
  }
  
  // Crear sonido de fichaje
  function reproducirSonidoFichaje(){
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch(e){
      console.log('Audio no disponible');
    }
  }
  
  // Verificar límite de horas
  function verificarLimiteHoras(){
    if(localStorage.getItem('limiteHorasActivo') !== 'true') return;
    
    const limite = parseInt(localStorage.getItem('limiteHorasDiarias') || '10');
    const fechaHoy = new Date().toISOString().split('T')[0];
    const registrosCrono = JSON.parse(localStorage.getItem('registrosCrono') || '[]');
    
    const trabajoHoy = registrosCrono.filter(r => r.fecha === fechaHoy && r.tipo === 'trabajo');
    const horasHoy = trabajoHoy.reduce((sum, r) => sum + r.tiempo, 0);
    
    if(horasHoy >= limite){
      alert(`⚠️ ¡ATENCIÓN!\n\nHas superado el límite de ${limite} horas diarias.\n\nHoras trabajadas hoy: ${formatearHorasDecimal(horasHoy)}\n\n¡Recuerda descansar!`);
      
      if(navigator.vibrate){
