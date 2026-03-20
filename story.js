const state = {
  node: "start"
};

const story = {
  start: {
    text: "You wake up in a dark room. The air smells damp.",
	image: "images/room1.png",
    choices: [
      { text: "Stand up", next: "stand" },
      { text: "Stay on the floor", next: "floor" }
    ]
  },

  stand: {
    text: "You stand slowly. Your legs shake. The room is empty and there is nothing on the cold cobbled floor. You can see a door heading to som kind of hallway and a small weird window",
    choices: [
      { text: "Move forward", next: "hallway" },
	  { text: "Look out of the window", next: "window1" },
      { text: "Sit back down", next: "floor" }
    ]
  },

  floor: {
    text: "You remain still. Time passes.",
    choices: [
      { text: "Try again", next: "start" }
    ]
  },

  window1: {
    text: "It feels out of place—there shouldn’t be a window here. Everything suggests you’re deep underground, sealed away from the world above. And yet… you’re not. Beyond the glass lies vast darkness. Far below, jagged terrain hints at a cliff edge, dropping into a dense, black forest. No lights. No stars. Nothing to guide you. Only the dark.",
	image: "images/1window.png",
    choices: [
      { text: "Knock on the window", next: "knock1" },
      { text: "Sit back down", next: "start" }
    ]
  },

  knock1: {
    text: "You knocked on the window, but nothig has happend. You see dark and forrest. You have no idea how did you get here.",
    choices: [
      { text: "Check pockets", next: "start" },
      { text: "Sit back down", next: "start" }
    ]
  },
 
  hallway: {
    text: "A hallway stretches into darkness.",
    choices: []
  }
};

const storyText = document.getElementById("story-text");
const choicesDiv = document.getElementById("choices");
const storyImage = document.getElementById("story-image");
const game = document.getElementById("game");

function render() {
  const node = story[state.node];

  // FADE OUT
  game.classList.add("fade-out");

  setTimeout(() => {
    // UPDATE CONTENT AFTER FADE OUT

    typeText(node.text, storyText);

    // IMAGE
    storyImage.innerHTML = "";
    if (node.image) {
      const img = document.createElement("img");
      img.src = node.image;
      storyImage.appendChild(img);
    }

    // CHOICES
    choicesDiv.innerHTML = "";
    node.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.onclick = () => {
        state.node = choice.next;
        render();
      };
      choicesDiv.appendChild(btn);
    });

    // FADE BACK IN
    game.classList.remove("fade-out");

  }, 500); // 👈 must match CSS duration
}


let typingTimeout;

function typeText(text, element, speed = 10) {	//smaller the number faster the typing
  clearTimeout(typingTimeout); // cancel previous typing
  element.textContent = "";

  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      typingTimeout = setTimeout(type, speed);
    }
  }

  type();
}

render();
