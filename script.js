// script.js
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

// 1. Toggle para abrir y cerrar el menú al hacer clic en el ícono
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    
    // Cambia el ícono de "menu" a una "X" (close) si usas Material Symbols
    if (navbar.classList.contains('active')) {
        menuIcon.textContent = 'close';
    } else {
        menuIcon.textContent = 'menu';
    }
});

// 2. Cerrar el menú automáticamente cuando se clickea un link de sección
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.textContent = 'menu'; // Restaura el ícono de hamburguesa
    });
});


const emailUsuario = 'ivan.krysiuk.93';        // reemplazá por la parte antes del @
const emailDominio = 'gmail.com'; // reemplazá por la parte después del @

const btnEmail = document.getElementById('btn-email');
const feedbackEmail = document.getElementById('email-feedback');

if (btnEmail && feedbackEmail) {
    btnEmail.addEventListener('click', async () => {
        const direccionCompleta = `${emailUsuario}@${emailDominio}`;

        try {
            await navigator.clipboard.writeText(direccionCompleta);
            feedbackEmail.textContent = '¡Copiado!';
        } catch (error) {
            // Fallback por si el navegador bloquea la API (contexto no seguro, permisos, etc.)
            feedbackEmail.textContent = direccionCompleta;
        }

        setTimeout(() => {
            feedbackEmail.textContent = '';
        }, 2500);
    });
}

// =============================================================
// Terminal interactiva de Habilidades
// =============================================================

const skillsData = {
    // --- Lenguajes ---
    csharp: {
        tipo: 'tech',
        nombre: 'C#',
        origen: 'Capacitación .NET (BDT Global) + formación universitaria.',
        uso: 'QuickDocs — Backend (ASP.NET Core) y cliente de escritorio (Avalonia UI).'
    },
    python: {
        tipo: 'tech',
        nombre: 'Python',
        origen: 'Fullstack Python (CoderHouse) + práctica autodidacta.',
        uso: 'Short Generator — automatización de producción de video.'
    },
    javascript: {
        tipo: 'tech',
        nombre: 'JavaScript',
        origen: 'Autodidacta.',
        uso: 'Este portfolio — menú responsive y esta misma terminal interactiva.'
    },
    html: {
        tipo: 'tech',
        nombre: 'HTML',
        origen: 'Autodidacta.',
        uso: 'Este portfolio y Buggg.'
    },
    css: {
        tipo: 'tech',
        nombre: 'CSS',
        origen: 'Autodidacta.',
        uso: 'Este portfolio y Buggg.'
    },

    // --- Frameworks / Libs ---
    dotnet: {
        tipo: 'tech',
        nombre: 'ASP.NET Core',
        origen: 'Capacitación .NET (BDT Global).',
        uso: 'API backend de QuickDocs.'
    },
    avalonia: {
        tipo: 'tech',
        nombre: 'Avalonia UI',
        origen: 'Documentación oficial, autodidacta.',
        uso: 'Cliente de escritorio multiplataforma de QuickDocs.'
    },
    django: {
        tipo: 'tech',
        nombre: 'Django',
        origen: 'Fullstack Python (CoderHouse).',
        uso: 'Proyecto personal en desarrollo, aún no publicado.'
    },
    questpdf: {
        tipo: 'tech',
        nombre: 'QuestPDF',
        origen: 'Documentación oficial, autodidacta.',
        uso: 'Generación de PDFs (presupuestos, remitos, recibos) en QuickDocs.'
    },
    moviepy: {
        tipo: 'tech',
        nombre: 'MoviePy',
        origen: 'Fullstack Python (CoderHouse) + autodidacta.',
        uso: 'Short Generator — composición de video programática.'
    },

    // --- Herramientas ---
    github: {
        tipo: 'tech',
        nombre: 'GitHub',
        origen: 'Uso diario desde el inicio de la carrera.',
        uso: 'Control de versiones de todos los proyectos del portfolio.'
    },
    sqlite: {
        tipo: 'tech',
        nombre: 'SQLite',
        origen: 'Junto con EF Core, en la capacitación .NET.',
        uso: 'Base de datos local de QuickDocs.'
    },
    gcloud: {
        tipo: 'tech',
        nombre: 'Google Cloud',
        origen: 'Autodidacta, para el proyecto Buggg.',
        uso: 'Alojamiento de assets (GIFs e imágenes) de Buggg.'
    },
    netlify: {
        tipo: 'tech',
        nombre: 'Netlify',
        origen: 'Autodidacta.',
        uso: 'Despliegue de Buggg y de este portfolio.'
    },

    // --- Metodologías / Soft ---
    pressure: {
        tipo: 'soft',
        nombre: 'Gestión bajo presión',
        texto: 'El trabajo de cocina implica enfrentar picos de demanda que exigen resolver múltiples pedidos de forma simultánea, priorizando eficacia y eficiencia sin perder calidad.'
    },
    logic: {
        tipo: 'soft',
        nombre: 'Resolución lógica',
        texto: 'Mi formación en Ingeniería me dio la habilidad de dividir problemas complejos en partes simples y conectarlas en una solución más amplia.'
    },
    process: {
        tipo: 'soft',
        nombre: 'Optimización de procesos',
        texto: 'Investigo y aplico contenidos de la facultad en materias orientadas a la optimización de problemas, como Ingeniería de Software (UNLP, Facultad Regional La Plata).'
    },
    team: {
        tipo: 'soft',
        nombre: 'Trabajo en equipo',
        texto: 'Me desempeño habitualmente como jefe de producción de cocina, coordinando un equipo de aproximadamente 5 personas.'
    }
};

