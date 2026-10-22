const r = require("raylib");
const m = require("./math");

function drawBar(bar, text) {
    r.DrawRectangleRec(bar, r.DARKBLUE);
    r.DrawText(`${text}`, bar.x, bar.y - 20, 20, r.WHITE);
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
    for (let index = 0; index < table.length; index++) {
        const bar = createBar(screen, table, maxHeight, currentHeight, index);
        drawBar(bar, table[index]);
    }
}

module.exports = {
    draw,
};
