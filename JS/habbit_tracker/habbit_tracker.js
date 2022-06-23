import {makeCalendar, adjustWeekCount} from '../monthly/calendar.js';

// Calendar
const $year_num_container = document.querySelector('.year_num_container');
const $year = document.querySelector('.year');
const $month_btn_container = document.querySelector(".month_btn_container");
const today = new Date();

function drawCalendarDate(){
    const Year = $year.innerHTML;
    const Month = $month_btn_container.querySelector('.clicked').innerHTML;
    adjustWeekCount(Year, parseInt(Month)-1, makeWeekAndDateContainer);
    const $date = document.querySelectorAll('.date');
    makeCalendar($date, Year, parseInt(Month)-1);
}
function yearUpDown(event){
    let action = event.target.dataset.action;
    
    if(action){
        if(action == 'year_left'){
            $year.innerHTML = parseInt($year.innerHTML) - 1;
        }else{
            $year.innerHTML = parseInt($year.innerHTML) + 1;
        }
    }
}

$year_num_container.addEventListener("click", (event)=>{
    yearUpDown(event);
    drawCalendarDate();
})

function handleSideBarClick(event, container){
    const target = event.target.closest('button');
    if(target == null || target.tagName != 'BUTTON') return;
    const beforeClicked = container.querySelector('.clicked');
    beforeClicked.classList.toggle('clicked');

    target.classList.add('clicked');
}

$month_btn_container.addEventListener('click', (event)=>{
    handleSideBarClick(event, $month_btn_container);
    drawCalendarDate();
})

// Calendar - habbit
const $habbit_calendar = document.querySelector('.habbit_calendar');

function makeWeekAndDateContainer(weekNum){
    $habbit_calendar.style.gridTemplateRows = `5rem repeat(${weekNum}, 1fr)`;
    $habbit_calendar.innerHTML = `
    <div class="weekTitle">
        <div class="day">SUN</div>
        <div class="day">MON</div>
        <div class="day">TUE</div>
        <div class="day">WED</div>
        <div class="day">THU</div>
        <div class="day">FRI</div>
        <div class="day">SAT</div>
    </div>`;
    let i;
    let newContainer;
    for(i=1; i<=weekNum;i++){
        newContainer = document.createElement('div');
        newContainer.classList.add('weekRow');
        $habbit_calendar.appendChild(newContainer);
        newContainer.innerHTML =  `
            <div class="date"></div>
            <div class="date"></div>
            <div class="date"></div>
            <div class="date"></div>
            <div class="date"></div>
            <div class="date"></div>
            <div class="date"></div>        
        `
    }
}

$habbit_calendar.addEventListener('click', (event)=>{
    const target = event.target;
    if(!target.classList.contains('date')) return;
    target.classList.toggle("achieve");
})

// habbit choose
const $habbit_choose = document.querySelector(".habbit_choose");
const $habbit_result_title = document.querySelector('.habbit_result_title');


$habbit_choose.addEventListener("click", (event)=>{
    const target = event.target;
    const habbit_name = target.closest("button").innerText;
    handleSideBarClick(event, $habbit_choose);
    $habbit_result_title.innerHTML = `HABBIT : ${habbit_name}`;
})

// habbit - graph btn
const $chart_container = document.querySelector('.chart_container');

$habbit_result_title.addEventListener('click', (event)=>{
    
    if($habbit_result_title.classList.contains('graph')){
        let habbit_name = $habbit_choose.querySelector('.clicked').innerText;
        $habbit_result_title.innerText = `HABBIT : ${habbit_name}`;

        $habbit_calendar.classList.replace('hidden', 'show');
        $chart_container.classList.replace('show', 'hidden');
    }else{
        $habbit_result_title.innerText = 'graph'

        $habbit_calendar.classList.replace('show', 'hidden');
        $chart_container.classList.replace('hidden', 'show');
    }
    $habbit_result_title.classList.toggle('graph');
})

// Achievement graph
const $achievement_bggraph = document.querySelector('.achievement_bggraph');
const $achievement_graph_fill = document.querySelector('.achievement_graph_fill');
const $achievement_graph = document.querySelector('.achievement_graph');

const bggraph_left = $achievement_bggraph.getBoundingClientRect().left;
const graph_container_left = $achievement_graph.getBoundingClientRect().left;

$achievement_graph_fill.style.left = `${bggraph_left-graph_container_left}px`;

//
const $monthBtns = document.querySelectorAll('.monthBtn');
const $habbit_item = document.querySelectorAll('.habbit_item');

window.addEventListener('load', (event)=>{
    $year.innerHTML = today.getFullYear();
    $monthBtns[today.getMonth()].classList.add('clicked');
    drawCalendarDate();
    if($habbit_item.length!=0){
        $habbit_item[0].classList.add('clicked');
    }
    $habbit_result_title.innerHTML = `HABBIT : ${$habbit_item[0].innerText}`;
    $habbit_calendar.classList.add('show');
    $chart_container.classList.add('hidden');
})

