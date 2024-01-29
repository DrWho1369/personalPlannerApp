// -------------------------------//
// Import HTML elements to target-//
// -------------------------------//

var currentDayEl = $("#currentDay");
var containerEl = $(".container");

// -------------------------------//
// Set the day to appear using----//
// DayJS--------------------------//
// -------------------------------//

function getDayWithSuffix(day) {
  // The function `getDayWithSuffix` takes a day as input and returns the day with the appropriate suffix
  // (e.g. "1st", "2nd", "3rd", "4th", etc.).
  // @param day - The parameter "day" represents the day of the month. It is a number that ranges from 1 to 31.
  // @returns the day with the appropriate suffix appended to it.
  // Extract the last digit of the day
  const lastDigit = day % 10;

  let suffix = "th";
  if (day < 10 || day > 20) {
    if (lastDigit === 1) {
      suffix = "st";
    } else if (lastDigit === 2) {
      suffix = "nd";
    } else if (lastDigit === 3) {
      suffix = "rd";
    }
  }

  return day + suffix;
}

const currentDay = dayjs().format("D");
const dayWithSuffix = getDayWithSuffix(parseInt(currentDay, 10));
const currentDate = dayjs().format("dddd, MMMM");
const formattedDate = currentDate + " " + dayWithSuffix;
$(currentDayEl).text(formattedDate);

// -------------------------------//
// Set the time blocks to appear--//
// -------------------------------//
var hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
// Let user set their working day to populate this variable

for (let i = 0; i < hours.length; i++) {
  var newDiv = $(
    `<form><div class='row time-block'><div class='col-2 hour'>${hours[i]}:00</div><textarea class='col-8 description textInput' name='textInput'></textarea><button class='col-2 saveBtn' type='submit'><i class='fas fa-save'></i></button></div></form>`
  );
  containerEl.append(newDiv);
}
