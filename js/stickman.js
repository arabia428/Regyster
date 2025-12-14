/* ========== REGYSTER - STICKMAN ESPÍA (EASTER EGG) ========== */


  // Iniciar el ciclo del stickman espía (cada 15 segundos)
  setInterval(mostrarStickman, 15000);

  // Primera aparición después de 5 segundos
  setTimeout(mostrarStickman, 5000);

  // ========== EASTER EGG - NUESTRA FIRMA SECRETA ==========
  let clicksEasterEgg = 0;
  let timerEasterEgg = null;
  let easterEggActivo = false;
  
  document.getElementById('infoVersion').addEventListener('click', function(e) {
    if(easterEggActivo) return;
    
    clicksEasterEgg++;
    
    if(timerEasterEgg) clearTimeout(timerEasterEgg);
    
    timerEasterEgg = setTimeout(() => {
      clicksEasterEgg = 0;
    }, 1000);
    
    if(clicksEasterEgg >= 4) {
      clicksEasterEgg = 0;
      easterEggActivo = true;
      
      const textoNormal = document.getElementById('textoNormal');
      const textoSecreto = document.getElementById('textoSecreto');
      
      // Glitch out del texto normal
      textoNormal.classList.add('glitch-out');
      
      setTimeout(() => {
        textoNormal.style.display = 'none';
        textoSecreto.style.display = 'block';
        textoSecreto.classList.add('glitch-in');
        
        // Después de 20 segundos, volver al texto normal
        setTimeout(() => {
          textoSecreto.classList.remove('glitch-in');
          textoSecreto.classList.add('glitch-out');
          
          setTimeout(() => {
            textoSecreto.style.display = 'none';
            textoSecreto.classList.remove('glitch-out');
            textoNormal.style.display = 'block';
            textoNormal.classList.remove('glitch-out');
            textoNormal.classList.add('glitch-in');
            
            setTimeout(() => {
              textoNormal.classList.remove('glitch-in');
              easterEggActivo = false;
