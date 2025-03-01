const timeToNum =  (time) =>{
  let num = '';
  for(i of time){
    if(i != ':'){
      num = num+i;
      console.log(parseInt(i));
    }
  }
  //console.log(parseInt(num));
  return num
}

let old = '000542';
let newV = timeToNum("00:07:09");


console.log(newV-old);

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
  console.log(time)
}

numToTime(newV-old)


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
