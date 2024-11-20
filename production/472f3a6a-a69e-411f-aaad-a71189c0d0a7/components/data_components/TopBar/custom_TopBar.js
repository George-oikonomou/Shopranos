const topbarcustom_topbar = {
    props: {
        model: Object
    },
    data() {
        return {
            fragments: [],
            currentIndex: 0,
            displayedText: '',
            charIndex: 0,
            fadingOut: false,
            visibleStyle: {
                opacity: 1,
                transition: 'opacity 1s ease'
            },
            fadeOutStyle: {
                opacity: 0,
                transition: 'opacity 1s ease'  
            }
        };
    },
    methods: {
       
        splitText() {
            this.fragments = this.model.text.split('_');
        },

        displayNextFragment() {
            const currentFragment = this.fragments[this.currentIndex];
        
            if (this.charIndex < currentFragment.length) {
                this.displayedText += currentFragment[this.charIndex];
                this.charIndex++;
                // Faster typing speed (reduced timeout to 20ms)
                setTimeout(() => this.displayNextFragment(), 50); 
            } else {
                // Delay fade-out 2 seconds after typing finishes
                setTimeout(() => {
                    this.fadingOut = true; 
                    setTimeout(() => this.showNextFragment(), 500); // Shorter fade-out transition
                }, 2000); // 2-second delay after text finishes typing
            }
        },
        showNextFragment() {
            this.fadingOut = false; // Reset fading state
            this.displayedText = ''; // Clear displayed text
            this.charIndex = 0; // Reset character index
            this.currentIndex = (this.currentIndex + 1) % this.fragments.length; // Move to the next fragment
            this.startTyping(); // Start typing the next fragment
        },
        startTyping() {
            this.displayNextFragment();
        }
    },
    mounted() {
        this.splitText(); 
        this.startTyping(); 
    }
};

app.component('topbarcustom_topbar', {
    extends: topbarcustom_topbar,
    template: '#topbarcustom_topbar'
});
