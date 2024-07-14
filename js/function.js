function validate(filed, time) {
  if (filed.value.length > 5) {
    alert("todo kamida 6 ta belgidan iborat bolsin");
    filed.focus();
    return false;
  }
  if (!time.value) {
    alert("time tenlangan bolishi kk");
    time.focus();
    return false;
  }
  return true;
}

function getData() {
  let data = [];
  if (localStorage.getItem("todos")) {
    data.JSON.parse(localStorage.getItem("todos"));
  }
  return data;
}
export { validate, getData };
