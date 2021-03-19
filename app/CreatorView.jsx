const React = require("react");
const ReactDOM = require("react-dom");
const Questionnaire = require("./Questionnaire");
const UploadButton = require("./UploadButton");
const Portrait = require("./Portrait");

const CreatorView = function() {
  return (
    <div>
      <h1 className="yellow-header">
        <div className="title">
          <img
          id="headerimg"
          src="https://cdn.glitch.com/aeae367b-7363-41c6-8689-39c1d6ebe387%2FGraduation%20Cap%20and%20Diploma.webp?v=1590440700526"
          ></img>
          <p>UC Davis Class of 2020 Yearbook</p>
        </div>
        <button className="logout-button" onClick={() => redirectLogout()}>Logout</button>
      </h1>
      <div id="creator-body">
        <div id="leftside">
          <div id="image-upload">
            <Portrait></Portrait>
          </div>
          <textarea id ="description" maxLength="150" defaultValue="Description of Yourself (150 Characters Max)"></textarea>
        </div>
        <div className="search-questionnaire">
          <Questionnaire>Questionnaire</Questionnaire>
          <button
            id="creator-submit-button"
            onClick={() => redirectToFinalView()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

//add person to database
function sendPerson() {
  let stuFirstName = document.getElementById("type-first-name").textContent;
  let stuLastName = document.getElementById("type-last-name").textContent;
  console.log(stuFirstName);
  console.log(stuLastName);
  let stuMajor = document.getElementById("type-major").textContent;
  console.log(stuMajor);
  let stuCollege = document.getElementById("search-college-text").textContent;
  let stuGender = document.getElementById("search-gender-text").textContent;
  let stuBirth = document.getElementById("search-birthmonth-text").textContent;
  let img = document.getElementById("uploaded-image");
  if (img == null) {
    console.log("image does not exist");
    img = document.getElementById("default-image");
  }
  let des = document.getElementById("description").value;
  // Build JSON Object
  let data = {
    firstname: stuFirstName,
    lastname: stuLastName,
    major: stuMajor,
    college: stuCollege,
    gender: stuGender,
    birthmonth: stuBirth,
    image: img.src,
    description: des
  };
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/user/newItem");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("load", function() {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
    } else {
      console.log(xhr.responseText);
    }
  });
  xhr.send(JSON.stringify(data));
}

function redirectToFinalView() {
  console.log("submit button clicked");
  //enter info into database
  sendPerson();
  window.location.href = "/user/finalview";
  
}

function redirectLogout() {
  console.log("logout button clicked");
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/user/logoff");
  xhr.onloadend = function(e) {
    window.location.href = "/";
    console.log("got",xhr.responseText);
  }
  xhr.send();
}

module.exports = CreatorView;
