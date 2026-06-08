import Wrap from "../ui/Wrap";
import Btn from "../ui/Btn";
import { LINKS, EXT } from "../../lib/links";

export default function BigCTA() {
  return (
    <section id="apply" className="pb-20 pt-[96px] text-center">
      <Wrap className="reveal">
        <h2 className="mx-auto max-w-[16ch] font-disp text-[clamp(34px,6.4vw,78px)] font-extrabold lowercase leading-[.98] tracking-[-.02em] text-crimson">
          got a scene you can&apos;t stop replaying?
        </h2>
        <p className="mx-auto mt-[22px] max-w-[46ch] text-[17px] leading-[1.5] opacity-[.82]">
          applications open every summer, worldwide. we reply within 48 hours —
          fast enough to match your spontaneity.
        </p>
        <div className="mt-[30px] flex flex-wrap justify-center gap-[14px]">
          <Btn variant="fill" href={LINKS.apply} {...EXT}>
            apply for a grant &nbsp;➔
          </Btn>
          <Btn variant="ghost" href={LINKS.applicationPlaybook} {...EXT}>
            read the playbook first
          </Btn>
        </div>
      </Wrap>
    </section>
  );
}
