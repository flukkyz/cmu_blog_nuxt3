export default async (query: any) => {
  interface ListPage<T> {
    totalItems: number;
    rows: T[];
    totalPages: number;
    currentPage: number;
  }
  interface Crud {
    id?: number;
    name: string;
  }
  const entity = "cruds";
  const datas = ref();
  const { data, error, refresh, pending } = await useIFetch<ListPage<Crud>>(
    entity,
    {
      query,
    }
  );
  if (error.value) {
    console.log("error", error.value);
  }
  refresh().then(() => {
    datas.value = data;
  });
  watch(query, refresh);

  const create = async (body: Crud) => {
    const { error } = await useIFetch<Crud>(entity, {
      method: "POST",
      body,
    });
    if (error.value) {
      console.log("error", error.value);
    }
  };
  const update = async (id: number, body: Crud) => {
    const { error } = await useIFetch<Crud>(`${entity}/${id}`, {
      method: "PUT",
      body,
    });
    if (error.value) {
      console.log("error", error.value);
    }
  };
  return { datas, pending, refresh, create, update };
};
