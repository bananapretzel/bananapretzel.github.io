// Simple Burger Menu - Matching the existing CSS structure
import getFocusableElements from './get-focusable-elements.js';

class SimpleBurgerMenu {
    constructor() {
        this.burgerMenu = document.querySelector('.burger-menu');
        this.trigger = document.querySelector('.burger-menu__trigger');
        this.panel = document.querySelector('.burger-menu__panel');
        this.isOpen = false;
        this.isEnabled = false;
        this.previouslyFocused = null;
        this._boundKeydown = (e) => this.handleKeydown(e);

        if (this.trigger && this.panel && this.burgerMenu) {
            this.init();
        }
    }

    init() {
        // Handle click events
        this.trigger.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest('.burger-menu')) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Handle responsive behavior
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        this.updateAttributes();

        // Focus the first focusable element inside the panel for accessibility
        const focusables = Array.from(getFocusableElements(this.panel));
        if (focusables.length) {
            focusables[0].focus();
        } else {
            // Fallback to the panel itself
            this.panel.setAttribute('tabindex', '-1');
            this.panel.focus();
        }

        // Trap focus within the panel
        document.addEventListener('keydown', this._boundKeydown);

        // Prevent body scroll while menu is open
        this.lockScroll();
    }

    closeMenu() {
        this.isOpen = false;
        this.updateAttributes();

        // Restore focus to the trigger
        if (this.previouslyFocused && this.previouslyFocused.focus) {
            this.previouslyFocused.focus();
        } else if (this.trigger) {
            this.trigger.focus();
        }

        document.removeEventListener('keydown', this._boundKeydown);
        this.unlockScroll();
    }

    updateAttributes() {
        // Update the burger menu container attributes to match CSS
        this.burgerMenu.setAttribute('enabled', this.isEnabled ? 'true' : 'false');
        this.burgerMenu.setAttribute('status', this.isOpen ? 'open' : 'closed');

        // Update ARIA attributes
        this.trigger.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
        this.trigger.setAttribute('aria-label', this.isOpen ? 'Close menu' : 'Open menu');

        // Manage aria-hidden on the panel for screen readers
        if (this.isEnabled) {
            this.panel.setAttribute('aria-hidden', this.isOpen ? 'false' : 'true');
        } else {
            this.panel.setAttribute('aria-hidden', 'false');
        }
    }

    handleKeydown(e) {
        if (!this.isOpen || !this.isEnabled) return;

        if (e.key === 'Tab') {
            const focusables = Array.from(getFocusableElements(this.panel));
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    lockScroll() {
        // Avoid double-adding styles; preserve original overflow value in a dataset
        const body = document.body;
        if (!body.dataset.prevOverflow) {
            body.dataset.prevOverflow = body.style.overflow || '';
        }
        body.style.overflow = 'hidden';
    }

    unlockScroll() {
        const body = document.body;
        if (body.dataset.prevOverflow !== undefined) {
            body.style.overflow = body.dataset.prevOverflow;
            delete body.dataset.prevOverflow;
        } else {
            body.style.overflow = '';
        }
    }

    handleResize() {
        // Enable burger menu on smaller screens (matches CSS breakpoint behavior)
        const shouldEnable = window.innerWidth <= 768;

        if (shouldEnable !== this.isEnabled) {
            this.isEnabled = shouldEnable;

            // Auto-close menu when switching to larger screens
            if (!this.isEnabled && this.isOpen) {
                this.closeMenu();
            }
            // Ensure attributes reflect current state
            this.updateAttributes();
            // Clean up scroll state if disabling
            if (!this.isEnabled) {
                this.unlockScroll();
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SimpleBurgerMenu();
});