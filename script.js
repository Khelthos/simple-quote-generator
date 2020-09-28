const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const modal = document.getElementById("myModal");
const closeModal = document.getElementById("close-modal");
const errorModal = document.getElementById("error-modal");
let apiQuotes = [];
let counterError = 0;
const MAXERROR = 20;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//Show neq quote
function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // if Author blank, add 'Unknonwn'
  if (quote.author === "" || !quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Reduce font size for long quotes
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set quote and hide loading
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}
// Get quote from API
async function getQuote() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    counterError++;
    if (counterError === MAXERROR) {
      errorModal.textContent = error;
      modal.style.display = "block";
      return 0;
    }
    getQuote();
  }
}

// Tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet/?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
// Modal Handlers
closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// On Load
getQuote();
