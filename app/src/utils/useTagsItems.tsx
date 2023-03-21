import { useItems } from './useItems';

export const useTagsItems = (tags: string[]) => {
  const { data: items, isLoading, isError } = useItems();

  return items?.filter((item) =>
    item.tags?.some((itemTag) => tags.some((tag) => tag === itemTag))
  );
};
