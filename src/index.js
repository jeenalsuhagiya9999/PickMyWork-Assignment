"use strict";

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const READFile = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const PerformanceStart = performance.now();

const completed = new Set();
let [ index, accumulator ] = [0, 0];

const serialize = READFile.filter(e => !!e)
    .map(instruction => instruction.split(" "))
    .map(([ opcode, arg ]) => [ opcode, arg ]);

while (!completed.has(index)){
    completed.add(index);
    const [ opcode, arg ] = serialize[index];
    accumulator += opcode === "acc" ? Number(arg) : 0;
    index += opcode === "jmp" ? Number(arg) : 1;
}

const PerformanceEnd = performance.now();

console.log("ACCUMULATOR VALUE: " + accumulator);
console.log(PerformanceEnd - PerformanceStart);