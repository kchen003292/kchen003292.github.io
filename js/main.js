//userStatus pertains to the page that the user is at in addition if the user has properly set up their assistant
//userStatus <= 2: account not created or found
//userStatus = -1: admin privalages, beta testing, new features
//userStatus = 0: page is at setUp welcome screen
//userStatus = 1: page is at setUp form screen
//userStatus = 2: page is at setUp Sucess screen
//
//userStatus>2, account created and saved to local storage
//
//userStatus = 3: Dashoard

var userStatus = 0;
//nextPage stores if the user is able to proceed to a different userStatus
var nextPage = false;
//transitionDuration
var loadingDuration = 3000;
var loadingInterval;
var loadingInterval2;
var first = true;
var currentlyAdding = true;

// Options
const showAmPm = true;
// Run
var welcoming = true;
var changeVariable = true;
var prevClass = null;

var screenMinimized = false;
if($(window).width() < 960){
		screenMinimized = true;
}

//Getting Dom ELements
var bodyElement = document.getElementsByTagName("BODY")[0];
//Set Up Page
var setUpElement = document.getElementById("setUp");
var setUpWelcomeElement = document.getElementById("setUp-Welcome");
var setUpWelcomeBorderContainerElement = document.getElementById("setUp-Welcome-BorderContainer");
var setUpWelcomeText = document.getElementById("setUp-Welcome-Text");
var setUpTitleElement = document.getElementById("setUp-Title");
var setUpFormElement = document.getElementById("setUp-Form");
var setUpSuccessElement = document.getElementById("setUp-Success");
var setUpWelcomeTextGreetingElement = document.getElementById("setUp-Welcome-Text-Greeting");
var colorThemePickers = Array.from(document.getElementsByClassName("dot"));
var setUpUserSubmit = document.getElementById("userForm-Submit");
var setUpSuccessWelcomeElement = document.getElementById("setUp-Success-Welcome");
var SuccessSubmit = document.getElementById("Success-Submit");
var colorThemeChosen = document.getElementById("colorThemeChosen");
var colorThemeError = document.getElementById("colorThemeError");
var firstNameError = document.getElementById("firstNameError");
var lastNameError = document.getElementById("lastNameError");
var dateError = document.getElementById("dateError");
var popupElementContainer = document.getElementById("popupblockedError-container");




//Dashboard Page
var dashboardElement = document.getElementById("dashboard");
var dashboardWelcomeText = document.getElementById("dashboard-welcome-txt");
var dashboardElementCircles = Array.from(document.getElementsByClassName("dot5"));
var slideContainer = document.getElementById("slideContainer");
var slideCounters = Array.from(document.getElementsByClassName("dot6"));
const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
var widgetContainer = document.getElementById("widget-Container");
var addEventWidget = document.getElementById("addEvent");
var loadingBlockerElement = document.getElementById("loading-blocker");

//addClass Form
var addClassContainerElement = document.getElementById("addClass-container");
var linkByCode = document.getElementById("byCode");
var byZoomLink = document.getElementById("byZoomLink");
var loadingForm = false;
var classNameError = document.getElementById("classNameError");
var startTimeError = document.getElementById("startTimeError");
var endTimeError = document.getElementById("endTimeError");
var linkError = document.getElementById("linkError");
var zoomIDError = document.getElementById("zoomIDError");
var zoomPassError = document.getElementById("zoomPassError");
var myEvents = document.getElementById("eventList");
var customDateContainer = document.getElementById("customDate-container");
var isEditMode = false;
var isSingle = false;

//Edit User Form
var editColorThemeError = document.getElementById("edit-colorThemeError");
var editFirstNameError = document.getElementById("edit-firstNameError");
var editLastNameError = document.getElementById("edit-lastNameError");
var customColorContainer = document.getElementById("customColor-container");

//Custom Theme
var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".png"];    
var color1Error = document.getElementById("primaryColorError");
var color2Error = document.getElementById("secondaryColorError");
var image1Error = document.getElementById("customImageError");
var image2Error = document.getElementById("customBackImageError");
var customImageButton = document.getElementById("customImage")
var customBackImageButton = document.getElementById("customBackImage");
var centralColor;



// Output Tables
var table = document.getElementById('tableBody');
var notificationTable = document.getElementById('notif-tableBody');
var favoriteTable = document.getElementById('addFavorite-tableBody');
var firstSetColor = true;



const auto = false; // Auto scroll
const intervalTime = 15000;
let slideInterval;



var settingElement = document.getElementById("setting-container");
var calendarElement = document.getElementById("calendar-container");
var addMultipleClassesElement = document.getElementById("addMultipleClasses");
var dateContainerElement = document.getElementById("date-Container");
var todayMonthElement = document.getElementById("today-month");
var todayDayElement = document.getElementById("today-day");
var addFavoritesElement = document.getElementById("addFavorite-container");
var favoriteContainerElement = document.getElementById("favorites-Container");
var explanationContainer = document.getElementById("explnation-container");

var settingWidget = document.getElementById("settings");
var favoritesWidget = document.getElementById("favorites");
var singleEventWidget = document.getElementById("addSingleEvent");

var appendDayIndex = 0;
var appendDayFirst = true;

//calendar variables
document.getElementById("app").innerHTML = `
<div class="calendar-month">
  <section class="calendar-month-header">
    <div
      id="selected-month"
      class="calendar-month-header-selected-month"
    ></div>
    <section class="calendar-month-header-selectors">
      <span id="previous-month-selector"><</span>
      <span id="present-month-selector">Today</span>
      <span id="next-month-selector">></span>
    </section>
  </section>

  <ol
    id="days-of-week"
    class="day-of-week"
  /></ol>

  <ol
    id="calendar-days"
    class="days-grid"
  >
  </ol>
</div>
`;

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY = dayjs().format("YYYY-MM-DD");

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");

let selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
let currentMonthDays;
let previousMonthDays;
let nextMonthDays;

const daysOfWeekElement = document.getElementById("days-of-week");

WEEKDAYS.forEach((weekday) => {
  const weekDayElement = document.createElement("li");
  daysOfWeekElement.appendChild(weekDayElement);
  weekDayElement.innerText = weekday;
});

//User Prefference Variables
var firstName;
var lastName;
var colorTheme;
var eventList;
var reedit = false;
var reeditFav = false;
var hasJoined=[];
var autojoin = true;
var clickedMonth;
var clickedDay;
var clickedYear;

//custom form variables
const backInput = document.querySelector('input');
const backpreview = document.querySelector('.backpreview');
const backTwopreview = document.querySelector('.backTwopreview');


customImageButton.addEventListener('change', updateBackImageDisplay);

customBackImageButton.addEventListener('change', updateTwoBackImageDisplay);

//as default all pages except setUp will not be displayed

setUpFormElement.style.display = "none";
setUpSuccessElement.style.display = "none";
settingElement.style.display = "none";
calendarElement.style.display = "none";
dashboardElement.style.display = "none";
addClassContainerElement.style.display = "none";
linkByCode.style.display = "none";
myEvents.style.display = "none";
addMultipleClassesElement.style.display = "none";
document.getElementById("favoriteLimitError").style.display = "none";
explanationContainer.style.display = "none";
customDateContainer.style.display = "none";
customColorContainer.style.display = "none";
popupElementContainer.style.display = "none";



//On page set-up; default will start on the Welcome Text, all else will not be displayed
setUpFormElement.style.display = "none";
setUpSuccessElement.style.display = "none";

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
];


//click events
//window change detection
window.addEventListener( 'resize', onWindowResize, false );

//user click detection
window.addEventListener('click',onDocumentMouseClick,false);






//transitions
const Minimize = () => {
	setUpWelcomeBorderContainerElement.classList.add('minimized');
	
	clearInterval(loadingInterval);
	
  
};
const ShiftUp = () => {
	unfade(setUpWelcomeTextGreetingElement, 50);
	setUpWelcomeText.innerHTML = "Click Screen to Start Set Up";
	
	setUpWelcomeBorderContainerElement.classList.add('shiftUp');
	tempFirst = true;
	clearInterval(loadingInterval2);
	nextPage = true;
	document.getElementsByClassName("lds-ring")[0].style.display = "none";
	
  
};
const closeWelcome = () => {
	fade(setUpElement, 30);
	clearInterval(loadingInterval3);

	
	loadingInterval4 = setInterval(fadeinWelcome, 75);
}

const fadeinWelcome = () => {
	
	
	unfade(dashboardElement);
	unfade(dashboardWelcomeText,30);
	prev.style.display = "inline-block";
	next.style.display = "inline-block";
	fade(setUpElement);
	clearInterval(loadingInterval4);
	loadingInterval5 = setInterval(turnOnTime, 1000);
}

const turnOnTime = () => {
	
	
	clearInterval(loadingInterval5);
}

//verify if user account is setUp
if(localStorage.getItem('user') === null){
    //code for User Set Up
    document.getElementById("setUp").style.backgroundColor = "black";
    setUpElement.style.display = "block";
	unfade(setUpWelcomeBorderContainerElement, 70);
	loadingInterval = setInterval(Minimize, loadingDuration);
	loadingInterval2 = setInterval(ShiftUp, loadingDuration+2000)
}else{
	resetAddCalendar();
	bodyElement.style.backgroundColor = "white";
	userStatus = 3;
	

	
	unfade(dashboardElement,10);
	var tempUser = JSON.parse(localStorage.getItem('user'));
	firstName = tempUser.fstName;
	lastName = tempUser.lstName;
	colorTheme = tempUser.clrTheme;
	eventList = tempUser.evtList;
	showTime();
	

	setUpWelcomeTextGreetingElement.innerHTML = "Welcome "+firstName+"!";

	updateColors();

	if(colorTheme != "dark"){
		setUpElement.style.backgroundColor = "white";
	}
	fetchClasses();
	fetchFavorites();
	
	setUpElement.style.display = "inline-block";
	dashboardWelcomeText.style.display = "none";
	setUpWelcomeTextGreetingElement.style.display = "none";
	prev.style.display = "none";
	next.style.display = "none";
	dashboardElement.style.display = "none";

	unfade(setUpWelcomeBorderContainerElement, 35);
	loadingInterval = setInterval(Minimize, loadingDuration/2);
	loadingInterval2 = setInterval(ShiftUp, loadingDuration/2+1000);
	loadingInterval3 = setInterval(closeWelcome, loadingDuration+2000);
	changeWelcome();
	if(screenMinimized == false){
		openMyEventList();
	}
	
	
	//tempAddMulti();

}
if(localStorage.getItem('user') === null){
    document.getElementById("loading-blocker").style.backgroundColor = "black";
}

