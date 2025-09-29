// ===== 전역 변수 =====
let records = JSON.parse(localStorage.getItem('records')) || [];
let filterState = 'all';

// ===== DOM 요소 =====
const inputText = document.getElementById('input-text');
const inputPrice = document.getElementById('input-price');
const inputIncomeBtn = document.getElementById('input-income');
const inputSpendBtn = document.getElementById('input-spend');
const inputAddBtn = document.getElementById('input-data');

const filterBtns = document.querySelectorAll('.filter-buttons button');
const allIncomeSpan = document.querySelector('.all-incom span');
const allSpendSpan = document.querySelector('.all-spend span');
const balanceSpan = document.querySelector('.all-balance span');

const outputTotal = document.getElementById('total');
const historyList = document.getElementById('history-list');

// ===== 초기화 함수 =====
function init() {
    bindEvents();
    render();
}

// ===== 이벤트 바인딩 =====
function bindEvents() {
    inputAddBtn.addEventListener('click', function(){
        addRecord();
    });

    inputText.addEventListener('keydown', function(e){
        if(e.key === 'Enter') addRecord();
    });

    inputPrice.addEventListener('keydown', function(e){
        if(e.key === 'Enter') addRecord();
    });

    filterBtns.forEach(function(btn){
        btn.addEventListener('click', function(){
            setFilter(btn.dataset.filter);
        });
    });
}

// ===== 데이터 조작 함수 =====
function addRecord() {
    const text = inputText.value.trim();
    const price = Number(inputPrice.value);
    const type = inputIncomeBtn.classList.contains('active') ? 'income' : 'spend';

    if(!text || isNaN(price)) return alert("내용과 금액을 올바르게 입력하세요.");

    const record = {
        id: Date.now(),
        text: text,
        price: price,
        type: type,
        createdAt: new Date().toLocaleString()
    };

    //칸비우기
    records.push(record);
    inputText.value = '';
    inputPrice.value = '';

    saveRecords();
    render();
}

function deleteRecord(id){
    records = records.filter(function(r){
        return r.id !== id;
    });
    saveRecords();
    render();
}

function saveRecords(){
    localStorage.setItem('records', JSON.stringify(records));
}

// ===== 필터 함수 =====
function setFilter(filter){
    filterState = filter;

    filterBtns.forEach(function(btn){
        btn.className = btn.dataset.filter === filter ? 'filter-btn active' : 'filter-btn';
    });

    render();
}

function getFilteredRecords(){
    if(filterState === 'all') return records;
    return records.filter(function(r){
        return r.type === filterState;
    });
}

// ===== 화면 렌더링 =====
function render(){

    historyList.innerHTML = '';

    const filtered = getFilteredRecords();

    if(filtered.length === 0){
        const emptyEl = document.createElement('div');
        emptyEl.textContent = '기록이 없습니다.';
        historyList.appendChild(emptyEl);
    } else {
        filtered.forEach(function(record){
            renderRecord(record);
        });
    }

    updateSummary();
}

function renderRecord(record){
    const box = document.createElement('div');
    box.className = 'box';

    const box1 = document.createElement('div');
    box1.className = 'box1';
    const dateInput = document.createElement('input');
    dateInput.type = 'text';
    dateInput.id = 'date';
    dateInput.value = record.createdAt;
    dateInput.readOnly = true;

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.id = 'text';
    textInput.value = record.text;
    textInput.readOnly = true;

    box1.appendChild(dateInput);
    box1.appendChild(textInput);

    const box2 = document.createElement('div');
    box2.className = 'box2';
    const priceInput = document.createElement('input');
    priceInput.type = 'text';
    priceInput.id = record.type === 'income' ? 'price-text' : 'price-text-text';
    priceInput.value = (record.type === 'income' ? '+' : '-') + record.price.toLocaleString() + '원';
    priceInput.readOnly = true;

    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.id = 'delete-btn';
    deleteBtn.value = '삭제';
    deleteBtn.addEventListener('click', function(){
        deleteRecord(record.id);
    });

    box2.appendChild(priceInput);
    box2.appendChild(deleteBtn);

    box.appendChild(box1);
    box.appendChild(box2);

    historyList.appendChild(box);
}

// ===== 요약 계산 =====
function updateSummary(){
    let totalIncome = 0;
    let totalSpend = 0;

    for(let i = 0; i < records.length; i++){
        if(records[i].type === 'income') totalIncome += records[i].price;
        else totalSpend += records[i].price;
    }

    allIncomeSpan.textContent = totalIncome.toLocaleString() + '원';
    allSpendSpan.textContent = totalSpend.toLocaleString() + '원';
    balanceSpan.textContent = (totalIncome - totalSpend).toLocaleString() + '원';

    outputTotal.textContent= (totalIncome - totalSpend).toLocaleString() + '원';
}

// ===== 수입/지출 버튼 토글 =====
inputIncomeBtn.addEventListener('click', function(){
    inputIncomeBtn.id = 'input-income-income';
    inputSpendBtn.id = 'input-spend';
    inputIncomeBtn.classList.add('active');
    inputSpendBtn.classList.remove('active');
});

inputSpendBtn.addEventListener('click', function(){
    inputSpendBtn.id = 'input-spend-spend';
    inputIncomeBtn.id = 'input-income';
    inputSpendBtn.classList.add('active');
    inputIncomeBtn.classList.remove('active');
});


//DOMContentLoaded -> HTML이 전부 로드되어 DOM트리가 완성되면 실행
document.addEventListener('DOMContentLoaded', function(){
    init();
});
