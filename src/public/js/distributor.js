class DistributorItem {
    sweet = true;
    kCal = 0;
    expiresInMonth = 12;
    price;
    name = "";
    id = "";

    constructor (_sweet, _kCal, _expiresInMonth, _price, _name, _id) {
        this.sweet = _sweet;
        this.kCal = _kCal;
        this.expiresInMonth = _expiresInMonth;
        this.price = _price;
        this.name = _name;
        this.id = _id

    }
}

class Snack extends DistributorItem {
    gr;
    salted = false;

    constructor(_salted, _gr, _sweet, _kCal, _expiresInMonth, _price, _name, _id) {
        super(_sweet, _kCal, _expiresInMonth, _price, _name, _id);

        this.salted = _salted;
        this.gr = _gr;
    }

}

class Beverage extends DistributorItem {
    liter;

    constructor(_liter, _sweet, _kCal, _expiresInMonth, _price, _name, _id) {
        super(_sweet, _kCal, _expiresInMonth, _price, _name, _id);
        this.liter = _liter
    }

}

class Distributor {
    constructor(items) {

    }
}

const mars = new Snack(false, 51, true, 230, 10, 1.20, "Mars", "A1")
const snickers = new Snack(false, 62.5, true, 280, 12, 1.20, "Snickers", "D4")
const twix = new Snack(false, 100, true, 500, 12, 1.50, "Twix", "A2")
const zweifel = new Snack(true, 30, false, 175, 13, 2, "Zweifel", "C2")
const mnms = new Snack(false, 45, true, 220, 15, 0.80, "M&Ms", "D3")
const doritos = new Snack(true, 100, false, 537, 24, 2.40, "Doritos", "B1")
const kitKat = new Snack(false, 41.5, true, 126, 12, 1.5, "KitKat", "C1")
const bounty = new Snack(false, 28.5, true, 139, 10, 1.20, "Bounty", "A4")

const snacks = [mars, snickers, twix, zweifel, mnms, doritos, kitKat, bounty]

const fanta = new Beverage(0.5, true,  64, 6, 2.30, "Fanta", "B3")
const cocaCola = new Beverage(1, true, 43, 9, 2.30, "Coca Cola", "C3")
const sprite = new Beverage(0.5, true, 39, 9, 2.30, "Sprite", "A3")
const water = new Beverage(1, false, 0, 0, 1.50, "Walser", "D1")
const redBull = new Beverage(0.25, true, 4.5, 15, 2.20, "Red Bull", "C4")
const iceTea = new Beverage(0.5, true, 30, 12, 2.30, "Lipton Ice Tea", "D2")
const orangeJuice = new Beverage(0.5, true, 0, 4, 2.80, "Jus d'orange", "B4")
const volvic = new Beverage(0.5, false, 0, 12, 1.50, "Volvic", "B2")

const beverage = [fanta, cocaCola, sprite, water, redBull, iceTea, orangeJuice, volvic]

// console.log("Mon fanta expire dans " + fanta.expiresInMonth + " mois et contient " + fanta.kCal + "kCal.")

let buyId = []; // stores for example A1, B4

let padLetter = null;
let padNumber = null;
let buttonId = null;


let currentObject
let buttons = document.querySelectorAll("div.button")
buttons.forEach(button => {
    button.addEventListener("click", function(event) {
        buttonId = button.dataset.value;
        updateBuyId()
    })
})

document.getElementById("displayCredit").innerHTML = "Crédit: 0"


function updateBuyId() {
    let x = padLetter
    if (padLetter === null) {x = "X"}
    let y = padNumber
    if (padNumber === null) {y = "X"}
    document.getElementById("displayScreen").innerHTML = x + y + ":"
    if (padLetter !== null && padNumber !== null) {
        const id = padLetter + padNumber;
        buyId = [];
        buyId.push(id);
        console.log(buyId);

        padNumber = null
        padLetter = null
        if (snacks.find(DistributorItem => DistributorItem.id === buyId[0])) {
            currentObject = retrieveObject(snacks, buyId[0])
        }
        else if (beverage.find(DistributorItem => DistributorItem.id === buyId[0])) {
            currentObject = retrieveObject(beverage, buyId[0])
        }
        displayScreen()
    }
    else if (buttonId !== null) {
        buyId = [];
        buyId.push(buttonId)
        buttonId = null

        if (snacks.find(DistributorItem => DistributorItem.id === buyId[0])) {
            currentObject = retrieveObject(snacks, buyId[0])
        }
        else if (beverage.find(DistributorItem => DistributorItem.id === buyId[0])) {
            currentObject = retrieveObject(beverage, buyId[0])
        }
        displayScreen()
    }
}

function retrieveObject(array, id) {
    return array.find(item => item.id === id);
}

function displayScreen() {
    document.getElementById("displayScreen").innerHTML = currentObject.id + ": " + currentObject.name + " coûte " + currentObject.price + " $";
}

// Ici on s'occupe du drag and drop
let draggableItems = document.querySelectorAll('.wallet div[draggable="true"]');
const droppable = document.getElementById("droppable");
let draggedItem // will store actual dragged money value
let balance = 0

draggableItems.forEach(element => {
    element.addEventListener('dragstart', function(event) {
        draggedItem = event.target; // or = element
        // event.dataTransfer.setData("money", draggedItem.dataset.value);
    })
})

droppable.addEventListener('dragover', function(event) {
    event.preventDefault();
})

let moneyValue
droppable.addEventListener('drop', function(event) {
    event.preventDefault();
    moneyValue = parseFloat(draggedItem.dataset.value)
    balance = Math.round((balance + moneyValue) * 100) /100
    console.log(balance)
    document.getElementById("displayCredit").innerHTML = "Crédit: " + balance
});

let pay = document.getElementById("pay")
let main = document.querySelector("#main");
pay.addEventListener("click", function(event) {
    main.style = ""
    if (buyId[0] === undefined) {
        textToScreen("Veuillez sélectionner un produit.")
    }
    else if (balance >= currentObject.price) {
        balance = balance - currentObject.price
        balance = Math.round((balance) * 100) / 100
        document.getElementById("displayCredit").innerHTML = "Crédit: " + balance
        textToScreen("Merci !")
        main.style.animationName = "hop";
        currentObject = []
        buyId = []
    }
    else {
        textToScreen("Veuillez insérer plus d'argent.")
        currentObject = []

    }

})

main.addEventListener('animationend', onAnimationEnd);


function onAnimationEnd() {
    main.style.animationName = "";
}


let myTimeout;


function textToScreen(text, duration = 3000) {
    clearTimeout(myTimeout);
    document.getElementById("displayScreen").innerHTML = text;
    myTimeout = setTimeout(() => { document.getElementById("displayScreen").innerHTML = "" }, duration);
}

const padLetters = document.querySelectorAll('.padLetter .buttonPad'); // vient sélectionner tous les boutons Letter
padLetters.forEach((padLetterElement) => { // ce qui suit s'applique à tous les éléments "letter"
    padLetterElement.addEventListener('click', () => {
        clearTimeout(myTimeout); //enlève le timeout de textToScreen()
        padLetter = padLetterElement.getAttribute('value'); // vient chercher la valeure de l'élément cliqué
        updateBuyId();
    });
});

const padNumbers = document.querySelectorAll('.padNumber .buttonPad');
padNumbers.forEach((padNumberElement) => {
    clearTimeout(myTimeout); //enlève le timeout de textToScreen()
    padNumberElement.addEventListener('click', () => {
        padNumber = padNumberElement.getAttribute('value');
        updateBuyId();
    });
});




//if (fanta instanceof Snack) {} will return false