//loading screen checks
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // document ready
    document.getElementById("page").style.display = "block";
    
  }
};
//popup checks
// var myPopup = window.open('closeme.html','_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left='+(screen.width/2-250)+', top='+(screen.height/2-350)+', width=500, height=500, status=0, visible=none');
var myPopup = window.open('closeme.html');

if (!myPopup)
	unfade(popupElementContainer, 10);
    
else {
    myPopup.onload = function() {
        setTimeout(function() {
            if (myPopup.screenX === 0) {
               unfade(popupElementContainer, 10);
            } else {
                // close the test window if popups are allowed.
                myPopup.close();  
            }
        }, 0);
    };
}
// var popupBlockerChecker = {
//     check: function(popup_window){
//         var scope = this;
//         if (popup_window) {
//             if(/chrome/.test(navigator.userAgent.toLowerCase())){
//                 setTimeout(function () {
//                     scope.is_popup_blocked(scope, popup_window);
//                 },200);
//             }else{
//                 popup_window.onload = function () {
//                     scope.is_popup_blocked(scope, popup_window);
//                 };
//             }
//         } else {
//             scope.displayError();
//         }
//     },
//     is_popup_blocked: function(scope, popup_window){
//         if ((popup_window.innerHeight > 0)==false){ 
            
//         }
//     },
//     displayError: function(){
//        unfade(popupElementContainer, 10);
//     }
// };
// var popup = window.open("closeme.html", '_blank');
// popupBlockerChecker.check(popup);


const nextSlide = () => {

	
  // Get current class
  const current = document.querySelector('.current');
  const currentSlideDot = document.querySelector('.currentDot');
  
  // Remove current class
  current.classList.remove('current');
  fade(current, 2)
  tempfade(dashboardWelcomeText,2)
  // Check for next slide
  if (current.nextElementSibling) {
    // Add current to next sibling
    currentSlideDot.nextElementSibling.classList.add('currentDot');
    current.nextElementSibling.classList.add('current');
    
	unfade(dashboardWelcomeText,10);
    unfade(current.nextElementSibling,10);
    
  } else {
    // Add current to start
    slideCounters[0].classList.add('currentDot');  
    slides[0].classList.add('current');
    
    unfade(dashboardWelcomeText,10);
    unfade(slides[0],10);
    
  }
  setTimeout(() => current.classList.remove('current') );
  setTimeout(() => currentSlideDot.classList.remove('currentDot') );
};

const prevSlide = () => {
	
  // Get current class
  const current = document.querySelector('.current');
  // Remove current class
  current.classList.remove('current');
  const currentSlideDot = document.querySelector('.currentDot');
  fade(current,5);
  // Check for prev slide
  if (current.previousElementSibling) {
    // Add current to prev sibling
    currentSlideDot.previousElementSibling.classList.add('currentDot')
    current.previousElementSibling.classList.add('current');
    unfade(current.previousElementSibling,10);
    dashboardWelcomeText.style.display = "inline-block";
  } else { 
    // Add current to last
    slideCounters[slides.length - 1].classList.add('currentDot')
    slides[slides.length - 1].classList.add('current');
    unfade(slides[slides.length - 1],10);
    dashboardWelcomeText.style.display = "inline-block";
  }
  setTimeout(() => current.classList.remove('current'));
  setTimeout(() => currentSlideDot.classList.remove('currentDot') );

};

