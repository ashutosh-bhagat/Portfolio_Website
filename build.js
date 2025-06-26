const fs = require("fs");
const path = require("path");

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Files to copy to public directory
const filesToCopy = ["index.html", "styles.css", "script.js"];

// Copy files
filesToCopy.forEach((file) => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(publicDir, file);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${file} to public/`);
  } else {
    console.warn(`⚠ File ${file} not found, skipping...`);
  }
});

console.log("\n🎉 Build completed successfully!");
console.log("📁 All files are now in the public/ directory");
