import { useState } from 'react';

export const useFileField = <TFieldName extends string>(
  fieldName: TFieldName,
  initialUrl: string | null,
  setValue: (name: TFieldName, value: File | null) => void
) => {
  const [preview, setPreview] = useState<string | null>(initialUrl);

  const onChange = (file: File | null) => {
    setValue(fieldName, file);
    setPreview(file ? URL.createObjectURL(file) : initialUrl);
  };

  const onClear = () => {
    setValue(fieldName, null);
    setPreview(initialUrl);
  };

  return { preview, onChange, onClear };
};