document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and insert HTML content
    const loadComponent = (url, placeholderId) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                    // Re-initialize Bootstrap components if needed (e.g., dropdowns in nav)
                    if (placeholderId === 'navbar-placeholder') {
                        // Example: Re-initialize dropdowns if they are dynamically loaded
                        var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
                        var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
                            return new bootstrap.Dropdown(dropdownToggleEl);
                        });
                    }
                } else {
                    console.error(`Placeholder element with ID '${placeholderId}' not found.`);
                }
            })
            .catch(error => console.error(`Error loading component from ${url}:`, error));
    };

    // Load header and footer
    loadComponent('components/nav.html', 'navbar-placeholder');
    loadComponent('components/footer.html', 'footer-placeholder');

    // Initialize AOS
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
    });
});