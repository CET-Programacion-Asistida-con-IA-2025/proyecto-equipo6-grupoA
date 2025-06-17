// Inundaciones BA - JavaScript interactivo
// Funcionalidades para mejorar la experiencia del usuario

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // ANIMACIONES Y EFECTOS VISUALES
    // ===========================================
    
    // Intersection Observer para animaciones al scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar todas las secciones
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // ===========================================
    // NAVEGACIÓN SUAVE
    // ===========================================
    
    // Crear menú de navegación flotante
    function createFloatingNav() {
        const nav = document.createElement('nav');
        nav.className = 'floating-nav';
        nav.innerHTML = `
            <div class="nav-container">
                <a href="#presentacion" class="nav-item" data-section="presentacion">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-text">Inicio</span>
                </a>
                <a href="#mapa" class="nav-item" data-section="mapa">
                    <span class="nav-icon">🗺️</span>
                    <span class="nav-text">Mapa</span>
                </a>
                <a href="#guias" class="nav-item" data-section="guias">
                    <span class="nav-icon">📋</span>
                    <span class="nav-text">Guías</span>
                </a>
                <a href="#reporte" class="nav-item" data-section="reporte">
                    <span class="nav-icon">📢</span>
                    <span class="nav-text">Reportes</span>
                </a>
                <a href="#noticias" class="nav-item" data-section="noticias">
                    <span class="nav-icon">📰</span>
                    <span class="nav-text">Noticias</span>
                </a>
                <a href="#educacion" class="nav-item" data-section="educacion">
                    <span class="nav-icon">🎓</span>
                    <span class="nav-text">Educación</span>
                </a>
            </div>
        `;
        document.body.appendChild(nav);
        
        // Añadir estilos del menú flotante
        addFloatingNavStyles();
        
        // Añadir funcionalidad de scroll suave
        nav.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Actualizar estado activo
                updateActiveNavItem(targetId);
            });
        });
    }
    
    // Función para actualizar item activo en navegación
    function updateActiveNavItem(activeSection) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeItem = document.querySelector(`[data-section="${activeSection}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }
    
    // ===========================================
    // ALERTAS Y NOTIFICACIONES
    // ===========================================
    
    // Sistema de alertas meteorológicas simuladas
    function createWeatherAlert() {
        const alerts = [
            {
                type: 'warning',
                icon: '⚠️',
                title: 'Alerta meteorológica',
                message: 'Probabilidad de lluvias intensas en las próximas 6 horas. Mantente informado.',
                color: '#ff9800'
            },
            {
                type: 'info',
                icon: '💧',
                title: 'Nivel de ríos',
                message: 'El Río de la Plata se encuentra en nivel normal. Sin riesgo inmediato.',
                color: '#2196f3'
            },
            {
                type: 'success',
                icon: '✅',
                title: 'Sistema activo',
                message: 'Todos los sistemas de monitoreo funcionando correctamente.',
                color: '#4caf50'
            }
        ];
        
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        
        const alertElement = document.createElement('div');
        alertElement.className = 'weather-alert';
        alertElement.innerHTML = `
            <div class="alert-content">
                <span class="alert-icon">${randomAlert.icon}</span>
                <div class="alert-text">
                    <strong>${randomAlert.title}</strong>
                    <p>${randomAlert.message}</p>
                </div>
                <button class="alert-close">&times;</button>
            </div>
        `;
        
        alertElement.style.setProperty('--alert-color', randomAlert.color);
        document.body.appendChild(alertElement);
        
        // Mostrar alerta con animación
        setTimeout(() => alertElement.classList.add('show'), 100);
        
        // Cerrar alerta
        alertElement.querySelector('.alert-close').addEventListener('click', () => {
            alertElement.classList.remove('show');
            setTimeout(() => alertElement.remove(), 300);
        });
        
        // Auto-cerrar después de 8 segundos
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.classList.remove('show');
                setTimeout(() => alertElement.remove(), 300);
            }
        }, 8000);
    }
    
    // ===========================================
    // INTERACTIVIDAD EN SECCIONES
    // ===========================================
    
    // Botones de acción interactivos
    function addInteractiveButtons() {
        const sectionsConfig = [
            {
                id: 'mapa',
                button: {
                    text: 'Ver Mapa Interactivo',
                    icon: '🗺️',
                    action: () => showMapModal()
                }
            },
            {
                id: 'guias',
                button: {
                    text: 'Descargar Guías PDF',
                    icon: '📥',
                    action: () => downloadGuides()
                }
            },
            {
                id: 'reporte',
                button: {
                    text: 'Hacer Reporte',
                    icon: '📝',
                    action: () => showReportForm()
                }
            },
            {
                id: 'noticias',
                button: {
                    text: 'Ver Todas las Noticias',
                    icon: '📰',
                    action: () => showNewsModal()
                }
            }
        ];
        
        sectionsConfig.forEach(config => {
            const section = document.getElementById(config.id);
            if (section) {
                const buttonElement = document.createElement('button');
                buttonElement.className = 'interactive-button';
                buttonElement.innerHTML = `
                    <span class="button-icon">${config.button.icon}</span>
                    <span class="button-text">${config.button.text}</span>
                    <span class="button-arrow">→</span>
                `;
                buttonElement.addEventListener('click', config.button.action);
                section.appendChild(buttonElement);
            }
        });
    }
    
    // ===========================================
    // MODALES Y FORMULARIOS
    // ===========================================
    
   // Función para mostrar el mapa interactivo en un modal
function showMapModal() {
  const modal = createModal('Mapa Interactivo de Riesgo', `
    <div id="realMap" style="height: 400px; border-radius: 10px; overflow: hidden;"></div>
  `);

  // Cargar el mapa real después de abrir el modal
  setTimeout(() => {
    const map = L.map('realMap').setView([-34.6037, -58.3816], 11); // CABA

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Marcador de ejemplo
    L.marker([-34.6356, -58.4371]).addTo(map)
      .bindPopup('📍 Zona crítica: Villa Lugano')
      .openPopup();
  }, 300);
}


    // Formulario de reporte
    function showReportForm() {
        const modal = createModal('Hacer un Reporte', `
            <form class="report-form" id="reportForm">
                <div class="form-group">
                    <label for="reportType">Tipo de reporte:</label>
                    <select id="reportType" required>
                        <option value="">Selecciona una opción</option>
                        <option value="anegamiento">Calle anegada</option>
                        <option value="desague">Desagüe tapado</option>
                        <option value="corte">Corte de luz/agua</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="reportLocation">Ubicación:</label>
                    <input type="text" id="reportLocation" placeholder="Ej: Av. Rivadavia 1234" required>
                </div>
                <div class="form-group">
                    <label for="reportDescription">Descripción:</label>
                    <textarea id="reportDescription" placeholder="Describe la situación..." required></textarea>
                </div>
                <div class="form-group">
                    <label for="reportSeverity">Nivel de urgencia:</label>
                    <select id="reportSeverity" required>
                        <option value="">Selecciona</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>
                <button type="submit" class="submit-button">
                    <span>📤</span>
                    Enviar Reporte
                </button>
            </form>
        `);
        
        // Manejar envío del formulario
        modal.querySelector('#reportForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío
            const submitButton = this.querySelector('.submit-button');
            submitButton.innerHTML = '<span>⏳</span> Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.innerHTML = '<span>✅</span> Enviado correctamente';
                setTimeout(() => {
                    closeModal();
                    showNotification('Reporte enviado exitosamente', 'success');
                }, 1500);
            }, 2000);
        });
    }
    
    // ===========================================
    // UTILIDADES GENERALES
    // ===========================================
    
    // Crear modal genérico
    function createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Cerrar modal
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
        
        // Mostrar con animación
        setTimeout(() => modal.classList.add('show'), 10);
        
        return modal;
    }
    
    function closeModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    }
    
    // Sistema de notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-icon">
                ${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}
            </span>
            <span class="notification-message">${message}</span>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // Funciones placeholder para botones
    function downloadGuides() {
        showNotification('Descarga iniciada. Las guías se guardarán en tu dispositivo.', 'success');
    }
    
    function showNewsModal() {
        const modal = createModal('Últimas Noticias', `
            <div class="news-container">
                <article class="news-item">
                    <h4>🌧️ Pronóstico extendido para la semana</h4>
                    <p>El Servicio Meteorológico Nacional prevé lluvias moderadas para los próximos días...</p>
                    <small>Hace 2 horas</small>
                </article>
                <article class="news-item">
                    <h4>🚧 Obras de desagüe en La Matanza</h4>
                    <p>Continúan los trabajos de mejora en el sistema de desagües pluviales...</p>
                    <small>Hace 5 horas</small>
                </article>
                <article class="news-item">
                    <h4>📱 Nueva app de alertas tempranas</h4>
                    <p>El gobierno porteño lanzó una aplicación para recibir notificaciones...</p>
                    <small>Hace 1 día</small>
                </article>
            </div>
        `);
    }
    
    // ===========================================
    // ESTILOS DINÁMICOS
    // ===========================================
    
    function addFloatingNavStyles() {
        const styles = `
            .floating-nav {
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                z-index: 1000;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 10px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .nav-container {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .nav-item {
                display: flex;
                align-items: center;
                padding: 12px;
                text-decoration: none;
                color: #333;
                border-radius: 10px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .nav-item:hover, .nav-item.active {
                background: linear-gradient(135deg, #1565c0, #42a5f5);
                color: white;
                transform: translateX(-5px);
            }
            
            .nav-icon {
                font-size: 1.2em;
                margin-right: 8px;
            }
            
            .nav-text {
                font-size: 0.9em;
                font-weight: 500;
            }
            
            @media (max-width: 768px) {
                .floating-nav {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    left: 20px;
                    top: auto;
                    transform: none;
                }
                
                .nav-container {
                    flex-direction: row;
                    justify-content: space-around;
                }
                
                .nav-text {
                    display: none;
                }
                
                .nav-item {
                    padding: 10px;
                    flex: 1;
                    justify-content: center;
                }
            }
        `;
        
        addGlobalStyles(styles);
    }
    
    function addGlobalStyles(css) {
        const style = document.createElement('style');
        style.textContent = css + `
            .animate-in {
                animation: slideInUp 0.6s ease-out forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .interactive-button {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                background: linear-gradient(135deg, #1565c0, #42a5f5);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-top: 20px;
                box-shadow: 0 4px 15px rgba(21, 101, 192, 0.3);
            }
            
            .interactive-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(21, 101, 192, 0.4);
            }
            
            .interactive-button:active {
                transform: translateY(0);
            }
            
            .button-arrow {
                transition: transform 0.3s ease;
            }
            
            .interactive-button:hover .button-arrow {
                transform: translateX(5px);
            }
            
            .weather-alert {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                z-index: 1001;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                border-left: 4px solid var(--alert-color);
                max-width: 350px;
            }
            
            .weather-alert.show {
                transform: translateX(0);
            }
            
            .alert-content {
                display: flex;
                align-items: flex-start;
                padding: 16px;
            }
            
            .alert-icon {
                font-size: 1.5em;
                margin-right: 12px;
                flex-shrink: 0;
            }
            
            .alert-text {
                flex: 1;
            }
            
            .alert-text strong {
                display: block;
                color: var(--alert-color);
                margin-bottom: 4px;
            }
            
            .alert-text p {
                margin: 0;
                font-size: 0.9em;
                color: #666;
                line-height: 1.4;
            }
            
            .alert-close {
                background: none;
                border: none;
                font-size: 1.5em;
                cursor: pointer;
                color: #999;
                padding: 0;
                margin-left: 12px;
            }
            
            .alert-close:hover {
                color: #333;
            }
            
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1002;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal-overlay.show {
                opacity: 1;
            }
            
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .modal-overlay.show .modal-content {
                transform: scale(1);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #eee;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #1565c0;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5em;
                cursor: pointer;
                color: #999;
                padding: 0;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-close:hover {
                background: #f5f5f5;
                color: #333;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .notification {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: white;
                padding: 16px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                gap: 10px;
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 1003;
                border-left: 4px solid #4caf50;
            }
            
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            
            .notification-warning {
                border-left-color: #ff9800;
            }
            
            .notification-info {
                border-left-color: #2196f3;
            }
            
            .report-form .form-group {
                margin-bottom: 20px;
            }
            
            .report-form label {
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
                color: #333;
            }
            
            .report-form input,
            .report-form select,
            .report-form textarea {
                width: 100%;
                padding: 12px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }
            
            .report-form input:focus,
            .report-form select:focus,
            .report-form textarea:focus {
                outline: none;
                border-color: #1565c0;
            }
            
            .report-form textarea {
                resize: vertical;
                min-height: 100px;
            }
            
            .submit-button {
                width: 100%;
                background: linear-gradient(135deg, #4caf50, #66bb6a);
                color: white;
                border: none;
                padding: 15px;
                border-radius: 8px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            
            .submit-button:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
            }
            
            .submit-button:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            .map-container {
                height: 400px;
                background: #f5f5f5;
                border-radius: 8px;
                position: relative;
                overflow: hidden;
            }
            
            .map-placeholder {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(45deg, #e3f2fd, #f8fbff);
            }
            
            .map-loading {
                text-align: center;
                color: #666;
            }
            
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #e0e0e0;
                border-top: 4px solid #1565c0;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 16px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .map-legend {
                position: absolute;
                top: 20px;
                left: 20px;
                background: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            .map-legend h4 {
                margin: 0 0 10px 0;
                font-size: 1rem;
                color: #333;
            }
            
            .legend-item {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 5px;
                font-size: 0.9rem;
            }
            
            .legend-color {
                width: 16px;
                height: 16px;
                border-radius: 3px;
            }
            
            .news-container {
                max-height: 400px;
                overflow-y: auto;
            }
            
            .news-item {
                padding: 16px;
                border-bottom: 1px solid #eee;
                transition: background-color 0.3s ease;
            }
            
            .news-item:hover {
                background-color: #f8f9fa;
            }
            
            .news-item:last-child {
                border-bottom: none;
            }
            
            .news-item h4 {
                margin: 0 0 8px 0;
                color: #1565c0;
                font-size: 1.1rem;
            }
            
            .news-item p {
                margin: 0 0 8px 0;
                color: #666;
                line-height: 1.5;
            }
            
            .news-item small {
                color: #999;
                font-size: 0.85rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===========================================
    // INICIALIZACIÓN
    // ===========================================
    
    // Inicializar todas las funcionalidades
    function init() {
        createFloatingNav();
        addInteractiveButtons();
        addGlobalStyles('');
        
        // Mostrar alerta meteorológica después de 3 segundos
        setTimeout(createWeatherAlert, 3000);
        
        // Detectar sección activa al hacer scroll
        window.addEventListener('scroll', debounce(updateActiveSection, 100));
        
        // Mensaje de bienvenida
        setTimeout(() => {
            showNotification('¡Bienvenido a Inundaciones BA! Explora todas las funciones disponibles.', 'info');
        }, 1000);
    }
    
window.showNotification = showNotification ;

    // Detectar sección activa
    function updateActiveSection() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            
            if (scrollPos >= top && scrollPos <= bottom) {
                updateActiveNavItem(section.id);
            }
        });
    }
    
    // Utilidad debounce
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Inicializar cuando el DOM esté listo
    init();
    
    console.log('🌊 Inundaciones BA - JavaScript cargado correctamente');
});

// ===========================================
// FUNCIONES GLOBALES ADICIONALES
// ===========================================

// Función para simular datos en tiempo real
function updateRealTimeData() {
    const sections = ['mapa', 'reporte', 'noticias'];
    const indicators = {
        mapa: '🟢 Sistema operativo',
        reporte: `📊 ${Math.floor(Math.random() * 50 + 20)} reportes activos`,
        noticias: '📰 Última actualización: hace 15 min'
    };
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            // Buscar o crear indicador de estado
            let indicator = section.querySelector('.status-indicator');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.className = 'status-indicator';
                section.querySelector('h2').appendChild(indicator);
            }
            indicator.textContent = indicators[sectionId];
        }
    });
}

// Función para cambiar tema (modo oscuro/claro)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
    
    showNotification(`Tema ${isDark ? 'claro' : 'oscuro'} activado`, 'info');
}

