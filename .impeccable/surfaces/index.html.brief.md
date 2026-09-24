# Surface brief — index.html (web, D.Softworks)

## Scope

Redesign completo del aterrizaje público (landing) de D.Softworks, una sola página HTML estática desplegada a Netlify. Modo: **Persuade** — el visitante decide y actúa (cotizar por WhatsApp).

## Audience & job

Dueño de negocio local de Guadalajara (clínica, restaurante, estética, taller, servicios) y responsables de empresas con necesidad de software a medida. Trabajo: decidir en minutos que D.Softworks le resuelve su presencia online o su sistema, con confianza y precio claro, y enviar el WhatsApp prellenado.

## Action / proof / content

- Acción primaria: WhatsApp con mensaje prellenado por giro/servicio (wa.me/5213350519325).
- Prueba: portafolio real con 4 proyectos verificables y URL en vivo (GM Fire, DC Beauty, Casa Blanca, VitalErect). Precios autorizados por servicio (desde $800 catálogo). Testimonios de la sección actual.
- Restricción de copy ya aprobada: NADA anti-empresa/anti-agencia; abrir la puerta a soluciones grandes (sistemas, apps, escalar). Voz: tú, directo, sin jerga corporativa.

## Constraints

- Página única estática (index.html + css/styles.css + css/components.css + css/animations.css + js/main.js + js/animations.js), sin framework ni build.
- Conservar IDs/classes que usa el JS (nav-menu, nav-toggle, nav-close, contact-form, faq-item, reveal, counters, etc.).
- Los capturas de proyectos viven en img/projects/*.png (screenshots reales). NO hay fotos reales de oficina/equipo; las fotos stock (img/stock/*.jpg) son material genérico: consumir con cuidado u omitir.
- Peso liviano; debe verse bien en celular de gama media con datos móviles.

## Direction contract

THESIS: Somos ingenieros directo contigo — una consultora clara, sobria y profesional que prueba con proyectos reales y precios visibles, en vez de la plantilla oscura "startup dev" actual (y de cualquier landing de agencia que promete sin mostrar). La página niega el cliché del estudio dev oscuro/neón y el de la agencia genérica con stock; construye confianza por evidencia, no por ambiente.

OWN-WORLD: Paleta clara de consultora: fondo blanco/gris-nieve, tinta azul-marino profundo, un solo acento verde-azulado técnico (#0E7C66) para acciones y acentos de datos. Tipografía: una display grotesca geométrica (Sora) para encabezados + una humanista para cuerpo (Inter), con mono (JetBrains Mono) reservado para etiquetas técnicas/geo. Tarjetas blancas sobre gris claro, radios suaves, líneas de 1px; sin glow, sin glassmorphism, sin sombras dramáticas.

STORY: "No somos una agencia con vendedores: somos los ingenieros que construyen tu página o tu sistema, y te lo demostramos." El visitante entiende en el primer viewport qué hacemos, cuánto cuesta, cuánto tarda, y confía porque ve proyectos reales con URL, se paga mitad-halgo, sin letra pequeña. Cree que D.Softworks le dará un resultado profesional de verdad, luego cotiza por WhatsApp.

FIRST VIEWPORT: Fondo blanco/nieve. Barra superior limpia: logo D.Softworks izquierda, nav de texto derecha, CTA "Cotización gratis" como botón acento. Debajo, dos columnas: izquierda, encabezado grande Sora con el mensaje "Somos los ingenieros detrás de tu presencia digital" + línea de apoyo con precio visible ("páginas desde $800, catálogo en 3-4 días") + botón primario WhatsApp + fila de 3 trust-facts (desde $800 · entrega 3-7 días · Guadalajara). Derecha, una composite: captura real del proyecto GM Fire en un marco de navegador, sin stock. Debajo del hero, franja fina con las 4 líneas de servicio como chips.

FORM: Consultora light clara. Las imágenes de stock (equipo/office/reunión/código) no existen como evidencia real: el portafolio de screenshots es la única imagen de prueba, ordenada en una grilla limpia, y las fotos stock se eliminan de la página (no hay oficina/equipo real fotografiado). Secciones recortadas: Hero → Servicios (precios) → Portafolio (evidencia) → Por qué (ingenieros) → Proceso (3 pasos) → Testimonios → FAQ → Contacto. La sección de tecnología se dobla a una franja compacta dentro de Por qué (sin grid gigante de 24 chips que distorsiona).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Memorable moment

El primer viewport muestra el navegador con un sitio real hecho por nosotros abierto dentro, con el sello "hecho por D.Softworks" — en una página limpia y clara que NO se ve a template.

## Unresolved decisions

- ¿Mantener la sección de testimonios tal cual (no verificados) o rebajar su prominencia? Decisión asumida: mantener, bajo encabezado honesto, ya que agregan prueba social y son copy existente.
- Netlify site real: danielsoftworks.netlify.app (los scripts de deploy usan --site=dsoftworks y están desactualizados, no es este build quien los toca).