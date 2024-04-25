"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class GetPrismaInstance {
    // static prismaInstance = new PrismaClient();
    static myString = "Hello World!";
    static prismaInstance = new client_1.PrismaClient();
    static getPrismaInstance() {
        return this.prismaInstance;
    }
}
const prisma = GetPrismaInstance.myString;
console.log({ prisma: GetPrismaInstance.getPrismaInstance() });
console.log("Hello World!");
