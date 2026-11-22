const r = require("raylib");

const running = function () {
    return !r.WindowShouldClose();
};

const setup = function () {
    const screen = { width: 600, height: 400, title: "Particel Field" };

    const particle = {
        position: { x: 300, y: 200 },
        velocity: { x: 2, y: -1 },
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(60);

    return { screen, particle };
};

const update = function (world) {
    const { particle } = world;
    particle.position.x += particle.velocity.x;
    particle.position.y += particle.velocity.y;
};

const draw = function (world) {
    const { particle } = world;
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawCircleV(particle.position, 5, r.WHITE);

    r.EndDrawing();
};

const teardown = function () {
    r.CloseWindow();
};

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};
