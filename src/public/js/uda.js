new Vue({
    el: '#app',
    data: {
        currentView: 'home',
        articles: [
            { title: 'Article 1', content: 'Content of Article 1' },
            { title: 'Article 2', content: 'Content of Article 2' },
            // Add more articles here
        ],
        articlesPerPage: 10,
        currentPage: 1,
        currentArticle: null
    },
    computed: {
        paginatedArticles() {
            const start = (this.currentPage - 1) * this.articlesPerPage;
            return this.articles.slice(start, start + this.articlesPerPage);
        }
    },
    methods: {
        goHome() {
            this.currentView = 'home';
            this.currentArticle = null;
        },
        showArticle(article) {
            this.currentArticle = article;
            this.currentView = 'article';
        },
        nextPage() {
            const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
            }
        },
        signUp() {
            alert('Sign Up functionality not implemented yet.');
        },
        logIn() {
            alert('Log In functionality not implemented yet.');
        }
    }
});