let btns = document.querySelectorAll(".btn");
let result = document.querySelector(".result");
let history = document.querySelector(".history");

let output = "";
let lastOut = "";
let symbols = ["*", "-", "+", "/"];

btns.forEach((item) => {
  item.addEventListener("click", (e) => {
    output = output.toString();
    let lastInput = output.slice(-1);
    let l = e.target.classList;
    if (l.contains("number")) numberKey(e.target.id, lastInput);
    else if (l.contains("operator")) operatorKey(e.target.innerHTML, lastInput);
    else if (l.contains("function")) functionKey(e.target.id, lastInput);
  });
});

const functionKey = (id, lastInput) => {
  const resetOutput = (display) => {
    lastOut = "";
    output = "";
    display && updateState();
  };
  const calculate = (lastInput) => {
    if (!symbols.includes(lastInput) && output) {
      try {
        lastOut = output;
        output = eval(output.replace(/%/g, "*0.01"));
        output = Number.isInteger(output) ? output : output.toFixed(3);
        updateState();
        lastOut = output;
        output = "";
      } catch (error) {
        output = "error";
        updateState();
        resetOutput();
      }
    }
  };
  switch (id) {
    case "clear":
      resetOutput(true);
      break;
    case "clearBack":
      output = output.slice(0, -1);
      updateState();
      break;
    case "calc":
      calculate(lastInput);
      break;
    default:
      return;
  }
};

const numberKey = (id, lastInput) => {
  if (id === "dot") id = ".";
  if (id === "dot" || id === "%") {
    if (output === "" && id === "%") return;
    lastInput === "." || lastInput === "%" || (output += id);
  } else output += id;
  updateState();
};
const operatorKey = (id, lastInput) => {
  if (output === "" && id !== "-") return;
  symbols.includes(lastInput)
    ? (output = output.slice(0, -1) + id)
    : (output += id);
  updateState();
};

const updateState = () => {
  result.inner = lastOut;
  history.innerHTML = output;
};

dragElement(document.querySelector(".app"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.querySelector(".result")) {
    document.querySelector(".result").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
