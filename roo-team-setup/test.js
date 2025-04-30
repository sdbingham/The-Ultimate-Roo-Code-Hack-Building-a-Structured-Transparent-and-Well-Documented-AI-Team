// Simple test file to verify GitHub Actions workflow trigger
console.log("Roo Team Setup - GitHub Actions Test");
console.log("Package version:", require('./package.json').version);
console.log("Timestamp:", new Date().toISOString());
console.log("This file is used to trigger the GitHub Actions workflow.");
console.log("");
console.log("Instructions to test the npm package after publishing:");
console.log("1. Run: npx roo-team-setup");
console.log("2. Choose configuration type to set up");
console.log("3. Verify files are created properly");
console.log("");
console.log("Repository: https://github.com/Mnehmos/The-Ultimate-Roo-Code-Hack-Building-a-Structured-Transparent-and-Well-Documented-AI-Team");