function kiemTraRong(value, selectorError, info) {
  if (value.trim() === "") {
    document.querySelector(
      selectorError
    ).innerHTML = `${info} không được bỏ trống`;
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

function sizeCharacters(value, selectorError, info, min, max) {
  if (value.length < min || value.length > max) {
    document.querySelector(
      selectorError
    ).innerText = `${info} phải có độ dài từ ${min} đến ${max} ký tự.`;
    return false;
  }
  document.querySelector(selectorError).innerText = "";
  return true;
}

function nameLetters(value, selectorError, info) {
  var letters = /^[a-zA-Z\u00C0-\u1EF9\s]+$/g;
  if (letters.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = `${info} phải là chữ.`;
  return false;
}

function checkEmail(value, selectorError) {
  var regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (regexEmail.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = "Email không hợp lệ";
  return false;
}

function checkPassword(value, selectorError) {
  var regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  if (regexPassword.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  } else {
    document.querySelector(selectorError).innerHTML =
      "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và có độ dài từ 6 đến 10 ký tự.";
    return false;
  }
}

function checkSalary(value, selectorError) {
  var salary = parseInt(value);
  if (salary < 1000000 || salary > 20000000) {
    document.querySelector(selectorError).innerHTML =
      "Lương cơ bản phải từ 1,000,000 đến 20,000,000.";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

function checkTimeWork(value, selectorError) {
  var timework = parseInt(value);

  if (timework < 80 || timework > 200) {
    document.querySelector(selectorError).innerHTML =
      "Số giờ làm việc trong tháng phải nằm trong khoảng từ 80 đến 200 giờ.";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
