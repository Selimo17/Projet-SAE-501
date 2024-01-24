document.addEventListener('DOMContentLoaded', function() {
    var figures = document.querySelectorAll('.animated-figure');

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        figures.forEach(function(figure) {
            if (isElementInViewport(figure)) {
                figure.style.opacity = '1';
                figure.style.transform = 'translateX(0)';
            }
        });
    }

    // Écoutez l'événement de défilement
    window.addEventListener('scroll', handleScroll);

    // Initialisez l'état au chargement de la page
    handleScroll();
});