// Agregar botón de tema en la navegación flotante
function addThemeToggle() {
    const nav = document.querySelector('.floating-nav .nav-container');
    if (nav) {
        const themeButton = document.createElement('button');
        themeButton.className = 'theme-toggle nav-item';
        themeButton.innerHTML = `
            <span class="nav-icon">🌙</span>
            <span class="nav-text">Tema</span>
        `;
        themeButton.addEventListener('click', toggleTheme);
        nav.appendChild(themeButton);
    }
}

// Función para exportar reportes (simulado)
function exportReports() {
    showNotification('Generando reporte en PDF...', 'info');
    
    setTimeout(() => {
        const data = {
            fecha: new Date().toLocaleDateString('es-AR'),
            reportes: Math.floor(Math.random() * 100 + 50),
            zonas_criticas: ['La Matanza', 'La Boca', 'Villa Lugano'],
            estado_general: 'Estable'
        };
        
        console.log('Datos del reporte:', data);
        showNotification('Reporte generado exitosamente', 'success');
    }, 2000);
}

// Sistema de geolocalización (simulado)
function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                showNotification(`Ubicación detectada: ${lat.toFixed(4)}, ${lon.toFixed(4)}`, 'success');
                
                // Simular análisis de riesgo por ubicación
                setTimeout(() => {
                    const riskLevel = Math.random();
                    let risk, color;
                    
                    if (riskLevel < 0.3) {
                        risk = 'bajo';
                        color = 'success';
                    } else if (riskLevel < 0.7) {
                        risk = 'medio';
                        color = 'warning';
                    } else {
                        risk = 'alto';
                        color = 'warning';
                    }
                    
                    showNotification(`Riesgo en tu zona: ${risk.toUpperCase()}`, color);
                }, 1500);
            },
            function(error) {
                showNotification('No se pudo obtener la ubicación', 'warning');
            }
        );
    }
}

