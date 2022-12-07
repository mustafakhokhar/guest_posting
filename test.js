function unixTimestamp (date = Date.now()) {  
    return Math.floor(date / 1000)
  }

console.log(unixTimestamp())