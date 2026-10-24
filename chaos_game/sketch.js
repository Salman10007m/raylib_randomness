const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function getRandomValue(rangeSt, rangeEnd) {
    return Math.floor(Math.random() * (rangeEnd - rangeSt)) + rangeSt;
}

function setup() {
    const screen = {
        width: 800,
        height: 800,
        fps: 100,
    };

    const A = { x: 180, y: 100 };
    const B = { x: 320, y: 480 };
    const C = { x: 560, y: 520 };

    const vertices = [A, B, C];
    let currentPoint = vertices[0];

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, "Random Lines");
    r.SetTargetFPS(screen.fps);

    return { screen, vertices, currentPoint };
}

function update() {
    // change the state
}

function findMidPoint(p1, p2) {
    const x = (p1.x + p2.x) / 2;
    const y = (p1.y + p2.y) / 2;

    return { x, y };
}

function draw(world) {
    const vertices = world.vertices;
    const index = getRandomValue(0, 3);
    const point = vertices[index];

    world.currentPoint = findMidPoint(world.currentPoint, point);

    r.BeginDrawing();
    // r.ClearBackground(r.BLACK);

    r.DrawCircleV(world.currentPoint, 1, r.RED);

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
