import { PrismaClient } from "@prisma/client";
export function onRequestHook(req, _res, done) {
    // Decorators
    req.prisma = new PrismaClient();
    done();
}
