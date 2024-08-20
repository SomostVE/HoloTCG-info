document.addEventListener("DOMContentLoaded", function () {
    const themeToggleButton = document.getElementById("theme-toggle");
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");
    const menuItems = document.querySelectorAll(".menu-item a, .submenu-item a");
    const content = document.getElementById("markdown-content");
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Theme toggle functionality
    themeToggleButton.addEventListener("click", function () {
        if (body.classList.contains("light-mode")) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            themeIcon.src = "assets/moon-icon.png";
            console.log("Switched to dark mode");
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            themeIcon.src = "assets/sun-icon.png";
            console.log("Switched to light mode");
        }
    });

    // Menu item click functionality
    menuItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const target = item.getAttribute("data-target");
            console.log(`Fetching content from ${target}`);

            fetch(target)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${target}`);
                    }
                    return response.text();
                })
                .then(text => {
                    content.innerHTML = marked.parse(text);
                    console.log(`Loaded content from ${target}`);

                    // Smooth scroll to section if it's a submenu item
                    if (item.classList.contains('submenu-item')) {
                        const sectionId = item.getAttribute("href").substring(1);
                        const section = document.getElementById(sectionId);
                        if (section) {
                            console.log(`Scrolling to section ${sectionId}`);
                            section.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            console.warn(`Section with ID ${sectionId} not found`);
                        }
                    }
                })
                .catch(error => {
                    content.innerHTML = `<p>Error loading content: ${error.message}</p>`;
                    console.error(error);
                });

            // Set the clicked menu item as active
            menuItems.forEach(i => i.parentElement.classList.remove("active"));
            item.parentElement.classList.add("active");
        });
    });

    // Load the homepage content by default
    if (menuItems.length > 0) {
        console.log("Loading default content");
        menuItems[0].click();
    }

    // Mobile menu toggle functionality
    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('show');
        console.log("Toggled sidebar visibility");
    });
});
