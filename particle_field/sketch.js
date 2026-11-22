const r = require("raylib");

const running = function () {
    return !r.WindowShouldClose();
};

const createParticle = function (position, velocity) {
    return { position, velocity };
};

const getRandomValue = function (min, max) {
    return Math.random() * (max - min) + min;
};

const getRandomVelocity = function () {
    const angle = getRandomValue(0, Math.PI * 2);
    const speed = getRandomValue(100, 300);

    const x = speed * Math.cos(angle);
    const y = speed * Math.sin(angle);

    return { x, y };
};

const createParticles = function (particles, limit) {
    for (let i = 0; i < limit; i++) {
        particles.push(
            createParticle(r.GetMousePosition(), getRandomVelocity()),
        );
    }
};

const handleMouseInput = function (world) {
    const { particles } = world;
    if (r.IsMouseButtonPressed(r.MOUSE_BUTTON_LEFT)) {
        createParticles(particles, 50);
    }
};

const setup = function () {
    const screen = { width: 600, height: 400, title: "Particel Field" };

    const particles = [];

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(60);
    return { screen, particles };
};

const updateParticles = function (particles, dt) {
    for (const particle of particles) {
        particle.position.x += particle.velocity.x * dt;
        particle.position.y += particle.velocity.y * dt;
    }
};

const update = function (world) {
    handleMouseInput(world);
    const { particles } = world;
    const dt = r.GetFrameTime();

    updateParticles(particles, dt);
};
const drawParticles = function (particles) {
    for (const particle of particles) {
        r.DrawCircleV(particle.position, 5, r.WHITE);
    }
};

const draw = function (world) {
    const { particles } = world;
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticles(particles);

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
