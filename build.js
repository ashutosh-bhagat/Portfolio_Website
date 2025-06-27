const fs = require("fs");
const path = require("path");

// Directories to create
const outputDirs = ["public", "dist", "_static"];

// Files to copy to output directories
const filesToCopy = ["index.html", "styles.css", "script.js"];

outputDirs.forEach((dirName) => {
  const outputDir = path.join(__dirname, dirName);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Copy files to each directory
  filesToCopy.forEach((file) => {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(outputDir, file);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✓ Copied ${file} to ${dirName}/`);
    } else {
      console.warn(`⚠ File ${file} not found, skipping...`);
    }
  });
});

console.log("\n🎉 Build completed successfully!");
console.log("📁 Files are now in public/, dist/, and _static/ directories");
console.log("🚀 Ready for deployment on any hosting platform!");
console.log(
  "💡 Tip: Try deploying with outputDirectory set to 'public', 'dist', or '_static'"
);
