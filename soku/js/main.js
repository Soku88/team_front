const modal = document.querySelector(".modal-wrapper");
const mapModal = document.querySelector(".map-modal");
const mapModalImg = document.querySelector(".map-modal-img");
const menu = document.querySelector(".menu");

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
	console.log("modal");
}
window.addEventListener("click", function (e) {
	e.target === mapModalImg ? mapModal.classList.remove("map-modal__open") : false;
	console.log(e.target);
});
