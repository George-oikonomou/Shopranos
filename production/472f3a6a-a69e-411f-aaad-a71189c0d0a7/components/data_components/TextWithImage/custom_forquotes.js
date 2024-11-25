const textwithimagecustom_forquotes = {
    props: {
        model: Object
    },
    data() {
        return {
            imgUrl: this.model.image != null ? this.model.image.link : null,
            imgAlt: this.model.header,
            image: this.model.imageOrientation,
            text: this.model.textOrientation,
            cleanedText: '',
            imageClass: "col-md-6 fade-in",
            textClass: "col-md-6 fade-in",
            genTextClass: "",
            imagePosition: this.model.imagePosition !== null ? this.model.imagePosition : 0,
            hasText: (this.model.header !== null && this.model.header != '') || (this.model.subHeader !== null) || (this.model.text !== null) || (this.model.buttonText !== null && this.model.buttonLink !== null)
        }
    },
    methods: {
        getAlignmentClass(alignment) {
            switch (alignment) {
                case 1:
                    return 'justify-content-start';
                case 2:
                    return 'justify-content-center';
                case 3:
                    return 'justify-content-end';
                default:
                    return '';
            }
        },
        getCleanedModelText() {
            if (this.model.text === null) {
                return;
            }
            this.cleanedText = this.model.text
                .replace(/^\s*<p>&quot;/, '') // Removes <p>&quot; at the start
                .replace(/&quot;<\/p>\s*$/, '') // Removes &quot;</p> at the end
                .replace(/&quot;\.<\/p>\s*$/, ''); // Removes &quot;.</p> at the end
        },
        handleIntersection(entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-visible");
                    observer.unobserve(entry.target); // Stop observing after it's visible
                }
            });
        },
        observeElements() {
            const observer = new IntersectionObserver(this.handleIntersection, {
                threshold: 0.3 // Trigger when 30% of the element is visible
            });

            const elements = document.querySelectorAll(".fade-in");
            elements.forEach((el) => observer.observe(el));
        },
        resetAnimations() {
            const elements = document.querySelectorAll(".fade-in-visible");
            elements.forEach((el) => {
                el.classList.remove("fade-in-visible");
                el.classList.add("fade-in");
            });

            // Reinitialize the observer
            this.observeElements();
        },
        handleScroll() {
            if (window.scrollY === 0) {
                this.resetAnimations();
            }
        }
    },
    created() {
        if (this.hasText) {
            if (this.text === 1) {
                this.genTextClass = "text-end right";
            } else if (this.text === 2) {
                this.genTextClass = "text-center center";
            }
        }
        if (this.imgUrl === null) {
            this.textClass = "col-12 fade-in";
        } else {
            if (this.model.image.alt) {
                this.imgAlt = this.model.image.alt;
            }
            if (this.image === 1) {
                this.genImageClass = "text-end right";
            } else if (this.image === 2) {
                this.genImageClass = "text-center center";
            }
            if (this.hasText) {
                if (this.imagePosition === 1) {
                    this.imageClass = "col-md-6 order-md-last fade-in";
                } else if (this.imagePosition === 2) {
                    this.imageClass = "col-12 fade-in";
                    this.textClass = "col-12 pt-5 fade-in";
                } else if (this.imagePosition === 3) {
                    this.imageClass = "col-12 order-md-last fade-in";
                    this.textClass = "col-12 pb-5 fade-in";
                }
            } else {
                this.imageClass = "col-12 fade-in";
            }
        }
    },
    mounted() {
        this.getCleanedModelText();

        // Initialize scroll animations
        this.observeElements();

        // Add scroll event listener for resetting animations
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};

app.component('textwithimagecustom_forquotes', {
    extends: textwithimagecustom_forquotes,
    template: '#textwithimagecustom_forquotes'
});
