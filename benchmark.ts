import { ackermann_bigint, ackermann_string, ackermann_simple } from "./ackermann.ts";
console.log("Now benchmarking Ackermann-Pro - developed by JustAnotherJavaProgrammer");
const n = parseInt(Deno.args[0], 10);
const m = parseInt(Deno.args[1], 10);
const logging = Deno.args.includes("-l") || Deno.args.includes("--logging");
const skipRecursion = Deno.args.includes("-s") || Deno.args.includes("--skip-recursion");
if (Deno.args.length < 2 || Number.isNaN(n) || Number.isNaN(m)) {
    console.info("Usage: benchmark [n] [m] OPTIONS\nValid options are:\n--logging, -l\tenable logging of intermediate steps\n--skip-recursion, -s\tSkip the recursion method");
    Deno.exit(1);
}
if (Deno.args[0].includes(".") || Deno.args[1].includes(".") || n < 0 || m < 0) {
    console.error("ERROR: The ackermann function only accepts positive integers.");
    Deno.exit(2);
}
console.log(`Calculating the value of a(${n}, ${m}) using the ${skipRecursion ? "two" : "three"} different methods...`);

if (!skipRecursion) {
    console.log("Using recursion...");
    if (logging)
        console.warn("WARN: The recursive implementation does not support the logging option.");
    performance.mark("startr");
    try {
        ackermann_simple(n, m);
        performance.mark("endr");
        performance.measure("recursion", { start: "startr", end: "endr" });
    } catch (e) {
        console.error(e);
    }

    performance.clearMarks();
}
console.log("Using Strings...");
{
    performance.mark("starts");
    ackermann_string(n, m, logging);
    performance.mark("ends");
    performance.measure("string", { start: "starts", end: "ends" });
    performance.clearMarks();
}
let value = -1n;
console.log("Using BigInts...");
{
    const bn = BigInt(n);
    const bm = BigInt(m);
    performance.mark("startb");
    value = ackermann_bigint(bn, bm, logging);
    performance.mark("endb");
    performance.measure("bigint", { start: "startb", end: "endb" });
    performance.clearMarks();
}
console.log(`The results are in!\na(${n}, ${m}) = ${value !== -1n ? value.toString() : "Error during calculation"}`);
const timeSpentColumn = ["Time spent (ms)"];
const methodColumn = ["Method"];
const measurements = performance.getEntriesByType("measure");
measurements.sort((a, b) => {
    return a.duration - b.duration;
});
for (const measurement of measurements) {
    timeSpentColumn.push(measurement.duration.toString());
    methodColumn.push(measurement.name === "recursion" ? "Recursion" :
        (measurement.name === "string" ? "Strings" :
            (measurement.name === "bigint" ? "BigInts" : "Unknown")));
}
// Padding the left column to get a consistently indented right column
let longestLength = timeSpentColumn[0].length;
// Finding the item with the longest length
for (const item of timeSpentColumn) {
    if (item.length > longestLength)
        longestLength = item.length;
}
// Padding all items to the longest length and printing them
for (let i = 0; i < timeSpentColumn.length; i++) {
    console.log(`${timeSpentColumn[i].padEnd(longestLength)}\t${methodColumn[i]}`);
}