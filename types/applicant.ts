export interface Applicant {
  id: string; // uuid dari pengajuan_magang.id
  nama: string;
  email: string;
  sekolah: string;
  jurusan: string;
  posisi: string;
  alamat: string;
  nohp: string;
  tanggal: string;
  status: string;

  raw_status?: string;
  catatan?: string | null;
}