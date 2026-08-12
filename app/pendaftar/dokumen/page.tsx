"use client";

import { useUser } from "@/components/pendaftar/UserContext";
import { FileText, Camera, Upload } from "lucide-react";
import { useState } from "react";

export default function DokumenPage() {
  const { documents, setDocuments } = useUser();
  const [dragOver, setDragOver] = useState<string | null>(null);

  const docList = [
    { key: "kartuPelajar", label: "Kartu Pelajar / Mahasiswa" },
    { key: "ktp", label: "KTP / Kartu Keluarga" },
    { key: "cv", label: "Curriculum Vitae" },
    { key: "suratPengantar", label: "Surat Pengantar Sekolah / Kampus" },
    { key: "pasFoto", label: "Pas Foto" },
  ];

  const handleFileUpload = (file: File, key: string) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setDocuments({
        ...documents,
        [key]: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    key: string
  ) => {
    e.preventDefault();
    setDragOver(null);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    handleFileUpload(file, key);
  };

  const total = docList.length;
  const uploaded = docList.filter(
    (doc) => documents[doc.key as keyof typeof documents]
  ).length;

  const percentage = Math.round((uploaded / total) * 100);

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Dokumen Peserta
          </h1>

          <p className="text-gray-500 mt-2">
            Unggah seluruh dokumen yang diperlukan untuk proses pendaftaran magang.
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-900">Kelengkapan Dokumen</h2>
              <p className="text-sm text-gray-500 mt-1">
                {uploaded} dari {total} dokumen telah diunggah
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
              <div className="text-xs text-gray-500">Selesai</div>
            </div>
          </div>

          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Document grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docList.map((doc) => {
            const fileData = documents[doc.key as keyof typeof documents];
            const isUploaded = Boolean(fileData);
            const isImage = fileData?.startsWith("data:image");

            return (
              <div
                key={doc.key}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(doc.key);
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => handleDrop(e, doc.key)}
                className={`group relative bg-white border rounded-3xl p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  dragOver === doc.key
                    ? "border-blue-400 ring-4 ring-blue-100 shadow-lg"
                    : "border-gray-200"
                }`}
              >
                {/* Top section */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                        isUploaded
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <FileText size={20} />
                    </div>

                    <div>
                      <h2 className="font-semibold text-gray-900 leading-snug">
                        {doc.label}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        Format JPG, PNG, atau PDF
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview area */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-dashed border-gray-200 flex items-center justify-center">
                  {isUploaded ? (
                    isImage ? (
                      <img
                        src={fileData as string}
                        alt={doc.label}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-600">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-3">
                          <FileText size={28} />
                        </div>
                        <span className="text-sm font-medium">File berhasil diunggah</span>
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 px-4 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-3">
                        <Camera size={28} />
                      </div>

                      <span className="text-sm font-medium text-gray-600">
                        Drag & drop file di sini
                      </span>

                      <span className="text-xs text-gray-400 mt-1">
                        atau klik tombol upload
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <label className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-medium text-white cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]">
                    <Upload size={16} />
                    {isUploaded ? "Ganti File" : "Upload File"}

                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        handleFileUpload(file, doc.key);
                      }}
                    />
                  </label>

                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      isUploaded
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isUploaded ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {isUploaded ? "Sudah Upload" : "Belum Upload"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}