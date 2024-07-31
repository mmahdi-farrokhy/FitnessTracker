import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class PersianPaginatorIntl extends MatPaginatorIntl {
    override itemsPerPageLabel: string = "مورد در هر صفحه";
    override nextPageLabel: string = "صفحه بعد";
    override previousPageLabel: string = "صفحه قبل";
    override firstPageLabel: string = "صفحه اول";
    override lastPageLabel: string = "صفحه آخر";

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        const startPage = page * pageSize + 1;
        const endPage = Math.min((page + 1) * pageSize, length);
        return `${startPage} - ${endPage} از ${length}`
    }
}