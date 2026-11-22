const r = require("raylib");

const running = function () {
    return !r.WindowShouldClose();
};

const createParticle = function (position, velocity, lifetime) {
    return { position, velocity, lifetime };
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

const createParticles = function (particles, limit, lifetime) {
    for (let i = 0; i < limit; i++) {
        particles.push(
            createParticle(r.GetMousePosition(), getRandomVelocity(), lifetime),
        );
    }
};

const handleMouseInput = function (world) {
    const { particles, initialLifetime } = world;
    if (r.IsMouseButtonPressed(r.MOUSE_BUTTON_LEFT)) {
        createParticles(particles, 100, initialLifetime);
    }
};

const setup = function () {
    const screen = { width: 1000, height: 1000, title: "Particel Field" };
    const particles = [];
    const initialRadius = 5;
    const initialLifetime = 5;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(60);

    return { screen, particles, initialRadius, initialLifetime };
};

function updatePosition(particle, dt) {
    particle.position.x += particle.velocity.x * dt;
    particle.position.y += particle.velocity.y * dt;
}

const updateLifetime = function (particle, dt) {
    particle.lifetime -= dt;
};

const removeExpiredParticles = function (particles) {
    const newParticles = [];
    for (const particle of particles) {
        if (particle.lifetime > 0) {
            newParticles.push(particle);
        }
    }
    return newParticles;
};

const updateParticles = function (particles, dt) {
    for (const particle of particles) {
        updatePosition(particle, dt);
        updateLifetime(particle, dt);
    }
    return removeExpiredParticles(particles);
};

const update = function (world) {
    handleMouseInput(world);
    const dt = r.GetFrameTime();

    world.particles = updateParticles(world.particles, dt);
};

const drawParticle = function (particle, radius) {
    r.DrawCircleV(particle.position, radius, r.WHITE);
};

const drawParticles = function (particles, initialLifetime, initialRadius) {
    for (const particle of particles) {
        const radius = initialRadius * (particle.lifetime / initialLifetime);
        drawParticle(particle, radius);
    }
};

const draw = function (world) {
    const { particles, initialLifetime, initialRadius } = world;
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticles(particles, initialLifetime, initialRadius);

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
