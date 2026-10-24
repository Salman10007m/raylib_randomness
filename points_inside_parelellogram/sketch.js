const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

function getRandomFractions(length) {
    const fractions = [];
    for (let i = 0; i < length; i++) {
        const ab = 1 - Math.random() * Math.random();
        const ac = 1 - Math.random() * Math.random();

        fractions.push({ ab, ac });
    }
    return fractions;
}

function setup() {
    const screen = {
        width: 600,
        height: 400,
        fps: 10,
    };

    const point = {
        a: { x: 50, y: 150 },
        b: { x: 250, y: 150 },
        c: { x: 100, y: 100 },
    };

    const vector = {
        ab: r.Vector2Subtract(point.b, point.a),
        ac: r.Vector2Subtract(point.c, point.a),
    };

    const fractions = getRandomFractions(10000);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, "Random Lines");
    r.SetTargetFPS(screen.fps);

    return { screen, vector, point, fractions };
}

function update() {
    // change the state
}

function addVectors(a, b, c) {
    const x = a.x + b.x + c.x;
    const y = a.y + b.y + c.y;
    return { x, y };
}

function draw(world) {
    const vector = world.vector;
    const point = world.point;
    const fractions = world.fractions;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    for (const fraction of fractions) {
        const scaledAB = r.Vector2Scale(vector.ab, fraction.ab);
        const scaledAC = r.Vector2Scale(vector.ac, fraction.ac);
        const randomPoint = addVectors(point.a, scaledAB, scaledAC);

        r.DrawCircleV(randomPoint, 1, r.WHITE);
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
