const timeFull = document.getElementById("timeFull");
const moreBtn = document.getElementById("moreBtn");
const moreData = document.getElementById("moreData");

let date = new Date();
const h = date.getHours();

let imageData;
let weekday;
let monthOfTheYear;

function title() {
  const title = document.getElementById("title");
  if (h < 11) {
    title.innerHTML = "Good Morning, currently the time is";
  } else if (h < 16) {
    title.innerHTML = "Good Afternoon, currently the time is";
  } else if (h < 20) {
    title.innerHTML = "Good Evening, currently the time is";
  } else {
    title.innerHTML = "Good Night, currently the time is";
  }
  console.log(title);
}

title();

function getWeekDayName() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

function getWeekOfTheYear() {
  const numberOfDays = Math.floor(
    (date - new Date(date.getFullYear(), 0, 1)) / (24 * 60 * 60 * 1000)
  );
  return Math.ceil(
    (date.getDay() + 1 + numberOfDays) / 7
  );
}

function getMonthOfTheYear() {
  const days = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return days[date.getMonth()];
}

if (localStorage.getItem("display_date_")) {
  time.innerHTML = `${getMonthOfTheYear()}, ${date.getDate()}  ${date.getFullYear()}`;
}

let ms = false;
moreBtn.addEventListener("click", function () {
  if (ms === false) {
    ms = true;
    document.getElementById("m_getMonthOfTheYear").innerHTML = getMonthOfTheYear();
    document.getElementById("m_getDate").innerHTML = date.getDate();
    document.getElementById("m_getWeekDayName").innerHTML = getWeekDayName();
    document.getElementById("m_getWeekOfTheYear").innerHTML = getWeekOfTheYear();
    moreBtn.textContent = "Less";
    moreData.style.display = "block";
  } else {
    ms = false;
    moreData.style.display = "none";
    moreBtn.textContent = "More";
  }
});

function display_time() {
  setInterval(function () {
    date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (localStorage.getItem("hFormate")) {
      let am_pm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      if (localStorage.getItem("dst")) {
        timeFull.innerHTML =
          hours + ":" + minutes + " " + " : " + addZero(seconds) + " " + am_pm;
      } else {
        timeFull.innerHTML = hours + ":" + minutes + " " + am_pm;
      }
    } else {
      if (localStorage.getItem("dst")) {
        timeFull.innerHTML =
          hours + ":" + minutes + " " + " : " + addZero(seconds);
      } else {
        timeFull.innerHTML = hours + ":" + minutes;
      }
    }
  }, 1000);
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function openNav() {
  document.getElementById("sideDiv").style.width = "250px";
  settingLeft();
}

function closeNav() {
  document.getElementById("sideDiv").style.width = "0";
}

function settingLeft() {
  let dst_no = "checked";
  let dst_yes = "";
  if (localStorage.getItem("dst")) {
    dst_no = "";
    dst_yes = "checked";
  }

  let display_date__no = "checked";
  let display_date__yes = "";
  if (localStorage.getItem("display_date_")) {
    display_date__no = "";
    display_date__yes = "checked";
  }

  let hFormate_no = "checked";
  let hFormate_yes = "";
  if (localStorage.getItem("dst")) {
    hFormate_no = "";
    hFormate_yes = "checked";
  }
  document.getElementById("settingBody").innerHTML = `
        <div class="row">
          <div class="col-md-12">
            <h6>Seconds Countdown</h6>
            <button class="btn btn-sm btn-success ${dst_yes}" id='addSeconds'>Show</button>
            <button class="btn btn-sm btn-warning ${dst_no}" id='removeSeconds'>Hide</button>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-12">
            <h6>Date</h6>
            <button id='addDate' class="btn bt-sm btn-success ${display_date__yes}">Show</button>
            <button id='removeDate' class="btn bt-sm btn-warning ${display_date__no}">Hide</button>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-12">
            <h6>Change Formate</h6>
            <button id='h12' class="btn btn-sm btn-success ${hFormate_yes}">12 Hours</button>
            <button id='h24' class="btn btn-sm btn-warning ${hFormate_no}">24 Hours</button>
          </div>
        </div>`;

  document.getElementById("addSeconds").addEventListener("click", function () {
    display_time();
    localStorage.setItem("dst", false);
  });
  document.getElementById("removeSeconds").addEventListener("click", function () {
    display_time();
    localStorage.removeItem("dst");
  });

  document.getElementById("addDate").addEventListener("click", function () {
    time.innerHTML = `${getMonthOfTheYear()}, ${date.getDate()}  ${date.getFullYear()}`;
    localStorage.setItem("display_date_", false);
  });
  document.getElementById("removeDate").addEventListener("click", function () {
    time.innerHTML = "";
    localStorage.removeItem("display_date_");
  });

  h12.addEventListener("click", function () {
    localStorage.setItem("hFormate", true);
  });
  h24.addEventListener("click", function () {
    localStorage.removeItem("hFormate");
  });
}

function getImage() {
  fetch(
    "https://api.nasa.gov/planetary/apod?api_key=E2nL2ce23kzEel8GwG1L7L2v60k8SA39MFNtIrf5"
  )
    .then(function (res) {
      console.log("res", res);
      return res.json();
    })
    .then(function (data) {
      console.log("data", data);
      if (data.media_type === "video") {
          document.getElementById("bodyDiv").style.backgroundImage = "url('/images/video-photo.jpg')";
      } else {
          document.getElementById("bodyDiv").style.backgroundImage = "url('"+data.url+"')";
          document.getElementById("titleApi").innerHTML += `${data.title}`;
      }
    });
}

getImage();
display_time();