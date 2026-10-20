const sketch = require("./sketch");

function loop(world) {
    while (sketch.running()) {
        sketch.update();
        sketch.draw(world);
    }
}

function main() {
    const world = sketch.setup();
    loop(world);
    sketch.teardown();
}

main();
