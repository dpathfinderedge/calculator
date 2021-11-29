
//Variable declaration
let numbers = document.querySelectorAll(".numbers");
let functions = document.querySelectorAll(".functions");
let dot = document.querySelector(".dot");
let root = document.querySelector(".root");
let percent = document.querySelector(".percent");

let equal = document.querySelector(".equal");
let clear = document.querySelector(".clear-all");
let backspace = document.querySelector(".clear-current");

let operationDisplay = document.querySelector(".operation-display");
let result = document.querySelector(".result");

let equaltoPressed = false;

//Event Listeners
for (let i = 0; i < numbers.length; i++) {
	numbers[i].addEventListener("click", function () {
		if (equaltoPressed) {
			result.textContent = "";
			equaltoPressed = false;
		}
		
		if (
			"0123456789.+-×÷".includes(
				operationDisplay.textContent[operationDisplay.textContent.length - 1]
			) ||
			operationDisplay.textContent == ""
		)
			operationDisplay.textContent += this.textContent;
		evaluate();
	});
}

for (let i = 0; i < functions.length; i++) {
	functions[i].addEventListener("click", function () {
		if (operationDisplay.textContent !== "." && operationDisplay.textContent !== "") {
			equaltoPressed = false;
			if ("+-×÷".includes(operationDisplay.textContent[operationDisplay.textContent.length - 1]))
				operationDisplay.textContent =
					operationDisplay.textContent.substring(0, operationDisplay.textContent.length - 1) +
					this.textContent;
			else operationDisplay.textContent += this.textContent;
		}
	});
}

dot.addEventListener("click", function () {
	if (equaltoPressed) {
		operationDisplay.textContent = "";
		equaltoPressed = false;
	}
	let start = 0;
	for (let i = operationDisplay.textContent.length - 1; i >= 0; i--) {
		if ("+-×÷".includes(operationDisplay.textContent[i])) {
			start = i + 1;
			break;
		}
	}
	if (
		!operationDisplay.textContent
			.substring(start, operationDisplay.textContent.length)
			.includes(".")
	)
		operationDisplay.textContent += ".";
});

root.addEventListener("click", function () {
    result.textContent = Math.sqrt(operationDisplay.textContent);
});

percent.addEventListener("click", function () {
    result.textContent = (operationDisplay.textContent) * 0.01;
});

equal.addEventListener("click", function () {
	if (result.textContent !== "") {
		operationDisplay.textContent = result.textContent;
		result.textContent = "";
		equaltoPressed = true;
	}
});

clear.addEventListener("click", function () {
	equaltoPressed = false;
	operationDisplay.textContent = "";
	result.textContent = "";
});

backspace.addEventListener("click", function () {
	equaltoPressed = false;
	operationDisplay.textContent = operationDisplay.textContent.substr(
		0,
		operationDisplay.textContent.length - 1
	);
	evaluate();
});


//Functions
function evaluate() {
	let expression = operationDisplay.textContent;

	for (let i = 0; i < expression.length; i++) {
		if (expression[i] === "×")
			expression =
				expression.substring(0, i) +
				"*" +
				expression.substring(i + 1, expression.length);
		if (expression[i] === "÷")
			expression =
				expression.substring(0, i) +
				"/" +
				expression.substring(i + 1, expression.length);
	}
    const tempFunc = (exp) => {
		return new Function(`return ${exp}`)();
	};
	
	if (
		"0123456789.".includes(expression[expression.length - 1]) &&
		tempFunc(expression) != expression
	) {
		
		result.textContent = tempFunc(expression);
	} else result.textContent = "";
}