const skillTags = document.querySelectorAll('.skill-tag');
const terminalOutput = document.getElementById('terminal-output');
let terminalInicializada = false;
const btnLimpiarTerminal = document.getElementById('btn-limpiar-terminal');

if (btnLimpiarTerminal) {
    btnLimpiarTerminal.addEventListener('click', () => {
        terminalOutput.innerHTML = `
            <p class="terminal-line init-line"><span class="prompt">ik.dev@backend:~$</span> ./mostrar_habilidades.sh</p>
            <p class="terminal-text hint">[INFO] Selecciona una tecnología o habilidad de la izquierda para desplegar sus ocurrencias, proyectos vinculados o credenciales asociadas...</p>
        `;
        terminalInicializada = false; // así el próximo click vuelve a limpiar antes de escribir
    });
}

skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const key = tag.dataset.skill;
        const data = skillsData[key];

        if (!data) return; // por si algún tag no tiene entrada cargada todavía

        // En el primer click, limpiamos el mensaje de bienvenida inicial
        if (!terminalInicializada) {
            terminalOutput.innerHTML = '';
            terminalInicializada = true;
        }

        const bloque = document.createElement('div');
        bloque.classList.add('terminal-line');

        if (data.tipo === 'soft') {
            bloque.innerHTML = `
                <p><span class="prompt">ik.dev@backend:~$</span> ./mostrar_habilidades.sh --soft=${key}</p>
                <p style="margin-top: 6px;">[✓] ${data.nombre}</p>
                <p style="margin-top: 4px; color: var(--color-text-secondary);">"${data.texto}"</p>
            `;
        } else {
            bloque.innerHTML = `
                <p><span class="prompt">ik.dev@backend:~$</span> ./mostrar_habilidades.sh --tech=${key}</p>
                <p style="margin-top: 6px;">[✓] ${data.nombre}</p>
                <p style="margin-top: 4px; color: var(--color-text-secondary);">Origen: ${data.origen}</p>
                <p style="color: var(--color-text-secondary);">Uso: ${data.uso}</p>
            `;
        }

        terminalOutput.appendChild(bloque);

        // Auto-scroll al final, por si se acumulan varias consultas
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    });
});