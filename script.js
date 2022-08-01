/** CALCULATOR **/
class Range {
  constructor(begin, end) {
    this.low = begin;
    this.hi = end;
    this.has = function (n) {
      return (this.low <= n) && (n <= this.hi);
    };
  }
}

const clothingData = {
  tshirt: {
    subtypes: {
      white: 600,
      black: 600,
      childrens: 400,
    },
    firstPrint: {
      A5: 350,
      A4: 500,
      A3: 600,
    },
    secondPrint: {
      нет: 0,
      A6: 150,
      A5: 200,
      A4: 250,
      A3: 300,
    },
    sales: {
      0: new Range(0, 10),
      10: new Range(11, 30),
      15: new Range(31, 50),
      20: new Range(51, 99),
      25: new Range(100, Infinity),
    },
  },
  polo: {
    subtypes: {
      premium: 1050,
      promo: 800,
    },
    firstPrint: {
      A5: 350,
      A4: 500,
      A3: 600,
    },
    secondPrint: {
      нет: 0,
      A6: 150,
      A5: 200,
      A4: 250,
      A3: 300,
    },
    sales: {
      0: new Range(0, 50),
      10: new Range(51, 99),
      15: new Range(100, Infinity),
    },
  },
  sweatshirt: {
    subtypes: {
      sweat: 1350,
      hoodie: 1800,
    },
    firstPrint: {
      A5: 350,
      A4: 500,
      A3: 600,
    },
    secondPrint: {
      нет: 0,
      A6: 150,
      A5: 200,
      A4: 250,
      A3: 300,
    },
    sales: {
      0: new Range(0, 10),
      5: new Range(11, 30),
      10: new Range(31, 50),
      15: new Range(51, 99),
      20: new Range(100, Infinity),
    },
  },
  baseballcap: {
    subtypes: {
      cap: 300,
      panama: 500,
    },
    firstPrint: {
      A7: 350,
    },
    secondPrint: {},
    sales: {
      0: new Range(0, 30),
      10: new Range(31, 99),
      15: new Range(100, Infinity),
    },
  },
  shopper: {
    subtypes: {
      "shopper-250": 450,
      "shopper-140": 300,
    },
    firstPrint: {
      A5: 250,
      A4: 300,
      A3: 400,
    },
    secondPrint: {
      нет: 0,
      A5: 100,
      A4: 150,
      A3: 200,
    },
    sales: {
      0: new Range(0, 30),
      15: new Range(31, 99),
      25: new Range(100, Infinity),
    },
  },
  apron: {
    subtypes: {
      pocket: 900,
      nopocket: 700,
    },
    firstPrint: {
      A5: 200,
      A4: 300,
      A3: 400,
    },
    secondPrint: {},
    sales: {
      0: new Range(0, 30),
      10: new Range(31, 99),
      15: new Range(100, Infinity),
    },
  },
  clients: {
    subtypes: {},
    firstPrint: {
      A7: 250,
      A6: 300,
      A5: 370,
      A4: 500,
      A3: 650,
    },
    secondPrint: {
      нет: 0,
      A7: 100,
      A6: 150,
      A5: 200,
      A4: 250,
      A3: 300,
    },
    sales: {
      0: new Range(0,10),
      5: new Range(11,50),
      15: new Range(51, 99),
      20: new Range(100, Infinity),
    },
  },
};

const sybtypesNames = {
  white: "Футболка белая",
  black: "Футболка черная",
  childrens: "Футболка детская",
  premium: "Поло премиум",
  promo: "Поло промо",
  sweat: "Свитшот",
  hoodie: "Худи",
  cap: "Бейсболка",
  panama: "Панама",
  "shopper-250": "Шоппер 250 гр",
  "shopper-140": "Шоппер 140 гр",
  pocket: "Фартук с карманом",
  nopocket: "Фартук без кармана",
};

class Clothing {
  constructor(type, id, args) {
    this.type = type.join();
    this.id = id.join();

    this.currentClothes = document.querySelector(`#${this.id}`);
    this.calculatorBody = document.querySelector(".calculator--clothes");

    this.subtypes = args.subtypes;
    this.firstPrint = args.firstPrint;
    this.secondPrint = args.secondPrint;
    this.sales = args.sales;
  }
  Init() {
    this.BuildSecondStep();
  }
  
