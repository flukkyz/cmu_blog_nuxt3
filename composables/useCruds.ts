export default async (query: any) => {
  interface Crud {
    id?: number;
    name: string;
  }
  const endpoint = "cruds";
  const api = useRestAPI<Crud>(endpoint);
  const { data, pending, refresh, error } = await api.pagination(query);

  watch(query, refresh);

  return {
    data,
    pending,
    refresh,
    error,
    create: (body: Crud) => api.create(body),
    update: (id: number, body: Crud) => api.update(id, body),
    destroy: (id: number) => api.destroy(id),
  };
};
