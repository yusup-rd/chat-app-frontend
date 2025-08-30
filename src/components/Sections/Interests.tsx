import { LuPencilLine } from 'react-icons/lu';

const Interests = () => {
  return (
    <div className="bg-card flex flex-col justify-end gap-5 rounded-2xl p-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold">Interests</h2>
        <button
          className="cursor-pointer rounded-full p-1.5 duration-200 hover:bg-white/10"
          aria-label="Edit Inter"
        >
          <LuPencilLine className="size-4" />
        </button>
      </div>

      {/* Empty info */}
      <p className="text-sm opacity-50 font-medium">Add in your interests to find a better match</p>
    </div>
  );
};

export default Interests;
