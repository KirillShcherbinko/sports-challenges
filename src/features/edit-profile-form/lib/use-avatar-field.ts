import { useState } from 'react';

export const useAvatarField = (initialUrl: string | null, setValue: (name: 'avatar', value: File | null) => void) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialUrl);

  const onAvatarChange = (file: File | null) => {
    setValue('avatar', file);
    setAvatarPreview(file ? URL.createObjectURL(file) : initialUrl);
  };

  const onAvatarClear = () => {
    setValue('avatar', null);
    setAvatarPreview(initialUrl);
  };

  return { avatarPreview, onAvatarChange, onAvatarClear };
};
