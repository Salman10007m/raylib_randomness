const sketch = require("./sketch");

const loop = function (world) {
    while (sketch.running()) {
        sketch.update(world);
        sketch.draw(world);
    }
};

const main = function () {
    const world = sketch.setup();
    loop(world);
    sketch.teardown();
};

main();
