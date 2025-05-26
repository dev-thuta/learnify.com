document.addEventListener("DOMContentLoaded", function() {
    const subjectFilter = document.getElementById('subjectFilter');
    const gradeFilter = document.getElementById('gradeFilter');
    const locationFilter = document.getElementById('locationFilter');
    const applyFiltersButton = document.getElementById('applyFilters');
    const resetFiltersButton = document.getElementById('resetFilters');
    const teachersList = document.getElementById('teachersList');
    const noResultsDiv = document.getElementById('noResults');
    const preFilterLinks = document.querySelectorAll('.filter-link');

    // Store all teacher items. If you load them dynamically, you'd populate this array then.
    const allTeacherItems = Array.from(teachersList.getElementsByClassName('teacher-item'));

    function filterTeachers() {
        const subjectValue = subjectFilter.value.toLowerCase();
        const gradeValue = gradeFilter.value.toLowerCase();
        const locationValue = locationFilter.value.trim().toLowerCase();
        let resultsFound = false;

        allTeacherItems.forEach(item => {
            // Temporarily remove AOS animation class to allow re-triggering
            item.classList.remove('aos-animate');

            const subjects = item.dataset.subject.toLowerCase();
            const grades = item.dataset.grade.toLowerCase();
            const location = item.dataset.location.toLowerCase();

            const subjectMatch = !subjectValue || subjects.includes(subjectValue);
            const gradeMatch = !gradeValue || grades.includes(gradeValue);
            const locationMatch = !locationValue || location.includes(locationValue);

            if (subjectMatch && gradeMatch && locationMatch) {
                item.style.display = ''; // Show item
                // Add a slight delay for re-triggering AOS if items are re-shown quickly
                setTimeout(() => {
                    item.classList.add('aos-init'); // Re-initialize if needed
                    item.classList.add('aos-animate'); // Re-trigger animation
                }, 50);
                resultsFound = true;
            } else {
                item.style.display = 'none'; // Hide item
            }
        });

        noResultsDiv.style.display = resultsFound ? 'none' : 'block';

        // Refresh AOS to detect new items or changes in visibility (optional, if animations misbehave)
        // AOS.refresh();
    }

    function resetAllFilters() {
        subjectFilter.value = "";
        gradeFilter.value = "";
        locationFilter.value = "";
        filterTeachers();
    }

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', filterTeachers);
    }

    if (resetFiltersButton) {
        resetFiltersButton.addEventListener('click', resetAllFilters);
    }

    // Optional: filter as user types in location
    if (locationFilter) {
        locationFilter.addEventListener('keyup', function(event) {
            if (event.key === "Enter") { // Or filter on every keyup
                filterTeachers();
            }
        });
    }

    // Pre-filter links
    preFilterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const grade = this.dataset.grade;
            if (grade) {
                gradeFilter.value = grade;
                // Optionally reset other filters or combine
                subjectFilter.value = "";
                locationFilter.value = "";
                filterTeachers();
            }
        });
    });

    // Initial filter call if you want to apply any default filters on load
    // filterTeachers();
});