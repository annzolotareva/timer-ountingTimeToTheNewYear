const currentHours = document.getElementById("current-hours");
const currentMinutes = document.getElementById("current-minutes");
const currentSeconds = document.getElementById("current-seconds");
const daysUntilNewYear = document.getElementById("timer-days");
const dayOfWeek = document.getElementById("day-of-week");
const greeting = document.getElementById("greeting");
const pmAm = document.getElementById("pm-am");
const days = document.getElementById("days");
const newYear = "31 december 2021";

const getTime = () => {
  let hoursNow = new Date().getHours();
  let minutesNow = new Date().getMinutes();
  let secondsNow = new Date().getSeconds();
  let dateStop = new Date(newYear).getTime();
  let dateNow = new Date().getTime();
  let daysRemaining = Math.floor((dateStop - dateNow) / 1000 / 60 / 60 / 24) + 1;

  return { hoursNow, minutesNow, secondsNow, daysRemaining };
};

const getNumEnding = () => {
  let ending = ["день", "дня", "дней"];
  let sEnding, i;
  let time = getTime();
  time.daysRemaining = time.daysRemaining % 100;
  if (time.daysRemaining >= 11 && time.daysRemaining <= 19) {
    sEnding = ending[2];
  } else {
    time.daysRemaining = time.daysRemaining % 10;
    switch (time.daysRemaining) {
      case 1:
        sEnding = ending[0];
        break;
      case 2:
      case 3:
      case 4:
        sEnding = ending[1];
        break;
      default:
        sEnding = ending[2];
    }
  }
  days.textContent = sEnding;
};

const getDayOfWeek = () => {
  const days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
  let day = new Date().getDay();
  let dayOfWeekNow = days[day];
  return { dayOfWeekNow };
};

const substituteZero = (val) => {
  if (val < 10) {
    val = "0" + val;
  }
  return val;
};

const welcome = () => {
  let time = getTime();
  if (time.hoursNow >= 0 && time.hoursNow < 6) {
    greeting.textContent = "Доброй ночи!";
  } else if (time.hoursNow <= 6 || time.hoursNow < 12) {
    greeting.textContent = "Доброе утро!";
  } else if (time.hoursNow <= 12 || time.hoursNow < 18) {
    greeting.textContent = "Добрый день!";
  } else if (time.hoursNow <= 18 || time.hoursNow < 24) {
    greeting.textContent = "Добрый вечер!";
  }
};

const getPmAm = () => {
  let time = getTime();
  if (time.hoursNow >= 0 && time.hoursNow < 12) {
    pmAm.textContent = "am";
  } else if (time.hoursNow >= 12 && time.hoursNow < 24) {
    pmAm.textContent = "pm";
  }
};
const updateClock = () => {
  let time = getTime();
  currentHours.textContent = substituteZero(time.hoursNow);
  currentMinutes.textContent = substituteZero(time.minutesNow);
  currentSeconds.textContent = substituteZero(time.secondsNow);
};
const updateDate = () => {
  let time = getTime();
  let dayNow = getDayOfWeek();
  daysUntilNewYear.textContent = time.daysRemaining;
  dayOfWeek.textContent = dayNow.dayOfWeekNow;
  getNumEnding();
};

welcome();
setInterval(welcome, 21600000);
updateDate();
setInterval(updateDate, 86400000);
updateClock();
setInterval(updateClock, 1000);
getPmAm();
setInterval(getPmAm, 43200000);
