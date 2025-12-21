class DropdownMenu {
    constructor() {
        this.dropdowns = document.querySelectorAll('.dropdown');
        console.log('DropdownMenu initialized, found dropdowns:', this.dropdowns.length);
        this.init();
    }

    init() {
        this.dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');

            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Dropdown clicked, toggling...');
                    this.toggleDropdown(dropdown);
                });
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                this.closeAllDropdowns();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });
    }

    toggleDropdown(dropdown) {
        const isOpen = dropdown.classList.contains('open');
        console.log('Toggle dropdown, currently open:', isOpen);
        this.closeAllDropdowns();

        if (!isOpen) {
            dropdown.classList.add('open');
            dropdown.querySelector('.dropdown-trigger').setAttribute('aria-expanded', 'true');
            console.log('Dropdown opened, classes:', dropdown.className);
        }
    }

    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
            const trigger = dropdown.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready, initializing dropdown...');
    new DropdownMenu();
});
