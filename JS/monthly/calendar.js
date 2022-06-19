function makeCalendar(dayObjArray, Year, Month){
    let MonthLastDateObj = new Date(Year, Month, 0); 
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
        dayObjArray[day].innerHTML = i;
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


export {makeCalendar};