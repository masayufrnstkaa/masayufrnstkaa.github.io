let numItem = document.querySelectorAll(".number-item");
let optItem = document.querySelectorAll(".item-red");
let CalcKecil = document.querySelector(".result-input-kecil");
let CalcBesar = document.querySelector(".result-input-besar");
let removeAllItem = document.querySelector(".remove-all-item");
let removeOneItem = document.querySelector(".remove-one-item");
let resultItem = document.querySelector(".result-item");

function calculateStr(fn) {
  return new Function("return " + fn)();
}

function resetIptVal() {
  CalcBesar.value = "0";
  CalcKecil.value = "0";
}

numItem.forEach((m) => {
  m.addEventListener("click", function () {
    iptNum = m.dataset.value;
    if (CalcKecil.value == "0") {
      CalcKecil.value = "";
    }

    CalcKecil.value += iptNum;

    if (
      CalcKecil.value == "." ||
      CalcKecil.value == "00"
    ) {
      CalcKecil.value = "0";
    }
  });
});

function Persen() {
  CalcKecil.value = calculateStr(CalcKecil.value);
  CalcBesar.value = calculateStr(CalcKecil.value);
  document.querySelector(".btn-copy").style.display = "flex";
}

optItem.forEach((m) => {
  let opt = m.dataset.value;

  m.addEventListener("click", function () {
    const optReg = /[+*\/-]/g;
    let matchWithOpt = CalcKecil.value.match(optReg);

    if (matchWithOpt == null) {
      CalcKecil.value += opt;
      if (CalcKecil.value.match("/100")) {
        iptPersen();
        
      }
    } else {
      if (CalcKecil.value.slice(-1).match(optReg)) {
        let removeIptOpt = CalcKecil.value
          .split("")
          .reverse()
          .join("")
          .substr(1, CalcKecil.value.length);

        CalcKecil.value = removeIptOpt
          .split("")
          .reverse()
          .join("");

        CalcKecil.value += opt;

        if (CalcKecil.value.match("/100")) {
          Persen();
    
          matchWithOpt = null;
        }
        matchWithOpt = null;
      } else {
        CalcKecil.value += opt;
        if (CalcKecil.value.match("/100")) {
          Persen();
          
          matchWithOpt = null;
        }
        matchWithOpt = null;
      }
    }
  });
});

removeAllItem.addEventListener("click", function () {
  resetIptVal();
  document.querySelector(".btn-copy").style.display = "none";
});

removeOneItem.addEventListener("click", function () {
  if (CalcKecil.value == "0" || CalcKecil.value == "0.") {
    document.querySelector(".btn-copy").style.display = "none";
    resetIptVal();
  } else {
    let iptVal = CalcKecil.value;
    if (iptVal.length == 1) {
      resetIptVal();
      document.querySelector(".btn-copy").style.display = "none";
    } else {
      iptVal = iptVal
        .split("")
        .reverse()
        .join("")
        .substr(1, iptVal.length);
      CalcKecil.value = iptVal.split("").reverse().join("");
    }
  }
});

const iptCalcArr = [];


resultItem.addEventListener("click", function () {
  const iptOutput = CalcKecil.value;
  const optReg = /[+*\/-]/g;

  if (iptOutput.slice(-1).match(optReg)) {
    let errorText = `Terjadi Kesalahan\n${iptOutput}?\nTidak Dapat Dihitung !`;

    alert(errorText);
    resetIptVal();

    document.querySelector(".btn-copy").style.display = "none";
  } else {
    let result = calculateStr(iptOutput);
    CalcBesar.value = result;
    document.querySelector(".btn-copy").style.display = "flex";
  }

  
});



