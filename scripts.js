document.addEventListener("DOMContentLoaded", function () {
  const themeToggleButton = document.getElementById("theme-toggle");
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const menuItems = document.querySelectorAll(".menu-item a");
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
      menuItems.forEach(i => i.parentElement.classList.remove("active"));
      item.parentElement.classList.add("active");

      const target = item.getAttribute("data-target");

      // Fetch and load the markdown content
      fetch(target)
        .then(response => response.text())
        .then(text => {
          content.innerHTML = marked.parse(text);
        });
    });
  });

  // Load the home page content by default
  document.querySelector('.menu-item a').click();
});
