// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ShareTest } from '@/../types';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const f: ShareTest = { id: '1' };
  res.status(200).json({ name: 'John Doe' });
}
