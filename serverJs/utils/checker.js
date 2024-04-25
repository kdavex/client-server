export function isValidObjectId(str) {
    return /^[0-9a-fA-F]{24}$/.test(str);
}
