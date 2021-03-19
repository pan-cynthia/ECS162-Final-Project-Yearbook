const React = require('react');

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

function Questionnaire() {
  console.log("search has been activated");
  return (
    <div id="questionnaire">
      <div id="search-material">
        <div className="type-to-search">
          <p className="type-to-search-label" >first name</p>
          <div className="search-bar" id="type-first-name" contentEditable="true"></div>
        </div>
        <div className="type-to-search">
          <p className="type-to-search-label" >last name</p>
          <div className="search-bar" id="type-last-name" contentEditable="true"></div>
        </div>
        <div className="type-to-search">
          <p className="type-to-search-label">major</p>
          <div className="search-bar" id="type-major" contentEditable="true"></div>
        </div>
        <div className="dropdown" id="search-college">
          <div className="dropdown-label">
            <div className="dropdown-text" id="search-college-text">College</div>
            <button className="arrowdown" onClick={()=> dropdownCollege()}>&#x25BE;</button>
          </div>
          <div className="dropdown-list" id="college-dropdown">
            <button className="college-button" onClick={()=> changeCollege("College of Agricultural and Environmental Sciences")}>College of Agricultural and Environmental Sciences</button>
            <button className="college-button" onClick={()=> changeCollege("College of Biological Sciences")}>College of Biological Sciences</button>
            <button className="college-button" onClick={()=> changeCollege("College of Engineering")}>College of Engineering</button>
            <button className="college-button" onClick={()=> changeCollege("College of Letters and Science")}>College of Letters and Science</button>
          </div>
        </div>
        <div className="dropdown" id="search-gender">
          <div className="dropdown-label">
            <div className="dropdown-text" id="search-gender-text">Gender</div>
            <button className="arrowdown" onClick={()=> dropdownGender()}>&#x25BE;</button>
          </div>
          <div className="dropdown-list" id="gender-dropdown">
            <button className="gender-button" onClick={()=> changeGender("Male")}>Male</button>
            <button className="gender-button" onClick={()=> changeGender("Female")}>Female</button>
            <button className="gender-button" onClick={()=> changeGender("Non-binary")}>Non-binary</button>
          </div>
        </div>
        <div className="dropdown" id="search-birthmonth">
          <div className="dropdown-label">
            <div className="dropdown-text" id="search-birthmonth-text">Birth Month</div>
            <button className="arrowdown" onClick={()=> dropdownBirthmonth()}>&#x25BE;</button>
          </div>
          <div className="dropdown-list" id="birthmonth-dropdown">
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("January")}>January</button>
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("February")}>February</button>
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("March")}>March</button>
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("April")}>April</button>
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("May")}>May</button>
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("June")}>June</button>
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("July")}>July</button>
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("August")}>August</button>
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("September")}>September</button>
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("October")}>October</button>
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("November")}>November</button>
            <button className="birthmonth-button" onClick={()=> changeBirthmonth("December")}>December</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function dropdownCollege(){
  var dropdown = document.getElementById("college-dropdown");
  dropdown.style.display = "flex";
}

function dropdownGender(){
  var dropdown = document.getElementById("gender-dropdown");
  dropdown.style.display = "flex";
}

function dropdownBirthmonth(){
  var dropdown = document.getElementById("birthmonth-dropdown");
  dropdown.style.display = "flex";
}

function changeCollege(college){
  var dropdown = document.getElementById("college-dropdown");
  dropdown.style.display = "none";
  var text = document.getElementById("search-college-text");
  text.textContent = college;
}

function changeGender(gender){
  var dropdown = document.getElementById("gender-dropdown");
  dropdown.style.display = "none";
  var text = document.getElementById("search-gender-text");
  text.textContent = gender;
}

function changeBirthmonth(birthmonth){
  var dropdown = document.getElementById("birthmonth-dropdown");
  dropdown.style.display = "none";
  var text = document.getElementById("search-birthmonth-text");
  text.textContent = birthmonth;
}

module.exports = Questionnaire;