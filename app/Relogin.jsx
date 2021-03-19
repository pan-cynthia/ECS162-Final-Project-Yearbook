const React = require('react');
const ReactDOM = require('react-dom');
const Slideshow = require('./Slideshow');
const SearchPopup = require('./SearchPopup');
const Confetti = require('react-confetti');

const Relogin = function() {
  return (
    <div>
      <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={2000}
      recycle={false}
      colors={["#B3C1D1", "#E2BD35", "#355B85", "FFFFFF"]}
    />
      <h1 className="yellow-header">
        <div className="title">
          <img id="headerimg" src="https://cdn.glitch.com/aeae367b-7363-41c6-8689-39c1d6ebe387%2FGraduation%20Cap%20and%20Diploma.webp?v=1590440700526"></img>
          <p>UC Davis Class of 2020 Yearbook</p>
        </div>
      </h1>
      <div id="mainbody">
        <div id="slideshow-container">
          <div id="slideshow-background">
            <Slideshow></Slideshow>
          </div>
        </div>
        
        <div id="loginsearch">
          <div id="congrats-msg">
            <p>Congratulations Class of 2020!</p>
          </div>
          <div>
            <a href="auth/google">
              <button className="login-search-button"><img id="googleimg"src="https://cdn.glitch.com/aeae367b-7363-41c6-8689-39c1d6ebe387%2Fgoogle.png?v=1590518515935"></img>Login with Your UC Davis Email</button>
            </a>
            <SearchPopup classname="login-search-button"></SearchPopup>
          </div>
        </div> 
      </div>
    </div>
  );
}

module.exports = Relogin;