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

function setup() {
    const screen = {
        width: 400,
        height: 400,
        fps: 10,
    };

    const rectangle = {
        x: 100,
        y: 100,
        width: 200,
        height: 300,
    };

    const center = {
        x: 170,
        y: 200,
        radius: 60,
    };

    const start = {
        x: rectangle.x,
        y: rectangle.y,
    };

    const end = {
        x: rectangle.x + rectangle.width,
        y: rectangle.y + rectangle.height,
    };

    const totalPoints = 500000;
    const points = getRandomPoints(start, end, totalPoints);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, "Estimate");
    r.SetTargetFPS(screen.fps);

    return { screen, points, rectangle, center, totalPoints };
}

function update() {
    // change the state
}

function isPointInsideCircle(point, center) {
    return (
        (point.x - center.x) ** 2 + (point.y - center.y) ** 2 <=
        center.radius ** 2
    );
}

function draw(world) {
    const points = world.points;
    const rectangle = world.rectangle;
    const center = world.center;
    const totalPoints = world.totalPoints;

    let pointsInsideCircle = 0;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangleLinesEx(rectangle, 1, r.WHITE);

    for (let index = 0; index < points.length; index++) {
        const point = points[index];
        pointsInsideCircle += isPointInsideCircle(point, center) ? 1 : 0;

        r.DrawCircle(point.x, point.y, 1, {
            r: 100,
            g: 0,
            b: 0,
            a: 100,
        });
    }

    r.DrawCircleLines(center.x, center.y, center.radius, r.WHITE);
    r.DrawText(
        `points inside Circel=${pointsInsideCircle}`,
        10,
        10,
        20,
        r.WHITE,
    );
    r.DrawText(`total Points=${totalPoints}`, 10, 30, 20, r.WHITE);

    const areaOfRectangle = rectangle.width * rectangle.height;
    const areaOfCircle = Math.floor(
        areaOfRectangle * (pointsInsideCircle / totalPoints),
    );
    const actualArea = Math.floor(Math.PI * center.radius ** 2);

    r.DrawText(`calculated Area =${areaOfCircle}`, 10, 50, 20, r.WHITE);
    r.DrawText(`actual area =${actualArea}`, 10, 70, 20, r.WHITE);

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
