import { PrismaClient } from "@prisma/client";
class GetPrismaInstance {
    // static prismaInstance = new PrismaClient();
    static myString = "Hello World!";
    static prismaInstance = new PrismaClient();
    static getPrismaInstance() {
        return this.prismaInstance;
    }
}
const prisma = GetPrismaInstance.myString;
console.log({ prisma: GetPrismaInstance.getPrismaInstance() });
console.log("Hello World!");
