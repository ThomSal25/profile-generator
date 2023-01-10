let personState = [];

// fetch api url
async function loadContacts(num) {
  try {
    const response = await fetch(
      `https://dummy-apis.netlify.app/api/contact-suggestions?count=${num}`
    );
    const jsonData = await response.json();
    personState = jsonData;
  } catch (error) {}
}

// json Daten rendern + HTML nodes erstellen

function createContactHtmlNode(userData) {
  const listElement = document.createElement("li");

  const backgroundImage = document.createElement("img");
  backgroundImage.src = userData.backgroundImage;
  backgroundImage.classList.add("back");

  const closeSvg = document.createElement("img");
  closeSvg.src = "pic/x-circle-fill.svg";
  closeSvg.addEventListener("click", removeProfile);

  const userImgElement = document.createElement("img");
  userImgElement.src = userData.picture;
  userImgElement.classList.add("profile");

  const fullnameElement = document.createElement("h2");
  fullnameElement.innerText =
    userData.name.title + " " + userData.name.first + " " + userData.name.last;

  const jobTitel = document.createElement("p");
  jobTitel.innerText = userData.title;

  const mutualConnectionsElement = document.createElement("p");
  mutualConnectionsElement.innerText =
    userData.mutualConnections + " mutual connections";

  const connectBtnElement = document.createElement("button");
  connectBtnElement.innerText = "Connect";

  connectBtnElement.addEventListener("click", function () {
    connectBtnElement.innerText = "Pending";
  });

  listElement.append(
    backgroundImage,
    closeSvg,
    userImgElement,
    fullnameElement,
    jobTitel,
    mutualConnectionsElement,
    connectBtnElement
  );

  return listElement;
}

function render() {
  for (userData of personState) {
    const li = createContactHtmlNode(userData);
    document.querySelector(".contact-list").appendChild(li);
  }
}

function removeProfile() {
  this.closest("li").remove();
  init(1)
}

async function init(num) {
  await loadContacts(num);
  render();
}

init(8);
