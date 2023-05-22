import React from "react";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { Routine } from '../../lib/types/routine';

const RoutinesBlock = () => {
  const { data, error, isLoading } = useSWR<Routine[]>('routine', fetcher);

  if (error) return <div className="flex-auto">Failed to load</div>

  if (isLoading) return <div className="flex-auto">Loading...</div>

  return (
    <div></div>
  )
}

export default RoutinesBlock;