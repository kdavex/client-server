export function requestFieldChecker(fields, req) {
    const error = [];
    Object.entries(req.body).forEach(([key, value]) => {
        if (fields.includes(key) && (value === undefined || value === null))
            error.push(key);
    });
    return error;
}