// Button events
next.addEventListener('click', e => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener('click', e => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

// Auto slide
if (auto) {
  // Run next slide at interval time
  slideInterval = setInterval(nextSlide, intervalTime);
}



function onWindowResize( event ) {
	event.preventDefault();
	if ($(window).width() < 960) {
    	fade(myEvents,10);
    	screenMinimized = true;
  	}
	 else {
	    openMyEventList();
	    screenMinimized = false;
	 }

}





function onDocumentMouseClick( event ) {
	
	  if(event.target.nodeName != "INPUT" ){
    event.preventDefault();
  }  
	if(userStatus == 1){

		if(explanationContainer.style.display == "block" && Array.from(event.target.classList).includes("tableButton") == false &&  isChildOf(explanationContainer, event.target) == false && event.target != explanationContainer && loadingForm == false){
			
			fade(explanationContainer,10);
			
			

		}
		if(event.target == setUpUserSubmit){
			createUser();
		}
		var isChildOfDot = false;
		colorThemePickers.forEach(colors=>{
			if(event.target == colors){
				isChildOfDot = true;
			}
		});
		if(isChildOfDot){
			colorThemeError.innerHTML = "";
			var index = 0;
			var tempContinue = true;
			colorThemePickers.forEach(colors=>{
				
				if(colors.classList.contains('selected')){
					colors.classList.remove('selected')
				}
				if(event.target == colors){
					
				}
				if(event.target == colors ){
					tempContinue = false;
					colorThemeChosen.innerHTML = event.target.id;
					var tempNumber = (index-11)*40;
					if(index == 13){
						tempNumber-=5;
					}
					colorThemeChosen.style.left = tempNumber+"px";
					colorThemeChosen.style.color = ""+colors.classList[2];
					colors.classList.add('selected');
					colorTheme = event.target.id;
				}
				index = index+1;
			});
		}
		
	}
	
	if(userStatus == 2){
		if(event.target == SuccessSubmit){
			nextPage = true;

		}
	}
	if(userStatus == 3){
		

		if(addMultipleClassesElement.style.display == "block" && Array.from(event.target.classList).includes("tableButton") == false &&  isChildOf(addMultipleClassesElement, event.target) == false && event.target != addMultipleClassesElement && loadingForm == false){
			
			fade(addMultipleClassesElement,10);
			
			

		}else if(popupElementContainer.style.display == "block" && isChildOf(popupElementContainer, event.target) == false && event.target != popupElementContainer && loadingForm == false){
			fade(popupElementContainer,10);
			


		}else if(customColorContainer.style.display == "block" && isChildOf(customColorContainer, event.target) == false && event.target != customColorContainer && loadingForm == false){
			fade(customColorContainer,10);
			


		}else if(settingElement.style.display == "block" && isChildOf(settingElement, event.target) == false && event.target != settingElement && loadingForm == false){
			fade(settingElement,10);
			


		}else if(addClassContainerElement.style.display == "block" && isChildOf(addClassContainerElement, event.target) == false && event.target != addClassContainerElement && loadingForm == false){
			fade(addClassContainerElement,10);

			


		}else if(addFavoritesElement.style.display == "block" && isChildOf(addFavoritesElement, event.target) == false && event.target != addFavoritesElement && loadingForm == false){
			fade(addFavoritesElement,10);
			reeditFav = false;


		}else if(screenMinimized && reedit == false && myEvents.style.display == "block" && isChildOf(myEvents, event.target) == false && event.target != myEvents && event.target.value !='Remove'){
			//closes the event list
			fade(myEvents,10);
			
			

		}





		if(settingElement.style.display == "block"){
			var isChildOfDot = false;
			colorThemePickers.forEach(colors=>{
				if(event.target == colors){
					isChildOfDot = true;
				}
			});
			if(isChildOfDot){
				colorThemeError.innerHTML = "";
				var index = 0;
				colorThemePickers.forEach(colors=>{
					
					if(colors.classList.contains('selected')){
						colors.classList.remove('selected')
					}
					if(event.target == colors){
						document.getElementById("edit-colorThemeChosen").innerHTML = event.target.id;
						var tempNumber = index*40;
						colorThemeChosen.style.margin = "0px "+tempNumber+"px";
						colors.classList.add('selected');
						colorTheme = event.target.id;
					}
					index = index+1;
				});
			}
		}


		

		if(event.target.id == "repeatChoicesLabel"){
			if(event.target.innerHTML.includes("✓")){
				var checkedText = event.target.innerHTML;
				
				event.target.innerHTML = checkedText.replace("✓","");
			}else{
				var checkedText = "&#10003;" + event.target.innerHTML;
				
				event.target.innerHTML = checkedText;
			}
			
		}
		if(event.target.id == "addEvent"){
			openMyEventList();
			
		}
		if(event.target.id == "favorites"){
			openAddFavorites();
			
		}
		if(event.target.id == "settings"){
			openSettings();
			
		}
		if(event.target.id == "addSingleEvent"){

			openAddSingle();
			
		}
		// if(calendarElement.style.display == "block" && isChildOf(calendarElement, event.target) == false && loadingForm == false){
		// 	resetCalendar();
			

		// }
		if((isChildOfClass("calendar-day",event.target)||event.target.classList[0] == "calendar-day") && addClassContainerElement.style.display != "block"){
			
			clickedMonth = document.getElementById("selected-month").innerHTML.split(" ")[0];
			if(event.target.classList[0] == "calendar-day"){
				clickedDay = event.target.childNodes[0].innerHTML;
			}else {
				clickedDay = findParentOfClass("calendar-day",event.target).innerHTML;
			}
			
			clickedYear  = document.getElementById("selected-month").innerHTML.split(" ")[1];
			
			var tempCalendarList = document.getElementById("calendar-days").childNodes;
			var tempindex = 0;
			var tempadd = true;
			Array.from(tempCalendarList).forEach(tempDay =>{
				if(event.target == tempDay){
					tempadd = false;
				}
				if(tempadd){
					tempindex++;
				}
			});
			clickedDayoftheWeek = indexToDayOfWeek(tempindex);
			resetAddClassForm();
			var formHeader = document.getElementById("dateHeader");
			formHeader.innerHTML = clickedDayoftheWeek+", "+clickedMonth+" "+clickedDay;

			//adding values to the table to display the events for a given date
			var tempUser = JSON.parse(localStorage.getItem('user'));
			var tempEventList = tempUser.evtList;
			var tempTableBody = document.getElementById("chosenDate-tableBody");
			tempTableBody.innerHTML="";
			appendDayIndex = appendDayIndex+1;

					

			

			tempEventList.forEach((eventIndex)=>{

				if((eventIndex.mt == clickedMonth && eventIndex.dy == clickedDay )|| eventIndex.rptList.includes(clickedDayoftheWeek)){

						var tr = document.createElement('TR');

					      var name = eventIndex.name;
					      
					      
					      var start = eventIndex.start;
					      var end = eventIndex.end;
					      var zoom = eventIndex.zoom;

					      var td = document.createElement('TD')
					      td.appendChild(document.createTextNode(name));
					      tr.appendChild(td);
					      
					      td = document.createElement('TD')
					      td.appendChild(document.createTextNode(start));
					      tr.appendChild(td);
					      td = document.createElement('TD')
					      td.appendChild(document.createTextNode(end));
					      tr.appendChild(td);
					      td = document.createElement('TD')



					      

					      // add a button control.
					      var button1 = document.createElement('input');

					      // set the attributes.
					      button1.setAttribute('type', 'button');
					      button1.setAttribute('value', 'Join');

					      // add button's "onclick" event.
					      button1.setAttribute('onclick', 'window.open(\''+zoom+'\')' );
					      button1.setAttribute('class','tableBtn')


					      td.appendChild(button1);


					      
					      tr.appendChild(td);

					    
					      td = document.createElement('TD')

					      // add a button control.
					      var button = document.createElement('input');

					      // set the attributes.
					      button.setAttribute('type', 'button');
					      button.setAttribute('value', 'Remove');
					      button.setAttribute('class','tableBtn')

					      // add button's "onclick" event.
					      button.setAttribute('onclick', 'deleteClass('+i+')' );

					      td.appendChild(button);
					      
					      tr.appendChild(td);
					      tr.setAttribute('class','chosenTable-row')
					      tr.classList.add("variableBorderColor");
					      tempTableBody.appendChild(tr);
					      updateColors();			


				}




			});
			
			
		}

		if((Array.from(event.target.classList).includes("pt-3-half") || Array.from(event.target.classList).includes("multiTime-control")) && Array.from(event.target.classList).includes("error")) {
			
			event.target.classList.remove("error")
			event.target.innerHTML = "";
		}




		//listener for clicks on table
		if(isChildOf(document.getElementById("tableBody"), event.target)) {
			if(event.target.value == 'Join') {
				
			}
		  else if(event.target.value=='Remove'){
		     var index = event.target.parentElement.parentElement.childNodes;
		     var currentIndex;
		     

		   var tableContents = event.target.parentElement.parentElement.parentElement.childNodes;
		   for(var i=0;i<tableContents.length;i++){
		    if(tableContents[i]==event.target.parentElement.parentElement){
		      currentIndex=i;
		    }
		    
		   }
		  
		    deleteClass(currentIndex);

		  }
		  else if(reedit==false){
		    var index = event.target.parentElement.childNodes;
		   

		   var tableContents = event.target.parentElement.parentElement.childNodes;
		   for(var i=0;i<tableContents.length;i++){
		    if(tableContents[i]==event.target.parentElement){
		      tempIndex=i;
		    }
		    
		   }
		   
		   	var tempEventChosen = JSON.parse(localStorage.getItem('user')).evtList[tempIndex];

		   var className = index[0].innerHTML;
		   var startTime = index[1].innerHTML;
		   var endTime = index[2].innerHTML;
		   var url = index[3].childNodes[0].getAttribute('onclick').substring(13,index[3].childNodes[0].getAttribute('onclick').length-2);
		  	
		  	var arrayOfrepeat = tempEventChosen.rptList;
		   resetAddClassForm();
		  
		   
		   document.getElementById('className').value = className;
		   document.getElementById('startTime').value = startTime;
		   document.getElementById('endTime').value = endTime;
		   document.getElementById('zoomLink').value = url;


		   var reaptingLabels = document.getElementById("myDropdown").children;

		   


		   
		   
		   Array.from(reaptingLabels).forEach((labelIndex)=> {
		   		var uncheckedText = labelIndex.innerHTML;
				labelIndex.innerHTML = uncheckedText.replace("✓","");
				
		   		if(arrayOfrepeat.includes(labelIndex.innerHTML.split(" ")[30].replace("\n",""))){
		   			var checkedText = "&#10003;" + labelIndex.innerHTML;
					labelIndex.innerHTML = checkedText;
		   		}
		   })
		   



		   reedit = true;
		   if(arrayOfrepeat.length == 0){
		   		var tempEventDay = tempEventChosen.dy;
		   		
		   		if(tempEventDay.length == 1){
		   			tempEventDay = "0"+tempEventDay;
		   		}else {
		   			tempEventDay = ""+tempEventDay;
		   		}
		   		
		   		  document.getElementById('singleclassDate').value = tempEventChosen.yr+"-"+indexOfMonth(tempEventChosen.mt)+"-"+tempEventDay;
		   }

		   openAddSingle();
		   
		    loadingForm = true;


		  }
		   
		}
		//listener for clicks on table
		if(isChildOf(document.getElementById("addFavorite-tableBody"), event.target)) {
			
		  if(event.target.value=='Remove'){
		  	
		     var index = event.target.parentElement.parentElement.childNodes;
		     var currentIndex;
		     

		   var tableContents = event.target.parentElement.parentElement.parentElement.childNodes;
		   for(var i=0;i<tableContents.length;i++){
		    if(tableContents[i]==event.target.parentElement.parentElement){
		      currentIndex=i;
		    }
		    
		   }
		  
		    //deleteFavorite(currentIndex);


		  }
		  else if(reedit==false){
		    var index = event.target.parentElement.childNodes;
		   

		   var tableContents = event.target.parentElement.parentElement.childNodes;
		   for(var i=0;i<tableContents.length;i++){
		    if(tableContents[i]==event.target.parentElement){
		      tempIndex=i;
		    }
		    
		   }


		   
		   	var linkName = index[0].innerHTML;
		   var linkfv = index[1].innerHTML;
		   
		   
		  
		   
		   document.getElementById('favoriteLinkName').value = linkName;
		   document.getElementById('favoriteLink').value = linkfv;
		   


		   
		   



		   reeditFav = true;
		   
		   
		    


		  }
		   
		}



		
		

	}
	if(nextPage){
		if(userStatus == 0){
			setUpWelcomeElement.style.display = "none";
			setUpFormElement.style.display = "inline-block";
			unfade(setUpFormElement,30)

			userStatus = userStatus+1;
			nextPage = false;
		}
		else if(userStatus == 1){
			setUpSuccessElement.style.display = "inline-block";
			setUpFormElement.style.display = "none";
			userStatus = userStatus+1;
			setUpSuccessWelcomeElement.innerHTML = "Welcome "+firstName.value+"!";

		}else if(userStatus == 2){
			setUpSuccessElement.style.display = "none";
			setUpWelcomeElement.style.display = "block";
			dashboardElement.style.display = "inline-block";
			
				bodyElement.style.backgroundColor = "white";
			
			updateColors();
			dashboardWelcomeText.innerHTML = "Welcome to your dashboard"+firstName.value+"!";
			resetAddCalendar();
	bodyElement.style.backgroundColor = "white";
	userStatus = 3;
	


	unfade(dashboardElement,10);
	var tempUser = JSON.parse(localStorage.getItem('user'));
	firstName = tempUser.fstName;
	lastName = tempUser.lstName;
	colorTheme = tempUser.clrTheme;
	eventList = tempUser.evtList;
	showTime();
	

	setUpWelcomeTextGreetingElement.innerHTML = "Welcome "+firstName+"!";

	

	if(colorTheme != "dark"){
		setUpElement.style.backgroundColor = "white";
	}
	fetchClasses();
	fetchFavorites();
	
	setUpElement.style.display = "inline-block";
	dashboardWelcomeText.style.display = "none";
	setUpWelcomeTextGreetingElement.style.display = "none";
	prev.style.display = "none";
	next.style.display = "none";
	dashboardElement.style.display = "none";

	unfade(setUpWelcomeBorderContainerElement, 35);
	loadingInterval = setInterval(Minimize, loadingDuration/2);
	loadingInterval2 = setInterval(ShiftUp, loadingDuration/2+1000);
	loadingInterval3 = setInterval(closeWelcome, loadingDuration+2000);
	changeWelcome();
	if(screenMinimized == false){
		openMyEventList();
	}
	
		}
	}
	
	

}
function editUser(event) {
	event.preventDefault();
	editFirstName = document.getElementById("edit-firstName");
	editLastName = document.getElementById("edit-lastName");
	//check if values have been properly filled
	falseReturn = false;
	if(editFirstName.value == ""){
		editFirstNameError.innerHTML = "Invalid or Missing First Name";
		
		falseReturn = true;
	}else{
		editFirstNameError.innerHTML = "";
	}
	if(editLastName.value == ""){
		editLastNameError.innerHTML = "Invalid or Missing Last Name";
		falseReturn = true;
	}else{
		editLastNameError.innerHTML = "";
	}
	if(colorTheme == null){
		editColorThemeError.innerHTML = "No Color Theme Selected";
		
		falseReturn = true;
	}else{
		editColorThemeError.innerHTML = "";
	}
	
	if(falseReturn){

		return false;
	}else{
		var tempuser = JSON.parse(localStorage.getItem('user'));
		var newUser = {
			fstName: editFirstName.value,
			lstName: editLastName.value,
			clrTheme: colorTheme,
			evtList: tempuser.evtList,
			prf: tempuser.prf,
			fvt: tempuser.fvt
		}
		firstSetColor = true;
		
		fade(settingElement,10);
		localStorage.setItem('user', JSON.stringify(newUser));
		
	}
	
}

function createUser(){

	firstName = document.getElementById("firstName");
	lastName = document.getElementById("lastName");
	
	
	//check if values have been properly filled
	falseReturn = false;
	if(firstName.value == ""){
		firstNameError.innerHTML = "Invalid or Missing First Name";
		
		falseReturn = true;
	}else{
		firstNameError.innerHTML = "";
	}
	if(lastName.value == ""){
		lastNameError.innerHTML = "Invalid or Missing Last Name";
		falseReturn = true;
	}else{
		lastNameError.innerHTML = "";
	}
	if(colorTheme == null){
		colorThemeError.innerHTML = "No Color Theme Selected";
		
		falseReturn = true;
	}else{
		colorThemeError.innerHTML = "";
	}
	if(falseReturn){

		return false;
	}else{
		var newUser = {
			fstName: firstName.value,
			lstName: lastName.value,
			clrTheme: colorTheme,
			evtList: [],
			prf: [false, false],
			fvt: []
		}
		localStorage.setItem('user', JSON.stringify(newUser));
		nextPage = true;
	}
	
}


//return false if the parent is not a parent of the child
//return true if parent is a parent of the child
function isChildOf(parent, child) { 

    let node = child.parentNode; 
  
    // keep iterating unless null 
    while (node != null) { 
    	if (node == parent) { 

            return true; 
        } 
     node = node.parentNode; 
     } 
   return false; 
} 

function isChildOfID(string, child) { 
	
    let node = child.parentNode; 
  
    // keep iterating unless null 
    while (node != null) { 
    	
    	
        if (node.id == string) { 

            return true; 
        } 
     node = node.parentNode; 
     
     } 
   return false; 
} 

function isChildOfClass(string, child) {
	
	let node = child.parentNode; 
  
    // keep iterating unless null 
    while (node != null) { 
    	
        if (!node.classList == false && node.classList[0] == string) { 

            return true; 
        } 
     node = node.parentNode; 
     } 
   return false; 
}

function findParentOfClass(string, child) {
	
	let node = child.parentNode; 
  
    // keep iterating unless null 
    while (node != null) { 
    	
        if (!node.classList == false && node.classList[0] == string) { 

            return node; 
        } 
     node = node.parentNode; 
     } 
   return false; 
}

//fade in function
function fade(element, time) {

    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            if(isEditMode && element == addClassContainerElement) {
				editToAddForm();
			}
            element.style.display = 'none';
            if(reedit == true && currentlyAdding){
            	
				reedit = false;
				editToAddForm();
			}
			
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, time);
}
//unfade function
function unfade(element, time) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
            if(loadingForm == true){
            	loadingForm = false;
            }
        	
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, time);
}
//fade in function
function tempfade(element, time) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, time);
}
function createCustom() {

	var tempPrimaryColor = document.getElementById("primaryColor").value;
	var tempSecondaryColor = document.getElementById("secondaryColor").value;
	
	if(!backpreview.children[0].children[0]){
		var tempCustomImage = null;
	}else{
		var tempCustomImage = backpreview.children[0].children[0].children[0];
	}
	
	if(!backTwopreview.children[0].children[0]){
		var tempCustomBackImage = null;
	}else{
		var tempCustomBackImage = backTwopreview.children[0].children[0].children[0];
	}
	


	
	tempcolorTheme = ""+tempPrimaryColor+"/003292/"+tempSecondaryColor;
	if(!tempCustomImage){
		tempcolorTheme = tempcolorTheme+"/003292/";
	}else {
		tempcolorTheme = tempcolorTheme+"/003292/"+getBase64Image(tempCustomImage);
		
	}
	if(!tempCustomBackImage){
		tempcolorTheme = tempcolorTheme+"/003292/";
	}else {
		tempcolorTheme = tempcolorTheme+"/003292/"+getBase64Image(tempCustomBackImage);
		
	}
	
	
	
	var tempuser = JSON.parse(localStorage.getItem('user'));
		var newUser = {
			fstName: tempuser.fstName,
			lstName: tempuser.lstName,
			clrTheme: tempcolorTheme,
			evtList: tempuser.evtList,
			prf: tempuser.prf,
			fvt: tempuser.fvt
		}

		colorTheme = tempcolorTheme;
		
		localStorage.setItem('user', JSON.stringify(newUser));
		firstSetColor = true;
		updateColors();




	
}
function readURL(input) 
{
    document.getElementById("bannerImg").style.display = "block";

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('bannerImg').src =  e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
        bannerImage = document.getElementById('bannerImg');
		
		localStorage.setItem("imgData", imgData);
    }
}

