const { exec } = require("child_process");

// Autosave runs git add + commit every 30 minutes
console.log("⏳ Autosave running…");

setInterval(() => {
  const timestamp = new Date().toLocaleString();
  exec(`git add . && git commit -m "Auto commit: ${timestamp}"`, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Autosave error:", err);
      return;
    }
    console.log("✅ Autosave complete:", stdout);
  });
}, 30 * 60 * 1000); // every 30 minutes
