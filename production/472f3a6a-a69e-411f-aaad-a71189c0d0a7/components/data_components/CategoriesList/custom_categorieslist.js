const categorieslistcustom_categorieslist = {
    props: {
        model: Object
    },
    data() {
        return {
            navigations: null,
            categories: null,
            categoryTitle: ''
        }
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
        sortedNavigations() {
            return this.navigations ? [...this.navigations].sort((a, b) => a.navigationTitle.localeCompare(b.navigationTitle)) : [];
        },
        sortedCategories() {
            return this.categories ? [...this.categories].sort((a, b) => a.title.localeCompare(b.title)) : [];
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
            })
        } else {
            this._findCategoryTreeByAlias(e => {
                this.navigations = e;
            })
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
    
    }
}

app.component('categorieslistcustom_categorieslist', {
    extends: categorieslistcustom_categorieslist,
    template: '#categorieslistcustom_categorieslist'
});