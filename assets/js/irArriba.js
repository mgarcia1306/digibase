let flechita = document.getElementById("btn-back-to-top");

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
  ) {
    flechita.style.display = "block";
  } else {
    flechita.style.display = "none";
  }
}

flechita.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0; // Para navegadores que no sean Firefox
  document.documentElement.scrollTop = 0; // Para Firefox
}