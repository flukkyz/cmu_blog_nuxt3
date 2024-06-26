export default () => {
  interface Img {
    url: string;
  }
  interface Member {
    firstname: string;
    lastname: string;
  }
  interface Blog {
    id?: number;
    title: string;
    slug?: string;
    content: string;
    tags: string;
    hit?: number;
    Img?: Img;
    Member?: Member;
    createdAt?: string;
  }
  const endpoint = "blogs";
  const api = useRestAPI<Blog>(endpoint);

  return {
    pagination: async (query: Record<string, any>) => {
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
      };
    },
    show: async (slug: string) => {
      const { data, error, pending } = await api.one(slug);
      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.statusMessage,
          fatal: true,
        });
      }
      return { data, pending };
    },
    create: async (body: FormData) => await api.create(body),
    update: async (id: number, body: FormData) => await api.update(id, body),
    removeImage: async (id: number) =>
      await useIFetch(`${endpoint}/${id}/remove-image`, { method: "PUT" }),
    destroy: async (id: number) => await api.destroy(id),
  };
};
