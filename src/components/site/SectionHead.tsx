import type { ReactNode } from "react";

type Props = { title: ReactNode; aside?: ReactNode };

export default function SectionHead({ title, aside }: Props) {
  return (
    <div className="shead">
      <div>
        <h2 className="shead_title display">{title}</h2>
      </div>
      {aside && <div className="shead_aside">{aside}</div>}
    </div>
  );
}
