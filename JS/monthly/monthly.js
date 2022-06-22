import {makeCalendar} from './calendar.js';

const $day_nums = document.querySelectorAll(".day_num");
const $days = document.querySelectorAll(".days");
const $month_header_container = document.querySelector('.month_container');
const $year_header_container = document.querySelector('.year_container');
const $calendar_container = document.querySelector('.calendar');
const $weekTitle_container = document.querySelector('.weekTitle');

function add_date_dot(dayContainer, type){
    let date_dot = document.createElement('div');
    date_dot.classList.add('date_dot', type);
    
    dayContainer.appendChild(date_dot);
}

function setToToday(){
    const today = new Date();
    const Year = today.getFullYear();
    const Month = today.getMonth();
    const today_date = today.getDate();

    $year_header_container.children[1].innerHTML = Year;
    $month_header_container.children[1].innerHTML = Month + 1;

    const idx = new Date(Year, Month, 1).getDay() + 7 - 1 + today_date;
    add_date_dot($days[idx], 'today');

    makeCalendar($day_nums, Year, Month);
}



class headerControl{
    constructor(year, month){
        this.yearTitle = year.children[1];
        this.monthTitle = month.children[1];
        year.onclick = this.onClick.bind(this); // 이부분 이해 안됨 bind?
        month.onclick = this.onClick.bind(this);
    }
    get currentYear(){
        return parseInt(this.yearTitle.innerHTML);
    }

    get currentMonth(){
        return parseInt(this.monthTitle.innerHTML);
    }
    year_left(){
        this.yearTitle.innerHTML =  this.currentYear - 1;
    }
    year_right(){
        this.yearTitle.innerHTML =  this.currentYear + 1;
    }

    month_left(){
        if(this.currentMonth == 1){
            this.monthTitle.innerHTML = 12;
            this.yearTitle.innerHTML =  this.currentYear - 1;
        }else{
            this.monthTitle.innerHTML = this.currentMonth - 1;
        }
    }

    month_right(){
        if(this.currentMonth == 12){
            this.monthTitle.innerHTML = 1;
            this.yearTitle.innerHTML =  this.currentYear + 1;
        }else{
            this.monthTitle.innerHTML = this.currentMonth + 1;
        }
    }
    

    onClick(event){
        let action = event.target.dataset.action;
        if(action){
            this[action]();
        }
    }
}

const yearControl = new headerControl($year_header_container, $month_header_container);

$month_header_container.addEventListener('click', (event)=>{
    if(event.target.dataset.action){
        makeCalendar($day_nums, yearControl.currentYear, yearControl.currentMonth-1);
    }
})

$year_header_container.addEventListener('click', (event)=>{
    if(event.target.dataset.action){
        makeCalendar($day_nums, yearControl.currentYear, yearControl.currentMonth-1);
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

