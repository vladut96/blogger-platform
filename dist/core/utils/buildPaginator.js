"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPaginator = buildPaginator;
function buildPaginator(query, totalCount, items) {
    const pagesCount = Math.ceil(totalCount / query.pageSize);
    return {
        pagesCount,
        page: query.pageNumber,
        pageSize: query.pageSize,
        totalCount,
        items,
    };
}
//# sourceMappingURL=buildPaginator.js.map