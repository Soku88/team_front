const modal = document.querySelector(".modal-wrapper");
const mapModal = document.querySelector(".map-modal");
const mapModalImg = document.querySelector(".map-modal-img");
const menu = document.querySelector(".menu");
const review = document.querySelector(".review-wrap");

// profile toggle
function toggleMenu() {
	menu.classList.toggle("toggle");
}

//top-img modal
function modalHandle() {
	modal.classList.toggle("modal-open");
}
window.addEventListener("click", function (e) {
	e.target === modal ? modal.classList.remove("modal-open") : false;
});

//map-modal
function mapModalHandle() {
	mapModal.classList.toggle("map-modal__open");
}
window.addEventListener("click", function (e) {
	e.target === mapModalImg ? mapModal.classList.remove("map-modal__open") : false;
});

//review-modal
function reviewModalHandle() {
	review.classList.toggle("review-open");
}

window.addEventListener("click", function (e) {
	e.target === review ? review.classList.remove("review-open") : false;
});