function getBase64Image(img) {
	
    var canvas = document.createElement("canvas");
    canvas.width = 1000;
    
    canvas.height = 1000*img.height/img.width;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function updateColors() {
	
	if(colorTheme == "dark"){
		setColors("#333");
		

	}else if(colorTheme =="aqua"){
		setColors("#0083B7","#0083B7", null, "url(\'img/aquaBack.jpg\')", false);
		
		
	}else if(colorTheme =="nature"){
		setColors("#2E8B57","#2E8B57", null, "url('img/natureBack.jpg')", false);
		
		
	}else if(colorTheme =="ruby"){
		setColors("#DC143C","#DC143C",null ,null, false);
		
		
	}else if(colorTheme == "sky"){
		setColors("#8698a4","#8698a4", "url('img/skyBack.jpg')", "url('img/skyBack.jpg')", false);
	}else {
		var customThemeArray = colorTheme.split("/003292/");
		
		setColors(customThemeArray[0], customThemeArray[1], customThemeArray[3], customThemeArray[2], true)
	}

}
function setColors(color, color2, backgroundImage, frontImage, isCustom){
	if(firstSetColor){
		centralColor = color;
		
		
		if(!frontImage){
			document.getElementsByClassName("gradient-circle")[0].style.background = "";
			document.getElementsByClassName("gradient-circle")[0].style.backgroundColor = color;
			dashboardElementCircles.forEach(circle=>{
				circle.style.backgroundImage = "";
				circle.style.backgroundColor = color;
			});
			var customBacks = document.getElementsByClassName("dot8")
			Array.from(customBacks).forEach(customBackIndex=>{
				customBackIndex.style.display = "none";
					});
		}else {
			var customBacks = document.getElementsByClassName("dot8")
			Array.from(customBacks).forEach(customBackIndex=>{
				customBackIndex.style.display = "block";
					});
			document.getElementsByClassName("gradient-circle")[0].style.background = "";
			document.getElementsByClassName("gradient-circle")[0].style.backgroundColor = color;
			if(isCustom) {

				dashboardElementCircles.forEach(circle=>{
					circle.style.backgroundImage = "";
					circle.style.backgroundColor = "rgba(255, 0, 0, 0)";
				});
				
				document.getElementById("addEventdot8").src ="data:image/png;base64," + frontImage;
				document.getElementById("favoritesdot8").src ="data:image/png;base64," + frontImage;
				document.getElementById("settingsdot8").src ="data:image/png;base64," + frontImage;
				document.getElementById("addSingleEventdot8").src ="data:image/png;base64," + frontImage;
			}else {
				var customBacks = document.getElementsByClassName("dot8")
				Array.from(customBacks).forEach(customBackIndex=>{
					customBackIndex.style.display = "none";
						});

				dashboardElementCircles.forEach(circle=>{
					circle.style.backgroundImage = frontImage;
				});
			}
		
		}
		if(!backgroundImage){
			document.getElementById("welcomeImage").style.display = "none";
		}else if(isCustom){
			document.getElementById("welcomeImage").style.display = "block";
			document.getElementById("welcomeImage").src ="data:image/png;base64," + backgroundImage;
			document.getElementById("setUp-Title").style.color = color2;
			
		}
		firstSetColor = false;
	}
	document.getElementById("popupblockedError-header").style.backgroundColor = color;
	todayDayElement.style.color = color;
	todayMonthElement.style.color = color;
	setUpWelcomeBorderContainerElement.style.color = color;
	setUpWelcomeTextGreetingElement.style.color = color;
	dateContainerElement.style.color = color;



	prev.style.borderColor = color;
	next.style.borderColor = color;
	next.style.color = color;
	prev.style.color = color;

	//changing slide colors
	document.getElementsByClassName("dropbtn")[0].style.backgroundColor = color;
	document.getElementsByClassName("dropbtn")[1].style.backgroundColor = color;

	slideCounters.forEach(circle=>{
		circle.style.color = color;
	});
	
	dashboardWelcomeText.style.color = color;
	var slideNames = document.getElementsByClassName("slide-Title");
	
	Array.from(slideNames).forEach(circle=>{
		circle.style.color = color;
	});

	//changing button colors
	var tableButtons = document.getElementsByClassName("tableButton")
	Array.from(tableButtons).forEach(tablebuttonIndex=>{
		tablebuttonIndex.style.backgroundColor = color;
	});

	var joinClassButtons = document.getElementsByClassName("joinClassButton")
	Array.from(joinClassButtons).forEach(joinClassButtonIndex=>{
		joinClassButtonIndex.style.backgroundColor = color;
			});

	var addClassButtons = document.getElementsByClassName("addClassButton")
	Array.from(addClassButtons).forEach(addClassButtonIndex=>{
		addClassButtonIndex.style.backgroundColor = color;
			});
	var tablebtns = document.getElementsByClassName("tableBtn")
	Array.from(tablebtns).forEach(tablebtnIndex=>{
		tablebtnIndex.style.backgroundColor = color;
			});

	document.getElementById("favorites-Container").style.backgroundColor = color;
	document.getElementById("chosenDate-tableHeader").style.backgroundColor = color;
	document.getElementById("tableHeader").style.backgroundColor = color;
	document.getElementById("eventList").style.borderColor = color;
	document.getElementById("eventList").style.backgroundColor = "white";
document.getElementById("addFavorite-tableHeader").style.backgroundColor = color;


	var multiRepeatDays = document.getElementsByClassName("calendar-day--has-multirepeat")
	Array.from(multiRepeatDays).forEach(multiRepeatDayIndex=>{
		multiRepeatDayIndex.style.borderBottomColor = color;
			});
	document.getElementsByClassName("preview")[0].style.backgroundColor = color;
	document.getElementsByClassName("preview")[1].style.backgroundColor = color;
	document.getElementsByClassName("pointer")[0].style.backgroundColor = color;

var variableBorderColors = document.getElementsByClassName("variableBorderColor")
	Array.from(variableBorderColors).forEach(variableBorderColorIndex=>{
		variableBorderColorIndex.style.borderBottomColor = color;
			});

	
	if(colorTheme == "sky"){
		
		document.getElementById("setUp-Title").style.color = "white";
	}
	
	//dashboardElement.style.backgroundColor = color;
}

//methods for time



// Show Time
function showTime() {
	

   let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  
  	dashboardWelcomeText.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  	)} ${showAmPm ? amPm : ''}`;
  
  	currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = convertToMonth(currentDate.getMonth());
        var currentDay = convertToDayofWeek(currentDate.getDay());
        
        todayDayElement.innerHTML = currentDate.getDate();
        todayMonthElement.innerHTML = currentMonth;

  //auto join feature
  // Get classes from localStorage
    var classes = JSON.parse(localStorage.getItem('user')).evtList;
    var nextClass;
    var nextDate;
    notificationTable.innerHTML="";

      // Loop through the classes
      for(var i = 0;i < classes.length;i++){

      	
        var startTime = classes[i].start.toString();
        var endTime = classes[i].end.toString();    

        startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startDate.getSeconds()-10)
                
        endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);

        var main=document.getElementById("main");

        //warning system, next class notification, looping through the events until next event is found
        if(!nextDate && startDate>currentDate){
        	nextClass = classes[i];
	        nextDate = startDate;
	        changeVariable = true;
        }
        
        if(startDate < nextDate &&  startDate>currentDate) {
        		nextClass = classes[i];
	        	nextDate = startDate;
	        	changeVariable = true;
        	
        }
      	
      	//functions to automatically join zooms
        if( autojoin && hasJoined[i] == false && startDate < currentDate && endDate > currentDate){   	
        	//checking exact date if the repeated days aren't included. checks the day of weak of repeated
        	if(classes[i].rptList.length == 0 && currentYear == classes[i].yr && currentMonth == classes[i].mt && currentDate.getDate() == classes[i].dy){
        		//make a one time event that will not run again
        		hasJoined[i] = true;
          		window.open(classes[i].zoom);
        	}  
          	else if(classes[i].rptList.includes(currentDay)){
          		//make a one time event that will not run again
        		hasJoined[i] = true;
          		window.open(classes[i].zoom);
          	}
        }
        else if(autojoin && hasJoined[i] == true && startDate < currentDate && endDate > currentDate){
        	
        	if(classes[i].rptList.length == 0 && currentYear == classes[i].yr && currentMonth == classes[i].mt && currentDate.getDate() == classes[i].dy){
        		var tr = document.createElement('TR');
				var td = document.createElement('TD');
				var notifications = [].slice.call(notificationTable.childNodes, 1);
				
		      	td.appendChild(document.createTextNode("- Currently in "+classes[i].name));
		      	tr.appendChild(td);
		      	notificationTable.appendChild(tr);
        	}  
          	else if(classes[i].rptList.includes(currentDay)){

          		var tr = document.createElement('TR');
				var td = document.createElement('TD');
				var notifications = [].slice.call(notificationTable.childNodes, 1);
				var trButton = document.createElement('TR');
		      	td.appendChild(document.createTextNode("- Currently in "+classes[i].name));
		      	tr.appendChild(td);
		      	td = document.createElement('TD')

				// add a button control.
				var button = document.createElement('input');

				// set the attributes.
				button.setAttribute('type', 'button');

				button.setAttribute('class','joinClassButton')
				button.setAttribute('value', 'Join '+classes[i].name);

				// add button's "onclick" event.
				button.setAttribute('onclick', 'window.open(\''+classes[i].zoom+'\')' );


				td.appendChild(button);

				trButton.appendChild(td);

          		
          		
		      	

		      		notificationTable.appendChild(tr);
		      		notificationTable.appendChild(trButton);
          		


          		
          	}
  				
		      		
		      	
  		}
  	}


  	var moveon = true;

  	

  	if(nextClass != null && changeVariable){
      	var tr = document.createElement('TR');
      	var trButton = document.createElement('TR');
		var td = document.createElement('TD');
		var notifications = [].slice.call(notificationTable.childNodes, 1);
		
      	td.appendChild(document.createTextNode("- Joining next event, "+nextClass.name+", at "+nextClass.start));
      	tr.appendChild(td);
      	
	      	
      	var inlist = false;

      	for(var i=0;i<notifications.length;i++){
      		

		    if(notifications[i].innerHTML==tr.innerHTML){
		      inlist = true;
		      
		    }
		    
		  }

		  moveon = false;
      	if(inlist == false){
      		if(nextClass.rptList.length == 0 && currentYear == nextClass.yr && currentMonth == nextClass.mt && currentDate.getDate() == nextClass.dy){
        		td = document.createElement('TD')

				// add a button control.
				var button = document.createElement('input');

				// set the attributes.
				button.setAttribute('type', 'button');

				button.setAttribute('class','joinClassButton')
				button.setAttribute('value', 'Join '+nextClass.name);

				// add button's "onclick" event.
				button.setAttribute('onclick', 'window.open(\''+nextClass.zoom+'\')' );


				td.appendChild(button);

				trButton.appendChild(td);

          		notificationTable.appendChild(tr);
          		notificationTable.appendChild(trButton);
          		updateColors();
        	}  
          	else if(nextClass.rptList.includes(currentDay)){
          		td = document.createElement('TD')

				// add a button control.
				var button = document.createElement('input');

				// set the attributes.
				button.setAttribute('type', 'button');

				button.setAttribute('class','joinClassButton')

				button.setAttribute('style','background-color:'+centralColor+';')
				button.setAttribute('value', 'Join '+nextClass.name);

				// add button's "onclick" event.
				button.setAttribute('onclick', 'window.open(\''+nextClass.zoom+'\')' );


				td.appendChild(button);

				trButton.appendChild(td);

          		notificationTable.appendChild(tr);
          		notificationTable.appendChild(trButton);
          		updateColors();

          		
          	}else{
          		moveon = true;
          	}
      		
      	}

		


		changeVariable = false;
      }

      if(moveon){
      	var tr = document.createElement('TR');
		var td = document.createElement('TD');
		var notifications = [].slice.call(notificationTable.childNodes, 1);
		
		var noNewEventsString = "- No events today.";
      	
      	if(classes.length>0){
      		var noNewEventsString = "- Congratulations, you have no more events today.";
      	}
      	td.appendChild(document.createTextNode(noNewEventsString));
      	tr.appendChild(td);
      	
      	
      	var inlist = false;
      	for(var i=0;i<notifications.length;i++){
      		

		    if(notifications[i].innerHTML==tr.innerHTML){
		      inlist = true;
		      
		    }
		    
		  }
      	if(inlist == false){
      		notificationTable.appendChild(tr);
      	}
      }

      // updateColors();

  	setTimeout(showTime, 1000);
}



function joinThisLink(link) {
	window.open(link);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

var changeWelcomeTempFirst = true;
function changeWelcome(){
	if (changeWelcomeTempFirst) {
		welcoming = false;
		tempfade(dashboardWelcomeText,4);
		let today = new Date(),
	    hour = today.getHours(),
	    min = today.getMinutes(),
	    sec = today.getSeconds();

	  // Set AM or PM
	  const amPm = hour >= 12 ? 'PM' : 'AM';

	  // 12hr Format
	  hour = hour % 12 || 12;

	  // Output Time
	  
	  	dashboardWelcomeText.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
	    sec
	  	)} ${showAmPm ? amPm : ''}`;
 		 
		unfade(dashboardWelcomeText,5);
		
		dashboardWelcomeText.style.display = "inline-block";
		changeWelcomeTempFirst = false;

	}
	
}

