// AgentOS Demo Application
class AgentOS {
    constructor() {
        this.currentScreen = 1;
        this.screens = {};
        this.currentVendor = null;
        this.isSubscribed = false; // Track subscription status
        this.init();
    }

    init() {
        this.currentScreen = 1; // Initialize current screen
        this.cacheElements();
        this.bindEvents();
        this.updateDateTime();
        this.startDateTimeUpdate();
        this.setupAnimations();
        
        // Ensure unified quote section is hidden initially
        const unifiedQuoteSection = document.querySelector('.unified-quote-section');
        if (unifiedQuoteSection) {
            unifiedQuoteSection.style.display = 'none';
        }
    }

    cacheElements() {
        // Cache all screen elements
        this.screens = {
            1: document.getElementById('screen-1'),
            2: document.getElementById('screen-2'),
            3: document.getElementById('screen-3'),
            4: document.getElementById('screen-4'),
            5: document.getElementById('screen-5'),
            6: document.getElementById('screen-6')
        };

        // Cache input elements
        this.mainInput = document.getElementById('main-input');
        this.sendBtn = document.getElementById('send-btn');
        this.micBtn = document.getElementById('mic-btn');

        // Cache navigation elements
        this.backToHome = document.getElementById('back-to-home');
        this.backToComparison = document.getElementById('back-to-comparison');
        this.dismissBtn = document.getElementById('dismiss-btn');
        this.dismissVendor = document.getElementById('dismiss-vendor');

        // Cache vendor views
        this.copperheadView = document.getElementById('copperhead-view');
        this.kristechView = document.getElementById('kristech-view');

        // Cache option cards
        this.optionCards = document.querySelectorAll('.option-card');
    }

    bindEvents() {
        // Input field events
        this.mainInput.addEventListener('input', this.handleInputChange.bind(this));
        this.mainInput.addEventListener('keypress', this.handleKeyPress.bind(this));
        this.mainInput.addEventListener('focus', this.handleInputFocus.bind(this));
        this.mainInput.addEventListener('blur', this.handleInputBlur.bind(this));
        this.sendBtn.addEventListener('click', this.handleSendClick.bind(this));
        this.micBtn.addEventListener('click', this.handleMicClick.bind(this));

        // Navigation events
        this.backToHome.addEventListener('click', () => this.navigateToScreen(1));
        this.backToComparison.addEventListener('click', () => this.navigateToScreen(2));
        this.dismissBtn.addEventListener('click', () => this.navigateToScreen(1));
        this.dismissVendor.addEventListener('click', () => this.navigateToScreen(1));

        // Option card events
        this.optionCards.forEach(card => {
            card.addEventListener('click', this.handleOptionCardClick.bind(this));
        });

        // Shortcut card events
        document.querySelectorAll('.shortcut-card').forEach(card => {
            card.addEventListener('click', this.handleShortcutClick.bind(this));
        });

        // Reply button event
        document.querySelector('.reply-btn').addEventListener('click', this.handleReplyClick.bind(this));

        // Quote button events
        document.querySelectorAll('.quote-btn-large').forEach(btn => {
            btn.addEventListener('click', this.handleQuoteRequest.bind(this));
        });

        // Fixed CTA button events
        document.querySelectorAll('.fixed-quote-btn').forEach(btn => {
            btn.addEventListener('click', this.handleQuoteRequest.bind(this));
        });

        // Unified quote section event
        const unifiedQuoteSection = document.getElementById('unified-quote-section');
        if (unifiedQuoteSection) {
            unifiedQuoteSection.addEventListener('click', this.handleUnifiedQuoteRequest.bind(this));
        }

        // NY Times story card events
        document.querySelectorAll('.nyt-story').forEach(story => {
            story.addEventListener('click', this.handleNYTStoryClick.bind(this));
        });

        // NY Times breaking news event
        const nytBreaking = document.querySelector('.nyt-breaking');
        if (nytBreaking) {
            nytBreaking.addEventListener('click', this.handleNYTStoryClick.bind(this));
        }

        // NY Times subscribe button event
        const nytSubscribeBtn = document.querySelector('.nyt-subscribe-btn');
        if (nytSubscribeBtn) {
            nytSubscribeBtn.addEventListener('click', this.handleNYTSubscribeClick.bind(this));
        }

        // NY Times back button events
        document.querySelectorAll('.nyt-header .back-btn').forEach(btn => {
            btn.addEventListener('click', this.handleNYTBackClick.bind(this));
        });

        // NY Times continue button event
        const nytContinueBtn = document.querySelector('.nyt-continue-btn');
        if (nytContinueBtn) {
            nytContinueBtn.addEventListener('click', this.handleNYTContinueClick.bind(this));
        }
    }

