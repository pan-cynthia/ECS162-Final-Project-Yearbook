const React = require('react');
const ReactDOM = require('react-dom');

function Profile (props) {  
  return (
    <div>
      <button id="profile-box" onClick={()=> redirectDisplay(props.id)}>
        <img id="profile-img" src={props.image}></img>
        <div id="profile-name">{props.fullname}</div>
      </button>
    </div>
  )
}
        
function redirectDisplay(link){
  console.log("this is the new link id ", link);
  window.location.href = "/display/id=?" + link;
}

module.exports = Profile;
