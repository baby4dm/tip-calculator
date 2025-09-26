const billInput = document.querySelector("#bill");
const numberOfPeopleInput = document.querySelector("#people-number");
const resetButton = document.querySelector(".reset-button");
const tipButtons = document.querySelectorAll(".tip-button");
const tipInput = document.querySelector("#custom-tip");

const tipAmountElement = document.querySelector(".tip-amount");
const totalAmountElement = document.querySelector(".total-amount");

let bill = 0;
let percent = 0;
let people = 0;

function calculate() {
  if (bill > 0 && people > 0) {
    const tipPerPerson = (bill * percent) / people;
    const totalPerPerson = (bill * (1 + percent)) / people;

    tipAmountElement.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmountElement.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    tipAmountElement.textContent = "$0.00";
    totalAmountElement.textContent = "$0.00";
  }
}

function checkInputs() {
  bill = parseFloat(billInput.value) || 0;
  people = parseInt(numberOfPeopleInput.value) || 0;

  if (bill > 0 || people > 0) {
    resetButton.classList.remove("empty");
  } else {
    resetButton.classList.add("empty");
  }

  calculate();
}

[billInput, numberOfPeopleInput].forEach((input) => {
  input.addEventListener("input", checkInputs);
});

tipButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tipButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    percent = parseFloat(btn.textContent) / 100;
    tipInput.value = "";
    calculate();
  });
});

tipInput.addEventListener("input", () => {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  percent = parseFloat(tipInput.value) / 100 || 0;
  calculate();
});

resetButton.addEventListener("click", () => {
  bill = 0;
  percent = 0;
  people = 0;

  tipAmountElement.textContent = "$0.00";
  totalAmountElement.textContent = "$0.00";
  tipInput.value = "";
  numberOfPeopleInput.value = "";
  billInput.value = "";

  tipButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
  resetButton.classList.add("empty");
});