function makeZoomId(){
	if(byZoomLink.style.display == 'inline-block'){
		linkByCode.style.display='inline-block';
    	byZoomLink.style.display='none'; 
	}else{
		linkByCode.style.display='none';
    	byZoomLink.style.display='inline-block';
	}
    
    

}
function makeZoomLink(){
	 linkByCode.style.display='none';
    	byZoomLink.style.display='inline-block';

}

function createClass(e){
	e.preventDefault();
	


  // Get form values
  var className = document.getElementById('className').value;
  var startTime = document.getElementById('startTime').value;
  var endTime = document.getElementById('endTime').value;
  var linkByCode = document.getElementById("byCode");


  var repeatedDays = [];


  var tempSingle = document.getElementById("singleclassDate");
  
  
  if(isSingle){
  	

	var chosenYear = tempSingle.value.split("-")[0];
	var chosenMonth = tempSingle.value.split("-")[1];
	var chosenDay = tempSingle.value.split("-")[2];

  }else {
	var chosenYear = clickedYear;
	var chosenMonth = clickedMonth;
	var chosenDay = clickedDay;

  }

  
  Array.from($('[id=repeatChoicesLabel]')).forEach((repeatedDay)=>{
  	
  	if(repeatedDay.innerHTML.includes("✓")){

  		
  		repeatedDays.push(repeatedDay.innerHTML.split(" ")[30].replace("\n",""));
  	}
  });


  
  var zoomlink='';
  

  if((window.getComputedStyle(linkByCode).display==="none")){
    zoomLink =document.getElementById('zoomLink').value;
  }else{
    zoomLink = "zoommtg://zoom.us/join?confno="+document.getElementById('zoomID').value+"&pwd="+document.getElementById('zoomPass').value;
  }
  
  

  //validate if form works
  if(!validateForm(className, startTime, endTime, tempSingle.value, zoomLink)){

    return false;
  }


  //close and reset form
  resetClassForm();

  //creating a class variable
  var newClass = {
    name: className,
    start: startTime,
    end: endTime,
    zoom: zoomLink,
    rptList: repeatedDays,
    yr: chosenYear,
    mt: convertToMonth(chosenMonth-1),
    dy: chosenDay
  }


  var tempUser = JSON.parse(localStorage.getItem('user'));
	firstName = tempUser.fstName;
	lastName = tempUser.lstName;
	colorTheme = tempUser.clrTheme;
	eventList = tempUser.evtList;
  
  if(reedit){
      
      // Add bookmark to array
      eventList[tempIndex] = newClass;

      
     

      reedit=false;
     

  }else{
      // Test if classes is null
    if(eventList === null){
      // Init array

      var eventList = [];
      // Add to array
      eventList.push(newClass);
      
    } else {
     
      // Add bookmark to array
      eventList.push(newClass);
      
    }
   
  }
  tempUser.evtList = eventList;

   // Re-set back to localStorage
   localStorage.setItem('user', JSON.stringify(tempUser));
  
   fetchClasses();

  

  // prevent form from submitting
  e.preventDefault();
}

