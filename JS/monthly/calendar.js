function makeCalendar(dayObjArray, Year, Month){
    let MonthLastDateObj = new Date(Year, Month+1, 0); 
    let MonthLastDate = MonthLastDateObj.getDate();
    
    let MonthStartDayObj = new Date(Year, Month, 1);
    let MonthStartDay = MonthStartDayObj.getDay();
    
    let i;
    for(i=0;i<dayObjArray.length;i++){
        dayObjArray[i].innerHTML="";
    }

    // let day = MonthStartDay;
    // let LastMonthDate = new Date(Year, Month-1, 0).getDate();
    // for(i=day-1;i>=0;i--){
    //     dayObjArray[i].innerHTML = LastMonthDate;
    //     dayObjArray[i].style.color = 'gray';
    //     LastMonthDate--;
    // }
    let day;
    day = MonthStartDay;
    for(i=1;i<=MonthLastDate;i++){
        dayObjArray[day].innerText = i;
        day++;
    }

    // let NextMonthDay = new Date(Year, Month+1, 1).getDay();
    // i=1;
    // for(;NextMonthDay<7;NextMonthDay++){
    //     dayObjArray[day].innerHTML = i;
    //     dayObjArray[day].style.color = 'gray';
    //     i++;
    //     day++;
    // }
}

function getWeekCountofMonth(Year, Month){
    const firstDate = new Date(Year, Month, 1);
    const lastDate = new Date(Year, Month+1, 0);

    const weekCount = parseInt((parseInt(lastDate.getDate()) + firstDate.getDay() - 1)/7)+1;

    return weekCount;
}

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