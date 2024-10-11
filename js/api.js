const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn/api",
  timeout: 30000,
});

function getValueForm() {
  let arrField = document.querySelectorAll(
    "#QLTK input, #QLTK input[type='radio']"
  );
  let taiKhoan = {};
  for (let field of arrField) {
    const { id, value } = field;
    taiKhoan[id] = value;
  }
  return taiKhoan;
}

document.querySelector("#QLTK").onsubmit = function (event) {
  event.preventDefault();
  let taiKhoan = getValueForm();
  let promise = http.post("/Users/signup", taiKhoan);

  promise
    .then((res) => {
      console.log(res);
      renderThongBao(res.data.message, "success");
    })
    .catch((err) => {
      console.log(err);
      renderThongBao("Đăng kí tài khoản thất bại, vui lòng thử lại", "danger");
    });
};

function renderThongBao(content, error) {
  const bgError = error == "success" ? "green" : "red";

  Toastify({
    text: content,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: bgError,
    },
    onClick: function () {},
  }).showToast();
}