    handleInputChange(event) {
        const hasText = event.target.value.trim().length > 0;
        this.sendBtn.disabled = !hasText;
        
        // Add typing animation
        if (hasText) {
            this.sendBtn.classList.add('typing');
        } else {
            this.sendBtn.classList.remove('typing');
        }
    }

    handleInputFocus() {
        console.log('Input focused - applying focus-active classes');
        
        // Add focus-active class to screen-1 and elements that should move up
        document.querySelector('#screen-1').classList.add('focus-active');
        document.querySelector('.shortcuts').classList.add('focus-active');
        document.querySelector('.personal-message').classList.add('focus-active');
        
        // Add padding to body to prevent content from being hidden behind fixed input
        document.body.style.paddingBottom = 'calc(60vh + 30px)';
        
        console.log('Focus-active classes applied, body padding updated');
    }

    handleInputBlur() {
        console.log('Input blurred - removing focus-active classes');
        
        // Remove focus-active class from screen-1 and elements
        document.querySelector('#screen-1').classList.remove('focus-active');
        document.querySelector('.shortcuts').classList.remove('focus-active');
        document.querySelector('.personal-message').classList.remove('focus-active');
        
        // Remove padding from body
        document.body.style.paddingBottom = '0';
        
        console.log('Focus-active classes removed, body padding reset');
    }

    handleKeyPress(event) {
        if (event.key === 'Enter' && !event.shiftKey && !this.sendBtn.disabled) {
            event.preventDefault();
            this.handleSendClick();
        }
    }

    handleSendClick() {
        const inputValue = this.mainInput.value.trim();
        if (inputValue.length === 0) return;

        // Simulate AI processing
        this.simulateAIProcessing(() => {
            this.navigateToScreen(2);
            this.mainInput.value = '';
            this.sendBtn.disabled = true;
        });
    }

    handleMicClick() {
        // Simulate voice input
        this.simulateVoiceInput();
    }

    handleOptionCardClick(event) {
        const card = event.currentTarget;
        const vendor = card.dataset.vendor;
        this.currentVendor = vendor;
        
        // Add click animation
        card.classList.add('clicked');
        setTimeout(() => card.classList.remove('clicked'), 200);

        // Navigate to vendor screen
        this.navigateToScreen(3);
        this.showVendorView(vendor);
    }

    handleShortcutClick(event) {
        console.log('Shortcut clicked!');
        
        try {
            const card = event.currentTarget;
            console.log('Card element:', card);
            
            const textElement = card.querySelector('.shortcut-text');
            console.log('Text element:', textElement);
            
            if (!textElement) {
                console.error('Could not find shortcut-text element');
                return;
            }
            
            const text = textElement.textContent;
            console.log('Shortcut text:', text);
            
            // Check if this is the NY Times shortcut
            if (text.includes('New York Times')) {
                console.log('NY Times shortcut detected, navigating to screen 4');
                this.navigateToScreen(4);
            } else {
                console.log('Other shortcut detected, showing activation toast');
                // Simulate shortcut activation for other shortcuts
                this.simulateShortcutActivation(text);
            }
        } catch (error) {
            console.error('Error in handleShortcutClick:', error);
        }
    }

    handleReplyClick() {
        // Simulate reply functionality
        this.simulateReply();
    }

    handleQuoteRequest(event) {
        event.preventDefault();
        const vendor = this.currentVendor || 'vendor';
        
        // Simulate quote request
        this.simulateQuoteRequest(vendor);
    }

    handleUnifiedQuoteRequest() {
        this.showVendorView('copperhead');
        this.navigateToScreen(3);
    }

    handleNYTStoryClick(event) {
        const story = event.currentTarget;
        const targetScreen = story.getAttribute('data-screen');
        if (targetScreen) {
            if (this.isSubscribed) {
                // If subscribed, go to article page (Screen 6)
                this.navigateToScreen(6);
            } else {
                // If not subscribed, go to paywall (Screen 5)
                this.navigateToScreen(parseInt(targetScreen));
            }
        }
    }

    handleNYTSubscribeClick(event) {
        const button = event.currentTarget;
        const targetScreen = button.getAttribute('data-screen');
        if (targetScreen) {
            // Mark as subscribed and go to paywall
            this.isSubscribed = true;
            this.navigateToScreen(parseInt(targetScreen));
        }
    }

    handleNYTBackClick(event) {
        const button = event.currentTarget;
        const targetScreen = button.getAttribute('data-screen');
        if (targetScreen) {
            this.navigateToScreen(parseInt(targetScreen));
        }
    }

