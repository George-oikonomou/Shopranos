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
                setTimeout(this.displayNextFragment, 60);
            } else {
                setTimeout(() => {
                    this.fadingOut = true; 
                    setTimeout(this.showNextFragment, 1500); 
                }, 500);
            }
        },
        showNextFragment() {
            
            this.fadingOut = false;
            this.displayedText = '';
            this.charIndex = 0;

           
            this.currentIndex = (this.currentIndex + 1) % this.fragments.length;

           
            this.startTyping();
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
