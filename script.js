
"use strict";

// The three original photographs
const photos = {
    chairs: "chairs.jpg",
    sushi: "sushi.jpg",
    chalk: "chalk.jpg"
};

// Two stories using the same photographs
// but in different sequences
const stories = [
  {
    title: "A New Beginning",
    description:
      "Sometimes the best memories begin with something as simple as sitting together.",

    scenes: [
      {
        image: photos.chairs,
        alt: "Two empty chairs in a sunny garden",
        chapter: "BEGINNING",
        title: "An Invitation",
        caption:
          "Two empty chairs sit side by side, waiting for a conversation that could become the start of something special."
      },
      {
        image: photos.sushi,
        alt: "A platter of assorted sushi",
        chapter: "MIDDLE",
        title: "Getting to Know Each Other",
        caption:
          "What begins as a simple invitation turns into a meal filled with conversation, laughter, and the discovery of a new friendship."
      },
      {
        image: photos.chalk,
        alt: "Colourful chalk drawings on outdoor pavement",
        chapter: "END",
        title: "A Memory Made",
        caption:
          "By the end of the day, the two friends leave colourful drawings behind. What was once an ordinary afternoon has become a memory worth keeping."
      }
    ]
  },

  {
    title: "The Last Goodbye",
    description:
      "Not every friendship lasts forever, but the memories can remain.",

    scenes: [
      {
        image: photos.chalk,
        alt: "Colourful chalk drawings on outdoor pavement",
        chapter: "BEGINNING",
        title: "When Things Were Different",
        caption:
          "The fading chalk drawings are reminders of a time when two friends spent their afternoons laughing and creating memories together."
      },
      {
        image: photos.sushi,
        alt: "A platter of assorted sushi",
        chapter: "MIDDLE",
        title: "One Last Meal",
        caption:
          "Knowing that life is taking them in different directions, the two friends meet for one final meal, remembering everything they have shared."
      },
      {
        image: photos.chairs,
        alt: "Two empty chairs in a sunny garden",
        chapter: "END",
        title: "The Empty Seats",
        caption:
          "The chairs where they once sat together now remain empty. Their friendship has come to an end, but the memories of their time together have not disappeared."
      }
    ]
  }
];

// Variables that track the current story and image
let currentStory = 0;
let currentImage = 0;

// Getting elements from the HTML
const storyTitle = document.getElementById("story-title");
const storyDescription = document.getElementById("story-description");
const storyImage = document.getElementById("story-image");
const chapter = document.getElementById("chapter");
const photoTitle = document.getElementById("photo-title");
const caption = document.getElementById("caption");
const counter = document.getElementById("counter");

const story1Button = document.getElementById("story1");
const story2Button = document.getElementById("story2");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const dots = document.querySelectorAll(".dot");

// Function that displays the current image and text
function updateDisplay() {
  const story = stories[currentStory];
  const scene = story.scenes[currentImage];

  // Change the story heading
  storyTitle.textContent = story.title;
  storyDescription.textContent = story.description;

  // Change the photograph
  storyImage.src = scene.image;
  storyImage.alt = scene.alt;

  // Change the narrative
  chapter.textContent = scene.chapter;
  photoTitle.textContent = scene.title;
  caption.textContent = scene.caption;

  // Update the image counter
  counter.textContent =
    `${currentImage + 1} / ${story.scenes.length}`;

  // Highlight the selected story button
  story1Button.classList.toggle(
    "active", currentStory === 0
  );

  story2Button.classList.toggle(
    "active", currentStory === 1
  );

  story1Button.setAttribute(
    "aria-pressed", String(currentStory === 0)
  );

  story2Button.setAttribute(
    "aria-pressed", String(currentStory === 1)
  );

  // Update progress dots
  dots.forEach(function(dot, index) {
    dot.classList.toggle(
      "active", index === currentImage
    );
  });

  // Disable navigation at the beginning or end
  previousButton.disabled = currentImage === 0;

  nextButton.disabled =
    currentImage === story.scenes.length - 1;
}

// Function to switch between the two stories
function changeStory(storyNumber) {
  currentStory = storyNumber;
  currentImage = 0;
  updateDisplay();
}

// Function to move to the next photograph
function nextImage() {
  const totalImages = stories[currentStory].scenes.length;

  if (currentImage < totalImages - 1) {
    currentImage++;
    updateDisplay();
  }
}

// Function to move to the previous photograph
function previousImage() {
  if (currentImage > 0) {
    currentImage--;
    updateDisplay();
  }
}

// Event listeners for selecting a story
story1Button.addEventListener("click", function() {
  changeStory(0);
});

story2Button.addEventListener("click", function() {
  changeStory(1);
});

// Event listeners for navigating photographs
nextButton.addEventListener("click", nextImage);
previousButton.addEventListener("click", previousImage);

// Clicking the photograph also advances the story
storyImage.addEventListener("click", function() {
  nextImage();
});

// Keyboard arrow navigation
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    nextImage();
  }

  if (event.key === "ArrowLeft") {
    previousImage();
  }
});

// Display the first photograph when the page loads
updateDisplay();
