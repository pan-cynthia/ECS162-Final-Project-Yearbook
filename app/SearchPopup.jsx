const React = require('react');
const Questionnaire = require('./Questionnaire');

const colleges = [
  'College of Agricultural and Environmental Sciences',
  'College of Biological Sciences',
  'College of Engineering',
  'College of Letters and Science'
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const gender = [
  'Male',
  'Female',
  'Non-binary'
];

function SearchPopup (props) {
  console.log("search button is activated");
  return (
    <div>
      <button className={props.classname} onClick={()=>clickedShow()}>Search</button>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <button className="close" onClick={()=> closePopup()} >&times;</button>
          <div className="search-questionnaire">
            <Questionnaire></Questionnaire>
            <button id="search-button" onClick={()=>redirectSearch()}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function clickedShow(){
  var modal = document.getElementById("myModal");
  console.log("button clicked");
  modal.style.display = "block";
}

function closePopup() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function redirectSearch() {
  console.log("redirect search entered");
  window.location.href = "https://sparkly-languid-vermicelli.glitch.me/" + encodeUrl();
}  

function encodeUrl() {
  let baseUrl = "searchresults/list?";
  let firstnameVal = document.getElementById("type-first-name").textContent;
  let lastnameVal = document.getElementById("type-last-name").textContent;
  let fullnameVal = "";
  if (firstnameVal != "" && lastnameVal != "") {
    fullnameVal = firstnameVal + " " + lastnameVal;
  }
  let majorVal = document.getElementById("type-major").textContent;
  let collegeVal = document.getElementById("search-college-text").textContent;
  let genderVal = document.getElementById("search-gender-text").textContent;
  let birthmonthVal = document.getElementById("search-birthmonth-text").textContent;
  let obj = {firstname: firstnameVal, lastname: lastnameVal, fullname: fullnameVal, major: majorVal, college: collegeVal, gender: genderVal, birthmonth: birthmonthVal};
  let keys = Object.keys(obj);
  for(var i = 0; i < 7; i++) {
    if(obj[keys[i]] != "All" && obj[keys[i]] != "") {
      baseUrl += (keys[i] + "=" + obj[keys[i]] + "&");
    }
  }
  console.log("Encoded Url: " + baseUrl);
  // prints out: Encoded Url: searchresults/list?college=College of Letters and Science&gender=Gender&birthmonth=Birth Month&
  return baseUrl;
}

module.exports = SearchPopup;