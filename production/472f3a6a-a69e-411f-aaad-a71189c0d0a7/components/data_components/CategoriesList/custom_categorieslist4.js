const categorieslistcustom_categorieslist4 = {
    props: {
        model: Object
    },
    data() {
        return {
            navigations: null,
            categories: null,
            categoryTitle: ''
        };
    },
    computed: {
        getCategoryDescription() {
            return (categoryAlias) => {
                const cleanAlias = categoryAlias.split('/').pop();
                let description = "";
                this._findCategoryByAlias(cleanAlias, category => {
                    description = category.description;
                });
                return description;
            };
        },
        getCustomNavigationTitle() {
            console.log("Nav Title " + this.navigationTitle);
            return this.navigationTitle;
        },
        categoriesWithTitles() {
            return this.categories.map(category => ({
              ...category,
              dataText: `Discover ${category.title} ...`,
            }));
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
        getImage(category) {
            if (category.image === null || category.image === undefined || category.image.link === null || category.image.link === undefined) {
                var link = this._getNoImageUrl();
                if (link !== null) {
                    return link;
                }
                return "/images/no_image.png";
            }
            return category.image.link;
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
                rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters viewport
                threshold: 0.1
            });

            // Select all category rows for observation
            const elements = document.querySelectorAll(".category-row.fade-in");
            elements.forEach((el) => observer.observe(el));
        },
        resetAnimations() {
            // Re-apply the fade-in class to all category rows
            const elements = document.querySelectorAll(".category-row");
            elements.forEach((el) => {
                el.classList.remove("fade-in-visible");
                el.classList.add("fade-in");
            });

            // Reinitialize the observer
            this.observeElements();
        },
        handleScroll() {
            if (window.scrollY === 0) {
                // Trigger reset if the scroll position is at the top
                this.resetAnimations();
            }
        }
    },
    mounted() {
        if (window.location.pathname.split('/')[1] === "categories") {
            let categoryAlias = window.location.pathname.split('/')[2];
            if (categoryAlias && categoryAlias != null) {
                this._findCategoryByAlias(categoryAlias, category => {
                    this.categoryTitle = category.title;
                });
            }
        }
        if (this.model.categoryIds != null && this.model.categoryIds.length > 0) {
            this._findCategoriesByIdsFiltered(this.model.categoryIds, e => {
                this.categories = e;
                this.observeElements(); // Observe elements after categories load
            });
        } else {
            this._findCategoryTreeByAlias(e => {
                this.navigations = e;
                this.observeElements(); // Observe elements after navigations load
            });
        }

        // Add a scroll event listener to monitor the scroll position
        window.addEventListener("scroll", this.handleScroll);

        // Trigger scroll animation observer for initial elements
        this.observeElements();
    },
    beforeDestroy() {
        // Clean up the scroll event listener when the component is destroyed
        window.removeEventListener("scroll", this.handleScroll);
    }
};

app.component('categorieslistcustom_categorieslist4', {
    extends: categorieslistcustom_categorieslist4,
    template: '#categorieslistcustom_categorieslist4'
});
