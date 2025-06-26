// Global variables
let audioContext = null;
let isAudioEnabled = false;
let pressedKeys = new Set();
let shiftPressed = false;
let oscillators = {};

// Piano key mappings with proper keyboard keys and correct positioning
const pianoKeys = [
    // White keys with their positions
    { name: 'C4', type: 'white', route: 'about', frequency: 261.63, label: 'About', keyboardKey: 'A', position: 0 },
    { name: 'D4', type: 'white', route: 'projects', frequency: 293.66, label: 'Projects', keyboardKey: 'S', position: 1 },
    { name: 'E4', type: 'white', route: 'skills', frequency: 329.63, label: 'Skills', keyboardKey: 'D', position: 2 },
    { name: 'F4', type: 'white', route: 'blog', frequency: 349.23, label: 'Blog', keyboardKey: 'F', position: 3 },
    { name: 'G4', type: 'white', route: 'music', frequency: 392.00, label: 'Music', keyboardKey: 'G', position: 4 },
    { name: 'A4', type: 'white', route: 'contact', frequency: 440.00, label: 'Contact', keyboardKey: 'H', position: 5 },
    { name: 'B4', type: 'white', route: 'home', frequency: 493.88, label: 'Home', keyboardKey: 'J', position: 6 },
    
    // Black keys positioned between white keys
    { name: 'C#4', type: 'black', route: 'about', frequency: 277.18, label: '', keyboardKey: 'W', position: 0.7 },
    { name: 'D#4', type: 'black', route: 'projects', frequency: 311.13, label: '', keyboardKey: 'E', position: 1.7 },
    { name: 'F#4', type: 'black', route: 'blog', frequency: 369.99, label: '', keyboardKey: 'T', position: 3.7 },
    { name: 'G#4', type: 'black', route: 'music', frequency: 415.30, label: '', keyboardKey: 'Y', position: 4.7 },
    { name: 'A#4', type: 'black', route: 'contact', frequency: 466.16, label: '', keyboardKey: 'U', position: 5.7 }
];

// Skills data
const skillsData = [
    // Frontend
    { name: 'HTML5', level: 95, category: 'frontend', color: 'blue', icon: 'fas fa-code' },
    { name: 'CSS3', level: 92, category: 'frontend', color: 'blue', icon: 'fas fa-palette' },
    { name: 'JavaScript', level: 90, category: 'frontend', color: 'blue', icon: 'fas fa-code' },
    { name: 'React', level: 88, category: 'frontend', color: 'blue', icon: 'fas fa-code' },
    { name: 'Vue.js', level: 80, category: 'frontend', color: 'blue', icon: 'fas fa-code' },
    
    // Backend
    { name: 'Node.js', level: 88, category: 'backend', color: 'green', icon: 'fas fa-server' },
    { name: 'Express.js', level: 85, category: 'backend', color: 'green', icon: 'fas fa-server' },
    { name: 'Python', level: 82, category: 'backend', color: 'green', icon: 'fas fa-code' },
    { name: 'PostgreSQL', level: 78, category: 'backend', color: 'green', icon: 'fas fa-database' },
    { name: 'MongoDB', level: 75, category: 'backend', color: 'green', icon: 'fas fa-database' },
    
    // Mobile
    { name: 'React Native', level: 80, category: 'mobile', color: 'purple', icon: 'fas fa-mobile-alt' },
    { name: 'Flutter', level: 70, category: 'mobile', color: 'purple', icon: 'fas fa-mobile-alt' },
    
    // Music Technology
    { name: 'Web Audio API', level: 90, category: 'music-tech', color: 'pink', icon: 'fas fa-music' },
    { name: 'TensorFlow.js', level: 75, category: 'music-tech', color: 'pink', icon: 'fas fa-bolt' },
    { name: 'Audio Processing', level: 85, category: 'music-tech', color: 'pink', icon: 'fas fa-music' },
    { name: 'MIDI Programming', level: 82, category: 'music-tech', color: 'pink', icon: 'fas fa-music' },
    
    // Tools & DevOps
    { name: 'Git & GitHub', level: 95, category: 'tools', color: 'orange', icon: 'fas fa-code' },
    { name: 'Docker', level: 70, category: 'tools', color: 'orange', icon: 'fas fa-server' },
    { name: 'AWS', level: 72, category: 'tools', color: 'orange', icon: 'fas fa-globe' },
    { name: 'Vercel', level: 88, category: 'tools', color: 'orange', icon: 'fas fa-globe' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePiano();
    initializeSkills();
    initializeFloatingNotes();
    initializeScrollAnimations();
    initializeContactForm();
    updateTime();
    showTooltip();
    
    // Set up event listeners
    setupEventListeners();
    
    // Show home page by default
    showPage('home');
});

