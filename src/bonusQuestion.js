"use strict";

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const READFile = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const PerformanceStart = performance.now();

const OPCODES = ["nop", "jmp"];

const serialized = READFile.filter(e => !!e)
    .map(instruction => instruction.split(" "))
    .map(([ opcode, arg ]) => [ opcode, Number(arg) ]);


let runner = function(){
    for (let i = 0; i < serialized.length; i++){
        const arr = [...serialized];
        const [ opcode, arg ] = arr[i];
        const completed = new Set();
        let [ index, accumulator ] = [0, 0];

        if (OPCODES.includes(String(opcode))) arr[i] = [opcode === OPCODES[0] ? OPCODES[1] : OPCODES[0], arg];

        while (!completed.has(index) && index !== arr.length){
            completed.add(index);
            const [ opcode_, arg_ ] = arr[index];
            accumulator += opcode_ === "acc" ? Number(arg_) : 0;
            index += opcode_ === OPCODES[1] ? Number(arg_) : 1;
        }

        if (index === arr.length) return accumulator;
    }
};

const PerformanceEnd = performance.now();

console.log("ACCUMULATOR VALUE: " + runner());
console.log(PerformanceEnd - PerformanceStart);