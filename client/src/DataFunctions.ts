export function splitArrayInHalf<T>(array: T[]): [T[], T[]] {
    const middle = Math.floor(array.length / 2);

    const firstHalf = array.slice(0, middle);
    const secondHalf = array.slice(middle);

    return [firstHalf, secondHalf];
}
