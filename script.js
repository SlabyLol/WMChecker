const matches = [
  {
    home: "Germany",
    away: "France",
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    live: true,
    goals: [
      "14' Germany",
      "31' France",
      "67' Germany"
    ]
  },
  {
    home: "Brazil",
    away: "Spain",
    homeScore: 0,
    awayScore: 0,
    minute: 0,
    live: false
  }
];

const upcoming = [
  { home: "England", away: "Netherlands", time: "20:00 UTC" },
  { home: "Argentina", away: "Portugal", time: "23:00 UTC" }
];

const finished = [
  { home: "Italy", away: "Belgium", score: "2 - 0" }
];

function render() {
  const liveDiv = document.getElementById("live-matches");
  const upDiv = document.getElementById("upcoming");
  const finDiv = document.getElementById("finished");

  liveDiv.innerHTML = "";
  upDiv.innerHTML = "";
  finDiv.innerHTML = "";

  // LIVE
  matches.filter(m => m.live).forEach(m => {
    const div = document.createElement("div");
    div.className = "match live";

    div.innerHTML = `
      <div><b>${m.home} ${m.homeScore} - ${m.awayScore} ${m.away}</b></div>
      <div class="small">${m.minute}'</div>
      <div class="score">LIVE</div>
      <div class="goal">⚽ GOAL from ${lastGoalCountry(m)}</div>
      <div class="small">
        ${m.goals ? m.goals.join("<br>") : ""}
      </div>
    `;

    liveDiv.appendChild(div);
  });

  // UPCOMING
  upcoming.forEach(m => {
    const div = document.createElement("div");
    div.className = "match";

    div.innerHTML = `
      <b>${m.home} vs ${m.away}</b>
      <div class="small">${m.time}</div>
    `;

    upDiv.appendChild(div);
  });

  // FINISHED
  finished.forEach(m => {
    const div = document.createElement("div");
    div.className = "match";

    div.innerHTML = `
      <b>${m.home} ${m.score} ${m.away}</b>
      <div class="small">FT</div>
    `;

    finDiv.appendChild(div);
  });
}

function lastGoalCountry(match) {
  if (!match.goals || match.goals.length === 0) return "Unknown";
  const last = match.goals[match.goals.length - 1];
  return last.split(" ").slice(-1)[0];
}

// SIMULATE LIVE UPDATES
function simulateLive() {
  matches.forEach(m => {
    if (m.live) {
      m.minute += 1;

      // random goal chance
      if (Math.random() < 0.2) {
        const team = Math.random() > 0.5 ? m.home : m.away;

        if (team === m.home) m.homeScore++;
        else m.awayScore++;

        m.goals.push(`${m.minute}' ${team}`);
      }
    }
  });

  render();
}

render();
setInterval(simulateLive, 5000);
