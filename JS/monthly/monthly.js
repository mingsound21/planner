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

function makeCalendar(dayObjArray, Year, Month){
    let MonthLastDateObj = new Date(Year, Month, 0); 
    let MonthLastDate = MonthLastDateObj.getDate();
    
    let MonthStartDayObj = new Date(Year, Month, 1);
    let MonthStartDay = MonthStartDayObj.getDay();
    
    let i;
    for(i=0;i<dayObjArray.length;i++){
        dayObjArray[i].innerHTML="";
    }

    let day = MonthStartDay;
    let LastMonthDate = new Date(Year, Month-1, 0).getDate();
    for(i=day-1;i>=0;i--){
        dayObjArray[i].innerHTML = LastMonthDate;
        dayObjArray[i].style.color = 'gray';
        LastMonthDate--;
    }

    day = MonthStartDay;
    for(i=1;i<=MonthLastDate;i++){
        dayObjArray[day].innerHTML = i;
        day++;
    }

    let NextMonthDay = new Date(Year, Month+1, 1).getDay();
    i=1;
    for(;NextMonthDay<7;NextMonthDay++){
        dayObjArray[day].innerHTML = i;
        dayObjArray[day].style.color = 'gray';
        i++;
        day++;
    }
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