let activeFlag = document.getElementById('activeFlag');
const flagOptions = document.getElementById("flagOptions");
const otherLangs = ["english", "chinese", "hindi", "italian", "german"];

chrome.storage.sync.get("language", ({ language }) => {
  activeFlag.style.backgroundImage = language;
});


function handleFlagClick(e) {
  const currentFlag = e.target.parentElement.querySelector('.currentFlag');

  if(currentFlag && currentFlag !== event.target) {
    currentFlag.classList.remove(".currentFlag")
  }

  const language = e.target.dataset.language
  e.target.classList.add(".currentFlag");

  chrome.storage.sync.set({ language });
  activeFlag.style.backgroundImage = language;
}

function constructFlags(otherLangs) {
  chrome.storage.sync.get("language", (data) => {
    const currentLang = data.language;

    for (let lang of otherLangs) {
      const button = document.createElement("button");
      const langURL = `url("flags/${lang}.png")`

      button.dataset.language = langURL;
      button.style.backgroundImage = langURL;

      if(lang === currentLang) {
        button.classList.add(".currentFlag");
      }

      button.addEventListener("click", handleFlagClick)
      flagOptions.appendChild(button);
    }
  })
}

constructFlags(otherLangs);
