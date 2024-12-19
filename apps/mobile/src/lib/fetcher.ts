export const fetcher = async <_>(url: string, init?: RequestInit) => {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
    },
  });

  return {
    data: await response.json(),
    status: response.status,
    headers: response.headers,
  };
};

export default fetcher;
