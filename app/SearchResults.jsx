const React = require('react');
const ReactDOM = require('react-dom');
const Profile = require('./Profile');
const SearchPopup = require("./SearchPopup");

/*
let searchresultsurl = window.location.search;
if (searchresultsurl == "") {
  console.log("url was empty");
} else {
  SearchResults();
}
let xhr = new XMLHttpRequest();
  xhr.open("GET", '/getsearchresults'+searchresultsurl, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onloadend = function(e) {
    console.log(xhr.responseText);
    console.log("displayed");

  let data = JSON.parse(xhr.responseText);
    console.log(data);
    console.log("json parsed");
  }
  xhr.send(null); 
*/
/* the main page for the index route of this app */
function SearchResults(props) {
  	const [data, setData] = React.useState(null);
    const [profile, profileData] = React.useState([]);
	  React.useEffect(() => {
		// This function will only run once, right at the very beginning
		fetch('/getsearchresults' + window.location.search).then(resp => resp.json())
		.then(data => {
				// Maybe you want to do some extra stuff when the data gets here
        console.log("THIS IS THE DATA",data);
				setData(data);
        let templist = []
        for(var i = 0; i < data.length; i++) {
          templist.push(
          <Profile fullname={data[i].fullname} 
          image={data[i].image}
          id ={data[i].id}>
          </Profile>
            );
        }
      profileData(templist);
		  })
	  }, [])

	if (!data) return(
    <div>
      <h1 className="blue-header">
        <div className="title">
          <img id="headerimg" src="https://cdn.glitch.com/aeae367b-7363-41c6-8689-39c1d6ebe387%2FGraduation%20Cap%20and%20Diploma.webp?v=1590440700526"></img>
          <p>UC Davis Class of 2020 Yearbook</p>
        </div>
        <SearchPopup classname="logout-button"></SearchPopup>
      </h1>
      <p id="loading">loading...</p>
    </div>
  );
	// The data has arrived, and you can do what you want with it
	return (
    <div>
      <h1 className="blue-header">
        <div className="title">
          <img id="headerimg" src="https://cdn.glitch.com/aeae367b-7363-41c6-8689-39c1d6ebe387%2FGraduation%20Cap%20and%20Diploma.webp?v=1590440700526"></img>
          <p>UC Davis Class of 2020 Yearbook</p>
        </div>
        <SearchPopup classname="logout-button"></SearchPopup>
      </h1>
      <div id="profileresults">{profile}</div>
    </div>
  );
}

module.exports = SearchResults;