interface LoadingModel {
  showLoading: boolean;
}
export const loading = defineStore("loading", {
  state: () => {
    return {
      showLoading: false,
    } as LoadingModel;
  },
  actions: {
    show(): void {
      this.showLoading = true;
    },
    close(): void {
      this.showLoading = false;
    },
  },
});