// Función para compartir en redes sociales
function shareOnSocial(platform) {
    const url = window.location.href;
    const text = 'Conocé el estado de riesgo de inundaciones en Buenos Aires';
    
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Agregar botones de compartir
function addSocialShare() {
    const footer = document.querySelector('footer');
    if (footer) {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'social-share';
        shareContainer.innerHTML = `
            <p>Compartir información:</p>
            <div class="share-buttons">
                <button onclick="shareOnSocial('twitter')" class="share-btn twitter">
                    🐦 Twitter
                </button>
                <button onclick="shareOnSocial('facebook')" class="share-btn facebook">
                    📘 Facebook
                </button>
                <button onclick="shareOnSocial('whatsapp')" class="share-btn whatsapp">
                    💬 WhatsApp
                </button>
            </div>
        `;
        footer.prepend(shareContainer);
    }
}

// Función para mostrar estadísticas
function showStats() {
    const stats = {
        reportes_hoy: Math.floor(Math.random() * 30 + 10),
        usuarios_activos: Math.floor(Math.random() * 200 + 100),
        alertas_emitidas: Math.floor(Math.random() * 15 + 5),
        zonas_monitoreadas: 47
    };
    
    const modal = createModal('Estadísticas del Sistema', `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${stats.reportes_hoy}</div>
                <div class="stat-label">Reportes hoy</div>
                <div class="stat-icon">📊</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.usuarios_activos}</div>
                <div class="stat-label">Usuarios activos</div>
                <div class="stat-icon">👥</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.alertas_emitidas}</div>
                <div class="stat-label">Alertas emitidas</div>
                <div class="stat-icon">⚠️</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.zonas_monitoreadas}</div>
                <div class="stat-label">Zonas monitoreadas</div>
                <div class="stat-icon">🗺️</div>
            </div>
        </div>
        <div class="stats-footer">
            <p>Datos actualizados en tiempo real</p>
            <button onclick="exportReports()" class="export-btn">
                📋 Exportar Reporte
            </button>
        </div>
    `);
    
    // Hacer disponible la función globalmente para el botón
    window.exportReports = exportReports;
}

// Función para crear modal de contacto de emergencia
function showEmergencyContacts() {
    const modal = createModal('Contactos de Emergencia', `
        <div class="emergency-contacts">
            <div class="contact-card urgent">
                <div class="contact-icon">🚨</div>
                <div class="contact-info">
                    <h4>Emergencias</h4>
                    <p class="contact-number">911</p>
                    <p class="contact-desc">Bomberos, Policía, SAME</p>
                </div>
                <button class="call-btn" onclick="window.open('tel:911')">Llamar</button>
            </div>
            
            <div class="contact-card">
                <div class="contact-icon">🌊</div>
                <div class="contact-info">
                    <h4>Defensa Civil CABA</h4>
                    <p class="contact-number">103</p>
                    <p class="contact-desc">Alertas y emergencias climáticas</p>
                </div>
                <button class="call-btn" onclick="window.open('tel:103')">Llamar</button>
            </div>
            
            <div class="contact-card">
                <div class="contact-icon">⚡</div>
                <div class="contact-info">
                    <h4>Edesur</h4>
                    <p class="contact-number">0800-333-7387</p>
                    <p class="contact-desc">Cortes de energía eléctrica</p>
                </div>
                <button class="call-btn" onclick="window.open('tel:08003337387')">Llamar</button>
            </div>
            
            <div class="contact-card">
                <div class="contact-icon">💧</div>
                <div class="contact-info">
                    <h4>AySA</h4>
                    <p class="contact-number">0800-321-2942</p>
                    <p class="contact-desc">Problemas de agua y cloacas</p>
                </div>
                <button class="call-btn" onclick="window.open('tel:08003212942')">Llamar</button>
            </div>
        </div>
        
        <div class="emergency-tips">
            <h4>💡 Consejos importantes:</h4>
            <ul>
                <li>Mantén estos números siempre disponibles</li>
                <li>En caso de inundación, alejate de cables eléctricos</li>
                <li>No camines por agua que llegue a las rodillas</li>
                <li>Busca lugares altos y seguros</li>
            </ul>
        </div>
    `);
}

// Inicializar funciones adicionales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Ejecutar después de que se carguen las funciones principales
    setTimeout(() => {
        addThemeToggle();
        addSocialShare();
        
        // Actualizar datos cada 30 segundos
        setInterval(updateRealTimeData, 30000);
        updateRealTimeData();
        
        // Mostrar ubicación si es posible
        getUserLocation();
        
        // Agregar botones adicionales a la navegación
        const nav = document.querySelector('.floating-nav .nav-container');
        if (nav) {
            // Botón de estadísticas
            const statsButton = document.createElement('button');
            statsButton.className = 'nav-item';
            statsButton.innerHTML = `
                <span class="nav-icon">📊</span>
                <span class="nav-text">Stats</span>
            `;
            statsButton.addEventListener('click', showStats);
            nav.appendChild(statsButton);
            
            // Botón de emergencia
            const emergencyButton = document.createElement('button');
            emergencyButton.className = 'nav-item emergency-btn';
            emergencyButton.innerHTML = `
                <span class="nav-icon">🚨</span>
                <span class="nav-text">Emergencia</span>
            `;
            emergencyButton.addEventListener('click', showEmergencyContacts);
            nav.appendChild(emergencyButton);
        }
        
        // Hacer funciones disponibles globalmente
        window.showStats = showStats;
        window.showEmergencyContacts = showEmergencyContacts;
        window.shareOnSocial = shareOnSocial;
        window.getUserLocation = getUserLocation;
        window.toggleTheme = toggleTheme;
        
    }, 1000);
});

