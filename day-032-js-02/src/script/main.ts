type Result = number | string;
type Time = number | string;
// type Year = number
// type Month = number
// type Day = number
// type Timing = Year | Month | Day
enum Timing {
  Year,
  Month,
  Date,
}

enum ValidationMessage {
  Valid,
  InvalidYear = "invalid year",
  InvalidMonth = "invalid month, month should between 1~12",
  InvalidDate = "invalid date, date should between 1~31",
  InvalidDateOfMonth = "invalid date, the month has no such date",
}

const daysOfMonth = [31,28,31,
  30,31,30,
31,31,30,
31,30,31]

const inputs = document.getElementsByTagName("input");

const yearInput = inputs[0];
const monthInput = inputs[1];
const dateInput = inputs[2];
const resultInput = inputs[3];

function validate(t: Timing, v: number) {
  switch (t) {
    case Timing.Year:
      return true;
    case Timing.Month: {
      const vv = parseInt(String(v), 10);
      if (vv > 0 && vv <= 12) {
        return true;
      }
      return false;
    }
    case Timing.Date: {
      const vv = parseInt(String(v), 10);
      if (vv > 0 && vv <= 31) {
        return true;
      }
      return false;
    }
    default:
      return false;
  }
}

function validateWhole(year: number, month: number, date: number) {
  if(!validate(Timing.Year, year)) return ValidationMessage.InvalidYear;
  if(!validate(Timing.Month, month)) return ValidationMessage.InvalidMonth;
  if(!validate(Timing.Date, date)) return ValidationMessage.InvalidDate;

  if(month !== 2) {
    if( !( date > 0 && date <= daysOfMonth[month-1]) )
    return ValidationMessage.InvalidDateOfMonth;
  } else {
    const m = isLeap(year) ? 29 : 28
      if(! (date> 0 && date <= m))
        return ValidationMessage.InvalidDateOfMonth;
  }
  
  return ValidationMessage.Valid;

}

function isLeap(year: number) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function whichDay(year: number, month: number, date: number) {
  const valid = validateWhole(year, month, date)
  switch(valid) {
    case ValidationMessage.InvalidYear:
      yearInput.classList.add('invalid')
      break;
    case ValidationMessage.InvalidMonth:
      monthInput.classList.add('invalid')
      break;
    case ValidationMessage.InvalidDate:
    case ValidationMessage.InvalidDateOfMonth:
      dateInput.classList.add('invalid')
      break;
    default: {
      yearInput.classList.remove('invalid')
      monthInput.classList.remove('invalid')
      dateInput.classList.remove('invalid')
    }
 }
  if(valid !== ValidationMessage.Valid)  {
    resultInput.classList.add('invalid')
    return valid
  }
    resultInput.classList.remove('invalid')


  const daysOfFeb = isLeap(year) ? 29 : 28;

  let day = date;
  let m = month
  switch(m) {
    case 12:
      day += daysOfMonth[--m];
    case 11:
      day += daysOfMonth[--m];
    case 10:
      day += daysOfMonth[--m];
    case 9:
      day += daysOfMonth[--m];
    case 8:
      day += daysOfMonth[--m];
    case 7:
      day += daysOfMonth[--m];
    case 6:
      day += daysOfMonth[--m];
    case 5:
      day += daysOfMonth[--m];
    case 4:
      day += daysOfMonth[--m];
    case 3:
      day += daysOfMonth[--m];
    case 2:
      day += daysOfMonth[--m];
    // case 1:
    //   day += daysOfMonth[m--];
  }

  return isLeap(year) ? (month > 2 ?  day + 1 : day) : day;
}

function updateResult() {
  
  yearInput.value = parseInt(yearInput.value, 10)
  monthInput.value =  parseInt(monthInput.value, 10) 
  dateInput.value =   parseInt(dateInput.value, 10) 

  const day = whichDay(+yearInput.value, +monthInput.value, +dateInput.value);
  resultInput.value = String(day);
}

function init() {
  yearInput.value = "2018"
  monthInput.value = "9"
  dateInput.value = "20"
  updateResult()
}

yearInput.oninput = updateResult;
monthInput.oninput = updateResult;
dateInput.oninput = updateResult;

init()