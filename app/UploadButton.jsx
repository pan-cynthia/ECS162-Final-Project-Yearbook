const React = require('react');

const UploadButton = function(props) {
  let updateMe = props.parentUpdate;
  let fileInput = React.createRef();
  
  function uploadFile(e) {
    const selectedFile = fileInput.current.files[0];
    const formData = new FormData();
    formData.append('newImage',selectedFile, selectedFile.name);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);
    xhr.onloadend = function(e) {
        console.log("got",xhr.responseText);
        sendGetRequest(selectedFile.name);
    }
    xhr.send(formData);
  }
  
  function sendGetRequest(filename) {
    let xhr = new XMLHttpRequest;
    xhr.open("GET","/sendUploadToAPI");
    xhr.addEventListener("load", function() {
      if (xhr.status == 200) {  // success
        console.log("sent to ecs162.org");
      }
      updateMe("http://ecs162.org:3000/images/cypan/" + filename);
    });
    xhr.send();
  }
  
  return (
    <div>
      <label>
          {props.children}
          <input type="file" onChange={uploadFile} ref={fileInput} id="fileChooser" accept="image/png, .jpeg, .jpg, image/gif" />
      </label>
    </div>
  );
}

module.exports = UploadButton;