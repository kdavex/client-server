"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myObj = {
    test1: "1",
    test2: "value2",
    test3: "value3"
};
const newObj = {
    ...myObj,
    test3: "NewValue"
};
console.log(newObj);