// Navigation functions
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            showPage(page);
            
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Trigger scroll animations for the new page
    setTimeout(() => {
        triggerScrollAnimations();
    }, 100);
}

// Tooltip functions
function showTooltip() {
    const tooltip = document.getElementById('shortcut-tooltip');
    setTimeout(() => {
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 5000);
    }, 2000);
}

// Piano functions
function initializePiano() {
    createPianoKeyboard();
    createKeyMappingGuide();
    createVisualizer();
    setupAudioContext();
}

function setupAudioContext() {
    const enableAudio = async () => {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            if (audioContext.state === 'suspended') {
                await audioContext.resume();
            }
            
            isAudioEnabled = true;
            updateAudioStatus();
            console.log('Audio context initialized');
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
            isAudioEnabled = false;
        }
    };
    
    // Enable audio on first user interaction
    const handleUserInteraction = () => {
        if (!audioContext) {
            enableAudio();
        }
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
}

function updateAudioStatus() {
    const audioStatus = document.getElementById('audio-status');
    const statusDot = audioStatus.querySelector('.status-dot');
    const statusText = audioStatus.querySelector('span');
    
    if (isAudioEnabled) {
        audioStatus.classList.add('enabled');
        statusText.textContent = 'Audio Ready';
    } else {
        audioStatus.classList.remove('enabled');
        statusText.textContent = 'Click to Enable Audio';
    }
}

function createPianoKeyboard() {
    const pianoKeyboard = document.getElementById('piano-keyboard');
    const whiteKeys = pianoKeys.filter(key => key.type === 'white');
    const blackKeys = pianoKeys.filter(key => key.type === 'black');
    
    // Clear existing content
    pianoKeyboard.innerHTML = '';
    
    // Create container for keys
    const keysContainer = document.createElement('div');
    keysContainer.className = 'piano-keys';
    
    // Create white keys first
    whiteKeys.forEach((key, index) => {
        const keyElement = document.createElement('div');
        keyElement.className = 'piano-key white';
        keyElement.dataset.keyName = key.name;
        keyElement.dataset.frequency = key.frequency;
        keyElement.dataset.route = key.route;
        keyElement.dataset.keyboardKey = key.keyboardKey;
        
        // Add key label
        const keyLabel = document.createElement('div');
        keyLabel.className = 'key-label';
        keyLabel.innerHTML = `
            <div class="key-number">${key.keyboardKey}</div>
            <div class="key-name">${key.label}</div>
        `;
        keyElement.appendChild(keyLabel);
        
        // Add event listeners
        keyElement.addEventListener('mousedown', (e) => handleKeyPress(key, e));
        keyElement.addEventListener('mouseup', () => handleKeyRelease(key.name));
        keyElement.addEventListener('mouseleave', () => handleKeyRelease(key.name));
        keyElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleKeyPress(key);
        });
        keyElement.addEventListener('touchend', (e) => {
            e.preventDefault();
            handleKeyRelease(key.name);
        });
        
        keysContainer.appendChild(keyElement);
    });
    
    // Create black keys and position them absolutely
    blackKeys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = 'piano-key black';
        keyElement.dataset.keyName = key.name;
        keyElement.dataset.frequency = key.frequency;
        keyElement.dataset.route = key.route;
        keyElement.dataset.keyboardKey = key.keyboardKey;
        
        // Position black keys correctly
        const leftPercentage = (key.position / whiteKeys.length) * 100;
        keyElement.style.left = `${leftPercentage}%`;
        
        // Add key label
        const keyLabel = document.createElement('div');
        keyLabel.className = 'key-label';
        keyLabel.innerHTML = `<div class="key-number">${key.keyboardKey}</div>`;
        keyElement.appendChild(keyLabel);
        
        // Add event listeners
        keyElement.addEventListener('mousedown', (e) => handleKeyPress(key, e));
        keyElement.addEventListener('mouseup', () => handleKeyRelease(key.name));
        keyElement.addEventListener('mouseleave', () => handleKeyRelease(key.name));
        keyElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleKeyPress(key);
        });
        keyElement.addEventListener('touchend', (e) => {
            e.preventDefault();
            handleKeyRelease(key.name);
        });
        
        keysContainer.appendChild(keyElement);
    });
    
    pianoKeyboard.appendChild(keysContainer);
}

