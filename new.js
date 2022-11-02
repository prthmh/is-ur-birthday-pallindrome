var dateInput = document.querySelector("#date-input");
var showbtn = document.querySelector("#show-btn");
var outputEle = document.querySelector("#output");



function reverseStr(str){
    var listOfChar = str.split('');
    var reverseListOfChar = listOfChar.reverse();
    var reversedStr = reverseListOfChar.join('');
    return reversedStr;
  }
  
  function isPalindrome(str){
    var reverse = reverseStr(str);
    return reverse===str;
  } 
  
  function convertDateToString(date){
    var dateStr = { day:"", month:"", year:""};
    if(date.day < 10){
      dateStr.day= "0" + date.day;
    }
    else{
      dateStr.day= date.day.toString();
    }
  
    if(date.month < 10){
      dateStr.month= "0" + date.month;
    }
    else{
      dateStr.month= date.month.toString();
    }
    dateStr.year= date.year.toString();
    return dateStr;
  }
  
  
  function getAllDateFormat(date){
    var dateStr = convertDateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
  }
  
  function checkPalindromeForAllDateFormat(date){
    var listOfPalindromes = getAllDateFormat(date);
  
    var flag = false;
  
    for(var i=0; i<listOfPalindromes.length; i++){
      if(isPalindrome(listOfPalindromes[i])){
        flag = true;
        break;
      }
    }
    return flag;
  }
  
  function isLeapYear(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return true;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;
  }
  
  function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year =date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
    if(month === 2){
      if(isLeapYear(year)){
        if(day>29){
          day=1;
          month++;
        }
      }
      else{
        if(day>28){
           day=1;
          month++;
        }
      }
    }
    else{
      if(day > daysInMonth[month-1]){
        day =1;
        month++
      }
    }
  
    if(month>12){
      month = 1;
      year++;
    }
  
    return{
      day: day,
      month: month,
      year: year,
    }
  }
  
  function nextPallidromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
  
    while(1){
      ctr++;
      var flag = checkPalindromeForAllDateFormat(nextDate);
      if(flag){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
  }
  
  
  

function clickHandler(e){  
    var bdayStr = dateInput.value;

    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-');
        var date= {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        console.log(date);
        var isPalindrome = checkPalindromeForAllDateFormat(date);
        
        if(isPalindrome){
            outputEle.innerText = "Congratulations! Your Birthday is a Palindrome!!🙌🎊";
        } else{
            var [ctr, nextDate] = nextPallidromeDate(date); 
            outputEle.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
            
        }
    }
}

showbtn.addEventListener("click", clickHandler);
  