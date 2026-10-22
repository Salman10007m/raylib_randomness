function max(array) {
    let largest = -Infinity;
    for (i = 0; i < array.length; i++) {
        largest = Math.max(largest, array[i]);
    }
    return largest;
}

function sum(array) {
    let sum = 0;
    for (i = 0; i < array.length; i++) {
        sum += array[i];
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