function createKeyMappingGuide() {
    const mappingGrid = document.getElementById('mapping-grid');
    mappingGrid.innerHTML = '';
    
    const whiteKeys = pianoKeys.filter(key => key.type === 'white');
    
    whiteKeys.forEach(key => {
        const mappingItem = document.createElement('div');
        mappingItem.className = 'mapping-item';
        mappingItem.innerHTML = `
            <div class="mapping-key">${key.keyboardKey}</div>
            <div class="mapping-label">${key.label}</div>
            <div class="mapping-action">${shiftPressed ? 'Navigate to' : 'Play'} ${key.name}</div>
        `;
        mappingGrid.appendChild(mappingItem);
    });
}

function createVisualizer() {
    const visualizerBars = document.getElementById('visualizer-bars');
    visualizerBars.innerHTML = '';
    
    for (let i = 0; i < 14; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.height = '8px';
        visualizerBars.appendChild(bar);
    }
}

function handleKeyPress(key, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    if (pressedKeys.has(key.name)) return;
    
    pressedKeys.add(key.name);
    
    // Visual feedback
    const keyElement = document.querySelector(`[data-key-name="${key.name}"]`);
    if (keyElement) {
        keyElement.classList.add('pressed');
    }
    
    // Play sound
    playNote(key.frequency, key.name);
    
    // Update visualizer
    updateVisualizer();
    
    // Navigate if Shift is pressed and it's a white key
    if (shiftPressed && key.type === 'white') {
        setTimeout(() => {
            showPage(key.route);
        }, 150);
    }
}

function handleKeyRelease(keyName) {
    pressedKeys.delete(keyName);
    
    // Visual feedback
    const keyElement = document.querySelector(`[data-key-name="${keyName}"]`);
    if (keyElement) {
        keyElement.classList.remove('pressed');
    }
    
    // Stop sound
    stopNote(keyName);
    
    // Update visualizer
    updateVisualizer();
}

function playNote(frequency, keyName) {
    if (!audioContext || !isAudioEnabled) return;
    
    try {
        // Stop existing note
        if (oscillators[keyName]) {
            oscillators[keyName].osc.stop();
            delete oscillators[keyName];
        }
        
        // Create new oscillator
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filterNode = audioContext.createBiquadFilter();
        
        // Configure oscillator
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        // Configure filter
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(frequency * 3, audioContext.currentTime);
        filterNode.Q.setValueAtTime(1, audioContext.currentTime);
        
        // Connect nodes
        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // ADSR envelope
        const now = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.1, now + 0.3);
        
        // Start and schedule stop
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1.5);
        
        // Store reference
        oscillators[keyName] = { osc: oscillator, gain: gainNode };
        
        // Clean up when ended
        oscillator.onended = () => {
            delete oscillators[keyName];
        };
        
    } catch (error) {
        console.warn('Error playing note:', error);
    }
}

