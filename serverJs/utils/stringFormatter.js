/**
 * Capitalizes the first letter of each word in a string and removes extra spaces
 * @param text
 * @returns
 */
export function capitalize(text) {
    return trimSpace(text).replace(/\b\w/g, (l) => l.toUpperCase());
}
/**
 * Removes extra spaces in a string and trims it
 * @param text
 * @returns
 */
export function trimSpace(text) {
    return text.trim().replace(/(\s){2,}/g, " ");
}
/**
 * transforms contants to capitalized string ex. "HELLO_WORLD" to "Hello World"
 * @param text
 * @returns
 */
export function constantToCapitalize(text) {
    return text
        .replace(/_/g, " ")
        .replace(/(?<=\b\w)\w+/g, (l) => l.toLowerCase());
}
