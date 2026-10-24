function max(array) {
    let largest = -Infinity;

    for (const elements of array) {
        largest = Math.max(largest, elements);
    }

    return largest;
}

function sum(array) {
    let sum = 0;
    for (const elements of array) {
        sum += elements;
    }

    return sum;
}

function valueToPercentage(avg, maxHeight) {
    return (avg / maxHeight) * 100;
}

function calAvg(data) {
    return sum(data) / data.length;
}

function percentageToValue(percentage, totalValue) {
    return (percentage * totalValue) / 100;
}

module.exports = {
    max,
    valueToPercentage,
    calAvg,
    percentageToValue,
};