function stopNote(keyName) {
    if (oscillators[keyName] && audioContext) {
        try {
            const { gain } = oscillators[keyName];
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        } catch (error) {
            console.warn('Error stopping note:', error);
        }
    }
}

function updateVisualizer() {
    const bars = document.querySelectorAll('.visualizer-bar');
    
    if (pressedKeys.size > 0) {
        bars.forEach((bar, index) => {
            const heights = [12, 32, 20, 40, 16, 28, 12, 24, 36, 18, 30, 22, 34, 14];
            const height = heights[index % heights.length];
            bar.style.height = `${height}px`;
            bar.style.transition = 'height 0.3s ease';
        });
    } else {
        bars.forEach(bar => {
            bar.style.height = '8px';
        });
    }
}

function updateModeIndicator() {
    const modeIndicator = document.getElementById('piano-mode-indicator');
    
    if (shiftPressed) {
        modeIndicator.textContent = 'NAVIGATION MODE - Press any white key to navigate';
        modeIndicator.classList.add('navigation');
    } else {
        modeIndicator.textContent = 'PLAY MODE - Press keys to play music';
        modeIndicator.classList.remove('navigation');
    }
    
    // Update mapping guide
    createKeyMappingGuide();
}

// Skills functions
function initializeSkills() {
    renderSkills('all');
    setupSkillsFilter();
}

function setupSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter skills
            const category = button.getAttribute('data-category');
            renderSkills(category);
        });
    });
}

function renderSkills(category) {
    const skillsGrid = document.getElementById('skills-grid');
    skillsGrid.innerHTML = '';
    
    const filteredSkills = category === 'all' 
        ? skillsData 
        : skillsData.filter(skill => skill.category === category);
    
    filteredSkills.forEach((skill, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.style.animationDelay = `${index * 0.1}s`;
        
        skillCard.innerHTML = `
            <div class="skill-header">
                <div class="skill-info">
                    <div class="skill-icon text-${skill.color}">
                        <i class="${skill.icon}"></i>
                    </div>
                    <div class="skill-details">
                        <h3>${skill.name}</h3>
                        <div class="skill-category">${skill.category.replace('-', ' ')}</div>
                    </div>
                </div>
                <div class="skill-level text-${skill.color}">${skill.level}%</div>
            </div>
            <div class="skill-bar-container">
                <div class="skill-bar">
                    <div class="skill-progress bg-${skill.color}" style="width: 0%"></div>
                </div>
                <div class="skill-dots">
                    ${Array.from({ length: 10 }, (_, i) => 
                        `<div class="skill-dot ${i < skill.level / 10 ? `active bg-${skill.color}` : ''}"></div>`
                    ).join('')}
                </div>
            </div>
        `;
        
        skillsGrid.appendChild(skillCard);
        
        // Animate progress bar
        setTimeout(() => {
            const progressBar = skillCard.querySelector('.skill-progress');
            progressBar.style.width = `${skill.level}%`;
        }, 100 + index * 50);
    });
}

