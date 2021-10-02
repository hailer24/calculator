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
