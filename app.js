

let restartBtn = document.getElementById("restartBtn");
let saveTimeBtn = document.getElementById("saveTimeBtn");
let startStopBtn = document.getElementById("startStopBtn");

let clockScreen = document.getElementById("clockScreen");

let mainMilliSecond = 0, mainSecond = 0, mainMinute = 0;

let startStopBtnCount = 0;

cHRAIndex = 0;
let clockHistoryRowArray = [];

let timeSaveActive = false;
let pose1 = true; // for mainSecondCountFun 


restartBtn.addEventListener('click', () => {
  pose1 = false;

  indexOfHistory = 0; localStorage.setItem("indexOfHistory", indexOfHistory);
  clockHistoryRowArray = []; localStorage.setItem("clockHistoryRowArray", JSON.stringify(clockHistoryRowArray));
  cHRAIndex = 0; localStorage.setItem("cHRAIndex", cHRAIndex);
  differenceTwoOld = 0
  localStorage.setItem('differenceTwoOld', differenceTwoOld);
  
  startStopBtnCount = 0;
  startStopBtn.src = "stop-time.png";

  timeSaveActive = false;
  saveTimeBtn.style.filter = 'saturate(10%) opacity(60%)';
  clockHistory.innerHTML = "";
  clockHistory.style.cssText = "display: none;";

  setTimeout(() => {    // wait for the last of the program flow
    mainMilliSecond = 0; mainSecond = 0; mainMinute = 0;
    mainTimeSaveInLocal(mainMilliSecond, mainSecond, mainMinute);
    clockScreen.innerText = timeTextGenerate(mainMilliSecond, mainSecond, mainMinute);
  }, 10);
});

startStopBtn.addEventListener('click', () => {
  setTimeout(mainSecondCountFun, 10);

  startStopBtnCount++;
  if (startStopBtnCount % 2 != 0) {
    startStopBtn.src = "start-time.png";
    pose1 = true;
    mainSecondCountFun(); // Start the loop
    saveTimeBtn.style.filter = 'saturate(100%) opacity(100%)';
    timeSaveActive = true;
  } else {
    saveTimeBtn.style.filter = 'saturate(10%) opacity(60%)';
    timeSaveActive = false;
    startStopBtn.src = "stop-time.png";
    pose1 = false;
  }

})



const mainSecondCountFun = () => {
  mainMilliSecond++;

  if (mainMilliSecond > 99) {
    mainSecond++;
    mainMilliSecond = 0;
  }

  if (mainSecond > 59) {
    mainMinute++;
    mainSecond = 0;
  }

  clockScreen.innerText = timeTextGenerate(mainMilliSecond, mainSecond, mainMinute);
  mainTimeSaveInLocal(mainMilliSecond, mainSecond, mainMinute);

  if (pose1)    // for pose the iteration.
    setTimeout(mainSecondCountFun, 10);
}



let clockHistory = document.getElementById("clockHistory");

let indexOfHistory = 0;

let differenceTwoOld = 0;

saveTimeBtn.addEventListener('click', () => {
  if (timeSaveActive) {
    indexOfHistory++; localStorage.setItem("indexOfHistory", indexOfHistory);
    indexOfHistory = String(indexOfHistory).padStart(2, "0");
    let when = timeTextGenerate(mainMilliSecond, mainSecond, mainMinute);


    let differenceTwo = timeToNum(when) - differenceTwoOld;
    let differenceTwoInNum = '+ ' + numToTime(differenceTwo);
    differenceTwoOld = timeToNum(when);
    localStorage.setItem('differenceTwoOld', differenceTwoOld);

    clockHistory.style.cssText = "width: 100%; display: block; height: 80%; margin-top: 30px;";
    let newRow = document.createElement("div");
    newRow.id = 'clockHistoryRow';
    newRow.innerHTML = `<p id="clockIndex">${indexOfHistory}</p> <p id="differenceTwo">${differenceTwoInNum}</p> <p id="when">${when}</p>`;
    
    clockHistoryRowArray[cHRAIndex++] = newRow.innerHTML;
    localStorage.setItem("cHRAIndex", cHRAIndex);
    localStorage.setItem("clockHistoryRowArray", JSON.stringify(clockHistoryRowArray));
    // console.log(typeof clockHistoryRowArray)
    // console.log(clockHistoryRowArray[cHRAIndex-1]) 
    // console.log(clockHistoryRowArray.length)


    clockHistory.insertBefore(newRow, clockHistory.firstChild);
  }
})





const timeTextGenerate = (m, s, mi) => {
  let msc = String(m).padStart(2, "0");
  let sc = String(s).padStart(2, "0");
  let min = String(mi).padStart(2, "0");
  return `${min}:${sc}:${msc}`;
} // generate this format : 02:04:03



const timeToNum = (time) => {
  let num = '';
  for (i of time) {
    if (i != ':')
      num = num + i;
  }
  return num;
}

const numToTime = (num) => {
  num = String(num).padStart(6, "0");
  let time = '';
  let j = 0;
  for (i of num) {
    time = time + i;
    j++;
    if (j == 2 || j == 4)
      time = time + ':';
  }
  return time;
}







const restoreData = () => {

  //         main time restore from local 
  let storeMilliSecond = localStorage.getItem("mainMilliSecond_Ke");
  mainMilliSecond = (storeMilliSecond == null) ? 0 : storeMilliSecond;
  let storeSecond = localStorage.getItem("mainSecond_Ke");
  mainSecond = (storeSecond == null) ? 0 : storeSecond;
  let storeMinute = localStorage.getItem("mainMinute_Ke");
  mainMinute = (storeMinute == null) ? 0 : storeMinute;
  
  clockScreen.innerText = timeTextGenerate(mainMilliSecond, mainSecond, mainMinute);

  indexOfHistory = localStorage.getItem("indexOfHistory");
  let storeArr = JSON.parse(localStorage.getItem("clockHistoryRowArray"));
  clockHistoryRowArray = (storeArr == null) ?  [] : storeArr;
  // console.log(clockHistoryRowArray);
  cHRAIndex = localStorage.getItem("cHRAIndex");
  let diff = localStorage.getItem('differenceTwoOld')
  differenceTwoOld = (diff == null) ? 0 : diff;
  
  
  if (clockHistoryRowArray.length > 0) {
    clockHistory.style.cssText = "width: 100%; display: block; height: 80%; margin-top: 30px;";
    for(i of clockHistoryRowArray){
      // console.log(i)
      let newRow = document.createElement("div");
      newRow.id = 'clockHistoryRow';
      newRow.innerHTML = i;
      clockHistory.insertBefore(newRow, clockHistory.firstChild);
    }
    
  }

  

}
restoreData();

const mainTimeSaveInLocal = (mil, se, min) => {
  localStorage.setItem('mainMilliSecond_Ke', mil);
  localStorage.setItem('mainSecond_Ke', se);
  localStorage.setItem('mainMinute_Ke', min);
}