console.log('🌊 Inundaciones BA - Sistema completo cargado');

// Estilos adicionales para las nuevas funcionalidades
const additionalStyles = `
    .status-indicator {
        font-size: 0.8em;
        color: #4caf50;
        margin-left: 10px;
        padding: 4px 8px;
        background: rgba(76, 175, 80, 0.1);
        border-radius: 12px;
        display: inline-block;
    }
    
    .theme-toggle {
        border: none !important;
        background: none !important;
        cursor: pointer;
    }
    
    .emergency-btn {
        background: linear-gradient(135deg, #f44336, #e57373) !important;
        color: white !important;
    }
    
    .social-share {
        text-align: center;
        margin-bottom: 20px;
        padding: 20px 0;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .share-buttons {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;
        flex-wrap: wrap;
    }
    
    .share-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9em;
        transition: all 0.3s ease;
    }
    
    .share-btn.twitter {
        background: #1da1f2;
        color: white;
    }
    
    .share-btn.facebook {
        background: #4267b2;
        color: white;
    }
    
    .share-btn.whatsapp {
        background: #25d366;
        color: white;
    }
    
    .share-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
        margin-bottom: 20px;
    }
    
    .stat-card {
        background: linear-gradient(135deg, #f8f9fa, #ffffff);
        padding: 20px;
        border-radius: 12px;
        text-align: center;
        border: 2px solid #e9ecef;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    .stat-number {
        font-size: 2em;
        font-weight: bold;
        color: #1565c0;
        margin-bottom: 8px;
    }
    
    .stat-label {
        font-size: 0.9em;
        color: #666;
        margin-bottom: 8px;
    }
    
    .stat-icon {
        font-size: 1.5em;
        opacity: 0.7;
    }
    
    .stats-footer {
        text-align: center;
        padding-top: 16px;
        border-top: 1px solid #eee;
    }
    
    .export-btn {
        background: linear-gradient(135deg, #4caf50, #66bb6a);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        margin-top: 10px;
        transition: all 0.3s ease;
    }
    
    .export-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
    
    .emergency-contacts {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
    }
    
    .contact-card {
        display: flex;
        align-items: center;
        padding: 16px;
        background: #f8f9fa;
        border-radius: 12px;
        border-left: 4px solid #2196f3;
        transition: all 0.3s ease;
    }
    
    .contact-card.urgent {
        border-left-color: #f44336;
        background: linear-gradient(135deg, #ffebee, #f8f9fa);
    }
    
    .contact-card:hover {
        background: #ffffff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .contact-icon {
        font-size: 2em;
        margin-right: 16px;
        flex-shrink: 0;
    }
    
    .contact-info {
        flex: 1;
    }
    
    .contact-info h4 {
        margin: 0 0 4px 0;
        color: #333;
        font-size: 1.1em;
    }
    
    .contact-number {
        font-size: 1.2em;
        font-weight: bold;
        color: #1565c0;
        margin: 4px 0;
    }
    
    .contact-desc {
        font-size: 0.9em;
        color: #666;
        margin: 0;
    }
    
    .call-btn {
        background: linear-gradient(135deg, #4caf50, #66bb6a);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9em;
        transition: all 0.3s ease;
    }
    
    .call-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
    
    .emergency-tips {
        background: #fff3cd;
        padding: 16px;
        border-radius: 8px;
        border-left: 4px solid #ffc107;
    }
    
    .emergency-tips h4 {
        margin: 0 0 12px 0;
        color: #856404;
    }
    
    .emergency-tips ul {
        margin: 0;
        padding-left: 20px;
        color: #856404;
    }
    
    .emergency-tips li {
        margin-bottom: 4px;
        line-height: 1.4;
    }
    
    /* Tema oscuro */
    .dark-theme {
        background: linear-gradient(135deg, #263238 0%, #37474f 100%) !important;
        color: #eceff1 !important;
    }
    
    .dark-theme section {
        background: #37474f !important;
        color: #eceff1 !important;
        border-color: #455a64 !important;
    }
    
    .dark-theme section h2 {
        color: #64b5f6 !important;
    }
    
    .dark-theme .floating-nav {
        background: rgba(55, 71, 79, 0.95) !important;
        border-color: rgba(69, 90, 100, 0.3) !important;
    }
    
    .dark-theme .nav-item {
        color: #eceff1 !important;
    }
    
    @media (max-width: 768px) {
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .contact-card {
            flex-direction: column;
            text-align: center;
        }
        
        .contact-icon {
            margin: 0 0 12px 0;
        }
        
        .share-buttons {
            flex-direction: column;
            align-items: center;
        }
        
        .share-btn {
            width: 200px;
        }
    }
`;

// Agregar estilos adicionales
const additionalStyleElement = document.createElement('style');
additionalStyleElement.textContent = additionalStyles;
document.head.appendChild(additionalStyleElement);