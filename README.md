# 🚀 Regyster - Paquete PWA para Google Play

## 📦 Contenido del Paquete

```
regyster-pwa/
├── manifest.json          ← Archivo principal de configuración PWA
├── sw.js                  ← Service Worker mejorado
├── icons/                 ← Iconos en todos los tamaños
│   ├── icon-48x48.png
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-144x144.png
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── icon-512x512-maskable.png
└── screenshots/           ← Carpeta para tus capturas (TÚ las subes)
    └── (vacía - lee instrucciones)
```

---

## 📝 INSTRUCCIONES PASO A PASO

### Paso 1: Preparar las Screenshots

Las capturas de pantalla las tienes que subir tú porque no puedo acceder a tus archivos directamente.

1. Renombra tus capturas a:
   - `screenshot-1.jpg` (pantalla inicio/cronómetro)
   - `screenshot-2.jpg` (calendario)
   - `screenshot-3.jpg` (gráficas)
   - `screenshot-4.jpg` (ajustes)

2. Tamaño recomendado: **1080px de ancho** (el alto puede variar)

---

### Paso 2: Subir Todo a tu Repositorio GitHub

Tu repositorio debe quedar así:

```
Regyster/
├── index.html             ← Tu app (ya lo tienes)
├── manifest.json          ← NUEVO - copia de este paquete
├── sw.js                  ← NUEVO - copia de este paquete  
├── icons/                 ← NUEVO - carpeta completa
│   ├── icon-48x48.png
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-144x144.png
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── icon-512x512-maskable.png
└── screenshots/           ← NUEVO - con tus capturas
    ├── screenshot-1.jpg
    ├── screenshot-2.jpg
    ├── screenshot-3.jpg
    └── screenshot-4.jpg
```

**Comandos Git:**
```bash
git add .
git commit -m "Añadir PWA completa para Play Store"
git push
```

---

### Paso 3: Verificar que tu index.html tiene las referencias correctas

Asegúrate de que tu `index.html` tiene estas líneas en el `<head>`:

```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#ff8c42">
<link rel="apple-touch-icon" href="icons/icon-192x192.png">
```

Y al final del `<body>`, el registro del Service Worker:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('SW registrado:', reg))
      .catch(err => console.log('SW error:', err));
  }
</script>
```

---

### Paso 4: Ir a PWA Builder

1. Ve a: https://www.pwabuilder.com/
2. Introduce tu URL: `https://arabia428.github.io/Regyster/`
3. Haz clic en "Start"
4. Ahora deberías ver puntuación mucho más alta (cerca de 44/44)
5. Haz clic en "Package for stores"
6. Selecciona "Android" → "Google Play"
7. Descarga el paquete APK/AAB

---

### Paso 5: Subir a Google Play Console

1. Ve a: https://play.google.com/console/
2. Crea una cuenta de desarrollador (25€ una sola vez)
3. Crea una nueva aplicación
4. Sube el archivo AAB que generó PWA Builder
5. Completa la información de la tienda
6. ¡Publica!

---

## ✅ Checklist antes de PWA Builder

- [ ] manifest.json subido a la raíz del repo
- [ ] sw.js subido a la raíz del repo
- [ ] Carpeta icons/ con todos los iconos
- [ ] Carpeta screenshots/ con tus 4 capturas
- [ ] index.html tiene la referencia al manifest
- [ ] index.html registra el service worker
- [ ] Has hecho git push
- [ ] Has esperado 1-2 minutos a que GitHub Pages actualice

---

## 🆘 Si PWA Builder sigue dando errores

Los errores más comunes son:

1. **"start_url is missing"** → Asegúrate de que manifest.json está en la raíz
2. **"No icons found"** → Verifica que la carpeta icons/ está subida
3. **"Screenshots missing"** → Es un WARNING, no bloquea la compilación

---

¡Mucha suerte Mi Rey! 🎉
