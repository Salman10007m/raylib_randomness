const r = require("raylib");
const m = require("./math");

function drawBar(bar) {
    r.DrawRectangleRec(bar, r.DARKBLUE);
}

function findYcoordinate(currentHeight, height, size) {
    return currentHeight - height + (size - currentHeight);
}

function createBar(screen, table, maxHeight, currentHeight, i) {
    const percentage = m.valueToPercentage(table[i], maxHeight);
    const width = 50;
    const height = m.percentageToValue(percentage, currentHeight);
    const x = i * (50 + 10);
    const y = findYcoordinate(currentHeight, height, screen.height);

    return { x, y, width, height };
}

function draw(screen, table, maxHeight, currentHeight) {
    for (i = 0; i < table.length; i++) {
        const bar = createBar(screen, table, maxHeight, currentHeight, i);
        drawBar(bar);
    }
}

module.exports = {
    draw,
    findYcoordinate,
};
