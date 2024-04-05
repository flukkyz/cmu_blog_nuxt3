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
    create: (body: Crud) => api.create(body),
    update: (id: number, body: Crud) => api.update(id, body),
    destroy: (id: number) => api.destroy(id),
  };
};