    handleNYTContinueClick(event) {
        // Mark as subscribed and go back to Screen 4
        this.isSubscribed = true;
        this.navigateToScreen(4);
    }

    showVendorView(vendor) {
        // Hide all vendor views and CTAs
        this.copperheadView.style.display = 'none';
        this.kristechView.style.display = 'none';
        
        document.querySelectorAll('.fixed-cta').forEach(cta => {
            cta.style.display = 'none';
        });

        // Hide NY Times CTA and unified quote section when showing vendor view
        const nytCta = document.querySelector('.nyt-fixed-cta');
        if (nytCta) {
            nytCta.style.display = 'none';
        }
        
        const unifiedQuoteSection = document.querySelector('.unified-quote-section');
        if (unifiedQuoteSection) {
            unifiedQuoteSection.style.display = 'none';
        }

        // Show selected vendor view and CTA
        if (vendor === 'copperhead') {
            this.copperheadView.style.display = 'block';
            this.copperheadView.classList.add('fade-in');
            document.getElementById('copperhead-cta').style.display = 'block';
        } else if (vendor === 'kristech') {
            this.kristechView.style.display = 'block';
            this.kristechView.classList.add('fade-in');
            document.getElementById('kristech-cta').style.display = 'block';
        }
    }



    navigateToScreen(screenNumber) {
        console.log(`navigateToScreen called with screenNumber: ${screenNumber}`);
        console.log(`Current screen: ${this.currentScreen}`);
        console.log(`Available screens:`, Object.keys(this.screens));
        
        if (screenNumber === this.currentScreen) {
            console.log('Already on this screen, returning');
            return;
        }

        const currentScreenEl = this.screens[this.currentScreen];
        const targetScreenEl = this.screens[screenNumber];

        console.log('Current screen element:', currentScreenEl);
        console.log('Target screen element:', targetScreenEl);

        if (!currentScreenEl || !targetScreenEl) {
            console.error('Screen elements not found');
            return;
        }

        // Hide all fixed CTAs first
        document.querySelectorAll('.fixed-cta, .nyt-fixed-cta, .unified-quote-section').forEach(cta => {
            cta.style.display = 'none';
        });

        // Hide current screen
        currentScreenEl.style.display = 'none';
        currentScreenEl.classList.remove('active');

        // Show target screen
        targetScreenEl.style.display = 'block';
        targetScreenEl.classList.add('active');

        // Update current screen
        this.currentScreen = screenNumber;
        console.log(`Updated current screen to: ${this.currentScreen}`);

        // Show appropriate fixed CTA based on screen
        if (screenNumber === 2) {
            // Show unified quote section on comparison screen
            const unifiedQuoteSection = document.querySelector('.unified-quote-section');
            if (unifiedQuoteSection) {
                unifiedQuoteSection.style.display = 'block';
                console.log('Showing unified quote section');
            }
        } else if (screenNumber === 4 && !this.isSubscribed) {
            // Show NY Times CTA only if not subscribed
            const nytCta = document.querySelector('.nyt-fixed-cta');
            if (nytCta) {
                nytCta.style.display = 'block';
                console.log('Showing NY Times CTA');
            }
        } else {
            // Hide unified quote section on all other screens
            const unifiedQuoteSection = document.querySelector('.unified-quote-section');
            if (unifiedQuoteSection) {
                unifiedQuoteSection.style.display = 'none';
                console.log('Hiding unified quote section');
            }
        }

        // Update all time displays
        this.updateAllTimeDisplays();

        // Add entrance animation to new screen content
        setTimeout(() => {
            this.addEntranceAnimations(screenNumber);
        }, 100);
    }

