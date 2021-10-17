export class PaginatedRequestDto {
    readonly pageSize: number;
    readonly pageNumber: number;
    readonly searchString: string;
    readonly filters: any;

    constructor(
        pageSize: number | string,
        pageNumber: number | string,
        searchString?: string,
        filters: any = {}
    ) {
        this.pageNumber = +pageNumber || 1;
        this.pageSize = +pageSize || 10;
        this.searchString = searchString;
        this.filters = JSON.parse(filters);
    }

    get skip() {
        return (this.pageNumber - 1) * this.pageSize;
    }
}