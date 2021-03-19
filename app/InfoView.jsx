const React = require('react');

function InfoView() {
  console.log("info view has been activated");
  return (
    <div id="info-view-container">
      <div id="search-material2">
        <div className="search-bar2">
            <div id="name-search-bar2">Name</div>
        </div>
        <div className="search-bar2">
          <div id="major-search-bar2">Major</div>
        </div>
        <div className="dropdown2">
          <div className="dropdown-label2">
            <div className="dropdown-text2" id="search-college-text2">College</div>
          </div>
        </div>
        <div className="dropdown2" id="search-gender2">
          <div className="dropdown-label2">
            <div className="dropdown-text2" id="search-gender-text2">Gender</div>
          </div>
        </div>
        <div className="dropdown2" id="search-birthmonth2">
          <div className="dropdown-label2">
            <div className="dropdown-text2" id="search-birthmonth-text2">Birth Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = InfoView;