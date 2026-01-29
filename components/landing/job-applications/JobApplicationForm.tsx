"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { availablePositions } from "@/data/landing/job-applications";
import { cn } from "@/lib/utils";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  education: string;
  address: string;
  resume: File | null;
  coverLetter: File | null;
};

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  education: "",
  address: "",
  resume: null,
  coverLetter: null,
};

export function JobApplicationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fieldBase =
    "bg-gray-50 border-0 shadow-sm focus-visible:ring-[3px] focus-visible:ring-ring/30";
  const fieldError = "ring-[3px] ring-destructive/30";
  const selectContentBase = "border-0 shadow-lg select-content-mentul";

  const clearFieldError = (name: string) => {
    if (!formErrors[name]) return;
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
    clearFieldError(name);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = "Nama depan wajib diisi";
    if (!formData.lastName.trim()) errors.lastName = "Nama belakang wajib diisi";

    if (!formData.email.trim()) {
      errors.email = "Email wajib diisi";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Format email tidak valid";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Nomor telepon wajib diisi";
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Format nomor telepon tidak valid";
    }

    if (!formData.position) errors.position = "Posisi wajib dipilih";
    if (!formData.experience) errors.experience = "Pengalaman wajib dipilih";
    if (!formData.education) errors.education = "Pendidikan wajib dipilih";
    if (!formData.address.trim()) errors.address = "Alamat wajib diisi";

    if (!formData.resume) errors.resume = "CV wajib diunggah";

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData(initialFormData);

      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setSubmitSuccess(false), 10000);
    }, 1500);
  };

  return (
    <>
      {submitSuccess && (
        <div className="mb-8">
          <Alert className="bg-green-50 border border-green-100 dark:bg-green-900/20 dark:border-green-800">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-700 dark:text-green-300 font-medium">
              Lamaran Anda berhasil dikirim! Tim kami akan meninjau lamaran Anda dan
              menghubungi jika terpilih untuk tahap selanjutnya.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-6 text-[#b42519]">
          Form Lamaran Kerja
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Informasi Personal</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    Nama Depan <span className="text-[#b42519]">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={cn(fieldBase, formErrors.firstName && fieldError)}
                  />
                  {formErrors.firstName && (
                    <p className="text-sm text-destructive">{formErrors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Nama Belakang <span className="text-[#b42519]">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={cn(fieldBase, formErrors.lastName && fieldError)}
                  />
                  {formErrors.lastName && (
                    <p className="text-sm text-destructive">{formErrors.lastName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-[#b42519]">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(fieldBase, formErrors.email && fieldError)}
                  />
                  {formErrors.email && (
                    <p className="text-sm text-destructive">{formErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Nomor Telepon <span className="text-[#b42519]">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={cn(fieldBase, formErrors.phone && fieldError)}
                  />
                  {formErrors.phone && (
                    <p className="text-sm text-destructive">{formErrors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Job Information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Informasi Pekerjaan</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="position">
                    Posisi yang Dilamar <span className="text-[#C40503]">*</span>
                  </Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => handleSelectChange("position", value)}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        fieldBase,
                        formErrors.position && fieldError
                      )}
                    >
                      <SelectValue placeholder="Pilih posisi" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      align="start"
                      className={selectContentBase}
                    >
                      {availablePositions.map((position) => (
                        <SelectItem
                          key={position.id}
                          value={position.id.toString()}
                        >
                          {position.title} - {position.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.position && (
                    <p className="text-sm text-destructive">{formErrors.position}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">
                    Pengalaman <span className="text-[#C40503]">*</span>
                  </Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) =>
                      handleSelectChange("experience", value)
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        fieldBase,
                        formErrors.experience && fieldError
                      )}
                    >
                      <SelectValue placeholder="Pilih pengalaman" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      align="start"
                      className={selectContentBase}
                    >
                      <SelectItem value="fresh-graduate">Fresh Graduate</SelectItem>
                      <SelectItem value="1-2">1-2 tahun</SelectItem>
                      <SelectItem value="3-5">3-5 tahun</SelectItem>
                      <SelectItem value="5-10">5-10 tahun</SelectItem>
                      <SelectItem value="10+">Lebih dari 10 tahun</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.experience && (
                    <p className="text-sm text-destructive">
                      {formErrors.experience}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">
                    Pendidikan Terakhir <span className="text-[#C40503]">*</span>
                  </Label>
                  <Select
                    value={formData.education}
                    onValueChange={(value) => handleSelectChange("education", value)}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        fieldBase,
                        formErrors.education && fieldError
                      )}
                    >
                      <SelectValue placeholder="Pilih pendidikan" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      align="start"
                      className={selectContentBase}
                    >
                      <SelectItem value="sma">SMA/SMK/Sederajat</SelectItem>
                      <SelectItem value="d3">Diploma (D3)</SelectItem>
                      <SelectItem value="s1">Sarjana (S1)</SelectItem>
                      <SelectItem value="s2">Magister (S2)</SelectItem>
                      <SelectItem value="s3">Doktor (S3)</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.education && (
                    <p className="text-sm text-destructive">
                      {formErrors.education}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">
                    Alamat Lengkap <span className="text-[#C40503]">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className={cn(fieldBase, formErrors.address && fieldError)}
                  />
                  {formErrors.address && (
                    <p className="text-sm text-destructive">{formErrors.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-lg font-medium mb-4">Dokumen</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resume">
                    CV/Resume <span className="text-[#C40503]">*</span>
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className={cn(fieldBase, formErrors.resume && fieldError)}
                    />
                    {formData.resume && (
                      <span className="text-sm text-green-600 dark:text-green-400">
                        ✓ {formData.resume.name}
                      </span>
                    )}
                  </div>
                  {formErrors.resume ? (
                    <p className="text-sm text-destructive">{formErrors.resume}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Format: PDF, DOC, atau DOCX (Maks. 5MB)
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Surat Lamaran (Opsional)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="coverLetter"
                      name="coverLetter"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className={fieldBase}
                    />
                    {formData.coverLetter && (
                      <span className="text-sm text-green-600 dark:text-green-400">
                        ✓ {formData.coverLetter.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Format: PDF, DOC, atau DOCX (Maks. 5MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C40001] hover:bg-[#C40503] text-white h-12 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Mengirim Lamaran...
                  </>
                ) : (
                  "Kirim Lamaran"
                )}
              </Button>
              <p className="text-xs text-center text-gray-500 mt-3">
                Dengan mengirim lamaran, Anda menyetujui bahwa data Anda akan diproses
                sesuai dengan kebijakan privasi kami.
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

