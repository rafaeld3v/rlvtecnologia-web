import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  type: string;
  placeholder: string;
}

export function Input({ label, id, register, type, placeholder }: InputProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="text-gray-800">
        {label}
      </label>

      <input
        {...register}
        id={id}
        type={type}
        placeholder={placeholder}
        className="rounded-md border border-gray-300 px-2 py-1"
      />
    </div>
  );
}
