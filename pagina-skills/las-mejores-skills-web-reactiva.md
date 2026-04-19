# Las mejores skills para agentes de IA

*Una selección curada de las skills más útiles del ecosistema, organizadas por categoría con sus comandos de instalación y casos de uso.*

---

> **Descubre mucho más sobre agentes de IA, skills y programación asistida.**
> **[Programa con IA en Web Reactiva](https://www.webreactiva.com/ia)** — Guías, tutoriales, podcast y una comunidad de más de 5.800 developers que están adaptando su forma de programar a la era de los agentes.

---

## Índice

- [Cómo instalar una skill](#como-instalar-una-skill)
- [Ecosistema y meta-skills](#ecosistema-y-meta-skills)
- [Revisión de código](#revision-de-codigo)
- [Seguridad](#seguridad)
- [Auditoría web y calidad](#auditoria-web-y-calidad)
- [Debugging](#debugging)
- [Flujos de trabajo con agentes](#flujos-de-trabajo-con-agentes)
- [DevOps y productividad](#devops-y-productividad)
- [Extras especiales: presentaciones y diseño frontend](#extras-especiales-presentaciones-y-diseno-frontend)

---

## Cómo instalar una skill

Existe una forma cómoda de gestionar Skills mediante el CLI de Skills (`npx skills`), que funciona como un gestor de paquetes para el ecosistema, similar a npm para JavaScript o pip para Python.

### Paso 1: Ejecutar el comando de instalación

```bash
npx skills add https://github.com/usuario/repo --skill nombre-skill
```

Este comando descarga la Skill desde el repositorio de GitHub y la prepara para instalar en tus agentes.

### Paso 2: Seleccionar los agentes

El instalador detecta qué agentes tienes configurados en tu sistema y te pregunta en cuáles quieres instalar la Skill:

```
◆  Select agents to install skills to (space to toggle)
│  ◼ Amp
│  ◼ Claude Code
│  ◼ Cline
│  ◼ Codex
│  ◼ Cursor
│  ◼ Gemini CLI
│  ◼ GitHub Copilot
│  ◼ OpenCode
│  ◼ Windsurf
│  ... (+20 más)
```

Usa la barra espaciadora para marcar o desmarcar cada agente. La Skill funciona de la misma manera en todos ellos gracias al estándar abierto.

### Paso 3: Elegir el alcance de la instalación

```
◆  Installation scope
│  ● Project (Install in current directory)
│  ○ Global (Install in home directory)
```

- **Project**: La Skill se guarda en el directorio actual del proyecto. Puedes hacer commit de ella junto con el resto del código y compartirla con tu equipo.
- **Global**: La Skill queda disponible en todos tus proyectos. Útil para Skills de propósito general.

### Paso 4: Elegir el método de instalación

```
◆  Installation method
│  ● Symlink (Recommended)
│  ○ Copy to all agents
```

- **Symlink**: Crea un enlace simbólico. Solo hay una copia de la Skill y todos los agentes apuntan a ella. Cuando actualices, todos se actualizan.
- **Copy**: Copia la Skill de forma independiente a cada agente. Útil si necesitas versiones diferentes para distintos agentes, aunque es raro.

El symlink es la opción recomendada para la mayoría de casos.

### Resultado de la instalación

```
◇  Installed 1 skill to 33 agents
│
│  ✓ ~/.agents/skills/nombre-skill
│    symlink → Amp, Claude Code, Cursor, Codex +29 more
│
└  Done!
```

### Comandos útiles del CLI

| Comando | Qué hace |
| --- | --- |
| `npx skills find [query]` | Busca Skills por palabra clave |
| `npx skills add <package>` | Instala una Skill |
| `npx skills check` | Comprueba si hay actualizaciones disponibles |
| `npx skills update` | Actualiza todas las Skills instaladas |
| `npx skills init mi-skill` | Crea la estructura para una nueva Skill |

Puedes explorar las Skills disponibles en [skills.sh](https://skills.sh/).

> Para una guía completa sobre qué son las Skills, cómo crearlas y todos los agentes compatibles, consulta la [guía de Agent Skills en Web Reactiva](https://www.webreactiva.com/blog/skills-programadores-agentes-ia).

---

## Ecosistema y meta-skills

### 1. Find Skills — El gestor de paquetes del ecosistema

🔗 [Find Skills en skills.sh](https://skills.sh/vercel-labs/skills/find-skills)

```bash
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```

La skill más instalada del ecosistema y la puerta de entrada a todo lo demás. Funciona como el npm de las skills: detecta cuándo necesitas ayuda con una tarea que podría resolverse con una skill existente. Si escribes algo como "¿cómo puedo mejorar mis tests?" o "necesito automatizar deployments", el agente busca en el ecosistema y te sugiere qué instalar. Ofrece detección inteligente de necesidades sin que tengas que saber que una skill existe para encontrarla, búsqueda categorizada por áreas (Web Development, Testing, DevOps, Documentation, Code Quality…) y comandos simples como `npx skills find [query]` para buscar y `npx skills check` para ver actualizaciones pendientes.

**3 casos de uso:**

1. Cuando empiezas un proyecto nuevo y quieres descubrir qué skills existen para tu stack tecnológico.
2. Para mantener tus skills actualizadas ejecutando `npx skills update` periódicamente.
3. Cuando te enfrentas a un problema nuevo y no sabes si ya existe una skill que lo resuelva.

---

### 2. Skill Creator — Crea tus propias skills

🔗 [Skill Creator en skills.sh](https://skills.sh/anthropics/skills/skill-creator)

```bash
npx skills add https://github.com/anthropics/skills --skill skill-creator
```

La guía oficial de Anthropic para diseñar skills. Si alguna vez has pensado "ojalá pudiera empaquetar este conocimiento que tengo sobre X", esta skill te enseña cómo hacerlo. La filosofía que transmite es "Concise is Key": el contexto es un recurso limitado que compartes con el modelo, así que solo debes añadir lo que el agente no sabe por sí mismo. El proceso de creación se divide en seis pasos: entender el problema, planificar la estructura, inicializar los ficheros, editar el contenido, empaquetar y finalmente iterar. Lo más interesante es el concepto de grados de libertad calibrados: para tareas creativas, alta libertad; para operaciones frágiles como deployments o configuraciones críticas, baja libertad con instrucciones muy específicas.

**3 casos de uso:**

1. Para empaquetar conocimiento experto de tu organización en formatos reutilizables.
2. Cuando tienes un proceso que repites con frecuencia y quieres que el agente lo ejecute siguiendo tus estándares.
3. Para crear skills internas de equipo que estandaricen workflows específicos de tu empresa.

---

### 3. Skill Judge — Evalúa antes de instalar

🔗 [Skill Judge en skills.sh](https://skills.sh/softaworks/agent-toolkit/skill-judge)

```bash
npx skills add https://github.com/softaworks/agent-toolkit --skill skill-judge
```

Un framework de evaluación de 120 puntos basado en el análisis de más de 17 skills oficiales de Anthropic. La fórmula es elegante: Buena Skill = Conocimiento Experto − Lo que el Agente Ya Sabe. Evalúa en ocho dimensiones: Knowledge Delta (20 pts), Mindset + Procedures (15 pts), Anti-Pattern Quality (15 pts), Specification Compliance (15 pts), Progressive Disclosure (15 pts), Freedom Calibration (15 pts), Pattern Recognition (10 pts) y Practical Usability (15 pts). Identifica patrones de fallo como "The Tutorial" (explica demasiado sin aportar valor), "The Dump" (vuelca información sin estructura) u "Orphan References" (menciona recursos que no incluye).

**3 casos de uso:**

1. Para evaluar skills de terceros antes de instalarlas y evitar desperdiciar contexto con skills mediocres.
2. Para mejorar tus propias skills con feedback estructurado basado en el framework de 120 puntos.
3. Cuando quieres auditar las skills ya instaladas en tu proyecto y decidir cuáles mantener.

---

## Revisión de código

### 4. Receiving Code Review — Recibe feedback sin ser un pelota

🔗 [receiving-code-review](https://skills.sh/obra/superpowers/receiving-code-review)

```bash
npx skills add https://github.com/obra/superpowers --skill receiving-code-review
```

Si hay un problema frecuente con los asistentes de IA es que aceptan cualquier sugerencia sin cuestionarla. Esta skill enseña al agente a recibir revisiones de código sin decir "You're absolutely right!" a todo. Tiene una lista explícita de respuestas prohibidas y, en su lugar, obliga al agente a verificar contra el código real, replantear el requisito técnico en sus propias palabras y, si la sugerencia es incorrecta, responder con razonamiento técnico. El patrón de respuesta es riguroso: leer todo el feedback sin reaccionar, entender el requisito, verificar contra la realidad del código, evaluar si tiene sentido técnico para ese proyecto concreto, y solo entonces responder o implementar. Incluye un principio YAGNI brillante: si un revisor sugiere "implementar esto como es debido", el agente busca en el código si esa funcionalidad realmente se usa.

**3 casos de uso:**

1. Siempre que tu agente reciba feedback de revisores externos, compañeros de equipo u otros subagentes.
2. Para evitar el problema del "sí a todo" que tienen los asistentes de IA por defecto.
3. En combinación con requesting-code-review para montar un flujo completo de revisión automatizada.

---

### 5. Code Review Excellence — El manual completo del buen revisor

🔗 [code-review-excellence](https://skills.sh/wshobson/agents/code-review-excellence)

```bash
npx skills add https://github.com/wshobson/agents --skill code-review-excellence
```

La skill más completa en cuanto a qué buscar y cómo dar feedback en una revisión de código. El proceso se divide en cuatro fases cronometradas: contexto inicial (2-3 min) donde se lee la descripción del PR y se verifica el tamaño; revisión de alto nivel (5-10 min) que cubre arquitectura, organización de ficheros y estrategia de testing; revisión línea por línea (10-20 min) que analiza lógica, seguridad, rendimiento y mantenibilidad; y resumen y decisión (2-3 min). Destaca su sistema de etiquetas para severidad: 🔴 [blocking] (arreglar antes de mergear), 🟡 [important] (debería arreglarse), 🟢 [nit] (mejorable pero no bloquea), 💡 [suggestion] (enfoque alternativo), 📚 [learning] (comentario educativo) y 🎉 [praise] (buen trabajo).

**3 casos de uso:**

1. Para revisiones de PRs completas con un framework profesional de feedback.
2. Para establecer estándares de revisión compartidos en tu equipo.
3. Para mentorizar a developers junior a través de revisiones que enseñan en lugar de solo criticar.

---

### 6. Code Review Expert — Revisión SOLID con plan de eliminación de código

🔗 [code-review-expert](https://skills.sh/sanyuan0704/code-review-expert/code-review-expert)

```bash
npx skills add https://github.com/sanyuan0704/code-review-expert --skill code-review-expert
```

Un enfoque muy estructurado y orientado a principios SOLID. El agente ejecuta `git diff`, analiza los cambios y clasifica cada hallazgo con niveles de severidad estrictos: P0 (crítico, bloquea el merge), P1 (alto, debería arreglarse antes), P2 (medio, arreglar en este PR o crear seguimiento) y P3 (bajo, sugerencia opcional). El detalle clave es que incluye un análisis de candidatos a eliminación: no solo revisa lo que se añade, sino que identifica código no utilizado, redundante o protegido por feature flags desactivados. Distingue entre "borrar ahora" y "planificar para después". La skill fuerza al agente a preguntar antes de hacer cambios: es un flujo de solo revisión por defecto que presenta hallazgos y ofrece opciones (arreglar todo, solo P0/P1, elementos concretos, o no tocar nada).

**3 casos de uso:**

1. Cuando quieres una revisión con niveles de prioridad claros y un plan de acción concreto.
2. Ideal para proyectos con deuda técnica acumulada donde necesitas saber qué código se puede eliminar.
3. Para integrar en flujos de CI donde se necesita un gate de calidad antes de mergear.

---

## Seguridad

### 7. Security Reviewer — Analista de seguridad con flujo profesional

🔗 [security-reviewer](https://skills.sh/jeffallan/claude-skills/security-reviewer)

```bash
npx skills add https://github.com/jeffallan/claude-skills --skill security-reviewer
```

Va un paso más allá del simple checklist. Define al agente como un analista de seguridad senior con experiencia en revisión de código, herramientas SAST, pentesting e infraestructura cloud. No solo busca vulnerabilidades en el código, sino que sigue un flujo profesional completo: mapear superficie de ataque, ejecutar herramientas automatizadas, revisión manual, clasificar hallazgos y generar un informe. El sistema de referencias es modular: según el contexto, el agente carga guías especializadas de herramientas SAST, patrones de vulnerabilidades, escaneo de secretos, pentesting o seguridad de infraestructura. Referencia directa a OWASP Top 10, CWE, Semgrep, Bandit, ESLint Security, y herramientas de cumplimiento como SOC2 e ISO27001.

**3 casos de uso:**

1. Para auditorías de seguridad formales con informes estructurados por severidad.
2. En proyectos que manejan datos sensibles o tienen requisitos de cumplimiento normativo (GDPR, SOC2).
3. Cuando necesitas algo más que un checklist y quieres un análisis profesional de superficie de ataque.

---

### 8. Audit Context Building — Entender el código antes de buscar bugs

🔗 [audit-context-building](https://skills.sh/trailofbits/skills/audit-context-building)

```bash
npx skills add https://github.com/trailofbits/skills --skill audit-context-building
```

Creada por Trail of Bits, empresa de seguridad profesional que audita código para empresas crypto, infraestructura crítica y proyectos open source. La idea es potente: antes de encontrar bugs, primero hay que entender el sistema a fondo. El agente analiza línea por línea, bloque por bloque, aplicando First Principles, "5 Whys" y "5 Hows" a escala micro. Construye un modelo mental del sistema, identifica invariantes, rastrea flujos de datos entre funciones y mapea fronteras de confianza. Incluye una tabla de "racionalizaciones prohibidas": "Ya pillo la idea" (a nivel superficial se pierden edge cases), "Esta función es simple" (las funciones simples componen bugs complejos), "Me acordaré de este invariante" (el contexto se degrada), "La llamada externa seguro que está bien" (toda llamada externa es hostil hasta que se demuestre lo contrario). Esta skill no busca vulnerabilidades ni sugiere arreglos: solo construye comprensión profunda.

**3 casos de uso:**

1. Como fase previa obligatoria antes de una auditoría de seguridad real.
2. Cuando necesitas entender código legacy complejo antes de modificarlo.
3. Para revisar contratos inteligentes o cualquier sistema donde un fallo tiene consecuencias graves.

---

## Auditoría web y calidad

### 9. Audit Website — Auditoría completa con crawler real y 230+ reglas

🔗 [audit-website](https://skills.sh/squirrelscan/skills/audit-website)

```bash
npx skills add https://github.com/squirrelscan/skills --skill audit-website
```

La skill más instalada de toda esta selección. Integra una herramienta CLI llamada `squirrel` que ejecuta auditorías reales sobre tu web: más de 230 reglas en 21 categorías que cubren SEO, rendimiento, seguridad, accesibilidad, enlaces rotos, E-E-A-T, schema markup, usabilidad móvil y mucho más. No es una skill que solo da instrucciones al agente: instala un binario que rastrea tu web como un crawler real, analiza cada página y genera informes. El agente después interpreta esos informes y puede aplicar correcciones. El flujo de trabajo es iterativo: auditar, arreglar por lotes, volver a auditar y seguir arreglando hasta alcanzar la puntuación objetivo (95+ para considerar el sitio completo). Incluye soporte para subagentes paralelos que arreglan categorías de problemas en simultáneo.

**3 casos de uso:**

1. Para auditorías completas de un sitio web antes de un lanzamiento.
2. Como parte de tu CI/CD para detectar regresiones de calidad.
3. Cuando quieres mejorar SEO, rendimiento y accesibilidad de un tirón con un único comando.

---

### 10. SEO Audit — Framework completo de auditoría SEO técnica

🔗 [seo-audit](https://skills.sh/coreyhaines31/marketingskills/seo-audit)

```bash
npx skills add https://github.com/coreyhaines31/marketingskills --skill seo-audit
```

Un framework de auditoría SEO técnica completo con un orden de prioridad claro: rastreabilidad e indexación primero, luego fundamentos técnicos, optimización on-page, calidad de contenido y por último autoridad y enlaces. Cubre rastreabilidad (robots.txt, sitemap XML, arquitectura del sitio, presupuesto de rastreo), indexación (canonical tags, cadenas de redirección, soft 404s), velocidad y Core Web Vitals, mobile-friendliness, y cada aspecto del SEO on-page: titles, meta descriptions, estructura de encabezados, optimización de imágenes, enlazado interno. Incluye secciones específicas por tipo de web: SaaS (páginas de comparación, glosarios), e-commerce (categorías thin, schema de producto), blogs (canibalización de keywords, clusters temáticos) y negocios locales (NAP, schema local). También referencia patrones para optimizar contenido para motores de respuesta con IA.

**3 casos de uso:**

1. Para auditorías SEO completas cuando lanzas una web nueva o rediseñas una existente.
2. Cuando tu tráfico orgánico baja y necesitas diagnosticar el problema técnico de raíz.
3. Para generar un plan de acción SEO priorizado según el tipo de web (SaaS, blog, e-commerce, local).

---

### 11. WCAG Audit Patterns — Accesibilidad web contra el estándar WCAG 2.2

🔗 [wcag-audit-patterns](https://skills.sh/wshobson/agents/wcag-audit-patterns)

```bash
npx skills add https://github.com/wshobson/agents --skill wcag-audit-patterns
```

Una guía exhaustiva para auditar contenido web contra las pautas WCAG 2.2. Cubre los cuatro principios POUR: Perceptible, Operable, Comprensible y Robusto. Cada principio se desglosa en criterios concretos con su nivel de conformidad (A, AA, AAA), qué comprobar y ejemplos de código correcto e incorrecto. La sección de remediación es práctica: muestra patrones de corrección para formularios sin etiquetas, contraste insuficiente, navegación por teclado y widgets accesibles. Incluye integración con axe-core y Playwright para tests automatizados. Las violaciones se clasifican por impacto: críticas (sin texto alternativo en imágenes funcionales, sin acceso por teclado), serias (contraste insuficiente, sin skip links) y moderadas (atributo lang ausente, jerarquía de encabezados incorrecta).

**3 casos de uso:**

1. Cuando necesitas cumplir con normativa de accesibilidad (ADA, Section 508, EAA europea).
2. Para auditorías WCAG previas a un lanzamiento con tests automatizados incluidos.
3. Cuando construyes componentes accesibles y quieres validarlos contra el estándar WCAG 2.2.

---

## Debugging

### 12. Systematic Debugging — El fin del "prueba y error"

🔗 [systematic-debugging](https://skills.sh/obra/superpowers/systematic-debugging)

```bash
npx skills add https://github.com/obra/superpowers --skill systematic-debugging
```

Implementa un proceso de debugging en cuatro fases que elimina las conjeturas. La filosofía es clara: nunca proponer arreglos sin antes investigar la causa raíz. Las fases son: investigación de causa raíz (leer mensajes de error, reproducir el problema, verificar cambios recientes), análisis de patrones (encontrar ejemplos funcionales, comparar contra referencias), hipótesis y testing (formar una única hipótesis, testear con cambio mínimo) e implementación (crear test fallido, implementar el fix, verificar). Los números que reporta el autor son significativos: con enfoque sistemático, 15-30 minutos para resolver; con enfoque aleatorio, 2-3 horas de frustración. La tasa de arreglo a la primera pasa del 40% al 95%. Detecta anti-patrones como "arreglo rápido ahora, investigo después" o "cambia X a ver si funciona".

**3 casos de uso:**

1. Para resolver fallos de tests, bugs en producción o comportamientos inesperados con metodología.
2. Especialmente valioso cuando estás bajo presión de tiempo y la tentación de adivinar es alta.
3. Para problemas de rendimiento o fallos de build donde el enfoque aleatorio suele empeorar las cosas.

---

### 13. Debugging Strategies — Un arsenal de técnicas por tipo de bug

🔗 [debugging-strategies](https://skills.sh/wshobson/agents/debugging-strategies)

```bash
npx skills add https://github.com/wshobson/agents --skill debugging-strategies
```

Debugging efectivo requiere diferentes estrategias según el tipo de problema. Esta skill proporciona un arsenal organizado por categoría: lógica (binary search, print debugging, breakpoints), memoria (heap analysis, leak detection, profiling), rendimiento (profiling, flame graphs, bottleneck analysis), concurrencia (race detection, deadlock analysis, timing), network (request tracing, latency analysis) y state (state machine visualization, snapshots). Para un bug intermitente: logging extensivo, captura de estado en cada ocurrencia, búsqueda de patrones temporales y considerar race conditions. Para un memory leak: heap snapshots periódicos, comparar growth patterns, identificar referencias retenidas y verificar cleanup de listeners. Las herramientas recomendadas varían por lenguaje: JavaScript (Chrome DevTools, Node --inspect), Python (pdb, cProfile, memory_profiler), Rust (RUST_BACKTRACE, cargo flamegraph) y Go (pprof, race detector).

**3 casos de uso:**

1. Para resolver bugs complejos que no responden a técnicas simples de debugging.
2. Para identificar memory leaks y problemas de rendimiento con la herramienta adecuada para cada lenguaje.
3. Para debuggear issues de concurrencia y race conditions con metodología específica.

---

## Flujos de trabajo con agentes

### 14. Writing Plans — Planifica como si no supieras nada

🔗 [writing-plans](https://skills.sh/obra/superpowers/writing-plans)

```bash
npx skills add https://github.com/obra/superpowers --skill writing-plans
```

Del framework Superpowers de Jesse Vincent. Cambia radicalmente la forma de escribir planes de implementación. La premisa es brutal: escribe planes tan detallados que podrían ser ejecutados por "un junior entusiasta con mal gusto, sin juicio, sin contexto del proyecto y aversión al testing". Suena exagerado, pero con agentes, esa es exactamente la mentalidad que necesitas. Cada tarea debe ser una acción de 2-5 minutos: escribir un test, ejecutar el test y ver que falla, implementar la funcionalidad, ejecutar el test y ver que pasa, hacer commit. Cada paso es atómico y verificable. La estructura de cada tarea incluye los archivos exactos a modificar, el código completo a escribir, los comandos a ejecutar y el output esperado. El enfoque TDD está integrado: RED-GREEN-REFACTOR sin atajos. Cada plan tiene un header obligatorio con Goal, Architecture y Tech Stack.

**3 casos de uso:**

1. Cuando tienes un proyecto complejo que necesitas dividir en tareas manejables para agentes.
2. Para documentar implementaciones que otro agente (o tu yo del futuro) pueda ejecutar sin contexto previo.
3. Para establecer un estándar de planificación en equipos que trabajan con agentes de IA.

---

### 15. Subagent-Driven Development — Divide y vencerás

🔗 [subagent-driven-development](https://skills.sh/obra/superpowers/subagent-driven-development)

```bash
npx skills add https://github.com/obra/superpowers --skill subagent-driven-development
```

Implementa un patrón de ejecución donde cada tarea del plan se delega a un subagente dedicado. El principio: un subagente fresco por tarea más revisión en dos fases igual a alta calidad con iteración rápida. El flujo: tienes un plan con varias tareas, despachas un subagente para implementar la primera, el subagente puede hacer preguntas si algo no está claro, implementa, testea y hace commit. Después un revisor de spec verifica que se cumplen todos los requisitos (ni más ni menos) y un revisor de código evalúa la calidad señalando issues por severidad. Si hay problemas, el implementador corrige y se vuelve a revisar. Solo cuando todo está aprobado se pasa a la siguiente tarea. La clasificación de issues por severidad es práctica: Critical (esto rompe cosas), Important (debería arreglarse), Minor (sería bueno mejorarlo si hay tiempo).

**3 casos de uso:**

1. Cuando tienes un plan con tareas independientes que pueden trabajarse en secuencia con calidad controlada.
2. Para proyectos donde necesitas que cada tarea pase por revisión antes de avanzar a la siguiente.
3. En combinación con writing-plans para crear un pipeline completo de planificación + ejecución + revisión.

---

### 16. Verification Before Completion — No des nada por hecho

🔗 [verification-before-completion](https://skills.sh/obra/superpowers/verification-before-completion)

```bash
npx skills add https://github.com/obra/superpowers --skill verification-before-completion
```

Implementa "The Iron Law": no hay atajos para la verificación. El problema que resuelve es muy común: el agente dice "he terminado" o "los tests pasan" sin haber ejecutado realmente los comandos. Se basa en su conocimiento del código para asumir que todo funciona. Y muchas veces se equivoca. La regla: ejecuta el comando, lee el output, ENTONCES reclama el resultado. Sin excepciones. Detecta triggers como "complete", "fixed", "passing", "committing" o "ready for PR" y verifica que hay evidencia real. También identifica red flags como racionalizaciones del tipo "debe funcionar porque…" o "el código se ve correcto así que…". El formato de verificación: comando ejecutado, output real (copiado, no parafraseado), interpretación del output y conclusión basada en evidencia.

**3 casos de uso:**

1. Como skill permanente en cualquier proyecto para prevenir false positives de agentes.
2. En pipelines automatizados donde un "ya está" que en realidad es un "casi está" puede ser costoso.
3. Para establecer una cultura de evidencia en workflows donde los agentes ejecutan tareas críticas.

---

### 17. Dispatching Parallel Agents — Cuando la secuencia no tiene sentido

🔗 [dispatching-parallel-agents](https://skills.sh/obra/superpowers/dispatching-parallel-agents)

```bash
npx skills add https://github.com/obra/superpowers --skill dispatching-parallel-agents
```

Coordina múltiples agentes para trabajar en paralelo cuando las tareas son verdaderamente independientes. El principio core: un agente por dominio de problema independiente, trabajo concurrente. El criterio: dos o más tareas que no comparten estado ni tienen dependencias secuenciales. Si los problemas están relacionados o necesitas el contexto completo de un bug para entender otro, no uses agentes paralelos. Ejemplo práctico: tienes fallos en tres archivos de tests de dominios diferentes. Despachas tres agentes, cada uno se centra en su archivo, y el tiempo total se reduce a la duración de la tarea más larga en lugar de la suma. El diagrama de decisión: ¿Tienes un plan? → Si no, primero planifica. ¿Las tareas son independientes? → Si no, trabaja en secuencia. ¿Pueden trabajarse en paralelo? → Despacha agentes.

**3 casos de uso:**

1. Cuando tienes múltiples tests fallando en dominios independientes y quieres resolver todos a la vez.
2. Para investigar bugs en subsistemas que no comparten estado ni dependencias.
3. En combinación con audit-website para arreglar categorías de problemas en paralelo.

---

### 18. Planning With Files — Memoria persistente para agentes

🔗 [planning-with-files](https://skills.sh/othmanadi/planning-with-files/planning-with-files)

```bash
npx skills add https://github.com/othmanadi/planning-with-files --skill planning-with-files
```

Implementa el patrón de "context engineering" que hizo famoso a Manus. La idea: la ventana de contexto es como la RAM (volátil y limitada), mientras que el sistema de archivos es como el disco (persistente e ilimitado). Cualquier cosa importante se escribe a disco. Se basa en tres archivos core: task_plan.md (fases del proyecto y progreso), findings.md (descubrimientos y aprendizajes) y progress.md (log de la sesión actual). La regla práctica: después de cada dos operaciones de lectura o búsqueda, guarda los hallazgos de forma inmediata. Incluye un protocolo de errores "3-Strike" (diagnóstica, prueba alternativa, replantea estrategia) y un "5-Question Reboot Test" para validar que los archivos permiten recuperar contexto: ¿Dónde estoy? ¿A dónde voy? ¿Cuál es el objetivo? ¿Qué he aprendido? ¿Qué he hecho?

**3 casos de uso:**

1. Para tareas largas que exceden la ventana de contexto del modelo y necesitan persistencia.
2. Cuando necesitas recuperar estado entre sesiones sin perder el hilo del trabajo.
3. Para proyectos complejos donde múltiples sesiones de agentes deben construir sobre el trabajo previo.

---

## DevOps y productividad

### 19. Dependency Updater — Actualiza sin romper nada

🔗 [dependency-updater](https://skills.sh/softaworks/agent-toolkit/dependency-updater)

```bash
npx skills add https://github.com/softaworks/agent-toolkit --skill dependency-updater
```

Encuentra el equilibrio entre mantener dependencias actualizadas y no romper el proyecto. Ofrece auto-detección de gestores de paquetes (package.json, requirements.txt, Cargo.toml, go.mod y otros), updates seguros que aplica patches y minor updates de forma automática, y para versiones mayores pregunta antes de aplicar breaking changes. El flujo típico: detectar gestor de paquetes, listar dependencias con updates disponibles, aplicar updates seguros (patch/minor), preguntar por updates mayores mostrando el changelog, ejecutar tests para verificar compatibilidad, y diagnosticar y resolver conflictos si aparecen. Es multi-lenguaje: JavaScript, TypeScript, Python, Rust, Go y más. Un solo comando para gobernarlos a todos.

**3 casos de uso:**

1. Para mantener dependencias actualizadas sin riesgo de romper el proyecto en producción.
2. Para resolver conflictos de versiones en lockfiles que se han acumulado con el tiempo.
3. Para auditar y actualizar dependencias con vulnerabilidades conocidas de forma segura.

---

### 20. Reducing Entropy — Menos código es mejor código

🔗 [reducing-entropy](https://skills.sh/softaworks/agent-toolkit/reducing-entropy)

```bash
npx skills add https://github.com/softaworks/agent-toolkit --skill reducing-entropy
```

Implementa una filosofía radical: el mejor código es el que no existe. Se activa solo cuando lo pides de forma explícita porque tiene un sesgo extremo hacia la eliminación. No es para uso diario. La filosofía core: el código es un pasivo, no un activo. Cada línea es un potencial bug, un coste de mantenimiento, una deuda técnica. El éxito se mide por reducción de líneas, no por features añadidas. Los principios de reducción: Delete first (antes de refactorizar, pregunta si el código es necesario), Simplify (código complejo que hace poco → código simple), Consolidate (múltiples implementaciones similares → una sola generalizada) y Remove abstractions (abstracciones prematuras → código directo). Métricas de éxito: líneas eliminadas, archivos eliminados, dependencias removidas y complejidad ciclomática reducida. Viene con una advertencia: siempre con tests que verifiquen que la funcionalidad se mantiene.

**3 casos de uso:**

1. Para limpiar código muerto y funcionalidades deprecated que nadie usa.
2. Para simplificar arquitecturas sobre-diseñadas con abstracciones prematuras.
3. Para reducir deuda técnica mediante eliminación estratégica en lugar de refactoring infinito.

---

## Extras especiales: presentaciones y diseño frontend

### Extra 1. Frontend Slides — Presentaciones HTML sin dependencias

🔗 [frontend-slides en GitHub](https://github.com/zarazhangrui/frontend-slides)

```bash
skills install zarazhangrui/frontend-slides
```

Una skill de código abierto que genera presentaciones completas en un único archivo HTML autocontenido. Sin npm, sin build tools, sin frameworks. Un solo fichero que abres en el navegador y funciona. La filosofía: no necesitas ser diseñador para crear algo bonito, solo reaccionar a lo que ves ("show, don't tell" aplicado al diseño). Tiene tres modos de funcionamiento: creación desde cero (le das el contenido o un tema y genera la presentación), conversión de PowerPoint (transforma un .pptx existente en web con estilo) y mejora de presentaciones existentes. Incluye 12 estilos visuales prediseñados con previsualizaciones para que elijas visualmente, no describiendo con palabras. Las presentaciones incluyen de serie navegación por teclado, soporte táctil, barra de progreso, animaciones al hacer scroll y diseño responsive. Funciona con Claude Code, Claude Desktop, OpenCode, Copilot, Codex y cualquier agente compatible con skills.

**3 casos de uso:**

1. Para crear presentaciones técnicas desde el terminal con diseño profesional y cero dependencias.
2. Para convertir un PowerPoint existente en una presentación web moderna y ligera.
3. Cuando necesitas una presentación que funcione offline y siga funcionando dentro de diez años sin depender de ningún servicio.

---

### Extra 2. Frontend Design — Interfaces web únicas que no huelen a IA

🔗 [frontend-design en skills.sh](https://skills.sh/anthropics/skills/frontend-design)

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

Skill oficial de Anthropic que rompe con los diseños genéricos de IA (tipografía Inter, gradiente azul-púrpura, tres columnas, bordes redondeados). Cuando se activa, Claude se pregunta cosas que normalmente no le pedirías: ¿cuál es la personalidad de esta interfaz? ¿qué la hace diferente? ¿cómo evitar decisiones predecibles? ¿qué tipografía tiene carácter propio? El resultado es código funcional (HTML, CSS, React) con decisiones de diseño intencionadas. Para sacarle partido, los prompts deben incluir contexto del proyecto, qué necesitas, tono y estética, restricciones técnicas y un diferenciador. Hay cinco trampas de "AI slop" que evitar: no especificar el tono, dejar que elija la tipografía, aceptar el layout por defecto, animaciones genéricas y colores "de IA". Se complementa bien con otras skills de código para asegurar que el resultado generado es tanto bonito como funcional.

**3 casos de uso:**

1. Para crear landing pages, portfolios o dashboards con personalidad visual y no más de lo mismo.
2. Cuando quieres iterar rápidamente sobre diseños de UI usando la técnica de "preservar y cambiar".
3. Para generar componentes UI reutilizables que rompan con la estética genérica de las herramientas de IA.

---

### Extra 3. Marp Slide — Presentaciones Marp con 7 temas profesionales

🔗 [marp-slide en skills.sh](https://skills.sh/softaworks/agent-toolkit/marp-slide)

```bash
npx skills add https://github.com/softaworks/agent-toolkit --skill marp-slide
```

Crea presentaciones profesionales en formato Marp (Markdown para slides) con 7 temas prediseñados y buenas prácticas integradas. Cada tema está pensado para un contexto: default (seminarios, charlas generales), minimal (académico, centrado en contenido), colorful (eventos creativos, público joven), dark (tech talks, look moderno), gradient (presentaciones visuales), tech (tutoriales de programación, estilo GitHub) y business (propuestas corporativas, informes). El flujo es sencillo: seleccionar tema según el contenido, copiar la plantilla con CSS embebido, estructurar el contenido siguiendo buenas prácticas (títulos concisos, 3-5 bullets por slide, whitespace generoso) y añadir imágenes con la sintaxis nativa de Marp. Maneja incluso peticiones vagas como "hazlo bonito" infiriendo el tema apropiado del contenido. Incluye referencias detalladas para sintaxis Marp, patrones de imágenes, features avanzadas (math, emoji) y guía de CSS para temas personalizados.

**3 casos de uso:**

1. Para crear presentaciones técnicas rápidas desde Markdown sin salir del terminal.
2. Cuando necesitas slides corporativas con tema business o propuestas con diseño limpio.
3. Para generar materiales de formación o charlas con temas visuales específicos según la audiencia.

---

*Guía elaborada por [Web Reactiva](https://www.webreactiva.com) · [Programa con IA](https://www.webreactiva.com/ia)*
