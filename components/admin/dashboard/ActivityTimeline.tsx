export default function ActivityTimeline() {
  const history = [
    {
      date: "12 Jul 2026",
      title: "Pengajuan Dikirim",
      desc: "Peserta mengirim formulir pendaftaran.",
    },
    {
      date: "13 Jul 2026",
      title: "Dokumen Diverifikasi",
      desc: "Administrator memeriksa kelengkapan berkas.",
    },
    {
      date: "15 Jul 2026",
      title: "Wawancara",
      desc: "Peserta mengikuti wawancara.",
    },
    {
      date: "18 Jul 2026",
      title: "Peserta Diterima",
      desc: "Peserta resmi diterima magang.",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-semibold">
        Aktivitas Terbaru
      </h2>

      <div className="space-y-6">

        {history.map((item, index) => (

          <div key={index} className="flex gap-4">

            <div className="flex flex-col items-center">

              <div className="h-3 w-3 rounded-full bg-blue-600"></div>

              {index !== history.length - 1 && (
                <div className="mt-2 h-16 w-[2px] bg-gray-200"></div>
              )}

            </div>

            <div>

              <p className="text-xs text-gray-400">
                {item.date}
              </p>

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.desc}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}