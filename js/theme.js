const buttons = document.querySelectorAll("[id*=theme");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    buttons.forEach(function (btn) {
      btn !== button
        ? btn.classList.add("hidden")
        : btn.classList.remove("hidden");
    });
    if (button.id == "theme1") {
      document.documentElement.removeAttribute("data-theme");
    } else if (button.id == "theme2") {
      document.documentElement.setAttribute("data-theme", "second");
    } else if (button.id == "theme3") {
      document.documentElement.setAttribute("data-theme", "third");
    }
  });
});
