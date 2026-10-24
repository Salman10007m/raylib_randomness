const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function getRandomValue(rangeSt, rangeEnd) {
    return Math.random() * (rangeEnd - rangeSt) + rangeSt;
}

function getRandomPolarCoordinate(start, end) {
    const distance = getRandomValue(start.distance, end.distance);
    const angle = getRandomValue(start.angle, end.angle);

    return { distance, angle };
}

function getRandomPolarCoordinates(start, end, length) {
    const points = [];

    for (let i = 0; i < length; i++) {
        const point = getRandomPolarCoordinate(start, end);
        points.push(point);
    }

    return points;
}

function setup() {
    const screen = {
        width: 400,
        height: 200,
        fps: 60,
        title: "Points Inside transilated Circle",
    };

    const circle = {
        x: 200,
        y: 100,
        radius: 100,
    };

    const polarRange = {
        start: { distance: 0, angle: (3 * Math.PI) / 2 },
        end: { distance: circle.radius / 2, angle: Math.PI },
    };

    const polarCoords = getRandomPolarCoordinates(
        polarRange.start,
        polarRange.end,
        100000,
    );

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(screen.fps);

    return { screen, polarCoords, circle };
}

function update() {
    // change the state
}

function convertPolarToCartisian(circle, polarCoord) {
    const x = circle.x + polarCoord.distance * Math.cos(polarCoord.angle);
    const y = circle.y + polarCoord.distance * Math.sin(polarCoord.angle);

    return { x, y };
}

function draw(world) {
    const polarCoords = world.polarCoords;
    const circle = world.circle;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawCircleLines(circle.x, circle.y, circle.radius, r.WHITE);

    for (const polarCoord of polarCoords) {
        const cartisian = convertPolarToCartisian(circle, polarCoord);

        r.DrawCircleV(cartisian, 1, r.SKYBLUE);
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
