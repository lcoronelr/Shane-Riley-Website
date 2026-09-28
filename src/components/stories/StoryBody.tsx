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
    <div className="story-body mx-auto max-w-[40rem]">
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
    case "image":
      return (
        <figure
          data-reveal
          className={
            block.size === "wide"
              ? "relative left-1/2 my-14 w-[min(100vw-2.5rem,68rem)] -translate-x-1/2 font-sans"
              : "my-12 font-sans"
          }
        >
          <Picture
            photo={block.photo}
            sizes={block.size === "wide" ? "(min-width: 72rem) 68rem, 100vw" : "(min-width: 44rem) 40rem, 100vw"}
          />
          <Caption photo={block.photo} />
        </figure>
      );
    case "gallery":
      return (
        <section
          aria-label={block.title ?? "Photo gallery"}
          className="relative left-1/2 my-14 w-[min(100vw-2.5rem,68rem)] -translate-x-1/2 font-sans"
        >
          {block.title && <h2 className="kicker !mt-0 mb-4 text-slate-ink">{block.title}</h2>}
          <PhotoGallery photos={block.photos} title={block.title ?? "Gallery"} layout="strip" />
          <p className="mt-3 text-step--1 text-slate-ink">Select a photo to view it full screen with its caption.</p>
        </section>
      );
    case "video":
      return (
        <div className="relative left-1/2 my-14 w-[min(100vw-2.5rem,56rem)] -translate-x-1/2 font-sans">
          <VideoPlayer video={block.video} sizes="(min-width: 60rem) 56rem, 100vw" />
        </div>
      );
    case "divider":
      return (
        <hr aria-hidden="true" className="mx-auto my-12 w-16 border-rule-strong" />
      );
  }
}
