// -------------------------------//
// Import HTML elements to target-//
// -------------------------------//

var currentDayEl = $("#currentDay");
var containerEl = $("#container");

// -------------------------------//
// Define any global variables----//
// -------------------------------//

var hours = [];
// Let user set their working day to populate this variable

// -------------------------------//
// Set the day to appear using----//
// DayJS--------------------------//
// -------------------------------//

// Note - the code below is utilised from FreeCodeCamps DayJs article
const currentDate = dayjs();
const formattedDate = currentDate.format("dddd, MMMM D");
$(currentDayEl).text(formattedDate);

// -------------------------------//
// Set the time blocks to appear--//
// -------------------------------//
