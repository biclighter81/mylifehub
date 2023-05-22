import { getSession } from 'next-auth/react';

export async function setRoutineStageState(id: string, active: boolean) {
  const session = await getSession();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/routine/${id}/state`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ active }),
    }
  );
  await res.json();
  if (!res.ok) throw new Error('Error setting routine stage state');
}
