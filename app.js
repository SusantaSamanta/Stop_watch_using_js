
let restartBtn = document.getElementById("restartBtn");
let saveTimeBtn = document.getElementById("saveTimeBtn");
let startStopBtn = document.getElementById("startStopBtn");

let timeSaveActive = false;
let pose1 = true; // for mainSecondCountFun 


// restartBtn.addEventListener('click', () =>{
//   console.log('long');
//   setTimeout(mainSecondCountFun, 10);
// });

let startStopBtnCount = 0;
startStopBtn.addEventListener('click', () => {
  setTimeout(mainSecondCountFun, 10);

  startStopBtnCount++;
  if (startStopBtnCount % 2 !== 0) {
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

let clockScreen = document.getElementById("clockScreen");
let mainMilliSecond = 0, mainSecond = 0, mainMinute = 0;

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
  
  if(pose1)    // for pose the iteration.
  setTimeout(mainSecondCountFun, 10);   
}



let clockHistory = document.getElementById("clockHistory");

let indexOfHistry = 0;

let differenceTwoOld = 0;

saveTimeBtn.addEventListener('click', () => {
  if(timeSaveActive){
    indexOfHistry++;
    indexOfHistry = String(indexOfHistry).padStart(2, "0");
    let when = timeTextGenerate(mainMilliSecond, mainSecond, mainMinute);
    
   
    let differenceTwo = timeToNum(when) - differenceTwoOld;
    let differenceTwoInNum = '+ ' + numToTime(differenceTwo);
    differenceTwoOld = timeToNum(when);
    
    
    clockHistory.style.cssText = "width: 100%; display: block; height: 80%; margin-top: 30px;";
    let newRow = document.createElement("div");
    newRow.id = 'clockHistoryRow';
    newRow.innerHTML = `<p id="clockIndex">${indexOfHistry}</p> <p id="differenceTwo">${differenceTwoInNum}</p> <p id="when">${when}</p>`;
    clockHistory.insertBefore(newRow, clockHistory.firstChild);
  }
})





const timeTextGenerate = (m,s,mi) =>{
  let msc =  String(m).padStart(2, "0");
  let sc = String(s).padStart(2, "0");
  let min =  String(mi).padStart(2, "0");
  return `${min}:${sc}:${msc}`;
} // generate this format : 02:04:03



const timeToNum =  (time) =>{
  let num = '';
  for(i of time){
    if(i != ':')
      num = num+i;
  }
  return num;
}

const numToTime = (num) => {
  num = String(num).padStart(6, "0");
  let time = '';
  let j = 0;
  for(i of num){
    time = time + i;
    j++;
    if(j==2 || j == 4)
      time = time + ':';
  }
  return time;
}

