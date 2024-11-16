const footercustom_footer = {
    props: {
        model: Object,
    },
    data() {
        return {
            subnavVisibility: {}, // Tracks visibility of subnav items
            subnavAnimation: {}, // Tracks animation states
            subnavRotated: {}, // Tracks triangle rotation states
            isAnimating: {}       // Tracks animation progress to prevent spamming
,
            hovered: [],
            hoveredSubnav: [],
            lazyLoadedIndex: null,
            navigations: null,
            globaldata: this._global,
            divsperColumn: null,
            email: null,
            emailIsValid: true,
            showEmailValidMessage: false,
            isLoading: false,
            shopranosUrl: null,
            imageError: false,
            menuLeft: false,
            menuCenter: false,
            menuCenterRight: false,
            menuRight: false,
            logoLeft: false,
            logoCenter: false,
            logoCenterRight: false,
            logoRight: false,
            newsletterLeft: false,
            newsletterCenter: false,
            newsletterCenterRight: false,
            newsletterRight: false,
            socialLeft: false,
            socialCenter: false,
            socialCenterRight: false,
            socialRight: false,
            allElements: false,
            twoElements: false,
            threeElements: false,
            logoExists: false,
            menuExists: false,
            newsletterExists: false,
            socialExists: false,
        }
    },
    mounted() {
        this.getPositionOfElements(this.model.areas);
        this.getUrl();
        this._getFooterMenu(e => {
            this.navigations = e;
            if (this.navigations !== null && this.navigations !== undefined) {
                this.divsperColumn = Math.ceil(this.navigations.length / 3);
            }
        });
        this.$nextTick(function () {
            this.setViewportRootVariables();
        });
    },
    methods: {
        toggleSubnav(index) {
            // Ensure subnavVisibility, subnavAnimation, and subnavRotated are initialized
            if (!this.subnavVisibility[index]) {
                this.subnavVisibility[index] = Array(this.AllColumns[index].navigations.length).fill(false);
                this.subnavAnimation[index] = Array(this.AllColumns[index].navigations.length).fill(false);
            }
        
            if (this.subnavRotated[index] === undefined) {
                this.subnavRotated[index] = false;
            }
        
            // Ensure isAnimating is initialized
            if (!this.isAnimating) {
                this.isAnimating = {};
            }
        
            // Prevent toggling if animation is still in progress
            if (this.isAnimating[index]) {
                return;
            }
        
            // Mark as animating to prevent spam
            this.isAnimating[index] = true;
        
            // Rotate the triangle immediately
            this.subnavRotated[index] = !this.subnavRotated[index];
        
            const totalItems = this.AllColumns[index].navigations.length;
        
            if (this.subnavVisibility[index][0]) {
                // Sequentially hide subnav items with smooth fade-out from last to first
                for (let subindex = totalItems - 1; subindex >= 0; subindex--) {
                    setTimeout(() => {
                        this.subnavAnimation[index][subindex] = false; // Fade out item
                    }, (totalItems - subindex - 1) * 500); // 500ms delay for each item (from last to first)
        
                    // Hide after fading out
                    setTimeout(() => {
                        this.subnavVisibility[index][subindex] = false; // Hide item
                    }, (totalItems - subindex - 1) * 500 + 500); // Ensure hiding happens after fade-out
                }
        
                // Wait until all items have faded out before resetting the visibility
                setTimeout(() => {
                    this.subnavVisibility[index] = Array(totalItems).fill(false);
        
                    // Animation completed, allow new toggle
                    this.isAnimating[index] = false;
                }, totalItems * 500 + 500); // Total duration for all items to fade out
            } else {
                // Sequentially show subnav items with smooth fade-in
                this.subnavVisibility[index] = Array(totalItems).fill(true);
                this.AllColumns[index].navigations.forEach((_, subindex) => {
                    setTimeout(() => {
                        this.subnavAnimation[index][subindex] = true; // Fade in item
                    }, subindex * 500); // 300ms delay for each item
                });
        
                // Wait until all items have faded in before starting to allow fade-out again
                setTimeout(() => {
                    // Once all fade-in actions are complete, allow for fade-out
                    this.isAnimating[index] = false;
                }, totalItems * 500 + 500   ); // Total duration for all items to fade in
            }
        }
,        
        
        
        

        
        

        isSubnavVisible(index) {
            return this.subnavVisibility[index] && this.subnavVisibility[index].includes(true);
        }

,        
        
        getPositionOfElements(array) {
            if (array.length === 4) {
                this.allElements = true;
            }
            if (array.length === 3) {
                this.threeElements = true;
            }
            if (array.length === 2) {
                this.twoElements = true;
            }

            var index;
            if (array.indexOf(1) > -1) {
                this.menuExists = true;
                index = array.indexOf(1);
                if (index == 0) {
                    this.menuLeft = true;
                }
                else if (index == 1) {
                    this.menuCenter = true;
                }
                else if (index == 2) {
                    this.menuCenterRight = true;
                }
                else if (index == 3) {
                    this.menuRight = true;
                }
            }

            if (array.indexOf(0) > -1) {
                this.logoExists = true;
                index = array.indexOf(0);
                if (index == 0) {
                    this.logoLeft = true;
                }
                else if (index == 1) {
                    this.logoCenter = true;
                }
                else if (index == 2) {
                    this.logoCenterRight = true;
                }
                else if (index == 3) {
                    this.logoRight = true;
                }
            }

            if (array.indexOf(2) > -1) {
                this.newsletterExists = true;
                index = array.indexOf(2);
                if (index == 0) {
                    this.newsletterLeft = true;
                }
                else if (index == 1) {
                    this.newsletterCenter = true;
                }
                else if (index == 2) {
                    this.newsletterCenterRight = true;
                }
                else if (index == 3) {
                    this.newsletterRight = true;
                }
            }

            if (array.indexOf(3) > -1) {
                this.socialExists = true;
                index = array.indexOf(3);
                if (index == 0) {
                    this.socialLeft = true;
                }
                else if (index == 1) {
                    this.socialCenter = true;
                }
                else if (index == 2) {
                    this.socialCenterRight = true;
                }
                else if (index == 3) {
                    this.socialRight = true;
                }
            }
        },
        getUrl() {
            var culture = this._getCulture();
            this.shopranosUrl = "https://shopranos.eu/";
            if (culture === "el-GR") {
                this.shopranosUrl = "https://shopranos.gr/"
            }
        },
        handleImageError() {
            this.imageError = true;
        },
        setViewportRootVariables() {
            var root = document.querySelector(':root');
            var footerHeight = (document.querySelector('footer') != null) ? document.querySelector('footer').clientHeight : 0;

            "load change resize".split(" ").forEach(function (e) {
                window.addEventListener(e, setViewportVariables, false);
            });

            function setViewportVariables() {
                footerHeight = (document.querySelector('footer') != null) ? document.querySelector('footer').clientHeight : 0;

                root.style.setProperty('--fh', `${footerHeight}px`);
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
            } else
                this.emailIsValid = true;
            return valid;
        }
    },
    computed: {
        AllColumns: {
            get() {
                return this.navigations === null ? [] : this.navigations;
            }
        }
    }
}

app.component('footercustom_footer', {
    extends: footercustom_footer,
    template: '#footercustom_footer'
});