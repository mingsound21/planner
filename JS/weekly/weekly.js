import {adjustWeekCount} from "../monthly/calendar.js"

const $week_day_nums = document.querySelectorAll(".week_day_num");
const $year_month = document.querySelector(".year_month");
const $week_num = document.querySelector('.week_num');
const $week_day_title = document.querySelectorAll(".week_day_title");
const $weeks_btn_container = document.querySelector('.weeks_btn_container');

// Year, Month 변하지 않으니 전역변수로
const today = new Date();
const Year = today.getFullYear();
const Month = today.getMonth();

const weekArr = calc_weekArr();
const week = calc_week(weekArr);
const week_date_arr = makeWeekArr(Year, Month, weekArr);

// weekArr : 일요일 날짜 담긴 배열
function calc_weekArr(){
    

    const this_month = new Date(Year, Month, 1);
    const month_first_date = this_month.getDate();
    const month_first_day = this_month.getDay();
    const week2_sunday_date = month_first_date + (6-month_first_day)+1;
    const month_last_date = new Date(Year, Month, 0).getDate();

    const weekArr = [];
    let i;
    
    for(i= week2_sunday_date;i<= month_last_date;i=i+7){
        weekArr.push(i);
    }
    
    return weekArr;
}

function calc_week(weekArr){
    const today = new Date();
    let week;
    let i;
    if(today.getDate() >= weekArr[weekArr.length-1]){
        return weekArr.length +1;
    }
    for(i=0;i<weekArr.length;i++){
        if(today.getDate()<weekArr[i]){
            week = i+1;
        }
    }
    return week;
}

// week_date_arr : 2차원 배열에 각 주의 날짜 들어있음
function makeWeekArr(Year, Month, weekArr){
    const week_date_arr = [[],[],[],[],[],[]];
    let i, j;
    const this_month_lastDate = new Date(Year, Month+1, 0);
    const last_month = new Date(Year, Month, 0);
    let last_month_date = last_month.getDate();
    // 첫주
    for(j=1;j<weekArr[0];j++){
        week_date_arr[1].push(j);
    }
    for(i=last_month.getDay();i>=0;i--){
        week_date_arr[1].unshift(last_month_date);
        last_month_date--
    }
    //중간
    for(i=1;i<weekArr.length;i++){
        for(j=weekArr[i-1];j<weekArr[i];j++){
            week_date_arr[i+1].push(j);
        }
    }
    // 마지막주
    for(j=weekArr[weekArr.length-1];j<=this_month_lastDate.getDate();j++){
        week_date_arr[weekArr.length+1].push(j);
    }

    let date = 1;
    
    for(i=this_month_lastDate.getDay()+1;i<7;i++){
        week_date_arr[weekArr.length+1].push(date);
        date++;
    }

    return week_date_arr;
}

function drawWeek(week_date_arr, week){
    let i;
    for(i=0;i<7;i++){
        $week_day_nums[i].innerHTML = week_date_arr[week][i];
    }
}

function colorToday(week){
    const today = new Date();
    let day = today.getDay();
    if($week_num.innerHTML == week){
        $week_day_title[day].style.backgroundColor = "#FFD59E";
    }else{
        $week_day_title[day].style.backgroundColor = "#A2D2FF";
    }
    
}

function week_btn_onClick(event){
    let btn = event.target.closest('button');
    const select_week = btn.children[0].innerHTML;

    $week_num.innerHTML = select_week;
    drawWeek(week_date_arr, select_week);
}

window.addEventListener('load', () =>{
    $year_month.innerHTML = `${Year} / ${Month+1}`;
    $week_num.innerHTML = week;

    drawWeek(week_date_arr, week);
    colorToday(week);
    adjustWeekCount(Year, Month, makeWeekBtn);
})

$weeks_btn_container.addEventListener('click', (event)=>{
    week_btn_onClick(event);
    colorToday();
});

// add to do btn clickhandle
let todo_item_num = 0;
const $week_calendar = document.querySelector('.week_calendar');
function addToDoBtnClickHandler(event){
    const target = event.target.closest('.add_todo_btn');
    
    if(target == null) return;
    const $todo_item_container = target.parentNode;
    const new_todo_item_container = document.createElement('div');
    new_todo_item_container.classList.add('todo_item_container');
    new_todo_item_container.innerHTML = `
    <div class="todo_checkbox">
        <i class="fa-solid fa-check"></i>
    </div>
    <input type="text" placeholder="할 일 입력" class="todo_item">`;
    $todo_item_container.appendChild(new_todo_item_container);
    const new_input = new_todo_item_container.querySelector('input');
    new_input.focus();
}
$week_calendar.addEventListener('click', (event) =>{
    addToDoBtnClickHandler(event);
    remove_todo(event);
})

function remove_todo(event){
    const target = event.target.closest('.todo_checkbox');
    if(target == null) return;

    const $todo_item_container = target.parentNode;
    $todo_item_container.remove();
}

// week 수에 맞춰 week Btn 생성
function makeWeekBtn(weekNum){
    $weeks_btn_container.style.gridTemplateColumns = `repeat(${weekNum}, 1fr)`;
    for(let i=1; i<=weekNum;i++){
        const newBtnContainer = document.createElement('button');
        newBtnContainer.classList.add('weeks_btn');
        newBtnContainer.innerHTML = `<span>${i}</span>`;
        $weeks_btn_container.appendChild(newBtnContainer);
    }
}