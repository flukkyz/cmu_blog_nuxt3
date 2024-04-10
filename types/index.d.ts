export { Mode, ListPage };

declare global {
  type Mode = "add" | "edit";

  interface ListPage<R> {
    totalItems: number;
    rows: R[];
    totalPages: number;
    currentPage: number;
  }

  interface AvatarImage {
    src: string;
  }

  interface DefaultSelectOptions {
    label: string | number;
    value: string | number;
  }

  interface NavigationLinkItem {
    label: string;
    to?: RouteLocationRaw;
    icon?: string;
    badge?: number;
    avatar?: AvatarImage;
    roles?: string[];
  }
}
