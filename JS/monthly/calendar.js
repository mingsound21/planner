function makeCalendar(dayObjArray, Year, Month){
    let MonthLastDateObj = new Date(Year, Month+1, 0); 
    let MonthLastDate = MonthLastDateObj.getDate();
    
    let MonthStartDayObj = new Date(Year, Month, 1);
    let MonthStartDay = MonthStartDayObj.getDay();
    
    // 초기화
    let i;
    for(i=0;i<dayObjArray.length;i++){
        dayObjArray[i].innerHTML="";
    }

    // 날짜 그리기
    let day;
    day = MonthStartDay;
    for(i=1;i<=MonthLastDate;i++){
        dayObjArray[day].innerText = i;
        day++;
    }
}

// 년도, 월별 week개수 반환
function getWeekCountofMonth(Year, Month){
    const firstDate = new Date(Year, Month, 1);
    const lastDate = new Date(Year, Month+1, 0);

    const weekCount = parseInt((parseInt(lastDate.getDate()) + firstDate.getDay() - 1)/7)+1;

    return weekCount;
}

// week개수에 맞춰 calendar row새로 append
function adjustWeekCount(Year, Month, makeCalendarItemBoxFunc){
    const weekCount = getWeekCountofMonth(Year, Month);
    if(weekCount == 4){
        makeCalendarItemBoxFunc(4);
    }else if(weekCount == 5){
        makeCalendarItemBoxFunc(5);
    }else{
        makeCalendarItemBoxFunc(6);
    }
}
export {makeCalendar, adjustWeekCount};