  BuildSecondStep() {
    this.calculatorBody.innerHTML = "";
    this.calculatorBody.appendChild(this.currentClothes);
    this.currentClothes.removeEventListener("click", classInit, false);
    let prevBtn = buildElement("button", this.currentClothes);
    prevBtn.setAttribute("id", "previous-step");
    prevBtn.innerHTML = "Назад";
    prevBtn.addEventListener("click", reloadCalc, false);
    let secondStepElement = buildElement("div", this.calculatorBody);
    secondStepElement.id = `${this.type}__secondStep`;
    secondStepElement.className = "secondStep";
    let leftDiv = buildElement("div", secondStepElement);
    leftDiv.className = "left";
    if ((this.type !== "clients") && (this.type !== "tshirt")) {
      this.BuildungRadios(leftDiv, this.subtypes);
    }
    this.BuildingSelects(leftDiv);
    let rightDiv = buildElement("div", secondStepElement);
    rightDiv.className = "right";
    this.BuildingAmount(rightDiv);
  }

  BuildungRadios(elem, subtypes) {
    let radioDiv = buildElement("div", elem);
    radioDiv.setAttribute('id', 'radioDiv')
    for (let i in subtypes) {
      let radio = buildElement("input", radioDiv);
      radio.setAttribute("type", "radio");
      radio.setAttribute("name", "subtype");
      radio.setAttribute("value", subtypes[i]);
      radio.setAttribute("id", i);
      let label = buildElement("label", radioDiv);
      label.setAttribute("for", i);
      label.innerHTML = `${sybtypesNames[i]}`;
    }
  }

  BuildingSelects(elem) {
    let firstSelectDiv = buildElement("div", elem);
    firstSelectDiv.setAttribute('id', 'firstSelectDiv');
    let format = buildElement("p", elem);
    format.innerHTML = "Формат нанесения";
    firstSelectDiv.appendChild(format);
    let firstPrint = this.BuildingSelect(this.firstPrint);
    firstPrint.setAttribute('id', 'firstPrint');
    firstSelectDiv.appendChild(firstPrint);
    elem.appendChild(firstSelectDiv);
    if (Object.keys(this.secondPrint).length !== 0) {
      let secondSelectDiv = buildElement("div", elem);
      secondSelectDiv.setAttribute('id', 'secondSelectDiv');
      let dop = buildElement("p", elem);
      dop.innerHTML = "Доп. отпечаток";
      secondSelectDiv.appendChild(dop);
      let secondPrint = this.BuildingSelect(this.secondPrint);
      secondPrint.setAttribute('id', 'secondPrint');
      secondSelectDiv.appendChild(secondPrint);
      elem.appendChild(secondSelectDiv);
    }
  }

  BuildingSelect(s) {
    let select = document.createElement("select");
    for (let i in s) {
      let option = document.createElement("option");
      option.innerHTML = `${i}`;
      option.setAttribute("format", `${i}`);
      option.setAttribute("value", s[i]);
      select.appendChild(option);
    }
    return select;
  }

  BuildingAmount(elem) {
    let amount = buildElement("p", elem);
    amount.innerHTML = "Количество";
    let input = buildElement("input", elem);
    input.setAttribute("type", "number");
    input.setAttribute('id', 'amount');
  }

  GetSubtypeValue() {
    let subtypeValue = 0;
    if (this.type === "tshirt") {
      let currentTShirtID = this.currentClothes.getAttribute("id");
      let result = currentTShirtID.split("-");
      subtypeValue = this.subtypes[result[1]];
    } else if (this.type === 'clients') {
      subtypeValue = 0;
    } else {
      let radios = document.querySelectorAll('input[type="radio"]');
      for (let r of radios) {
        if (r.checked) {
          subtypeValue = r.value;
        }
      }
    }
    return subtypeValue;
  }

  GetFirstPrintValue() {
    let firstPrint = document.querySelector('#firstPrint');
    return firstPrint.value;
  }

  GetSecondPrintValue() {
    let secondPrint = document.querySelector('#secondPrint');
    let secondPrintValue = 0;
    if (secondPrint) {
      secondPrintValue = secondPrint.value;
    }
    return secondPrintValue;
  }

  GetSale() {
    let amount = document.querySelector('#amount');
    for (let s in this.sales) {
      if (this.sales[s].has(Number(amount.value))) {
        return s;
      }
    }
  }

