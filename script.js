// ============================================================
// PORTUGAL TIMELINE — JAVASCRIPT INTERATIVO
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

    // ---- Navegação entre secções ----
    window.showSection = function(sectionId) {
        // Ocultar todas as secções
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        // Mostrar a secção selecionada
        const target = document.getElementById(sectionId);
        if (target) target.classList.add('active');

        // Atualizar tabs
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`.nav-tab[onclick="showSection('${sectionId}')"]`);
        if (activeTab) activeTab.classList.add('active');

        // Mostrar/ocultar filtros
        const filterBar = document.getElementById('filter-bar');
        if (filterBar) {
            filterBar.style.display = sectionId === 'timeline' ? 'flex' : 'none';
        }

        // Scroll para o topo da secção
        window.scrollTo({ top: document.querySelector('.main-nav').offsetTop, behavior: 'smooth' });
    };

    // ---- Filtros da Timeline ----
    window.filterTimeline = function(category) {
        const items = document.querySelectorAll('.timeline-item');
        const yearMarkers = document.querySelectorAll('.year-marker');

        items.forEach(item => {
            if (category === 'all') {
                item.classList.remove('hidden');
            } else {
                if (item.classList.contains(category)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });

        // Atualizar botões de filtro
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.filter-btn[onclick="filterTimeline('${category}')"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Gerir visibilidade dos marcadores de ano
        yearMarkers.forEach(marker => {
            const yearId = marker.id;
            const year = yearId.replace('y', '');
            const hasVisibleItems = Array.from(items).some(item => {
                const itemYear = item.getAttribute('data-year');
                return itemYear === year && !item.classList.contains('hidden');
            });
            marker.style.display = hasVisibleItems ? 'inline-block' : 'none';
        });
    };

    // ---- Scroll Reveal para Timeline ----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animações de entrada
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(item);
    });

    document.querySelectorAll('.person-card, .party-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;
        observer.observe(card);
    });

    // ---- Sticky Nav ----
    const mainNav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 100) {
            mainNav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
        } else {
            mainNav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        }
        lastScroll = currentScroll;
    });

    // ---- Lightbox para imagens ----
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.9);
        z-index: 9999;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 2rem;
    `;
    lightbox.innerHTML = `
        <div style="max-width: 90vw; max-height: 90vh; position: relative;">
            <img id="lightbox-img" style="max-width: 100%; max-height: 85vh; border-radius: 8px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);" />
            <p id="lightbox-caption" style="color: white; text-align: center; margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;"></p>
            <button onclick="closeLightbox()" style="position: absolute; top: -15px; right: -15px; background: #CC0000; color: white; border: none; width: 35px; height: 35px; border-radius: 50%; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">✕</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    window.closeLightbox = function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    };

    // Adicionar click nas imagens
    document.querySelectorAll('.card-image, .person-photo img, .pm-photo-item img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const lbImg = document.getElementById('lightbox-img');
            const lbCaption = document.getElementById('lightbox-caption');
            lbImg.src = this.src;
            lbCaption.textContent = this.alt || '';
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Fechar lightbox com Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });

    // ---- Contador de estatísticas ----
    function animateCounter(element, target, duration = 1500) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ---- Tooltip para marcadores de ano ----
    document.querySelectorAll('.year-marker').forEach(marker => {
        marker.style.cursor = 'pointer';
        marker.addEventListener('click', function() {
            const yearId = this.id;
            const year = yearId.replace('y', '');
            const firstItem = document.querySelector(`.timeline-item[data-year="${year}"]`);
            if (firstItem) {
                firstItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // ---- Barra de progresso de scroll ----
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #006600, #CC0000);
        z-index: 9998;
        transition: width 0.1s;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // ---- Pesquisa na timeline ----
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Pesquisar na cronologia...';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 0.6rem 1.2rem;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 25px;
        background: rgba(255,255,255,0.1);
        color: white;
        font-size: 0.85rem;
        outline: none;
        font-family: 'Inter', sans-serif;
        backdrop-filter: blur(10px);
        margin-left: auto;
    `;
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        document.querySelectorAll('.timeline-item').forEach(item => {
            if (!query) {
                item.classList.remove('hidden');
                return;
            }
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });

    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        const searchWrapper = document.createElement('div');
        searchWrapper.style.cssText = 'display: flex; align-items: center; padding: 0.5rem 0;';
        searchWrapper.appendChild(searchInput);
        navContainer.appendChild(searchWrapper);
    }

    // ---- Inicialização ----
    console.log('🇵🇹 Portugal Timeline carregada com sucesso!');
    console.log('Linha cronológica desde 25 de Abril de 1974');

});
