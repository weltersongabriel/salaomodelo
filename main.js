       // Variáveis globais
        let isLoaded = false;
        
        // Função de loading
        function hideLoading() {
            const loading = document.getElementById('loading');
            setTimeout(() => {
                loading.classList.add('hidden');
                startHeroAnimations();
                isLoaded = true;
            }, 1500);
        }

        // Animações do Hero
        function startHeroAnimations() {
            const title = document.getElementById('heroTitle');
            const subtitle = document.getElementById('heroSubtitle');
            const buttons = document.getElementById('heroButtons');

            // Animar título
            setTimeout(() => {
                title.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 300);

            // Animar subtítulo
            setTimeout(() => {
                subtitle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, 600);

            // Animar botões
            setTimeout(() => {
                buttons.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                buttons.style.opacity = '1';
                buttons.style.transform = 'translateY(0)';
            }, 900);

            createFloatingElements();
        }

        // Elementos flutuantes
        function createFloatingElements() {
            const container = document.getElementById('floatingElements');
            const numberOfElements = window.innerWidth < 768 ? 15 : 30;

            for (let i = 0; i < numberOfElements; i++) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                
                // Posição aleatória
                element.style.left = Math.random() * 100 + '%';
                element.style.top = Math.random() * 100 + '%';
                
                // Animação contínua
                element.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
                element.style.animationDelay = Math.random() * 2 + 's';
                
                container.appendChild(element);
            }
        }

        // CSS para animação flutuante
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-20px) rotate(90deg); }
                50% { transform: translateY(0px) rotate(180deg); }
                75% { transform: translateY(-10px) rotate(270deg); }
            }
        `;
        document.head.appendChild(style);

        // Intersection Observer para animações de scroll
        function createScrollObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const delay = element.dataset.delay || 0;
                        
                        setTimeout(() => {
                            if (element.classList.contains('historia-image')) {
                                element.classList.add('animate-in-left');
                            } else if (element.classList.contains('historia-text')) {
                                element.classList.add('animate-in-right');
                            } else if (element.classList.contains('corte-item') || 
                                     element.classList.contains('produto-item')) {
                                element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                                element.classList.add('animate-in');
                            } else {
                                element.classList.add('animate-in');
                            }
                        }, delay);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observar elementos
            const elementsToObserve = [
                '#historiaImage',
                '#historiaText',
                '#cortesTitle',
                '#produtosTitle',
                ...Array.from(document.querySelectorAll('.corte-item')),
                ...Array.from(document.querySelectorAll('.produto-item'))
            ];

            elementsToObserve.forEach(selector => {
                const element = typeof selector === 'string' ? 
                    document.querySelector(selector) : selector;
                if (element) {
                    observer.observe(element);
                }
            });
        }

        // Animações de hover nos botões
        function setupButtonAnimations() {
            const buttons = document.querySelectorAll('.btn');
            
            buttons.forEach(button => {
                button.addEventListener('mouseover', function() {
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                });
                
                button.addEventListener('mouseout', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });

                button.addEventListener('click', function(e) {
                    // Efeito de ripple
                    const ripple = document.createElement('span');
                    ripple.style.position = 'absolute';
                    ripple.style.borderRadius = '50%';
                    ripple.style.background = 'rgba(255,255,255,0.3)';
                    ripple.style.transform = 'scale(0)';
                    ripple.style.animation = 'ripple 0.6s ease-out';
                    ripple.style.left = '50%';
                    ripple.style.top = '50%';
                    ripple.style.width = '100px';
                    ripple.style.height = '100px';
                    ripple.style.marginLeft = '-50px';
                    ripple.style.marginTop = '-50px';
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        // Animação de ripple
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);

        // Parallax suave
        function setupParallax() {
            let ticking = false;
            
            function updateParallax() {
                const scrollY = window.pageYOffset;
                const hero = document.getElementById('hero');
                
                if (hero) {
                    hero.style.transform = `translateY(${scrollY * 0.5}px)`;
                }
                
                ticking = false;
            }
            
            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            }
            
            window.addEventListener('scroll', requestTick, { passive: true });
        }

        // Smooth scroll para links internos
        function setupSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Otimização para touch devices
        function setupTouchOptimization() {
            // Prevenção de bounce no iOS
            document.body.style.overflow = 'auto';
            document.body.style.webkitOverflowScrolling = 'touch';
            
            // Melhoria na responsividade do touch
            const clickableElements = document.querySelectorAll('.btn, .corte-item, .produto-item');
            
            clickableElements.forEach(element => {
                element.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                }, { passive: true });
                
                element.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                }, { passive: true });
            });
        }

        // Redimensionamento responsivo
        function handleResize() {
            const floatingElements = document.getElementById('floatingElements');
            if (floatingElements && isLoaded) {
                floatingElements.innerHTML = '';
                createFloatingElements();
            }
        }

        // Performance optimization
        function setupPerformanceOptimizations() {
            // Throttle resize events
            let resizeTimeout;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(handleResize, 250);
            }, { passive: true });
            
            // Optimize animations for lower-end devices
            const isLowEndDevice = navigator.hardwareConcurrency <= 2;
            if (isLowEndDevice) {
                document.documentElement.style.setProperty('--animation-duration', '0.3s');
                document.documentElement.style.setProperty('--particles-count', '10');
            }
        }

        // Gesture handling for mobile
        function setupMobileGestures() {
            let touchStartY = 0;
            let touchEndY = 0;
            
            document.addEventListener('touchstart', function(e) {
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });
            
            document.addEventListener('touchend', function(e) {
                touchEndY = e.changedTouches[0].screenY;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeDistance = touchStartY - touchEndY;
                const minSwipeDistance = 50;
                
                if (Math.abs(swipeDistance) > minSwipeDistance) {
                    if (swipeDistance > 0) {
                        // Swipe up - scroll to next section
                        scrollToNextSection();
                    } else {
                        // Swipe down - scroll to previous section
                        scrollToPreviousSection();
                    }
                }
            }
            
            function scrollToNextSection() {
                const currentSection = getCurrentSection();
                const sections = ['hero', 'historia', 'cortes', 'produtos'];
                const currentIndex = sections.indexOf(currentSection);
                
                if (currentIndex < sections.length - 1) {
                    const nextSection = document.getElementById(sections[currentIndex + 1]);
                    if (nextSection) {
                        nextSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
            
            function scrollToPreviousSection() {
                const currentSection = getCurrentSection();
                const sections = ['hero', 'historia', 'cortes', 'produtos'];
                const currentIndex = sections.indexOf(currentSection);
                
                if (currentIndex > 0) {
                    const prevSection = document.getElementById(sections[currentIndex - 1]);
                    if (prevSection) {
                        prevSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
            
            function getCurrentSection() {
                const sections = ['hero', 'historia', 'cortes', 'produtos'];
                const scrollPosition = window.pageYOffset + window.innerHeight / 2;
                
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = document.getElementById(sections[i]);
                    if (section && section.offsetTop <= scrollPosition) {
                        return sections[i];
                    }
                }
                return 'hero';
            }
        }

        // Lazy loading for images
        function setupLazyLoading() {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            hideLoading();
            
            // Aguardar um pouco para garantir que o loading foi removido
            setTimeout(() => {
                createScrollObserver();
                setupButtonAnimations();
                setupParallax();
                setupSmoothScroll();
                setupTouchOptimization();
                setupPerformanceOptimizations();
                setupMobileGestures();
                setupLazyLoading();
            }, 100);
        });

        // Preloader para fontes e recursos
        window.addEventListener('load', function() {
            // Garantir que todas as animações estão prontas
            document.body.classList.add('loaded');
        });

        // Fallback para dispositivos muito antigos
        if (!window.IntersectionObserver) {
            // Polyfill básico para navegadores antigos
            const elements = document.querySelectorAll('.historia-image, .historia-text, .section-title, .corte-item, .produto-item');
            elements.forEach(element => {
                element.classList.add('animate-in');
            });
        }

        // Service Worker registration (opcional)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Registrar service worker aqui se necessário
            });
        }

        // Analytics e tracking (placeholder)
        function trackUserInteraction(action, element) {
            // Implementar tracking analytics aqui
            console.log(`User interaction: ${action} on ${element}`);
        }

        // Event listeners para tracking
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn')) {
                trackUserInteraction('button_click', e.target.textContent);
            }
        });

        // Scroll progress indicator
        function createScrollProgress() {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #ff6b35, #f7931e);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
            
            window.addEventListener('scroll', () => {
                const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                progressBar.style.width = scrolled + '%';
            }, { passive: true });
        }

        // Ativar indicador de progresso
        createScrollProgress();

        // Easter egg - sequência de cliques
        let clickSequence = [];
        const secretSequence = ['hero', 'historia', 'cortes', 'produtos'];
        
        document.addEventListener('click', function(e) {
            const sectionId = e.target.closest('section')?.id;
            if (sectionId) {
                clickSequence.push(sectionId);
                if (clickSequence.length > secretSequence.length) {
                    clickSequence.shift();
                }
                
                if (JSON.stringify(clickSequence) === JSON.stringify(secretSequence)) {
                    // Easter egg ativado
                    document.body.style.filter = 'hue-rotate(180deg)';
                    setTimeout(() => {
                        document.body.style.filter = '';
                    }, 2000);
                    clickSequence = [];
                }
            }
        });