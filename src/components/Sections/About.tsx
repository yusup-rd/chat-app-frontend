import { LuPencilLine } from 'react-icons/lu';

const About = () => {
  return (
    <div className="bg-card flex flex-col justify-end gap-5 rounded-2xl p-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold">About</h2>
        <button
          className="cursor-pointer rounded-full p-1.5 duration-200 hover:bg-white/10"
          aria-label="Edit About"
        >
          <LuPencilLine className="size-4" />
        </button>
      </div>

      {/* Empty info */}
      <p className="text-sm font-medium opacity-50">
        Add in your your to help others know you better
      </p>
    </div>
  );
};

export default About;
