const r = require("raylib");
const m = require("./math");
const bars = require("./bar");

function running() {
    return !r.WindowShouldClose();
}

function getRandomArray(length) {
    const array = [];
    for (let i = 0; i < length; i++) {
        const value = Math.random() * Math.random();
        array.push(value);
    }

    return array;
}

function getFrequencyTable(array) {
    const table = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const elements of array) {
        const position = Math.floor(elements * 10);
        table[position] += 1;
    }
    console.log(table);

    return table;
}

function setup() {
    const screen = {
        width: 800,
        height: 400,
        fps: 5,
    };

    const randomArray = getRandomArray(10000);
    const frequencyTable = getFrequencyTable(randomArray);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, "Bar representation");
    r.SetTargetFPS(screen.fps);

    return { screen, frequencyTable };
}

function update() {
    // change the state
}

function draw(world) {
    const screen = world.screen;
    const frequencyTable = world.frequencyTable;
    const currentHeight = m.percentageToValue(90, screen.height);
    const maxHeight = m.max(frequencyTable);

    r.BeginDrawing();
    // r.ClearBackground(r.BLACK);

    bars.draw(screen, frequencyTable, maxHeight, currentHeight);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};
