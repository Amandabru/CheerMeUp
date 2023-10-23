export function splitArrayInHalf<T>(array: T[]): [T[], T[]] {
    if (array.length === 1) {
        return [array, []];
    }

    const middle = Math.floor(array.length / 2);

    const firstHalf = array.slice(0, middle);
    const secondHalf = array.slice(middle);

    return [firstHalf, secondHalf];
}

export function dataSlice<T>(data: T[], count: number): T[] {
    if (count === 0) {
        return data.slice(0, data.length / 3);
    }
    if (count === 1) {
        return data.slice(data.length / 3, data.length - data.length / 3);
    }
    if (count === 2) {
        return data.slice(data.length - data.length / 3, data.length);
    }
    return [];
}
