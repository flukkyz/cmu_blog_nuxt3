import type { RouteLocation } from "#vue-router";

export interface BreadcrumbItem {
  url?: RouteLocation;
  text: string;
  detail?: string;
}

export interface BreadcrumbsModel {
  items: BreadcrumbItem[];
  icon: string;
  prefixIcon: string;
  prefixIconColor: string;
}

export const breadcrumbsStore = defineStore("breadcrumbs", {
  state: () => {
    return {
      items: [],
      icon: "fa-regular fa-angle-right",
      prefixIcon: "",
      prefixIconColor: "gray-500",
    } as BreadcrumbsModel;
  },
  actions: {
    setItems(payload: BreadcrumbItem[], icon?: string, color?: string) {
      this.items = payload;
      this.prefixIcon = icon || "";
      this.prefixIconColor = color || "";
    },
    clear() {
      this.items = [];
    },
  },
});
