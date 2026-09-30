import { AudioPlayer } from "@/components/media/AudioPlayer";
import { Caption, Picture } from "@/components/media/Picture";
import { PhotoGallery } from "@/components/media/PhotoGallery";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import type { StoryBlock } from "@/content/types";

/**
 * Renders typed story blocks. All text is rendered as React text nodes —
 * never as raw HTML — so story content cannot inject markup or scripts.
 */
export function StoryBody({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <div className="story-body mx-auto max-w-[40rem] after:clear-both after:block after:content-['']">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "heading":
      return <h2>{block.text}</h2>;
    case "quote":
      return (
        <figure className="relative my-14 border-y border-rule py-10 sm:-mx-8 lg:-mx-24">
          <blockquote className="font-serif text-step-3 leading-[1.12] font-normal tracking-[-0.015em] text-charcoal italic">
            <p>
              <span aria-hidden="true" className="text-cobalt">
                “
              </span>
              {block.text}
              <span aria-hidden="true" className="text-cobalt">
                ”
              </span>
            </p>
          </blockquote>
          {block.attribution && (
            <figcaption className="kicker mt-6 font-sans text-slate-ink">— {block.attribution}</figcaption>
          )}
        </figure>
      );
    case "image": {
      const float = block.size === "left" || block.size === "right";
      return (
        <figure
          data-reveal
          className={
            block.size === "wide"
              ? "relative left-1/2 my-14 w-[min(100vw-2.5rem,68rem)] -translate-x-1/2 clear-both font-sans"
              : float
                ? `my-10 font-sans sm:mt-2 sm:mb-6 sm:w-[46%] ${block.size === "left" ? "sm:float-left sm:mr-8" : "sm:float-right sm:ml-8"}`
                : "my-12 clear-both font-sans"
          }
        >
          <div
            className="mx-auto"
            style={
              block.size === "wide"
                ? undefined
                : // Keep small or tall photos near their natural size so they stay sharp.
                  { maxWidth: `min(100%, ${Math.round(Math.min(block.photo.src.width * 1.6, (block.photo.src.width / block.photo.src.height) * 640))}px)` }
            }
          >
            <Picture
              photo={block.photo}
              sizes={
                block.size === "wide"
                  ? "(min-width: 72rem) 68rem, 100vw"
                  : float
                    ? "(min-width: 40rem) 18rem, 100vw"
                    : "(min-width: 44rem) 40rem, 100vw"
              }
            />
            <Caption photo={block.photo} />
          </div>
        </figure>
      );
    }
    case "gallery":
      return (
        <section
          aria-label={block.title ?? "Photo gallery"}
          className="relative left-1/2 my-14 w-[min(100vw-2.5rem,60rem)] -translate-x-1/2 clear-both font-sans"
        >
          {block.title && <h2 className="kicker !mt-0 mb-4 text-slate-ink">{block.title}</h2>}
          <PhotoGallery photos={block.photos} title={block.title ?? "Photos"} />
        </section>
      );
    case "video":
      return (
        <div className="relative left-1/2 my-14 w-[min(100vw-2.5rem,56rem)] -translate-x-1/2 clear-both font-sans">
          <VideoPlayer video={block.video} sizes="(min-width: 60rem) 56rem, 100vw" />
        </div>
      );
    case "audio":
      return <AudioPlayer audio={block.audio} className="my-12 clear-both font-sans" />;
    case "divider":
      return (
        <hr aria-hidden="true" className="mx-auto my-12 w-16 border-rule-strong" />
      );
  }
}