// Floating notes animation
function initializeFloatingNotes() {
    const floatingNotes = document.getElementById('floating-notes');
    const noteIcons = ['fas fa-music', 'fas fa-musical-note', 'fas fa-heart'];
    const colors = ['text-blue', 'text-purple', 'text-pink', 'text-green', 'text-cyan'];
    
    function createNote() {
        const note = document.createElement('div');
        note.style.position = 'absolute';
        note.style.left = Math.random() * window.innerWidth + 'px';
        note.style.top = window.innerHeight + 'px';
        note.style.fontSize = (16 + Math.random() * 16) + 'px';
        note.style.opacity = '0.4';
        note.style.pointerEvents = 'none';
        note.style.zIndex = '1';
        
        const icon = document.createElement('i');
        icon.className = noteIcons[Math.floor(Math.random() * noteIcons.length)] + ' ' + 
                        colors[Math.floor(Math.random() * colors.length)];
        note.appendChild(icon);
        
        floatingNotes.appendChild(note);
        
        // Animate
        const duration = 15000 + Math.random() * 10000;
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress >= 1) {
                note.remove();
                return;
            }
            
            const y = window.innerHeight - (progress * (window.innerHeight + 150));
            const x = parseFloat(note.style.left) + Math.sin(progress * Math.PI * 4) * 50;
            const rotation = progress * 360;
            const opacity = Math.sin(progress * Math.PI) * 0.4;
            
            note.style.transform = `translateX(${x - parseFloat(note.style.left)}px) translateY(${y - window.innerHeight}px) rotate(${rotation}deg)`;
            note.style.opacity = opacity;
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // Create notes periodically
    setInterval(createNote, 2000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.stat-item, .project-card, .skill-card, .blog-card, .feature-card');
    animatableElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

function triggerScrollAnimations() {
    const animatableElements = document.querySelectorAll('.scroll-animate');
    animatableElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 100);
    });
}

// Contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Clear previous errors
            clearFormErrors();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitButton = document.getElementById('submit-btn');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            try {
                // Simulate form submission (replace with actual form handler)
                await submitForm(data);
                
                // Show success message
                showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                
            } catch (error) {
                // Show error message
                showFormStatus('Failed to send message. Please try again or contact me directly.', 'error');
            } finally {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

function validateForm(data) {
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!data.subject || data.subject.trim().length < 5) {
        showFieldError('subject', 'Subject must be at least 5 characters long');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    
    inputElements.forEach(el => {
        el.classList.remove('error');
    });
}

function showFormStatus(message, type) {
    const statusElement = document.getElementById('form-status');
    statusElement.textContent = message;
    statusElement.className = `form-status ${type}`;
    statusElement.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 5000);
}

async function submitForm(data) {
    // This is a mock function. In a real application, you would:
    // 1. Send data to your backend server
    // 2. Use a service like EmailJS, Formspree, or Netlify Forms
    // 3. Or integrate with your email service provider
    
    // For demonstration, we'll simulate an API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (90% of the time)
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Simulated network error'));
            }
        }, 2000);
    });
}

// Event listeners
function setupEventListeners() {
    // Keyboard events
    document.addEventListener('keydown', (e) => {
        // Handle Shift + H for home navigation
        if (e.shiftKey && e.key.toLowerCase() === 'h') {
            e.preventDefault();
            showPage('home');
            return;
        }
        
        if (e.key === 'Shift') {
            shiftPressed = true;
            updateModeIndicator();
            return;
        }
        
        // Find key by keyboard key
        const key = pianoKeys.find(k => k.keyboardKey.toLowerCase() === e.key.toLowerCase());
        if (key && !pressedKeys.has(key.name)) {
            e.preventDefault();
            handleKeyPress(key);
        }
    });
    
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Shift') {
            shiftPressed = false;
            updateModeIndicator();
            return;
        }
        
        // Find key by keyboard key
        const key = pianoKeys.find(k => k.keyboardKey.toLowerCase() === e.key.toLowerCase());
        if (key) {
            e.preventDefault();
            handleKeyRelease(key.name);
        }
    });
    
    // Prevent context menu on piano keys
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.piano-key')) {
            e.preventDefault();
        }
    });
}

// Utility functions
function scrollToPiano() {
    const pianoSection = document.getElementById('piano-section');
    if (pianoSection) {
        pianoSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }
}

function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
    }
    
    // Update every second
    setTimeout(updateTime, 1000);
}

// Export functions for global access
window.showPage = showPage;
window.scrollToPiano = scrollToPiano;