import {makeCalendar, adjustWeekCount} from './calendar.js';

const $month_header_container = document.querySelector('.month_container');
const $year_header_container = document.querySelector('.year_container');
const $calendar_container = document.querySelector('.calendar');
const $weekTitle_container = document.querySelector('.weekTitle');

function add_date_dot(dayContainer, type){
    let date_dot = document.createElement('div');
    date_dot.classList.add('date_dot', type);
    
    dayContainer.appendChild(date_dot);
}

function dot_today(Year, Month){
    const today = new Date();
    if(Year!=today.getFullYear() || Month!=today.getMonth()+1) return;

    const $days = document.querySelectorAll(".days");
    const idx = new Date(Year, Month-1, 1).getDay() + 7 - 1 + today.getDate();
    add_date_dot($days[idx], 'today');
}
function setToToday(){
    const today = new Date();
    const Year = today.getFullYear();
    const Month = today.getMonth();
    const today_date = today.getDate();
    

    $year_header_container.children[1].innerHTML = Year;
    $month_header_container.children[1].innerHTML = Month + 1;

    adjustWeekCount(yearControl.current_page_Year, yearControl.current_page_Month-1, makeWeekAndDayContainer);
    const $day_nums = document.querySelectorAll(".day_num");
    makeCalendar($day_nums, Year, Month);

    dot_today(yearControl.current_page_Year, yearControl.current_page_Month);
}

class headerControl{
    constructor(year, month){
        this.yearTitle = year.children[1];
        this.monthTitle = month.children[1];
        year.onclick = this.onClick.bind(this); // 이부분 이해 안됨 bind?
        month.onclick = this.onClick.bind(this);
    }
    get current_page_Year(){
        return parseInt(this.yearTitle.innerHTML);
    }

    get current_page_Month(){
        return parseInt(this.monthTitle.innerHTML);
    }

    year_left(){
        this.yearTitle.innerHTML =  this.current_page_Year - 1;
    }
    year_right(){
        this.yearTitle.innerHTML =  this.current_page_Year + 1;
    }

    month_left(){
        if(this.current_page_Month == 1){
            this.monthTitle.innerHTML = 12;
            this.yearTitle.innerHTML =  this.current_page_Year - 1;
        }else{
            this.monthTitle.innerHTML = this.current_page_Month - 1;
        }
    }

    month_right(){
        if(this.current_page_Month == 12){
            this.monthTitle.innerHTML = 1;
            this.yearTitle.innerHTML =  this.current_page_Year + 1;
        }else{
            this.monthTitle.innerHTML = this.current_page_Month + 1;
        }
    }
    

    onClick(event){
        let action = event.target.dataset.action;
        if(action){
            this[action]();
        }
    }
}

function makeWeekAndDayContainer(weekNum){
    $calendar_container.style.gridTemplateRows = `0.5fr repeat(${weekNum}, 1fr)`;
    $calendar_container.innerHTML = `
        <div class="weekTitle">
            <button class="week_btn"></button>
            <div class="days"><span class="dayOfWeek">SUN</span></div>
            <div class="days"><span class="dayOfWeek">MON</span></div>
            <div class="days"><span class="dayOfWeek">TUE</span></div>
            <div class="days"><span class="dayOfWeek">WED</span></div>
            <div class="days"><span class="dayOfWeek">THR</span></div>
            <div class="days"><span class="dayOfWeek">FRI</span></div>
            <div class="days"><span class="dayOfWeek">SAT</span></div>
        </div>`;
    let i;
    let newContainer;
    for(i=1; i<=weekNum;i++){
        newContainer = document.createElement('div');
        newContainer.classList.add('week');
        $calendar_container.appendChild(newContainer);
        newContainer.innerHTML =  `
        <button class="week_btn"><a href="./weekly.html">${i}</a></button>
        <div class="days"><span class="day_num"></span></div>
        <div class="days"><span class="day_num"></span></div>
        <div class="days"><span class="day_num"></span></div>
        <div class="days"><span class="day_num"></span></div>
        <div class="days"><span class="day_num"></span></div>
        <div class="days"><span class="day_num"></span></div>
        <div class="days"><span class="day_num"></span></div>
        `
    }
}

const yearControl = new headerControl($year_header_container, $month_header_container);

$month_header_container.addEventListener('click', (event)=>{
    if(event.target.dataset.action){
        adjustWeekCount(yearControl.current_page_Year, yearControl.current_page_Month-1, makeWeekAndDayContainer);
        const $day_nums = document.querySelectorAll(".day_num");
        makeCalendar($day_nums, yearControl.current_page_Year, yearControl.current_page_Month-1);
        dot_today(yearControl.current_page_Year, yearControl.current_page_Month);
    }
})

$year_header_container.addEventListener('click', (event)=>{
    if(event.target.dataset.action){
        adjustWeekCount(yearControl.current_page_Year, yearControl.current_page_Month-1, makeWeekAndDayContainer);
        const $day_nums = document.querySelectorAll(".day_num");
        makeCalendar($day_nums, yearControl.current_page_Year, yearControl.current_page_Month-1);
        dot_today(yearControl.current_page_Year, yearControl.current_page_Month);
    }
})



window.addEventListener('load', () =>{
    setToToday(); 
})

// Schedule
function toggleSchedule(text){
    if(text == 'hidden'){
        $schedule_bg.classList.replace('schedule_bg_show', 'schedule_bg_hidden')
        $add_schedule_container.classList.replace('schedule_show', 'schedule_hidden')
    }else{
        $schedule_bg.classList.replace('schedule_bg_hidden', 'schedule_bg_show')
        $add_schedule_container.classList.replace('schedule_hidden', 'schedule_show')
    }
}

const $schedule_bg = document.querySelector(".schedule_bg");
const $add_schedule_container = document.querySelector('.add_schedule_container');
const $start_date = document.querySelector(".start_date");
const $end_date = document.querySelector('[id=schedule_date]');

$calendar_container.addEventListener('click', (event)=>{
    const target = event.target.closest('.days');

    if(target.parentNode.classList.contains('weekTitle')) return;

    const year_now = $year_header_container.children[1].innerHTML;
    const month_now = $month_header_container.children[1].innerHTML;
    const date_now = target.children[0].innerHTML;
    
    toggleSchedule('show');
    $end_date.focus();
    $start_date.innerText = `${year_now} / ${month_now} / ${date_now}`;
})

const $submitBtn = document.querySelector('[type=submit]');
$submitBtn.addEventListener('click', ()=>{
    toggleSchedule('hidden')
});

// 근데 이 그려놓은것을 저장을 어떻게,,,
function drawSchedule(){
    // schedule box에서 (색, 시작날짜, 끝나는 날짜, TODO) 가져오기
}

