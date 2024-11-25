const subscribenewslettercustom_newsletter = {
    props: {
        model: Object
    },
    data() {
        return {
            header: this.model.header,
            subHeader: this.model.subHeader,
            buttonText: this.model.buttonText,
            email: null,
            emailIsValid: true,
            showEmailValidMessage: false,
            isLoading: false,
            imgUrl: this.model.image != null ? this.model.image.link : null,
            imgAlt: this.model.image != null ? this.model.image.alt : null,
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
        subscribeEmail() {
            this.showEmailValidMessage = false;
            if (this.validEmail(this.email)) {
                this.isLoading = true;
                this._subscribeToNewsletter(this.email, e => {
                    this.email = null;
                    this.showEmailValidMessage = true;
                    this.isLoading = false;
                    setTimeout(() => {
                        this.showEmailValidMessage = false;
                    }, 3000);
                });
            }
        },
        validEmail(email) {
            var valid = true;
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(email)) {
                this.emailIsValid = false;
                valid = false;
            } else {
                this.emailIsValid = true;
            }
            return valid;
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
                threshold: 0.1 // Trigger when 10% of the element is visible
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
    mounted() {
        // Add `fade-in` class to elements for animations
        const elements = document.querySelectorAll(".col-md-5, .text-center");
        elements.forEach((el) => el.classList.add("fade-in"));

        // Initialize scroll animations
        this.observeElements();

        // Add scroll event listener for resetting animations
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};

app.component('subscribenewslettercustom_newsletter', {
    extends: subscribenewslettercustom_newsletter,
    template: '#subscribenewslettercustom_newsletter'
});