function addMulti(e){
	e.preventDefault();
	unfade(addMultipleClassesElement, 10);
	loadingForm = true;
	


}

function tempAddMulti(){
	
	unfade(addMultipleClassesElement, 10);
	loadingForm = true;
	


}

function deleteRow(e) {
	var targetedTable = e.target.parentElement.parentElement.parentElement;
	
	var rowCount = targetedTable.rows.length;

    for (var i = 0; i < rowCount; i++) {
    	if(targetedTable.rows[i] == e.target.parentElement.parentElement){
    		targetedTable.deleteRow(i);
    	}
        
        
    }
}

function addAnotherRow() {
	
	
	var multiTable = document.getElementById("multiTable-body");
  	 
        
	var tr = document.createElement('TR');
	tr.setAttribute('class','multiTable-row');
	var td = document.createElement('TD')
	td.setAttribute('contenteditable', 'true');
	td.setAttribute('class', "pt-3-half" );
	tr.appendChild(td);

	var td = document.createElement('TD')
	td.setAttribute('contenteditable', 'true');
	td.setAttribute('class', "pt-3-half" );

	var startTableElement = document.createElement('INPUT');
	startTableElement.setAttribute('type', 'time');
	startTableElement.setAttribute('class', "multiTime-control" );
	td.appendChild(startTableElement);
	tr.appendChild(td);
	var td = document.createElement('TD')
	
	td.setAttribute('class', "pt-3-half" );
	var startTableElement = document.createElement('INPUT');
	startTableElement.setAttribute('type', 'time');
	startTableElement.setAttribute('class', "multiTime-control" );
	td.appendChild(startTableElement);
	tr.appendChild(td);
	var td = document.createElement('TD')
	td.setAttribute('contenteditable', 'true');
	td.setAttribute('class', "pt-3-half" );
	tr.appendChild(td);
	var td = document.createElement('TD')
	td.setAttribute('contenteditable', 'true');
	td.setAttribute('class', "pt-3-half" );
	tr.appendChild(td);
	var td = document.createElement('TD')
	td.setAttribute('contenteditable', 'true');
	td.setAttribute('class', "pt-3-half" );
	tr.appendChild(td);
	var td = document.createElement('TD')
	
	td.setAttribute('class', "pt-3-half" );

	var newRepeatChoiceContainer = document.createElement('DIV');
	newRepeatChoiceContainer = document.getElementById("multiRepeatChoice-container").cloneNode(true);
	newRepeatChoiceContainer.style.display = "block";
	td.appendChild(newRepeatChoiceContainer);
	tr.appendChild(td);

	td = document.createElement('TD')

      // add a button control.
      var button = document.createElement('input');

      // set the attributes.
      button.setAttribute('type', 'button');
      button.setAttribute('value', 'Remove');
      button.setAttribute('class','tableButton')

      // add button's "onclick" event.
      button.setAttribute('onclick', 'deleteRow(event)' );

      td.appendChild(button);
      
      tr.appendChild(td);
	




    	tr.classList.add("variableBorderColor");
    multiTable.appendChild(tr);

    updateColors();
  
}

function submitMulti(e) {
	e.preventDefault();
	var arrayOfRow = document.getElementsByClassName('multiTable-row');
	
	var tempEventList = [];
	invalidInputDetected = false;
	Array.from(arrayOfRow).forEach((rowIndex)=>{
		
		//declare temp variables
		var tempName = getLastChild(rowIndex.children[0]);

		var tempStart = rowIndex.children[1].children[0];
		var tempEnd = rowIndex.children[2].children[0];
		var tempZoomLink = getLastChild(rowIndex.children[3]);
		var tempZoomID = getLastChild(rowIndex.children[4]);
		var tempZoomPass = getLastChild(rowIndex.children[5]);
		var tempRptList = rowIndex.children[6].children[0].children;

		var chosenYear = clickedYear;
		var chosenMonth = clickedMonth;
		var chosenDay = clickedDay;

		var repeatedDays = [];
		
		Array.from(tempRptList).forEach((repeatedDay)=>{
  	
	  	if(repeatedDay.innerHTML.includes("✓")){
	  		
	  		repeatedDays.push(repeatedDay.innerHTML.split(" ")[30].replace("\n",""));
	  	}
	  });
		
		//validate these values
		if(validateRow(tempName, tempStart, tempEnd, tempZoomLink, tempZoomID, tempZoomPass)){
			var newtempZoomLink;
			
			if(tempZoomLink.innerHTML.length == 0){
				newtempZoomLink = "zoommtg://zoom.us/join?confno="+tempZoomID.innerHTML+"&pwd="+tempZoomPass.innerHTML;
			}else{
				newtempZoomLink = tempZoomLink.innerHTML;
			}
			var newClass = {
		    name: tempName.innerHTML,
		    start: tempStart.value,
		    end: tempEnd.value,
		    zoom: newtempZoomLink,
		    rptList: repeatedDays,
		    yr: chosenYear,
		    mt: chosenMonth,
		    dy: chosenDay
		  }
		  tempEventList.push(newClass);
		}
		else{
			invalidInputDetected = true;
		}
		


		

		
	});

	
	//add each event in the tempEventList to the local storage
	if(invalidInputDetected == false){
		
		var tempUser = JSON.parse(localStorage.getItem('user'));
		
		var neweventList = tempUser.evtList;
	  	
	  
	      // Test if classes is null
	    if(eventList === null){
	    	
	      // Init array

	      var eventList = [];
	      // Add to array
	      // Add event to array
	      tempEventList.forEach((eventIndex) => {
	      	neweventList.push(eventIndex);
	      });
	      
	    } else {
	     
	      // Add event to array
	      tempEventList.forEach((eventIndex) => {
	      	
	      	neweventList.push(eventIndex);
	      });
	      
	      
	    }
	   
	  
	  tempUser.evtList = neweventList;

	   // Re-set back to localStorage
	   localStorage.setItem('user', JSON.stringify(tempUser));
	  	
	   fetchClasses();
	   resetMultiTable();
	}

}

function getLastChild(element){
	while(element.children.length > 0) {
		element = element.children[0];
	}
	return element;
}



function hasExtension(inputID, exts) {
   
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(inputID.value);
}


function validateRow(classElement, startElement, endElement, zoomlinkElement, zoomIDElement, zoomPassElement){
	


	falseReturn = false;
	if(!classElement.innerHTML){
		classElement.innerHTML = "Invalid Name";
		classElement.classList.add("error");
		falseReturn = true;
	}
	
	if(!startElement.value){
		
		startElement.classList.add("error");
		falseReturn = true;
	}
	if(!endElement.value){
		
		endElement.classList.add("error");
		falseReturn = true;

	}
	
	if(!zoomlinkElement.innerHTML && (!zoomIDElement.innerHTML ||!zoomPassElement.innerHTML)){
		if(!zoomlinkElement.value){
			zoomlinkElement.innerHTML = "Invalid Link";
			zoomlinkElement.classList.add("error");
			falseReturn = true;
		}
		if(!zoomIDElement.innerHTML){
			zoomIDElement.innerHTML = "Invalid Value";
			zoomIDElement.classList.add("error");
			falseReturn = true;
			
		}
		if(!zoomPassElement.innerHTML){
			zoomPassElement.innerHTML = "Invalid Value";
			zoomPassElement.classList.add("error");
			falseReturn = true;
		}

	}else if(!zoomlinkElement.innerHTML == false){
		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		if(!zoomlinkElement.innerHTML.match(regex)){
			zoomlinkElement.innerHTML = "Invalid Link";
			zoomlinkElement.classList.add("error");
			return false;
		}
	}else{
		//do number verification, all values must be numbers
	}
	
	
	if(falseReturn) {
		return false;
	}
	return true;
}

// Validate Form
function validateForm(className, startTime, endTime, date, zoomLink){
	falseReturn = false;

  if(!className){
  	classNameError.innerHTML = "Invalid or Missing Event Name";
  	falseReturn =true;
  }
  if(!startTime){
  	startTimeError.innerHTML = "Invalid or Missing Start Time";
	falseReturn =true;
  } 
  if(!endTime){
  	endTimeError.innerHTML = "Invalid or Missing End Time";
  	falseReturn =true;
  } 
  if(!date && isSingle){
  	dateError.innerHTML = "Invalid or Missing Date";
  	falseReturn =true;
  } 
  if(!zoomLink ){
  	linkError.innerHTML = "Missing zoomLink";
  	zoomPassError = "Mssing Password";
    zoomIDError = "Missing ID";
    falseReturn =true;
  }
  if(falseReturn){
  	
  	return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!zoomLink.match(regex)){

    linkError.innerHTML = "Invalid Zoom Link";
    zoomPassError = "Invalid Password";
    zoomIDError = "Invalid ID";
    return false;
  }

  return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}
//this opens up the form so user can add values
function resetAddClassForm() {
	classNameError.innerHTML = "";
	startTimeError.innerHTML = "";
	endTimeError.innerHTML = "";
	dateError.innerHTML = "";
	zoomIDError.innerHTML = "";
	zoomPassError.innerHTML = "";
	linkError.innerHTML = "";
	unfade(addClassContainerElement,10);
	document.getElementById('addClassForm').reset();
	makeZoomLink();
	closeAllRepeatList();


}

