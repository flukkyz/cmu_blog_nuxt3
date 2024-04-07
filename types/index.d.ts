export { Mode, ListPage };

declare global {
  type Mode = "add" | "edit";

  interface ListPage<R> {
    totalItems: number;
    rows: R[];
    totalPages: number;
    currentPage: number;
  }
}
