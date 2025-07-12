export class Randomizer {
    getRandomNumber(fromInclusive, toExclusive) {  // Исправлено название параметра
        if (typeof fromInclusive !== 'number' || typeof toExclusive !== 'number') {
            throw new Error('You can set only numbers');  // Исправлено сообщение об ошибке
        }

        if (toExclusive <= fromInclusive) {
            throw new Error("toExclusive must be greater than fromInclusive");
        }

        return Math.floor(Math.random() * (toExclusive - fromInclusive)) + fromInclusive;
    }
}