export function subtract(a: number, b: number): number {
    return a - b
}

export function isObject(value: any): boolean {
    return value !== null && typeof value === 'object'
}