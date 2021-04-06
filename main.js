const track = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const dotsNav = document.querySelector(".slider_nav");
const dots = Array.from(dotsNav.children);
const auto = false;
const intervalTime = 5000;
let slideInterval;

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange slides next to one another
// slides[0].style.left = 0;
// slides[1].style.left = slideWidth + "px";
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

// Move To Slide
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current");
  targetSlide.classList.add("current");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current");
  targetDot.classList.add("current");
};

// When clicking on next button
const nextSlide = () => {
  // Get current class
  const current = track.querySelector(".current");
  const next = current.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current");
  const nextDot = currentDot.nextElementSibling;
  // Remove current class
  if (next) {
    moveToSlide(track, current, next);
    updateDots(currentDot, nextDot);
  } else {
    // Add current to start
  }

  // setTimeout(() => current.classList.remove("current"));
};

next.addEventListener("click", (e) => {
  nextSlide();
});

// When clicking on prev button
const prevSlide = () => {
  // Get current class
  const current = track.querySelector(".current");
  const prev = current.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current");
  const prevDot = currentDot.previousElementSibling;
  // Remove current class
  if (prev) {
    moveToSlide(track, current, prev);
    updateDots(currentDot, prevDot);
  } else {
    // Add current to start
  }

  // setTimeout(() => current.classList.remove("current"));
};

prev.addEventListener("click", (e) => {
  prevSlide();
});

// Button events
dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const current = document.querySelector(".current");
  const currentDot = dotsNav.querySelector(".current");
  const targetIndex = dots.findIndex((dot) => dot == targetDot);
  const target = slides[targetIndex];

  moveToSlide(track, current, target);
  updateDots(currentDot, targetDot);
});

// Mobile Slider JS
const slider = document.querySelector(".slider-container"),
  mobileSlides = Array.from(document.querySelectorAll("section"));
let isDragging = false,
  startPosition = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

mobileSlides.forEach((slide, index) => {
  // Touch Events
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);

  // Mouse Events
  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mouseleave", touchEnd);
  slide.addEventListener("mousemove", touchMove);
});

window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    console.log(startPos);
    isDragging = true;

    animationID = requestAnimationFrame(animation);
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < mobileSlides.length - 1) {
    currentIndex += 1;
  }

  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  }

  setPositionByIndex();
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}
