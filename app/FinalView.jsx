const React = require("react");
const ReactDOM = require("react-dom");
const Portrait = require("./Portrait");
const InfoView = require("./InfoView");

function FinalView() {
  console.log("final view activated");
  return (
    <div>
      <h1 className="blue-header">
        <div className="title">
          <img
            id="headerimg"
            src="https://cdn.glitch.com/aeae367b-7363-41c6-8689-39c1d6ebe387%2FGraduation%20Cap%20and%20Diploma.webp?v=1590440700526"
          ></img>
          <p>UC Davis Class of 2020 Yearbook</p>
        </div>
        <button className ="logout-button" onClick={() => redirectLogout()}>logout</button>
      </h1>
      <div id="creator-body">
        <div id="leftside">
          <img id="portrait-image2" src="http://ecs162.org:3000/images/cypan/graduate-512.png">
          </img>
        </div>
        <div className="search-questionnaire">
           <InfoView></InfoView>
          <div id="description2">Description</div>
        </div>
      </div>
    </div>
    );
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

let url = window.location.href;
console.log("window.location.href = ", window.location.href);
if (url == "https://sparkly-languid-vermicelli.glitch.me/user/finalview") {
  showProfile();
} else {
  console.log("url is not user/finalview");
}
  
function showProfile() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/user/newItem', true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onloadend = function(e) {
    console.log(xhr.responseText);
    console.log("displayed");

    let data = JSON.parse(xhr.responseText);
    console.log("json parsed");

    let image = document.getElementById("portrait-image2");
    image.src = data.image;
    let description = document.getElementById("description2");
    description.textContent = data.description;
    let name = document.getElementById("name-search-bar2");
    name.textContent = data.fullname;
    let major = document.getElementById("major-search-bar2");
    major.textContent = data.major;
    let college = document.getElementById("search-college-text2");
    college.textContent = data.college;
    let gender = document.getElementById("search-gender-text2");
    gender.textContent = data.gender;
    let birth = document.getElementById("search-birthmonth-text2");
    birth.innerText = data.birthmonth;
  }
  xhr.send(null);
}
  
module.exports = FinalView;