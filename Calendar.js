/* Calendar.js */
$(document).ready(function(){
	/* GLOBALS: */
	lastCalendarStyle = ""; // this String will record the color of the td that was moused-over
	monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	monthName = "February"; // What month is it?
	monthNum = monthNames.indexOf(monthName);
	year = 2011;
	startCell = new Date(year, monthNum, 1).getDay(); // Which day of the week is the first day of the month? 0 is Sunday.
	
	$("#monthName").html(monthName);
	
	createEmptyCalendar();
	
	$("#calendarcell15").append('<h4 class="alert-message warning">QUIZ</h4>');
	$("#calendarcell25").append('<h4 class="alert-message error">TEST</h4>');
	$("#calendarcell28").append('<h4 class="alert-message info">ESSAY</h4>');
	
	/* EVENT HANDLERS: */
	$("#CalendarTable td").hover(
		/* mouseenter */
		function(){
			//if ((this.attr("class")) && (this.attr("class").substring())
			lastCalendarStyle = ($(this).attr("style")) ? $(this).attr("style") : "" ;
			$(this).attr("style",setDarkColor(lastCalendarStyle));
		} ,
		/* mouseleave */
		function(){
			$(this).attr("style", lastCalendarStyle);
		}
	); // end td hover
	
	$("#CalendarTable td").click(function(){
		if ($(this).attr("id") != "calendarcell"){
			if (!($(this).attr("class")) || $(this).attr("class").indexOf("colorCell") == -1){
				
				var date = $(this).attr("id").substring(12); // ex. id is calendarcell7, date is 7
			
				/* find which day of the week corresponds using the table headers */
				var day = $($("#CalendarTable th")[((date-1+startCell)%7) + 1]).text(); 
				
				var week = Math.floor((parseInt(date)+startCell)/7);
								
				var weekColor = (week%2 == 0) ? "Maroon" : "Gray";
				
				alert("This is " +weekColor +" " +day +", the " +date +"th.");
			}
		}
	}); // end td click
});

function createEmptyCalendar(){
	var daysNum = getDaysInMonth(monthNum,year); // number of days in the month
	var rowsNum = (daysNum+startCell)/7; // number of rows needed
	for (var i = 0; i < rowsNum; i++){ // week loop (4, 5 or 6)
		$("body tbody").append("<tr></tr>"); // New Row
		var colorCellClass = (i%2==0) ? "colorCellMaroon" : "colorCellGray"; // see css in Calendar.html
		$("body tbody tr").last().append("<td class=\"" +colorCellClass + "\"></td>");
		for (var k = 0; k < 7; k++){ // day loop (7)
			var x = (i*7)+k+1-startCell; // Calculate current date from position in calendar
			/* if the date is invalid, the cell will be blank and the id will be "calendarcell" */
			if (x > daysNum || x < 1){
				x = "";
				id = "";
			} else {
				var id = " id=\"calendarcell"+x+"\""; // if the date is valid, id is calendarcell"date"
			}
			var sty = (k%2 == 0) ? " style=\"background-color:#f9f9f9\"" : ""; // "zebra-striped idea"
			if (k==0 || k==6) sty = " style=\"background-color:#EEB4B4\"" // Saturday and Sunday are special :)
			$("body tbody tr").last().append("<td" +id +sty +">"+x+"</td>");
		}
	}
}

// Returns the number of days in the month in a given year (January=0)
function getDaysInMonth(month,year){
	if ((month==1)&&(year%4==0)&&((year%100!=0)||(year%400==0))){
		return 29;
	}else{
		return daysInMonth[month];
	}
}

function setDarkColor(color){
	var lightColorsArray = ["","background-color:#f9f9f9","background-color:#EEB4B4"];
	var darkColorsArray = ["background-color:#f5f5f5","background-color:#f5f5f5","background-color:#BB8888"];
	var x = lightColorsArray.indexOf(color);
	return darkColorsArray[x];
}