export default async (query: Record<string, any>) => {
  interface Crud {
    id?: number;
    name: string;
  }
  const endpoint = "cruds";
  const api = useRestAPI<Crud>(endpoint);
  const { data, pending, refresh, error } = await api.pagination(query);
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
      fatal: true,
    });
  }

  watch(query, refresh);

  return {
    data,
    pending,
    refresh,
    error,
    create: async (body: Crud) => await api.create(body),
    update: async (id: number, body: Crud) => await api.update(id, body),
    destroy: async (id: number) => await api.destroy(id),
    deletes: async (ids: number[]) =>
      useIFetch(`${endpoint}/delete`, { method: "POST", body: { ids } }),
  };
};
