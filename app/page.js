export default function Home() {
  return (
    <main className="mx-auto flex max-w-[1280px] flex-col items-start gap-6 px-6 py-16">
      <h1 className="font-display text-[56px] leading-tight font-normal">
        Made for merry mornings
      </h1>

      <p className="font-sans text-[16px] leading-[1.6] font-normal">
        Personalised satin Christmas pyjamas, with a name stitched on every set.
      </p>

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          className="rounded-btn bg-cranberry px-6 py-[14px] font-sans text-[15px] font-medium text-eggshell focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          Build your set
        </button>

        <button
          type="button"
          className="rounded-btn border border-sage bg-transparent px-6 py-[14px] font-sans text-[15px] font-medium text-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          View colourways
        </button>
      </div>
    </main>
  );
}