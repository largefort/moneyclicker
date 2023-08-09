let money = 0;
let clickValue = 1;
let cursorsCount = 0;
let tutorialStage = 0;
const tutorialSteps = [
    "This is your money. You earn more by clicking the dollar image.",
    "You can buy a business to earn money automatically.",
    "Upgrades can increase the money you get per click. Try purchasing one!",
    "Cursors hover around the dollar, giving you more money per second.",
    ""
];

const cursorsContainer = document.getElementById("cursors");

function loadGame() {
    const savedData = localStorage.getItem('moneyClicker');
    if (savedData) {
        const gameData = JSON.parse(savedData);
        money = gameData.money;
        clickValue = gameData.clickValue;
        tutorialStage = gameData.tutorialStage;
        cursorsCount = gameData.cursorsCount || 0;
        for (let i = 0; i < cursorsCount; i++) {
            addCursor();
        }
    }
}

function saveGame() {
    const gameData = {
        money,
        clickValue,
        tutorialStage,
        cursorsCount
    };
    localStorage.setItem('moneyClicker', JSON.stringify(gameData));
}

function earnMoney() {
    money += clickValue;
    updateDisplay();
}

function purchaseBusiness() {
    if (money >= 10) {
        money -= 10;
        setInterval(earnMoney, 1000);
        updateDisplay();
    }
}

function purchaseUpgrade() {
    if (money >= 40) {
        money -= 40;
        clickValue *= 2;
        updateDisplay();
    }
}

function purchaseCursor() {
    if (money >= 25) {
        money -= 25;
        cursorsCount++;
        addCursor();
        setInterval(earnMoney, 2000);
        updateDisplay();
    }
}

function addCursor() {
    const cursorElem = document.createElement("div");
    cursorElem.className = "cursor";
    const rotateDegree = (360 / cursorsCount) * (cursorsCount - 1);
    cursorElem.style.transform = `rotate(${rotateDegree}deg) translate(60px) rotate(-${rotateDegree}deg)`;
    cursorsContainer.appendChild(cursorElem);
}

function updateDisplay() {
    document.getElementById("money").textContent = money;
    saveGame();
}

function advanceTutorial() {
    if (tutorialStage < tutorialSteps.length - 1) {
        document.getElementById("tutorialText").textContent = tutorialSteps[tutorialStage];
        tutorialStage++;
    } else {
        document.getElementById("tutorial").style.display = "none";
    }
    saveGame();
}

// Initial calls
loadGame();
advanceTutorial();
setInterval(saveGame, 1000);  // Saving game state every second.
