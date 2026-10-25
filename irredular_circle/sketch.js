const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function getRandomValue(rangeSt, rangeEnd) {
    return Math.random() * (rangeEnd - rangeSt) + rangeSt;
}

function generateCirclePoints(circle) {
    const points = [];
    const center = circle.center;
    for (let radian = 0; radian < 2 * Math.PI; radian += 0.1) {
        const distance = getRandomValue(circle.radius - 3, circle.radius + 5);

        const x = center.x + distance * Math.cos(radian);
        const y = center.y + distance * Math.sin(radian);

        points.push({ x, y });
    }
    return points;
}

function setup() {
    const screen = {
        width: 400,
        height: 400,
        fps: 60,
        title: "Points Inside transilated Circle",
    };
    const circle = {
        center: { x: 200, y: 200 },
        radius: 100,
    };

    circle.points = generateCirclePoints(circle);
    const palette = [r.BLUE, r.WHITE, r.GRAY, r.YELLOW, r.RED, r.GREEN];

    const color = palette[Math.floor(Math.random() * palette.length)];

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(screen.fps);

    return { screen, circle, color, palette };
}

function update(world) {
    if (r.IsKeyPressed(r.KEY_SPACE)) {
        const randomIndex = Math.floor(Math.random() * world.palette.length);
        world.circle.points = generateCirclePoints(world.circle);
        world.color = world.palette[randomIndex];
    }
}

function draw(w) {
    const points = w.circle.points;
    const center = w.circle.center;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    for (let index = 0; index < points.length; index++) {
        const nextPoint =
            index >= points.length - 1 ? points[0] : points[index + 1];
        r.DrawTriangle(center, nextPoint, points[index], w.color);
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
