const initialInventory = [
    { name: '게이트밸브', quantity: getRandomInt(1, 4), location: 'OO중앙창고 A1' },
    { name: '볼 밸브', quantity: getRandomInt(1, 4), location: 'OO중앙창고 B2' },
    { name: '체크 밸브', quantity: getRandomInt(1, 4), location: 'OO중앙창고 C3' },
    { name: '고무 가스켓', quantity: getRandomInt(1, 4), location: 'OO중앙창고 D4' },
    { name: '메카니컬 씰', quantity: getRandomInt(1, 4), location: 'OO중앙창고 A5' },
    { name: '패킹', quantity: getRandomInt(1, 4), location: 'OO중앙창고 B1' },
    { name: '엘보우', quantity: getRandomInt(1, 4), location: 'OO중앙창고 C2' },
    { name: '유니언', quantity: getRandomInt(1, 4), location: 'OO중앙창고 D3' },
    { name: '티', quantity: getRandomInt(1, 4), location: 'OO중앙창고 A2' },
    { name: '커플링', quantity: getRandomInt(1, 4), location: 'OO중앙창고 B3' },
    { name: '스트레이너', quantity: getRandomInt(1, 4), location: 'OO중앙창고 C4' },
    { name: '고무 호스', quantity: getRandomInt(1, 4), location: 'OO중앙창고 D1' },
    { name: '베어링', quantity: getRandomInt(1, 4), location: 'OO중앙창고 A3' },
    { name: '샤프트', quantity: getRandomInt(1, 4), location: 'OO중앙창고 B4' },
    { name: '플랜지', quantity: getRandomInt(1, 4), location: 'OO중앙창고 C1' },
    { name: '유니버셜 조인트', quantity: getRandomInt(1, 4), location: 'OO중앙창고 D2' }
];

const inventoryList = document.getElementById("inventory-list");
const inventory = JSON.parse(localStorage.getItem("inventory")) || initialInventory;

function displayInventory() {
    inventoryList.innerHTML = '';
    inventory.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="inventory-item" data-index="${index}">
            ${item.name} - 재고: ${item.quantity}개, 위치: ${item.location}
        `;
        inventoryList.appendChild(li);
    });
}

function displayAddStockList() {
    const addStockList = document.getElementById("add-stock-list");
    addStockList.innerHTML = '';
    inventory.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="add-stock-item" data-index="${index}">
            ${item.name} - 재고: ${item.quantity}개, 위치: ${item.location}
        `;
        addStockList.appendChild(li);
    });
}

function saveInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

document.getElementById("request-items").addEventListener("click", function() {
    const selectedItems = document.querySelectorAll(".inventory-item:checked");
    let itemsDecreased = [];
    selectedItems.forEach(item => {
        const index = item.dataset.index;
        if (inventory[index].quantity > 0) {
            inventory[index].quantity -= 1;
            itemsDecreased.push(inventory[index].name);
            if (inventory[index].quantity <= 3 && inventory[index].quantity > 0) {
                alert('재고가 얼마 남지 않았으니 주의 바랍니다.');
            } else if (inventory[index].quantity === 0) {
                alert('재고가 모두 소진되었습니다.');
            }
        } else {
            alert('재고가 모두 소진되었습니다.');
        }
    });
    if (itemsDecreased.length > 0) {
        alert(`${itemsDecreased.join(', ')} 1개 감소하였습니다.`);
    }
    saveInventory();
    displayInventory();
});

document.getElementById("add-stock-button").addEventListener("click", function() {
    const password = document.getElementById("password-input").value;
    if (password !== "1234") {
        alert("잘못된 비밀번호입니다.");
        return;
    }
    displayAddStockList();
    document.getElementById("add-stock-modal").style.display = 'block';
});

document.getElementById("final-add-stock-button").addEventListener("click", function() {
    const quantityToAdd = parseInt(document.getElementById("add-quantity-input").value);
    const selectedItems = document.querySelectorAll(".add-stock-item:checked");
    let itemsIncreased = [];
    selectedItems.forEach(item => {
        const index = item.dataset.index;
        inventory[index].quantity += quantityToAdd;
        itemsIncreased.push(inventory[index].name);
    });
    if (itemsIncreased.length > 0) {
        alert(`${itemsIncreased.join(', ')}에 ${quantityToAdd}개가 추가되었습니다.`);
    }
    saveInventory();
    displayInventory();
    document.getElementById("add-stock-modal").style.display = 'none';
});

document.querySelector(".close-button").addEventListener("click", function() {
    document.getElementById("add-stock-modal").style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == document.getElementById("add-stock-modal")) {
        document.getElementById("add-stock-modal").style.display = 'none';
    }
}

window.onload = displayInventory;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (min - max + 1)) + min;
}
