const React = require('react');

const slideshowImages = ['http://ecs162.org:3000/images/cypan/garymay.jpg',
  'http://ecs162.org:3000/images/cypan/Cow%20Sticking%20Out%20Tongue.jpg',
  'http://ecs162.org:3000/images/cypan/Egghead_1.jpg',
  'http://ecs162.org:3000/images/cypan/pompstreamerscbs.jpg'];

let currimg = 0;

function Slideshow (props) {
  const [index, setIndex] = React.useState(0);

  return (
      <div id="slideshow">
        <div className="image-number">{index + 1}/4</div>
        <img id="image" src= {slideshowImages[index]}></img>
        <div>
          <button className="prev" onClick={()=>setIndex(prevImg(index))}>&lt;</button>
          <button className="next" onClick={()=>setIndex(nextImg(index))}>&gt;</button>
        </div>
      </div>
  );
}

function prevImg(index) {
  console.log("previous button clicked");
  if (index == 0) {
    index = 3;
  } else {
    index = index - 1;
  }
  return index;
}

function nextImg(index) {
  console.log("next button clicked");
  if (index == 3) {
    index = 0;
  } else {
    index = index + 1;
  }
  return index;
}

module.exports = Slideshow;