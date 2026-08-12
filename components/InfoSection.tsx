import { ChevronRight, BookOpen, User } from "lucide-react";
import Image from "next/image";

const CARDS = [
  {
    id: 1,
    title: "Lorem Ipsum",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export default function InfoSection() {
  return (
    <div id="informasi" className="grid grid-cols-1 gap-6 sm:grid-cols-[0.9fr_1.6fr]">
        {/* Left: mascot pointing at cards */}
        <div className="relative flex items-end justify-center rounded-3xl bg-slate-50 px-6 pt-10">
          <div className="relative w-full max-w-[220px]">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-3xl">
              <Image
                src="/siswi.png"
                alt="Mahasiswa"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -left-6 top-10 -z-10 h-24 w-24 rounded-full bg-blue-100 blur-2xl" />
        </div>

        {/* Middle: Informasi cards */}
        <div>
          <h2 className="mb-1 text-center text-2xl font-bold text-slate-900 sm:text-left">
            Informasi
          </h2>
          <div className="mx-auto mb-8 h-1 w-14 rounded-full bg-brand-blue sm:mx-0" />

          <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2">
            {CARDS.map((card) => (
              <article
                key={card.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-amber-50 to-slate-200">
                  <BookOpen className="h-10 w-10 text-slate-400" />
                </div>
                <div className="p-5">
                  <h3 className="mb-1 font-semibold text-slate-900">
                    {card.id}
                  </h3>
                  <div className="flex items-end justify-between gap-3">
                    <p className="text-sm text-slate-500">{card.desc}</p>
                    <button
                      aria-label="Selengkapnya"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-blue text-white transition-transform hover:scale-105"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
  );
}
