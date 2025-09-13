const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");
const shareBtn = document.getElementById("shareBtn");

let fortunes = [];
let spinning = false;

// Load fortunes from JSON
fetch("fortunes.json")
  .then((res) => res.json())
  .then((data) => {
    fortunes = data.fortunes;
  });

// Spin button
spinBtn.addEventListener("click", () => {
  if (spinning || fortunes.length === 0) return;
  spinning = true;
  
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  const slice = 360 / fortunes.length;
  const deg = 3600 + randomIndex * slice + slice / 2;
  
  wheel.style.transform = rotate(${deg}deg);
  
  setTimeout(() => {
    result.innerText = 🔮 ${fortunes[randomIndex]};
    spinning = false;
  }, 4000);
});

// Share button
shareBtn.addEventListener("click", () => {
  const text = result.innerText || "Spin your Orange of Fortune! 🍊";
  const url = https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}%20%23Sign%20%23orangefamily;
  window.open(url, "_blank");
});

// Donation system
const donateBtn = document.getElementById("donateBtn");
const orangeInput = document.getElementById("orangeInput");
const orangeCount = document.getElementById("orangeCount");
const donationMessage = document.getElementById("donationMessage");

let donatedToday = localStorage.getItem("donatedToday") === new Date().toDateString();
let totalOranges = parseInt(localStorage.getItem("orangeCount")) || 0;

orangeCount.innerText = totalOranges;

donateBtn.addEventListener("click", () => {
  const amount = parseInt(orangeInput.value);
  
  if (donatedToday) {
    donationMessage.innerText = "🍊 You already donated today! Come back tomorrow ❤️";
    return;
  }
  
  if (isNaN(amount) || amount < 1 || amount > 200) {
    donationMessage.innerText = "⚠️ Please enter a number between 1 and 200.";
    return;
  }
  
  totalOranges += amount;
  localStorage.setItem("orangeCount", totalOranges);
  localStorage.setItem("donatedToday", new Date().toDateString());
  
  orangeCount.innerText = totalOranges;
  donationMessage.innerText =🎉 Thanks for donating ${amount} 🍊!`;
});

const fortuneHistory = document.getElementById("fortuneHistory");

// Load saved history on page load
let savedHistory = JSON.parse(localStorage.getItem("fortuneHistory")) || [];
renderHistory();

// Update history after spin
function addToHistory(fortune) {
  const entry = ${new Date().toLocaleDateString()} - ${fortune};
  savedHistory.push(entry);
  localStorage.setItem("fortuneHistory", JSON.stringify(savedHistory));
  renderHistory();
}

// Render history list
function renderHistory() {
  fortuneHistory.innerHTML = "";
  savedHistory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    fortuneHistory.appendChild(li);
  });
}

// After spin completes, save fortune
setTimeout(() => {
  const fortuneText = fortunes[randomIndex];
  result.innerText =🔮 ${fortuneText}`;
  addToHistory(fortuneText);
  spinning = false;
}, 4000);
