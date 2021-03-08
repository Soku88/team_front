//댓글 시작
var cmtListElem = document.querySelector("#cmtList");

var listCount = 10;
function selCmtList() {
	fetch(`/cmt?m_pk=${data.dataset.pk}&listCount=${listCount}`)
		.then((res) => res.json())
		.then((myJson) => {
			clearView();
			createView(myJson);
		});

	function clearView() {
		cmtListElem.innerHTML = "";
	}

	function createView(myJson) {
		if (myJson.length === 0) {
			alert("글이 없습니다");
			return;
		}

		myJson.forEach(function (item) {
			var loginUserPk = parseInt(data.dataset.loginuserpk);
			if (loginUserPk === item.u_pk) {
				//수정 할 내용 빈칸제거 ..
				//좋았다 삭제 삭제, 수정 아이콘으로 변경
				var content = item.c_content.replace(/\s/gi, "");
				cmtListElem.innerHTML += `
			<li class="review-item">
				<div class="review-item__items">
					<div class="review-user">
						<img src="/resources/image/hg2.jpg" alt="" />
						<div>${item.writerNm}</div>
					</div>
					<div class="review-content">
						<div class="regdate">${item.c_regDate}</div>
						<p>
							${item.c_content}
						</p>
					</div>
					<div class="review-icon">
						<div>
							<button onclick=delAjax(${item.m_pk},${item.c_seq}><i class="fas fa-trash-alt"></i></button>
						</div>
						<div>
							<button onclick=editMod(${item.m_pk},'${content}',${item.c_seq}><i class="fas fa-pencil-alt"></i></button>
					</div>
			</li>
		`;
			} else {
				cmtListElem.innerHTML += `
			<li class="review-item">
				<div class="review-item__items">
					<div class="review-user">
						<img src="/resources/image/hg2.jpg" alt="" />
						<div>${item.writerNm}</div>
					</div>
					<div class="review-content">
						<div class="regdate">${item.c_regDate}</div>
						<p>
							${item.c_content}
						</p>
					</div>
					<div class="review-icon">
					</div>
				</div>
			</li>
		`;
			}
		});
	}
}

var modalElem = document.querySelector("#modal");
var modCtntElem = document.querySelector("#modCtnt"); //수정 내용
var modBtnElem = document.querySelector("#modBtn"); //수정버튼

if (modalElem) {
	//모달 닫기 버튼
	var modalCloseElem = document.querySelector("#modClose");
	modalCloseElem.addEventListener("click", function () {
		//hide클래스(모달창)
		modalElem.classList.add("hide");
	});
}

//수정 모달 띄우기
function editMod(mPk, cContent, cSeq) {
	modCtntElem.value = cContent;
	modalElem.classList.remove("hide");

	modBtnElem.onclick = function () {
		var param = {
			m_pk: mPk,
			c_seq: cSeq,
			c_content: modCtntElem.value,
		};
		modAjax(param);
	};
}

//댓글 수정
function modAjax(param) {
	fetch("/cmt", {
		method: "put",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(param),
	})
		.then((res) => res.json())
		.then((myJson) => {
			if (myJson === 1) {
				modalElem.classList.add("hide");
				selCmtList();
			} else {
				alert("수정을 실패하였습니다.");
			}
		});
}

//삭제
function delAjax(param1, param2) {
	if (confirm("삭제 하시겠습니까?")) {
		var m_pk = param1;
		var c_seq = param2;
		fetch(`/cmt?m_pk=${m_pk}&c_seq=${c_seq}`, {
			method: "delete",
		})
			.then((res) => res.json())
			.then((myJson) => {
				if (myJson === 1) {
					selCmtList();
				} else {
					alert("삭제를 실패 하였습니다.");
				}
			});
	}
}

selCmtList();

// 더보기 버튼
var moreListElem = document.querySelector("#moreList");
if (moreListElem) {
	function moreList() {
		listCount += 10;
		selCmtList();
	}
	moreListElem.addEventListener("click", moreList);
}

//댓글 등록
var rWriteElem = document.querySelector("#rWrite");
var rContentElem = document.querySelector("#rContent");

rWriteElem.addEventListener("click", ajax);

function ajax() {
	var txtVal = rContentElem.value;
	if (txtVal === "") {
		alert("내용이 없습니다.");
		return;
	}
	var param = {
		m_pk: data.dataset.pk,
		c_content: txtVal,
	};

	fetch("/cmt", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(param),
	}).then((res) => {
		res.json().then((myJson) => {
			if (myJson === 1) {
				selCmtList();
				txtVal = "";
				rContentElem.value = "";
				review.classList.remove("review-open");
			} else {
				alert("댓글 등록 실패");
			}
		});
	});
}

//  원석이형  모달 관련  js -------------------------------
// const modal = document.querySelector(".modal-wrapper");
const mapModal = document.querySelector(".map-modal");
const mapModalImg = document.querySelector(".map-modal-img");

const review = document.querySelector(".review-wrap");

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

window.addEventListener("click", function (e) {
	e.target === review ? review.classList.remove("review-open") : false;
});

//review-modal
function reviewModalHandle() {
	review.classList.toggle("review-open");
}
const menu = document.querySelector(".menu");
// profile toggle
function toggleMenu() {
	menu.classList.toggle("toggle");
}

const chat = document.querySelector(".chat");
//chat-modal
function openChatModal() {
	chat.classList.toggle("open-chat");
}
function closeChatModal() {
	chat.classList.remove("open-chat");
}
