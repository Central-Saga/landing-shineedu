export interface MuridState {
  nama_lengkap: string;
  no_hp: string;
  email: string;
  jenis_kelamin: "" | "L" | "P";
  tanggal_lahir: string;
  alamat: string;
}

export interface WaliState {
  nama_wali: string;
  email_wali: string;
  no_hp_wali: string;
  hubungan_wali: string;
}

export const defaultMurid: MuridState = {
  nama_lengkap: "",
  no_hp: "",
  email: "",
  jenis_kelamin: "",
  tanggal_lahir: "",
  alamat: "",
};

export const defaultWali: WaliState = {
  nama_wali: "",
  email_wali: "",
  no_hp_wali: "",
  hubungan_wali: "",
};
