const months = new Array(12);
const indexConvert = new Array(12);
const indexConvert2 = new Array(12);

months["Jan"] = "January";
months["Feb"] = "February";
months["Mar"] = "March";
months["Apr"] = "April";
months["May"] = "May";
months["Jun"] = "June";
months["Jul"] = "July";
months["Aug"] = "August";
months["Sep"] = "September";
months["Oct"] = "October";
months["Nov"] = "November";
months["Dec"] = "December";

indexConvert["January"] = 0;
indexConvert["February"] = 1;
indexConvert["March"] = 2;
indexConvert["April"] = 3;
indexConvert["May"] = 4;
indexConvert["June"] = 5;
indexConvert["July"] = 6;
indexConvert["August"] = 7;
indexConvert["September"] = 8;
indexConvert["October"] = 9;
indexConvert["November"] = 10;
indexConvert["December"] = 11;

indexConvert2["Jan"] = "01";
indexConvert2["Feb"] = "02";
indexConvert2["Mar"] = "03";
indexConvert2["Apr"] = "04";
indexConvert2["May"] = "05";
indexConvert2["Jun"] = "06";
indexConvert2["Jul"] = "07";
indexConvert2["Aug"] = "08";
indexConvert2["Sep"] = "09";
indexConvert2["Oct"] = "10";
indexConvert2["Nov"] = "11";
indexConvert2["Dec"] = "12";

months[0] = "Jan";
months[1] = "Feb";
months[2] = "Mar";
months[3] = "Apr";
months[4] = "May";
months[5] = "Jun";
months[6] = "Jul";
months[7] = "Aug";
months[8] = "Sep";
months[9] = "Oct";
months[10] = "Nov";
months[11] = "Dec";

const obj = {
  months,
  indexConvert,
  indexConvert2,
};

module.exports = obj;
