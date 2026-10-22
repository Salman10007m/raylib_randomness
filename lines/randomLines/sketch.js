const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function getRandomValue(rangeSt, rangeEnd) {
    return Math.floor(Math.random() * (rangeEnd - rangeSt)) + rangeSt;
}

function getRandomArray(rangeSt, rangeEnd, length) {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(getRandomValue(rangeSt, rangeEnd));
    }
    return array;
}

function setup() {
    const screen = {
        width: 400,
        height: 400,
        fps: 60,
    };

    // const Line1X = getRandomArray(0, 400, 100);
    const Line1X = getRandomArray(200, 400, 100);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, "Random Lines");
    r.SetTargetFPS(screen.fps);

    return { screen, Line1X };
}

function update() {
    // change the state
}

function draw(world) {
    const screen = world.screen;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    for (const x of world.Line1X) {
        r.DrawLine(x, 0, x, screen.height, r.WHITE);
    }

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
