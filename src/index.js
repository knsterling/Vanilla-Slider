// GET OUR ELEMENTS
const slider = document.querySelector(".slider-container"),
  slides = Array.from(document.querySelectorAll(".slide"));

// SET UP OUR STATE
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0;

// ADD OUR EVENT LISTENERS
slides.forEach((slide, index) => {
  const slideImage = slide.querySelector("img");

  // DISABLE DEFAULT IMAGE DRAG
  slideImage.addEventListener("dragstart", (e) => e.preventDefault());

  // TOUCH EVENTS
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touched", touchEnd);
  slide.addEventListener("touchmove", touchMove);

  // MOUSE EVENTS
  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mousemove", touchMove);
  slide.addEventListener("mouseleave", touchEnd);
});

// MAKE RESPONSIVE TO VIEWPORT CHANGES
window.addEventListener("resize", setTextPositionByIndex);

// PREVENT MENU POPUPS ON LONG PRESS
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}
// USE A HOF SO WE HAVE INDEX IN A CLOSURE
function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add("grabbing");
  };
}
function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}
function touchEnd() {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  // IF MOVED ENOUGH NEGATIVE THEN SNAP TO NEXT SLIDE IF THERE IS ONE
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
  // IF MOVED ENOUGH POSITIVE THEN SNAP TO PREVIOUS SLIDE IF THERE IS ONE
  if (movedBy < -100 && currentIndex > 0) currentIndex -= 1;

  setTextPositionByIndex();

  slider.classList.remove("grabbing");
}
function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}
function setTextPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

// CREATE AND OBJECT FOR HOTEL THAT CONTAINS 50 ROOMS, 25 RESIDENTS, an array of names for the residents,number of parking spaces.

// const hotel = {
//   rooms: 50,
//   kingsize: 25,
//   residents: 100,
//   resNames: ["bob", "joe", "lou", "jill", "gill", "jane", "skiiiup"]
// };
// hotel.resNames[7]

// hotel.residents[]
