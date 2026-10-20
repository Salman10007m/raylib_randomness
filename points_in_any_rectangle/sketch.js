const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function getRandomValue(rangeSt, rangeEnd) {
    return Math.floor(Math.random() * (rangeEnd - rangeSt)) + rangeSt;
}

function getRandomPoint(start, end) {
    const x = getRandomValue(start.x, end.x);
    const y = getRandomValue(start.y, end.y);

    return { x, y };
}

function getRandomPoints(start, end, length) {
    const points = [];
    for (let i = 0; i < length; i++) {
        const point = getRandomPoint(start, end);
        points.push(point);
    }
    return points;
}

function findEndCoordinate(startCoordinate, size) {
    return startCoordinate + size;
}
function setup() {
    const screen = {
        width: 400,
        height: 200,
        fps: 10,
    };

    const rectangle = {
        x: 200,
        y: 50,
        width: 200,
        height: 80,
    };

    const start = {
        x: rectangle.x,
        y: rectangle.y,
    };

    const end = {
        x: rectangle.x + rectangle.width,
        y: rectangle.y + rectangle.height,
    };

    const points = getRandomPoints(start, end, 50);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, "Random Lines");
    r.SetTargetFPS(screen.fps);

    return { screen, points, rectangle };
}

function update() {
    // change the state
}

function draw(world) {
    const points = world.points;
    const rectangle = world.rectangle;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangleLinesEx(rectangle, 1, r.WHITE);

    for (let index = 0; index < points.length; index++) {
        const point = points[index];

        r.DrawCircle(point.x, point.y, 5, r.SKYBLUE);
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
