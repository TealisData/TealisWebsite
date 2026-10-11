import Station, { type Line } from "@/components/lines/Station";
import NextSlots from "@/components/lines/NextSlots";

/** The end of the line: a closing station with the real next free call slots */
export default function CtaBand({ line = "both", title, text }: { line?: Line; title: string; text: string }) {
  return (
    <Station last line={line} title={title} intro={text}>
      <NextSlots />
    </Station>
  );
}
