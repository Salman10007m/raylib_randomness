const r = require("raylib");

const running = function () {
    return !r.WindowShouldClose();
};

const createParticle = function (position, velocity) {
    return { position, velocity };
};

const setup = function () {
    const screen = { width: 600, height: 400, title: "Particel Field" };

    const particle = createParticle({ x: 300, y: 200 }, { x: 120, y: -60 });

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(60);

    return { screen, particle };
};

const update = function (world) {
    const { particle } = world;
    const dt = r.GetFrameTime();

    particle.position.x += particle.velocity.x * dt;
    particle.position.y += particle.velocity.y * dt;
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
