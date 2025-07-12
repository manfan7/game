import {Randomizer} from "./utils";

describe('utils test', () => {
    test('simple test', () => {
        const randomizer = new Randomizer();
        const from = 10;
        const end = 20;
        const result = randomizer.getRandomNumber(from, end); // 1. Не переданы аргументы

        expect(result).toBeGreaterThanOrEqual(from);
        expect(result).toBeLessThan(end); // 2. Должно быть toBeLessThan (так как toExclusive)
    });
});