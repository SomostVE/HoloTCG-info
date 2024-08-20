document.addEventListener("DOMContentLoaded", function () {
  const themeToggleButton = document.getElementById("theme-toggle");
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const menuItems = document.querySelectorAll(".menu-item a, .submenu-item a");
  const content = document.getElementById("markdown-content");

  themeToggleButton.addEventListener("click", function () {
    if (body.classList.contains("light-mode")) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      themeIcon.src = "assets/moon-icon.png";
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      themeIcon.src = "assets/sun-icon.png";
    }
  });

  menuItems.forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const isSubMenu = item.classList.contains('submenu-item');
      const parentMenuItem = item.closest('.menu-item');
      if (parentMenuItem) {
        menuItems.forEach(i => i.parentElement.classList.remove("active"));
        parentMenuItem.classList.add("active");
      }

      const target = item.getAttribute("data-target");

      fetch(target)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${target}`);
          }
          return response.text();
        })
        .then(text => {
          content.innerHTML = marked.parse(text);
          if (isSubMenu) {
            const sectionId = item.getAttribute("href").substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }
        })
        .catch(error => {
          content.innerHTML = `<p>Error loading content: ${error.message}</p>`;
        });
    });
  });

  // Load the homepage content by default
  if (menuItems.length > 0) {
    menuItems[0].click();
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');

  menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('show');
    mainContent.classList.toggle('expanded');
  });
});

