import type { RouteLocationRaw } from "#vue-router";

export interface BreadcrumbItem {
  to?: RouteLocationRaw;
  label: string;
  icon: string;
}

export interface BreadcrumbsModel {
  items: BreadcrumbItem[];
}

export const breadcrumbs = defineStore("breadcrumbs", {
  state: () => {
    return {
      items: [],
    } as BreadcrumbsModel;
  },
  actions: {
    setItems(payload: BreadcrumbItem[]) {
      this.items = payload;
    },
    hasItem() {
      return this.items.length > 0;
    },
    clear() {
      this.items = [];
    },
  },
});
