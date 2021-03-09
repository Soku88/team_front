var profileImgElem = document.querySelector("#profileImg");
function profileUpload() {
	if (profileImgElem.files.length === 0) {
		alert("이미지 선택바랍니다");
		return;
	}

	var formData = new FormData();
	formData.append("profileImg", profileImgElem.files[0]);

	fetch("/main/profileEdit", {
		method: "post",
		body: formData,
	})
		.then((res) => res.json())
		.then((myJson) => {
			if (myJson === 1) {
				location.reload();
			} else {
				alert("이미지 업로드에 실패하였습니다.");
			}
		});
}
