let money = 0;
let clickValue = 1;
let cursorsCount = 0;

const cursorsContainer = document.getElementById("cursors");

function loadGame() {
    const savedData = localStorage.getItem('moneyClicker');
    if (savedData) {
        const gameData = JSON.parse(savedData);
        money = gameData.money;
        clickValue = gameData.clickValue;
        cursorsCount = gameData.cursorsCount || 0;
        for (let i = 0; i < cursorsCount; i++) {
            addCursor();
        }
    }
    updateDisplay();
}

function saveGame() {
    const gameData = {
        money,
        clickValue,
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
    cursorElem.style.transform = `translate(-50%, -50%) rotate(${rotateDegree}deg) translate(50px) rotate(-${rotateDegree}deg)`;
    cursorElem.style.animationDuration = `${10 - (cursorsCount * 0.5)}s`;
    cursorsContainer.appendChild(cursorElem);
}

function updateDisplay() {
    document.getElementById("money").textContent = money;
    saveGame();
}

// Initial calls
loadGame();
setInterval(saveGame, 1000);  // Saving game state every second.
