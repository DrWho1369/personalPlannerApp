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

// -------------------------------//
// Set the time elements to appear--//
// -------------------------------//
// Let user set their working day to populate this variable

function generateOrRetrieveHoursArray() {
  // Check if the user has already visited the site and a choice is stored in local storage
  const storedHours = localStorage.getItem("userHoursChoice");

  if (storedHours) {
    // Retrieve the stored array choice from local storage
    return JSON.parse(storedHours);
  }

  // Prompt the user for the start and end hours
  const startHour = parseInt(prompt("Enter the start hour (00-24):"), 10);
  const endHour = parseInt(prompt("Enter the end hour (00-24):"), 10);

  // Validate input
  if (
    isNaN(startHour) ||
    isNaN(endHour) ||
    startHour < 0 ||
    startHour > 24 ||
    endHour < 0 ||
    endHour > 24 ||
    startHour >= endHour
  ) {
    alert(
      "Invalid input. Please enter valid start and end hours between 00 and 24."
    );
    return [];
  }

  // Generate the array of hours between start and end
  const generatedHours = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    generatedHours.push(hour);
  }

  // Store the user's array choice in local storage
  localStorage.setItem("userHoursChoice", JSON.stringify(generatedHours));

  return generatedHours;
}

// -------------------------------//
// Applying colors to time blocks-//
// -------------------------------//

function applyColorBasedOnTime() {
  /*** The function applies different classes to time blocks
   * based on the current hour.*/
  const currentTime = currentDay.hour(); // Get the current hour

  $(".time-element").each(function (i, block) {
    const blockHour = hours[i];

    // Apply different classes based on the comparison with the current hour
    switch (true) {
      case blockHour < currentTime:
        $(this).addClass("past");
        break;
      case blockHour === currentTime:
        $(this).addClass("present");
        break;
      case blockHour > currentTime:
        $(this).addClass("future");
        break;
    }
  });
}

// -------------------------------//
// Return from local storage------//
// -------------------------------//
function assignStoredText() {
  const timeBlocks = $(".time-element");

  timeBlocks.each(function (index, block) {
    const hour = $(block).find(".hour").text();
    const storedText = localStorage.getItem(`savedData ${hourForLocalStorage}`);
    const textarea = $(block).find("textarea[name='textInput']");
    textarea.val(storedText);
  });
}

// -------------------------------//
// Set to store to local storage--//
// -------------------------------//
$(document).on("submit", "form", function (event) {
  event.preventDefault();

  // Extract values from the form
  const form = $(event.target);
  const textInput = form.find("textarea[name='textInput']").val().trim();
  const hourForLocalStorage = form.find(".hour").text();

  // Construct the localStorage key
  const localStorageKey = `savedData ${hourForLocalStorage}`;

  // Update or set new value in localStorage
  localStorage.setItem(localStorageKey, textInput);

  console.log(textInput, hourForLocalStorage); // Log to check working
});

// -------------------------------//
// Call any functions required----//
// -------------------------------//

const currentDay = dayjs().format("D");
const dayWithSuffix = getDayWithSuffix(parseInt(currentDay, 10));
const currentDate = dayjs().format("dddd, MMMM");
const formattedDate = currentDate + " " + dayWithSuffix;
$(currentDayEl).text(formattedDate);

const hours = generateOrRetrieveHoursArray();

for (let i = 0; i < hours.length; i++) {
  var newDiv = $(
    `<form><div class='row time-element'><div class='col-2 hour'>${hours[i]}:00</div><textarea class='col-8 description textInput' name='textInput'></textarea><button class='col-2 saveBtn' type='submit'><i class='fas fa-save'></i></button></div></form>`
  );
  containerEl.append(newDiv);
}

assignStoredText();
applyColorBasedOnTime();
