const bannercarouselcustom_carouselll = {
    props: {
        model: Object
    },
    data() {
        return {
            banners: this.model.banners,
            pattern: [],
            fullWidth: this.model.bannerExtended ? this.model.bannerExtended : false,
            textClass: '',
            imageClass: '',
            carouselLoaded: false,
            customSlideDefinition: 1
        }
    },
    mounted() {
        this.carouselInitialization();
    },
    methods: {
        carouselInitialization() {
            if (this.model.columns > 4) {
                this.customSlideDefinition = 2;
            } else {
                this.customSlideDefinition = this.model.columns;
            }

            let swiper = new Swiper(".banners-carousel-" + this.model.id, {
                loop: true,
                freeMode: false,
                effect: 'coverflow', // Switch to 'coverflow' for better multi-slide views
                coverflowEffect: {
                    rotate: 30, // Adjust rotation for a 3D effect
                    stretch: 10, // Space between slides
                    depth: 200, // Depth of the 3D effect
                    modifier: 1, // Control the intensity of the effect
                    slideShadows: true,
                },
                watchSlidesProgress: true,
                pagination: {
                    el: ".swiper-pagination-" + this.model.id,
                    clickable: true
                },
                navigation: {
                    nextEl: ".swiper-button-next-" + this.model.id,
                    prevEl: ".swiper-button-prev-" + this.model.id,
                },
                slidesPerView: 1, // For screens smaller than 700px
                slidesPerGroup: 1,
                spaceBetween: 10,
                autoplay: {
                    delay: 6000,   // Autoplay every 6 seconds
                    disableOnInteraction: true
                },
                breakpoints: {
                    700: {
                        slidesPerView: this.customSlideDefinition,
                        slidesPerGroup: 1,
                        spaceBetween: 10,
                    },
                }
            });
            this.carouselLoaded = true;
        },
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
        getBannerAlignmentElement(alignment) {
            switch (alignment) {
                case 0:
                    return 'leftAlign';
                case 1:
                    return 'rightAlign';
                case 2:
                    return 'centerAlign';
                default:
                    return '';
            }
        },
        getBannerHeight() {
            switch (this.model.bannerHeight) {
                case 1:
                    return 'smallHeight';
                case 2:
                    return 'regularHeight';
                case 3:
                    return 'fullHeight';
                default:
                    return '';
            }
        },
        getClassNameByColumns() {
            switch (this.model.columns) {
                case 1:
                    return 'oneCols';
                case 2:
                    return 'twoCols';
                case 3:
                    return 'thirdCols';
                case 4:
                    return 'fourCols';
                case 5:
                    return 'unequalCols-2-1';
                case 6:
                    return 'unequalCols-1-2';
                default:
                    return '';
            }
        }
    }
}

app.component('bannercarouselcustom_carouselll', {
    extends: bannercarouselcustom_carouselll,
    template: '#bannercarouselcustom_carouselll'
});