  GetResults() {
    let [subtype, firstPrint, secondPrint, sale] = [
      Number(this.GetSubtypeValue()),
      Number(this.GetFirstPrintValue()),
      Number(this.GetSecondPrintValue()),
      Number(this.GetSale()),
    ];
    let firstPrintElem = document.querySelector('#firstPrint');
    let secondPrintElem = document.querySelector('#secondPrint')?document.querySelector('#secondPrint'):false;
    let firstPrintOptions = firstPrintElem.querySelectorAll('option');
    let secondPrintOptions = document.querySelector('#secondPrint')?secondPrintElem.querySelectorAll('option'):false;

    function getFormat(arr, print) {
      if (!arr) {
        return 0;
      }
      for (let e of arr) {
        let value = e.value;
        console.log(value, 'value')
        console.log(print, 'print')
        if (Number(value) === Number(print)) {
          console.log(e.getAttribute('format'), 'e.format')
          return e.getAttribute('format');
        }
      }
    }

    let firstPrintFormat = getFormat(firstPrintOptions, firstPrint);
    let secondPrintFormat = getFormat(secondPrintOptions, secondPrint);
      
    if (secondPrintFormat && (Number(secondPrintFormat[1]) < Number(firstPrintFormat[1]))) {
      console.log(`firstprint: ${firstPrint}, secondprint: ${secondPrint}`)
      firstPrint = this.secondPrint[firstPrintFormat];
      secondPrint = this.firstPrint[secondPrintFormat];
      console.log(`firstprint: ${firstPrint}, secondprint: ${secondPrint}`)
    }

    function calculate() {
      if (secondPrint === 0) {
        let resultWithoutSale = (subtype + firstPrint);
        return resultWithoutSale - (resultWithoutSale * (sale / 100));
      } else {
        let resultWithoutSale = (subtype + firstPrint + secondPrint);
        return resultWithoutSale - (resultWithoutSale * (sale / 100));
      }
    }
    let result = document.querySelector('#result');
    result.innerHTML = `${calculate()}`;
  }
}

function buildElement(tag, parentTag) {
  let e = document.createElement(tag);
  parentTag.appendChild(e);
  return e;
}

const calculatorBodyInnerHTML = document.querySelector(".calculator--body").innerHTML;
const getResultButton = document.querySelector(".calculator--calculate");

const classes = {};

function makeClasses() {
  const typeButtons = document.querySelectorAll(".calculator--clothes__single");
  for (let i = 0; i < typeButtons.length; i += 1) {
    let currentButtonType = typeButtons[i].getAttribute("type");
    let currentButtonID = typeButtons[i].getAttribute("id");
    classes[currentButtonID] = new Clothing(
      [currentButtonType],
      [currentButtonID],
      clothingData[currentButtonType]
    );
  }
}

function classInit(event) {
  let currentButtonID = this.getAttribute("id");
  classes[currentButtonID].Init();
  getResultButton.disabled = true;
  ifAmount = false;
  ifRadio = false;
  resultButtonValidate();
}

function reloadCalc(event) {
  let calcBody = document.querySelector(".calculator--body");
  calcBody.innerHTML = calculatorBodyInnerHTML;
  Object.keys(classes).forEach(function (prop) {
    delete classes[prop];
  });
  makeClasses();
  typeButtonsClick();
  getResultButton.disabled = true;
  let result = document.querySelector('#result');
  result.innerHTML = '0';
}

let ifAmount = false;
let ifRadio = false;

function amountValidate(event) {
  if (this.value.length > 0) {
    ifAmount = true;
  } else {
    ifAmount = false;
  } 
  enableResultButton();
}

function radioValidate(event) {
  if (this.checked) {
    ifRadio = true;
  }
  enableResultButton();
}

function enableResultButton() {
  console.log(ifAmount, 'ifAmount', ifRadio, 'ifRadio')
  if (ifAmount && ifRadio) {
    getResultButton.removeAttribute('disabled');
  } else {
    getResultButton.disabled = true;
  }
}

function resultButtonValidate() {
  let amount = document.querySelector('#amount');
  amount.addEventListener("keyup", amountValidate, false);
  let radios = document.querySelectorAll('input[type="radio"]');
  if (radios.length === 0) {
    ifRadio = true;
  }
  for (let r of radios) {
    r.addEventListener('click', radioValidate, false);
  }
  amount.onkeydown = function (e) {
    return !(/^[А-Яа-яA-Za-z., ]$/.test(e.key));
  }
}

function typeButtonsClick() {
  const typeButtons = document.querySelectorAll(".calculator--clothes__single");
  for (let i of typeButtons) {
    i.addEventListener("click", classInit, false);
  }
}

function calculateResult(event) {
  let currentButton = document.querySelector('.calculator--clothes__single');
  let currentButtonID = currentButton.getAttribute('id');
  classes[currentButtonID].GetResults();
}

function result() {
  getResultButton.addEventListener('click', calculateResult, false);
}

function onload() {
  makeClasses();
  typeButtonsClick();
  result();
}

window.onload = onload();
