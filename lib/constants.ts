export const QUALIFICATION_OPTIONS = [
  { value: "Primary", label: "Primary Education" },
  { value: "Secondary", label: "Secondary Education" },
  { value: "NCE", label: "NCE (National Certificate in Education)" },
  { value: "ND", label: "ND (National Diploma)" },
  { value: "HND", label: "HND (Higher National Diploma)" },
  { value: "BSc", label: "BSc (Bachelor of Science)" },
  { value: "MSc", label: "MSc (Master of Science)" },
  { value: "PhD", label: "PhD (Doctor of Philosophy)" },
  { value: "Professional Certificate", label: "Professional Certificate" },
  { value: "Diploma", label: "Diploma" },
  { value: "Other", label: "Other" }
] as const;

export const QUALIFICATION_VALUES = QUALIFICATION_OPTIONS.map(option => option.value);
