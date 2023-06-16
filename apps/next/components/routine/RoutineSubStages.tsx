import { IconPlus } from "@tabler/icons-react";
import { Routine, RoutineStage } from "../../lib/types/routine";
import { useState } from "react";
import RoutineStageCreationModal from "./RoutineStageCreationModal";
import { KeyedMutator } from "swr";

export default function RoutineSubStageCreation({
  stages,
  routineId,
  mutate,
}: {
  stages: RoutineStage[];
  routineId: string;
  mutate: KeyedMutator<Routine[]>;
}) {
  const [modal, setModal] = useState(false);
  return (
    <div>
      {modal && (
        <RoutineStageCreationModal
          mutate={mutate}
          setModal={setModal}
          routineId={routineId}
        />
      )}
      <div className="flex items-center w-full">
        <h4 className="text-gray-500 font-bold uppercase text-sm mb-4">
          Sub-Stages
        </h4>
        <div className="flex-grow justify-end items-end flex">
          <button>
            <IconPlus
              className="text-blue-500 mb-3.5"
              strokeWidth={2}
              onClick={() => setModal(true)}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {stages.map((stage) => (
          <div key={stage.id} className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white font-bold uppercase px-2 py-1 rounded-xl text-xs min-w-[100px] flex justify-center">
              Ca. {stage.estimatedDuration} Min
            </div>
            <h5 className="text-md text-gray-500 text-sm">{stage.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}
