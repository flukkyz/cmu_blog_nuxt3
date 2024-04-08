interface SidebarModel {
  drawer: boolean;
}
export const sidebar = defineStore("sidebar", {
  state: () => {
    return {
      drawer: false,
    } as SidebarModel;
  },
});
