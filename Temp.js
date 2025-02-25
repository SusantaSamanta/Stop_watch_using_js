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