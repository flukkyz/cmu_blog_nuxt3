interface BreadcrumbsModel {
  items: NavigationLinkItem[];
}

export const breadcrumbs = defineStore("breadcrumbs", {
  state: () => {
    return {
      items: [],
    } as BreadcrumbsModel;
  },
  actions: {
    setItems(payload: NavigationLinkItem[]) {
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
