var arrNhanVien = [];

document.querySelector("#btnThemNV").onclick = function (e) {
  e.preventDefault();
  var nv = new NhanVien();
  nv.account = document.querySelector("#tknv").value;
  nv.name = document.querySelector("#name").value;
  nv.email = document.querySelector("#email").value;
  nv.password = document.querySelector("#password").value;
  nv.datepicker = document.querySelector("#datepicker").value;
  nv.basicSalary = +document.querySelector("#luongCB").value;
  nv.position = document.querySelector("#chucvu").value;
  nv.workTime = +document.querySelector("#gioLam").value;

  var valid = true;

  valid =
    kiemTraRong(nv.account, "#error-required-Account", "Tài khoản") &&
    kiemTraRong(nv.name, "#error-required-Name", "Họ và Tên") &&
    kiemTraRong(nv.email, "#error-required-Email", "Email") &&
    kiemTraRong(nv.password, "#error-required-Password", "Mật khẩu");
  valid =
    valid &&
    sizeCharacters(nv.account, "#error-letter-Account", "Tài khoản", 4, 6);
  valid = valid && nameLetters(nv.name, "#error-letter-Name", "Họ và tên");
  valid = valid && checkEmail(nv.email, "#error-letter-Email");
  valid = valid && checkPassword(nv.password, "#error-letter-Password");
  if (!valid) {
    return;
  }

  arrNhanVien.push(nv);

  tableNhanVien(arrNhanVien);

  saveStorage();
};

function tableNhanVien(arrNV) {
  var htmlString = "";
  for (var index = 0; index < arrNV.length; index++) {
    var nv = arrNV[index];
    nv.tongLuong = function () {
      if (this.position === "Sếp") {
        return this.basicSalary * 3;
      } else if (this.position === "Trưởng phòng") {
        return this.basicSalary * 2;
      } else {
        return this.basicSalary;
      }
    };

    nv.xepLoai = function () {
      if (this.workTime >= 192) {
        return "Nhân viên xuất sắc";
      } else if (this.workTime >= 176) {
        return "Nhân viên giỏi";
      } else if (this.workTime >= 160) {
        return "Nhân viên khá";
      } else {
        return "Nhân viên trung bình";
      }
    };
    htmlString += `
            <tr>
                <td>${nv.account}</td>
                <td>${nv.name}</td>
                <td>${nv.email}</td>
                <td>${nv.datepicker}</td>
                <td>${nv.position}</td>
                <td>${nv.tongLuong()}</td>
                <td>${nv.xepLoai()}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteEmployee('${index}')">Xoá</button> 
                    <button class="btn btn-primary mx-2" onclick="EditEmployee('${index}')">Chỉnh sửa</button>
                </td>
            </tr>
        `;
  }
  document.querySelector("#tableDanhSach").innerHTML = htmlString;
  return htmlString;
}

function saveStorage() {
  var strNhanVien = JSON.stringify(arrNhanVien);
  localStorage.setItem("arrNhanVien", strNhanVien);
}

function loadStorage() {
  if (localStorage.getItem("arrNhanVien")) {
    var str = localStorage.getItem("arrNhanVien");
    arrNhanVien = JSON.parse(str);
    console.log(arrNhanVien);
    tableNhanVien(arrNhanVien);
  }
}

window.onload = function () {
  loadStorage();
};

function updateEmployee() {
  var indexEdit = localStorage.getItem("indexEdit");
  arrNhanVien[indexEdit].account = document.querySelector("#tknv").value;
  arrNhanVien[indexEdit].name = document.querySelector("#name").value;
  arrNhanVien[indexEdit].email = document.querySelector("#email").value;
  arrNhanVien[indexEdit].password = document.querySelector("#password").value;
  arrNhanVien[indexEdit].datepicker =
    document.querySelector("#datepicker").value;
  arrNhanVien[indexEdit].basicSalary =
    +document.querySelector("#luongCB").value;
  arrNhanVien[indexEdit].position = document.querySelector("#chucvu").value;
  arrNhanVien[indexEdit].workTime = +document.querySelector("#gioLam").value;

  tableNhanVien(arrNhanVien);
  saveStorage();

  localStorage.removeItem("indexEdit");
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#chucvu").value = "";
  document.querySelector("#gioLam").value = "";
}

function EditEmployee(indexEdit) {
  var nvEdit = arrNhanVien[indexEdit];
  document.querySelector("#tknv").value = nvEdit.account;
  document.querySelector("#name").value = nvEdit.name;
  document.querySelector("#email").value = nvEdit.email;
  document.querySelector("#password").value = nvEdit.password;
  document.querySelector("#datepicker").value = nvEdit.datepicker;
  document.querySelector("#luongCB").value = nvEdit.basicSalary;
  document.querySelector("#chucvu").value = nvEdit.position;
  document.querySelector("#gioLam").value = nvEdit.workTime;
  localStorage.setItem("indexEdit", indexEdit);
}

function deleteEmployee(indexDel) {
  arrNhanVien.splice(indexDel, 1);
  tableNhanVien(arrNhanVien);
  saveStorage();
}

function searchEmployee() {
  var searchInput = document.querySelector("#searchName").value;
  var filteredArr = arrNhanVien.filter(function (nv) {
    return nv.xepLoai() === searchInput;
  });
  tableNhanVien(filteredArr);
}
