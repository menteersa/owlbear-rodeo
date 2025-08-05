const diceFaces = {
  ability: [[""], ["success"], ["advantage"], ["success", "advantage"], ["success", "success"], ["advantage", "advantage"]],
  proficiency: [["success"], ["success", "success"], ["success", "success"], ["advantage"], ["advantage"], ["success", "advantage"], ["advantage", "advantage"], ["triumph"]],
  boost: [[""], ["success"], ["advantage"], ["advantage", "advantage"]],
  difficulty: [[""], ["failure"], ["threat"], ["failure", "threat"], ["failure", "failure"], ["threat", "threat"]],
  challenge: [["failure"], ["failure", "failure"], ["threat"], ["threat", "threat"], ["failure", "threat"], ["despair"]],
  setback: [[""], ["failure"], ["threat"]],
};

function rollDie(type) {
  const faces = diceFaces[type];
  const result = faces[Math.floor(Math.random() * faces.length)];
  return result;
}

function rollDice() {
  const counts = ["ability", "proficiency", "boost", "difficulty", "challenge", "setback"]
    .reduce((acc, die) => {
      acc[die] = parseInt(document.getElementById(die).value, 10) || 0;
      return acc;
    }, {});

  const results = [];

  for (let type in counts) {
    for (let i = 0; i < counts[type]; i++) {
      results.push(...rollDie(type));
    }
  }

  const tally = results.reduce((acc, sym) => {
    acc[sym] = (acc[sym] || 0) + 1;
    return acc;
  }, {});

  const net = {
    success: (tally["success"] || 0) - (tally["failure"] || 0),
    advantage: (tally["advantage"] || 0) - (tally["threat"] || 0),
    triumph: tally["triumph"] || 0,
    despair: tally["despair"] || 0,
  };

  document.getElementById("results").innerHTML = `
    <h2>Results</h2>
    <p>Successes: ${net.success}</p>
    <p>Advantages: ${net.advantage}</p>
    <p>Triumphs: ${net.triumph}</p>
    <p>Despairs: ${net.despair}</p>
    <p>Raw Symbols: ${results.join(", ")}</p>
  `;
}