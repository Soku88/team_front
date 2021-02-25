const slider = document.querySelector(".slider");
const prev = document.querySelector(".slider-prevBtn");
const next = document.querySelector(".slider-nextBtn");

prev.addEventListener("click", function () {
	slider.style.transform = "translate(0vw)";
});

next.addEventListener("click", function () {
	slider.style.transform = "translate(-100vw)";
});
