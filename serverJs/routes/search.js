import { searchController } from "../controllers/searchController";
export function SearchRoute(fastify, _options, done) {
    fastify.get("/:search", {}, searchController.search);
    done();
}
