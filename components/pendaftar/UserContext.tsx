"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type StatusType =
  | "tidak_aktif"
  | "mengajukan"
  | "verifikasi"
  | "wawancara"
  | "diterima"
  | "ditolak";

interface UserDataType {
  pribadi: any;
  pendidikan: any;
}

interface DocumentType {
  kartuPelajar?: string;
  ktp?: string;
  cv?: string;
  suratPengantar?: string;
  pasFoto?: string;
}

interface UserContextType {
  photo: string | null;
  setPhoto: (value: string | null) => void;

  status: StatusType;
  setStatus: (value: StatusType) => void;

  userData: UserDataType | null;
  setUserData: (value: UserDataType) => void;

  documents: DocumentType;
  setDocuments: (value: DocumentType) => void;
}



const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusType>("tidak_aktif");
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [documents, setDocuments] = useState<DocumentType>({});

  /* LOAD LOCAL STORAGE */
  useEffect(() => {
    const savedPhoto = localStorage.getItem("user-photo");
    const savedStatus = localStorage.getItem("user-status");
    const savedUser = localStorage.getItem("user-data");
    const savedDocs = localStorage.getItem("user-documents");

    if (savedPhoto) setPhoto(savedPhoto);
    if (savedStatus) setStatus(savedStatus as StatusType);
    if (savedUser) setUserData(JSON.parse(savedUser));
    if (savedDocs) setDocuments(JSON.parse(savedDocs));
  }, []);

  /* SAVE LOCAL STORAGE */
  useEffect(() => {
    if (photo) localStorage.setItem("user-photo", photo);
    localStorage.setItem("user-status", status);
    if (userData)
      localStorage.setItem("user-data", JSON.stringify(userData));
    localStorage.setItem(
      "user-documents",
      JSON.stringify(documents)
    );
  }, [photo, status, userData, documents]);

  return (
    <UserContext.Provider
      value={{
        photo,
        setPhoto,
        status,
        setStatus,
        userData,
        setUserData,
        documents,
        setDocuments,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be inside provider");
  return context;
}