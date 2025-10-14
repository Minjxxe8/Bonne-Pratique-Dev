const avatar = require("./routes/avatar.js");
const gradient = require("./routes/gradient.js");

function test(name, condition, passed, failed) {
    if (condition) {
        console.log(`  PASS: ${name}`);
        passed[0]++;
    } else {
        console.log(`  FAIL: ${name}`);
        failed[0]++;
    }
}

let passed = [0];
let failed = [0];

console.log("====================");
console.log("Running Tests");
console.log("====================\n");

console.log("Testing getInitials:");
try {
    test("camelCase (johnDoe -> jD)", avatar.getInitials("johnDoe") === "jD", passed, failed);
    test("lowercase (test -> te)", avatar.getInitials("test") === "te", passed, failed);
    test("PascalCase (AliceSmith -> AS)", avatar.getInitials("AliceSmith") === "AS", passed, failed);
} catch (e) {
    console.log(`  ERROR: ${e.message}`);
    failed[0] += 3;
}

console.log("\nTesting generateRandomColor:");
try {
    const color = avatar.generateRandomColor("test");
    test("returns object with r,g,b", color && typeof color.r === "number", passed, failed);
    test("RGB values in range 0-255",
        color.r >= 0 && color.r <= 255 &&
        color.g >= 0 && color.g <= 255 &&
        color.b >= 0 && color.b <= 255,
        passed, failed
    );
} catch (e) {
    console.log(`  ERROR: ${e.message}`);
    failed[0] += 2;
}

console.log("\nTesting hexToRgb:");
try {
    const red = gradient.hexToRgb("FF0000");
    test("converts red (FF0000)", red.r === 255 && red.g === 0 && red.b === 0, passed, failed);

    const green = gradient.hexToRgb("00FF00");
    test("converts green (00FF00)", green.r === 0 && green.g === 255 && green.b === 0, passed, failed);

    const blue = gradient.hexToRgb("0000FF");
    test("converts blue (0000FF)", blue.r === 0 && blue.g === 0 && blue.b === 255, passed, failed);

    const white = gradient.hexToRgb("FFFFFF");
    test("converts white (FFFFFF)", white.r === 255 && white.g === 255 && white.b === 255, passed, failed);
} catch (e) {
    console.log(`  ERROR: ${e.message}`);
    failed[0] += 4;
}

console.log("\n====================");
console.log("Test Summary");
console.log("====================");
console.log(`Total: ${passed[0] + failed[0]}`);
console.log(`Passed: ${passed[0]}`);
console.log(`Failed: ${failed[0]}`);

if (failed[0] === 0) {
    console.log("\nAll tests passed!");
} else {
    console.log(`\n${failed[0]} test(s) failed.`);
}