    addEntranceAnimations(screenNumber) {
        const screen = this.screens[screenNumber];
        
        if (screenNumber === 2) {
            // Comparison screen animations
            const title = screen.querySelector('.comparison-title');
            const cards = screen.querySelectorAll('.option-card');
            
            title.classList.add('slide-up');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('slide-up');
                }, index * 100);
            });
        } else if (screenNumber === 3) {
            // Vendor screen animations
            const hero = screen.querySelector('.vendor-hero');
            const content = screen.querySelector('.vendor-content');
            const cta = screen.querySelector('.vendor-cta');
            
            hero.classList.add('fade-in');
            setTimeout(() => content.classList.add('slide-up'), 200);
            setTimeout(() => cta.classList.add('slide-up'), 400);
        }
    }

    simulateAIProcessing(callback) {
        // Show loading state
        this.sendBtn.classList.add('loading');
        this.sendBtn.innerHTML = '<svg><use href="#icon-loading"/></svg>';
        
        // Simulate processing delay
        setTimeout(() => {
            this.sendBtn.classList.remove('loading');
            this.sendBtn.innerHTML = '<svg><use href="#icon-send"/></svg>';
            callback();
        }, 1500);
    }

    simulateVoiceInput() {
        // Simulate voice input with visual feedback
        this.micBtn.style.background = 'var(--accent-blue)';
        this.micBtn.style.color = 'white';
        
        // Simulate voice processing
        setTimeout(() => {
            this.micBtn.style.background = 'none';
            this.micBtn.style.color = 'var(--text-secondary)';
            
            // Simulate voice-to-text result
            this.mainInput.value = 'I need 6AWG pipe bursting tracer wire for my Folsom HDD project';
            this.handleInputChange({ target: this.mainInput });
        }, 2000);
    }

    simulateShortcutActivation(text) {
        // Simulate shortcut activation
        const notification = this.createNotification(`Activating: ${text}`);
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    simulateReply() {
        // Simulate reply functionality
        const notification = this.createNotification('Reply sent to your wife');
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    simulateQuoteRequest(vendor) {
        // Simulate quote request
        const vendorName = vendor === 'copperhead' ? 'Copperhead Industries' : 'Kris-Tech Wire';
        const notification = this.createNotification(`Quote request sent to ${vendorName}`);
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    simulateUnifiedQuoteRequest() {
        // Simulate unified quote request for both suppliers
        const notification = this.createNotification('Quote requests sent to both Copperhead Industries and Kris-Tech Wire');
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    createNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification fade-in';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-blue);
            color: white;
            padding: 16px 24px;
            border-radius: var(--border-radius-small);
            box-shadow: var(--shadow-medium);
            z-index: 1000;
            font-weight: 500;
            max-width: 90%;
            text-align: center;
        `;
        
        return notification;
    }

    updateDateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        const dateString = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
        });

        // Update all time displays
        document.querySelectorAll('.time').forEach(el => {
            el.textContent = timeString;
        });
        
        document.querySelectorAll('.date').forEach(el => {
            el.textContent = dateString;
        });
    }

    updateAllTimeDisplays() {
        this.updateDateTime();
    }

    startDateTimeUpdate() {
        // Update time every minute
        setInterval(() => {
            this.updateDateTime();
        }, 60000);
    }

    setupAnimations() {
        // Add initial animations to home screen
        const homeElements = [
            document.querySelector('.time-section'),
            document.querySelector('.weather'),
            ...document.querySelectorAll('.shortcut-card'),
            document.querySelector('.personal-message'),
            document.querySelector('.input-section')
        ];

        homeElements.forEach((el, index) => {
            if (el) {
                setTimeout(() => {
                    el.classList.add('fade-in');
                }, index * 100);
            }
        });

        // Start the demo typing sequence after initial animations
        setTimeout(() => {
            this.startDemoTyping();
        }, 2000);
    }

    startDemoTyping() {
        console.log('Starting demo typing sequence...');
        const demoText = "I need 6AWG pipe bursting tracer wire for my Folsom HDD project";
        let currentIndex = 0;
        
        // Focus the input field
        this.mainInput.focus();
        console.log('Input field focused');
        
        // Manually trigger focus behavior since the demo focuses programmatically
        this.handleInputFocus();
        
        // Check if textarea expanded
        setTimeout(() => {
            const computedHeight = window.getComputedStyle(this.mainInput).height;
            console.log('Textarea height after focus:', computedHeight);
        }, 100);
        
        // Simulate typing character by character
        const typeInterval = setInterval(() => {
            if (currentIndex < demoText.length) {
                this.mainInput.value = demoText.substring(0, currentIndex + 1);
                this.handleInputChange({ target: this.mainInput });
                currentIndex++;
                console.log(`Typed character ${currentIndex}/${demoText.length}`);
            } else {
                clearInterval(typeInterval);
                console.log('Typing complete, waiting to send...');
                
                // Wait a moment, then simulate the send button click
                setTimeout(() => {
                    console.log('Simulating send button click...');
                    this.handleSendClick();
                }, 1000);
            }
        }, 100); // Type each character every 100ms
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AgentOS();
});

// Add touch support for mobile devices
document.addEventListener('touchstart', () => {}, { passive: true });

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
    .typing {
        animation: pulse 1s infinite;
    }
    
    .clicked {
        transform: scale(0.95) !important;
    }
    
    .notification {
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1.1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    /* Enhanced hover effects for desktop */
    @media (hover: hover) {
        .shortcut-card:hover {
            transform: translateY(-4px) scale(1.02);
        }
        
        .option-card:hover {
            transform: translateY(-4px) scale(1.01);
        }
    }
    
    /* Loading animation for send button */
    .loading {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
