import { getSession } from 'next-auth/react';

export class FetcherError extends Error {
  public body: any;
  public statusCode: number;
  constructor(statusCode: number, message: string, body: any) {
    super(message);
    this.name = 'FetcherError';
    this.body = body;
    this.statusCode = statusCode;
  }
}

export const fetcher = async (url: string) => {
  const session = await getSession();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = await res.text();
    }
    throw new FetcherError(res.status, res.statusText, data);
  }

  return res.json();
};
