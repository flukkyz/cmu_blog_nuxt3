interface ReferenceModel {
  rowsPerPages: DefaultSelectOptions[];
}

export const references = defineStore("references", {
  state: () => {
    return {
      rowsPerPages: [
        { value: 10, label: 10 },
        { value: 20, label: 20 },
        { value: 30, label: 30 },
        { value: 50, label: 50 },
        { value: 100, label: 100 },
        { value: -1, label: "All" },
      ],
    } as ReferenceModel;
  },
});