function addToEditForm() {
	isEditMode = true;
	document.getElementById("formActionType").innerHTML = "Edit Event";
	document.getElementById("addmultipleEventsBtn").style.display = "none";
	document.getElementById("chosenDate-table-container").style.display = "none";
	document.getElementById("addClass-container").style.left = "calc(50vw - 200px)"
	
}

function editToAddForm() {
	isEditMode = false;
	isSingle = false;
	customDateContainer.style.display = "none";
	document.getElementById("formActionType").innerHTML = "Add Event";
	document.getElementById("chosenDate-table-container").style.display = "block";
	document.getElementById("addmultipleEventsBtn").style.display = "inline-block";
	document.getElementById("addClass-container").style.left = "calc(50vw - 400px)";

	
	
}

function resetClassForm() {
	fade(addClassContainerElement,10);
	document.getElementById('addClassForm').reset();
	makeZoomLink();
	closeAllRepeatList();
	var tempTableBody = document.getElementById("chosenDate-tableBody");
			tempTableBody.innerHTML="";



}
function resetMultiTable() {
	fade(addMultipleClassesElement,10);
	var multitablebody = document.getElementById("multiTable-body");
	multitablebody.innerHTML = "";
	addAnotherRow();
	closeAllRepeatList();
}

function resetAddCalendar() {
	unfade(calendarElement,10);
	loadingForm = true;
}

function openAddSingle() {
	//resetAddClassForm();
	unfade(addClassContainerElement,10)
	addToEditForm();
	document.getElementById("formActionType").innerHTML = "Add Event";
	customDateContainer.style.display = "block";
	isSingle = true;

	
}
function openCustom() {
	document.getElementById('customColorForm').reset();
	loadingForm = true;
	unfade(customColorContainer,10);

}
function openMyEventList() {
	unfade(myEvents,10);
	
}
function openExplain() {
	unfade(explanationContainer,10);
	loadingForm = true;
}
function openAddFavorites() {
	unfade(addFavoritesElement,10);
	var addFavoriteform = document.getElementById("addFavoriteForm");
	addFavoriteform.reset();
}

function openSettings() {
	var tempuser = JSON.parse(localStorage.getItem('user'));
	unfade(settingElement,10);

	document.getElementById("edit-firstName").value = tempuser.fstName;
	document.getElementById("edit-lastName").value = tempuser.lstName;
	if(colorTheme.includes("003292")) {
		document.getElementById("edit-colorThemeChosen").innerHTML = "custom theme";
	}else {
		document.getElementById("edit-colorThemeChosen").innerHTML = colorTheme;
	}
	
	document.getElementById("edit-colorThemeChosen").style.display = "block";
	colorThemePickers.forEach(colors=>{
					
					if(colors.classList.contains('selected')){
						colors.classList.remove('selected')
					}
					if(colorTheme == colors.id){
						
						
						colors.classList.add('selected');
						
					}
					
				});
}

function resetCalendar() {
	fade(calendarElement,10);
}

// Delete class
function deleteClass(index){
  // Get classes from localStorage
  var tempuser = JSON.parse(localStorage.getItem('user'));
  var tempList = tempuser.evtList;

  tempList.splice(index, 1)
  tempuser.evtList = tempList;
  
  // Re-set back to localStorage
  localStorage.setItem('user', JSON.stringify(tempuser));

  // Re-fetch classes
  fetchClasses();

}

// Fetch classes
function fetchClasses(){
	createCalendar();

	//update calendar to display which events are occuring

   // Get classes from localStorage
  var tempUser = JSON.parse(localStorage.getItem('user'));
  

  classes = tempUser.evtList;





  classes.sort(function(a,b){return a.period-b.period});

  function sortFunction(a, b) {
      if (a[1] === b[1]) {
          return 0;
      }
      else {
          return (a[1] < b[1]) ? -1 : 1;
      }
  }


  table.innerHTML="";
                  
  

  for (i = 0; i < classes.length; i++) {
  	 hasJoined.push(false);
        
      var tr = document.createElement('TR');

      var name = classes[i].name;
      
      var partsOfName = name.split(" ");

      var tempName = "";
     	
     	partsOfName.forEach((namePart)=>{
     		if(namePart.length > 8){
     			tempName = tempName+" "+namePart.substring(0,7)+"...";
     		}else{
     			tempName = tempName+" "+namePart;
     		}
     	});
      
      var start = classes[i].start;
      var end = classes[i].end;
      var zoom = classes[i].zoom;

      var td = document.createElement('TD')
      td.appendChild(document.createTextNode(tempName));
      tr.appendChild(td);
      
      td = document.createElement('TD')
      td.appendChild(document.createTextNode(start));
      tr.appendChild(td);
      td = document.createElement('TD')
      td.appendChild(document.createTextNode(end));
      tr.appendChild(td);
      td = document.createElement('TD')



      

      // add a button control.
      var button1 = document.createElement('input');

      // set the attributes.
      button1.setAttribute('type', 'button');
      button1.setAttribute('value', 'Join');

      // add button's "onclick" event.
      button1.setAttribute('onclick', 'window.open(\''+zoom+'\')' );
      button1.setAttribute('class','tableBtn')


      td.appendChild(button1);


      
      tr.appendChild(td);

    
      td = document.createElement('TD')

      // add a button control.
      var button = document.createElement('input');

      // set the attributes.
      button.setAttribute('type', 'button');
      button.setAttribute('value', 'Remove');
      button.setAttribute('class','tableBtn')

      // add button's "onclick" event.
      button.setAttribute('onclick', 'deleteClass('+i+')' );

      td.appendChild(button);
      
      tr.appendChild(td);

      tr.classList.add("variableBorderColor");
      table.appendChild(tr);
      updateColors();
  }
  


  
}
var isImageFound = false;





function addFavorite(event) {
	  var tempUser = JSON.parse(localStorage.getItem('user'));
	
	fvt = tempUser.fvt;

	if(fvt.length==6) {
		document.getElementById("favoriteLimitError").style.display = "block";
		return false;
	}


	event.preventDefault();
	isImageFound = false;

	var linkElement = document.getElementById("favoriteLink");
	var link = document.getElementById("favoriteLink").value;
	var favNameElement = document.getElementById("favoriteLinkName");
	var favName = document.getElementById("favoriteLinkName").value;
	

	falseReturn = false;
	if(!link){
		linkElement.innerHTML = "";
			linkElement.classList.add("error");
			linkElement.value = "No link found";
		falseReturn = true;
	}
	if(!favName || favName.length == 0){
		
		favNameElement.innerHTML = "";
			favNameElement.classList.add("error");
			favNameElement.value = "No name found";
		falseReturn = true;
	}
	if(falseReturn){
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		if(!linkElement.value.match(regex)){
			linkElement.value = "";
			linkElement.value = "Invalid Link";

			linkElement.classList.add("error");
			return false;
		}
	

	linkElement.classList.remove("error");


	//creating a class variable
  var newFavorite = {
    fvName: favName,
    fvLink: link
  }


  
  if(reeditFav){
      
      // Add bookmark to array
      fvt[tempIndex] = newFavorite;

      
     

      reeditFav=false;
     

  }else{
      // Test if classes is null
    if(fvt === null){
      // Init array

      var fvt = [];
      // Add to array
      fvt.push(newFavorite);
      
    } else {
     
      // Add bookmark to array
      fvt.push(newFavorite);
      
    }
   
  }
  tempUser.fvt = fvt;

   // Re-set back to localStorage
   localStorage.setItem('user', JSON.stringify(tempUser));
   document.getElementById('addFavoriteForm').reset();
   fetchFavorites();

}

function imageExists(url, callback) {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}

function fetchFavorites() {
	var tempUser = JSON.parse(localStorage.getItem('user'));
	
	fvt = tempUser.fvt;
	document.getElementById("favorites-Container").innerHTML="";
	favoriteTable.innerHTML="";
	var favoriteEditIndex = 0;

	if(fvt.length == 0 ){
		document.getElementById("favorites-Container").style.display="none";

	}
	

	fvt.forEach((fvtIndex)=>{
		//updating the favorite bar on the dashboard
		var favName = fvtIndex.fvName;
		var link = fvtIndex.fvLink;
		var Imagelink;

		//adjusting link to get to the original website name
		var linkSplitDot = link.split(".");
		

		var end = linkSplitDot[linkSplitDot.length-1].split("/")[0];

		
		Imagelink = link.replace(linkSplitDot[linkSplitDot.length-1],"")+end;


		var newFavorite = document.getElementById('favorite-link-container').cloneNode(true);

		newFavorite.setAttribute('style','display: inline-block');
		newFavorite.setAttribute('onclick','window.open(\''+Imagelink+'\')');
		favoriteContainerElement.appendChild(newFavorite);

		//accesses favicons of the websites, temporarily disabled to prevent cross site influence

		// var imageUrl = Imagelink+'/favicon.ico';
		// imageExists(imageUrl, function(exists) {
			
		// 	if(exists){
		// 		newFavorite.children[0].setAttribute('src',Imagelink+'/favicon.ico');
		// 		newFavorite.children[0].setAttribute('alt','website favicon');
		// 	}else{
		// 		newFavorite.children[0].setAttribute('src','img/VA_logo.PNG');
		// 		newFavorite.children[0].setAttribute('alt','VA favicon');
		// 	}

		// });


		newFavorite.children[0].setAttribute('src','img/va-shortcut.png');
		newFavorite.children[0].setAttribute('alt','VA favicon');

		newFavorite.children[1].setAttribute('href',link);

		if(favName.length>8){
			favName = favName.substring(0,6)+"...";
		}
		newFavorite.children[2].innerHTML = favName;

		//updating the favorite table
		var tr = document.createElement('TR');
		

		

		var td = document.createElement('TD')
		td.appendChild(document.createTextNode(favName));
		tr.appendChild(td);

		td = document.createElement('TD')
		td.appendChild(document.createTextNode(link));
		tr.appendChild(td);
		



		td = document.createElement('TD')

		// add a button control.
		var button = document.createElement('input');

		// set the attributes.
		button.setAttribute('type', 'button');
		button.setAttribute('value', 'Remove');
		button.setAttribute('class','tableBtn')

		// add button's "onclick" event.
		button.setAttribute('onclick', 'deleteFavorite('+favoriteEditIndex+')' );

		td.appendChild(button);

		tr.appendChild(td);
		
		tr.classList.add("variableBorderColor");
		favoriteTable.appendChild(tr);
		favoriteEditIndex = favoriteEditIndex+1;
	});
	updateColors();

			

		
}

function fetchCalendar() {
	createCalendar();
}

function deleteFavorite(index){
	if(fvt.length<=6) {
				document.getElementById("favoriteLimitError").style.display = "none";
				
				
			}
  // Get classes from localStorage
  var tempuser = JSON.parse(localStorage.getItem('user'));
  var tempFvt = tempuser.fvt;

  tempFvt.splice(index, 1)
  tempuser.fvt = tempFvt;
  
  // Re-set back to localStorage
  localStorage.setItem('user', JSON.stringify(tempuser));
  openAddFavorites();

  // Re-fetch classes
  fetchFavorites();

}







initMonthSelectors();

function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
  const calendarDaysElement = document.getElementById("calendar-days");

  document.getElementById("selected-month").innerText = dayjs(
    new Date(year, month - 1)
  ).format("MMMM YYYY");

  removeAllDayElements(calendarDaysElement);

  currentMonthDays = createDaysForCurrentMonth(
    year,
    month,
    dayjs(`${year}-${month}-01`).daysInMonth()
  );

  previousMonthDays = createDaysForPreviousMonth(year, month);

  nextMonthDays = createDaysForNextMonth(year, month);

  const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

  days.forEach((day) => {
    appendDay(day, calendarDaysElement, month);
  });
  appendDayFirst = true;
   updateColors();
}



