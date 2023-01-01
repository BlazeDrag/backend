const date=new Date()
const month=["","January","February","March","April","May","June","July",
"August","September","October","November","December"];
const finaldate=`${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`