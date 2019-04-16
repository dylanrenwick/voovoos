const fs = require('fs');
let code = "";
let debug = false;
if (process.argv.length > 2) {
    if (process.argv.length > 3) {
        if (process.argv[2] !== "-f" && process.argv[3] !== "-d") throw new Error("ArgError");
        if (process.argv[2] === "-f") {
            code = fs.readFileSync(process.argv[3]).toString('utf8');
            if (process.argv.length > 4) debug = process.argv[4] === "-d";
        }
        else {
            code = process.argv[2];
            debug = process.argv[3] === "-d";
        }
    } else {
        code = process.argv[2];
    }
}

var stdin = [];

process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
    stdin = stdin.concat(input.split(''));
});

const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
];
const DIR_RIGHT = directions[0];
const DIR_DOWN = directions[1];
const DIR_LEFT = directions[2];
const DIR_UP = directions[3];

let codeMatrix = code.split('\n').map(x => x.split(''));

let width = codeMatrix[0].length;
let height = codeMatrix.length;

dbg(codeMatrix);

function dbg(msg) {
    if (debug) console.log(msg);
}

function findChar(char) {
    let line = codeMatrix.filter(x => x.includes(char));
    if (line.length === 0) return -1;
    line = line[0];
    return [codeMatrix.indexOf(line), line.indexOf(char)];
}

function getChar(charPos) {
    return codeMatrix[charPos[0]][charPos[1]];
}

function move() {
    pos[0] += direction[0];
    pos[1] += direction[1];
    flag = 1;
}

function isRunning() {
    if (!running) return false;
    return pos[0] >= 0
        && pos[1] >= 0
        && pos[0] < height
        && pos[1] < width;
}

function invertPos() {
    flag = 0;
    pos = [(height - 1) - pos[0], (width - 1) - pos[1]];
    direction = [-direction[0], -direction[1]];
}

function turn(left = false) {
    direction = directions[Math.max(0, Math.min(3, directions.indexOf(direction) + (left ? -1 : 1)))];
}

function pop(s) {
    let x = s.pop();
    return (x !== undefined) ? x : 0;
}

var pos = findChar('x');

dbg(pos);

let direction = [0, 1];
let running = true;
var flag = 0;

var stack = [];
var codeMap = buildCodeMap();

while (isRunning()) {
    let char = getChar(pos);
    dbg(char);

    if (codeMap[char]) codeMap[char](stack);

    if (flag) invertPos();
    else move();
}

function buildCodeMap() {
    return {
        "v": () => direction = DIR_DOWN,
        ">": () => direction = DIR_RIGHT,
        "<": () => direction = DIR_LEFT,
        "^": () => direction = DIR_UP,
        "l": (s) => s.push(s.length),
        "c": (s) => s.push(100),
        ".": (s) => console.log(pop(s)),
        ",": (s) => s.push(stdin.shift()),
        "*": (s) => s.push(pop(s) * pop(s)),
        "+": (s) => s.push(pop(s) + pop(s)),
        "-": (s) => s.push(pop(s) - pop(s)),
        "/": (s) => s.push(pop(s) / pop(s)),
        "%": (s) => s.push(pop(s) % pop(s)),
        "m": (s) => s.push(1000),
        "?": (s) => turn(pop(s) ? 0 : 1),
        "@": () => { turn();turn(); }
    };
}