export const parseOffset = (url: string | null) => {
  if (!url)
    return {
      offset: 0,
      limit: 0,
    };

  const { searchParams } = new URL(url);

  return {
    offset: parseInt(searchParams.get('offset') ?? '0', 10),
    limit: parseInt(searchParams.get('limit') ?? '0', 10),
  };
};

export const parseId = (url: string | null) => {
  if (!url) return '-';

  return url.split('/').filter(Boolean).pop() ?? '-';
};