function appendDay(day, calendarDaysElement, month) {
	if(appendDayFirst) {
		appendDayIndex = 0;
		appendDayFirst = false;
	}
	
  const dayElement = document.createElement("li");
  const dayElementClassList = dayElement.classList;
  dayElementClassList.add("calendar-day");
  const dayOfMonthElement = document.createElement("span");
  dayOfMonthElement.setAttribute('class','dayOfMonthElement')
  dayOfMonthElement.innerText = day.dayOfMonth;
  dayElement.appendChild(dayOfMonthElement);

  var tempUser = JSON.parse(localStorage.getItem('user'));
  var tempEventList = tempUser.evtList;
  var tempIndex = dayOfMonthElement;
  
  appendDayIndex = appendDayIndex+1;

  const eventsOfTheDay = document.createElement("span");
  eventsOfTheDay.setAttribute('class','calendarEventNotifcations')
  var eventListString = "";

  var tempCountOfEvents = 0;
	var numberOfRepeatedEvents = 0;
  tempEventList.forEach((eventIndex)=>{
  	
  	if(eventIndex.rptList.includes(indexToDayOfWeek(appendDayIndex))){
  		numberOfRepeatedEvents = numberOfRepeatedEvents+1;
  	}else if(eventIndex.mt == convertToMonth(month-1) && eventIndex.dy == day.dayOfMonth){
  		
  		if(tempCountOfEvents <= 3){
  			eventListString = eventListString + ", "+eventIndex.name;
  			
  		}
  			
  			tempCountOfEvents = tempCountOfEvents+1;
  		
  		
  	}

  	


  });
  
  

  
  
  	if(eventListString.length > 0) {
  		if(tempCountOfEvents >1){
  			//has a unique event
  			eventListString = eventListString + ", and "+(tempCountOfEvents-1)+" events...";
  		}
  		eventsOfTheDay.innerText = eventListString.substring(1,eventListString.length);
  	}else {
  		if(tempCountOfEvents >1){
  			//only has multiple repeated dates
  			//eventsOfTheDay.innerText = (tempCountOfEvents-1)+" events...";
  		}else{
  			//no events on this date

  			 //eventsOfTheDay.innerText = "No events for this day";

  		}
  	}
  
  	if(numberOfRepeatedEvents>0){
  		dayElementClassList.add("calendar-day--has-multirepeat");
  	}

  dayElement.appendChild(eventsOfTheDay);


  calendarDaysElement.appendChild(dayElement);


  
	  
	 


  if (!day.isCurrentMonth) {
    dayElementClassList.add("calendar-day--not-current");
  }

  if (day.date === TODAY) {
  	dayOfMonthElement.classList.add("dayOfMonthElement--today");
    dayElementClassList.add("calendar-day--today");
  }
}

function removeAllDayElements(calendarDaysElement) {
  let first = calendarDaysElement.firstElementChild;

  while (first) {
    first.remove();
    first = calendarDaysElement.firstElementChild;
  }
}

function getNumberOfDaysInMonth(year, month) {
  return dayjs(`${year}-${month}-01`).daysInMonth();
}

function createDaysForCurrentMonth(year, month) {
  return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
    return {
      date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: true
    };
  });
}

function createDaysForPreviousMonth(year, month) {
  const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);

  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

  // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday - 1
    : 6;

  const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format("YYYY-MM-DD"),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false
    };
  });
}

function createDaysForNextMonth(year, month) {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${year}-${month}-${currentMonthDays.length}`
  );

  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 7 - lastDayOfTheMonthWeekday
    : lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false
    };
  });
}

function getWeekday(date) {
  return dayjs(date).weekday();
}

function initMonthSelectors() {
  document
    .getElementById("previous-month-selector")
    .addEventListener("click", function () {
      selectedMonth = dayjs(selectedMonth).subtract(1, "month");
      createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
    });

  document
    .getElementById("present-month-selector")
    .addEventListener("click", function () {
      selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
      createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
    });

  document
    .getElementById("next-month-selector")
    .addEventListener("click", function () {
      selectedMonth = dayjs(selectedMonth).add(1, "month");
      createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
    });
}

function updateCalendar () {

}

function indexToDayOfWeek (index) {
	if(index%7 == 1){
		return "Monday";
	}else if(index%7 == 2){
		return "Tuesday";
	}else if(index%7 == 3){
		return "Wednesday";
	}else if(index%7 == 4){
		return "Thursday";
	}else if(index%7 == 5){
		return "Friday";
	}else if(index%7 == 6){
		return "Saturday";
	}else if(index%7 == 0){
		return "Sunday";
	}
}

function convertToDayofWeek (index) {
	if(index%7 == 1){
		return "Monday";
	}else if(index%7 == 2){
		return "Tuesday";
	}else if(index%7 == 3){
		return "Wednesday";
	}else if(index%7 == 4){
		return "Thursday";
	}else if(index%7 == 5){
		return "Friday";
	}else if(index%7 == 6){
		return "Saturday";
	}else if(index%7 == 0){
		return "Sunday";
	}
}



function convertToMonth (index) {
	
	if(index%7 == 1){
		return "February";
	}else if(index%7 == 2){
		return "March";
	}else if(index%7 == 3){
		return "April";
	}else if(index%7 == 4){
		return "May";
	}else if(index%7 == 5){
		return "June";
	}else if(index%7 == 6){
		return "July";
	}else if(index%7 == 0){
		return "January";
	}else if(index%7 == 7){
		return "August";
	}else if(index%7 == 8){
		return "September";
	}else if(index%7 == 9){
		return "October";
	}else if(index%7 == 10){
		return "November";
	}else if(index%7 == 11){
		return "December";
	}
}

function indexOfMonth (index) {
	if(index == "February"){
		return "02";
	}else if(index == "January"){
		return "01";
	}else if(index == "March"){
		return "03";
	}else if(index == "April"){
		return "04";
	}else if(index == "May"){
		return "05";
	}else if(index == "June"){
		return "06";
	}else if(index == "July"){
		return "07";
	}else if(index == "August"){
		return "08";
	}else if(index == "September"){
		return "09";
	}else if(index == "October"){
		return "10";
	}else if(index == "November"){
		return "11";
	}else if(index == "December"){
		return "12";
	}
	
}
function myFunction(event) {
	if (event.target.parentNode.children[1].classList.contains('show')) {
		        event.target.parentNode.children[1].classList.remove('show');
		    }else{
		    	event.target.parentNode.children[1].classList.toggle("show");
		    }
  
}

function closeAllRepeatList() {
	var allRepeatList = document.getElementsByClassName("dropdown-content");
	Array.from(allRepeatList).forEach((allRepeatListIndex)=>{
		if (allRepeatListIndex.classList.contains('show')) {
	        allRepeatListIndex.classList.remove('show');
	      }
	});
}
function changeDef(event) {
	if (event.target.parentNode.children[1].classList.contains('show') == false) {
		        event.target.parentNode.children[1].classList.toggle("show");
		      }
	
}

function returnDef(event) {
	
	
	var dropdowns = event.target;

	if (dropdowns.classList.contains('show')) {
		
		        dropdowns.classList.toggle('show');
		      }
   
}

const breathingAnimationContainer = document.getElementById('breathing-animation-container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
  text.innerText = 'Breathe In!';
  breathingAnimationContainer.className = 'breathing-animation-container grow';

  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      breathingAnimationContainer.className = 'breathing-animation-container shrink';
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totalTime);





function updateBackImageDisplay() {
  while(backpreview.firstChild) {
    backpreview.removeChild(backpreview.firstChild);
  }

  const curFiles = customImageButton.files;

  if(curFiles.length === 0) {
  	
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    backpreview.appendChild(para);
  } else {
    const list = document.createElement('ol');
    backpreview.appendChild(list);

    for(const file of curFiles) {
      const listItem = document.createElement('li');
      const para = document.createElement('p');
      if(validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);

        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
  
}


function updateTwoBackImageDisplay() {
  while(backTwopreview.firstChild) {
    backTwopreview.removeChild(backTwopreview.firstChild);
  }

  const curFiles = customBackImageButton.files;

  if(curFiles.length === 0) {
  	
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    backTwopreview.appendChild(para);
  } else {
    const list = document.createElement('ol');
    backTwopreview.appendChild(list);

    for(const file of curFiles) {
      const listItem = document.createElement('li');
      const para = document.createElement('p');
      if(validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);
       
        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
  
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}
function validFileType(file) {
  return fileTypes.includes(file.type);
}
