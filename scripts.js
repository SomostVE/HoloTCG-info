document.addEventListener("DOMContentLoaded", function () {
  const themeToggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  themeToggleButton.addEventListener("click", function () {
    if (body.classList.contains("light-mode")) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      themeToggleButton.textContent = "Switch to Light Mode";
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      themeToggleButton.textContent = "Switch to Dark Mode";
    }
  });

  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    item.addEventListener("click", function () {
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
});
