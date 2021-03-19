const React = require('react');
const UploadButton = require("./UploadButton")

const Portrait = function() {
  const [image, updateStateVarImage] = React.useState("");
  
  function updateMe (newPortrait) {
    updateStateVarImage(newPortrait);
  }
  
  let contents = <UploadButton parentUpdate={updateMe}>Upload Image</UploadButton>
      contents = <UploadButton parentUpdate={updateMe}><img id="default-image" src="http://ecs162.org:3000/images/cypan/graduate-512.png"></img></UploadButton>
  if (image) {
    contents = <UploadButton parentUpdate={updateMe}><img id="uploaded-image" src={image}/></UploadButton>
  }
  
  return (
    <main>
      <div id="portraitBox">
        {contents}
      </div>
    </main>
  );
}

module.exports = Portrait;