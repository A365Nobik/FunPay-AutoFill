const elements = {
  "fields[type]": document.getElementsByName("fields[type]")[0],
  "fields[method]": document.getElementsByName("fields[method]")[0],
  "fields[desc][ru]": document.getElementsByName("fields[desc][ru]")[0],
  "fields[payment_msg][ru]": document.getElementsByName(
    "fields[payment_msg][ru]"
  )[0],
  "fields[desc][en]": document.getElementsByName("fields[desc][en]")[0],
  "fields[payment_msg][en]": document.getElementsByName(
    "fields[payment_msg][en]"
  )[0],
  "method-wrapper": document.getElementsByClassName(
    "form-group lot-field hidden"
  )[0],
};

const fiilFields = (fileds, values) => {
  for (const key in fileds) {
    fileds[key].value = values[key];
  }
};

(async () => {
  elements["method-wrapper"].classList.remove("hidden");
  if (window.chrome?.storage?.local) {
    const { autoFillData } = await window.chrome.storage.local.get(
      "autoFillData"
    );
    fiilFields(elements, autoFillData);
  } else {
    const autoFillData = JSON.parse(localStorage.getItem("autoFillData"));
    fiilFields(elements, autoFillData);
  }
})();
