# Landing Abogados - Fuentes & Asociados

Landing page de conversión para despacho de abogados especializado en derecho penal, civil y laboral.

## Stack
- HTML5 + Tailwind CSS (CDN)
- JavaScript vanilla
- Integración con n8n webhook para cualificación automática de leads

## Estructura
- `index.html` — Landing page completa
- `app.js` — Lógica del formulario, FAQ, animaciones y envío al webhook

## Flujo de leads
1. El usuario rellena el formulario de contacto
2. Los datos se envían por POST al webhook de n8n
3. n8n cualifica el lead con IA (Gemini Flash)
4. Se almacena en Google Sheets
5. Si el score > 5, se genera y envía un email personalizado

## Desarrollo local
Abrir `index.html` en el navegador. No requiere servidor de desarrollo.
