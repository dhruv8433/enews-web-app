export type TypeInput = {
    type: string;
    placeholder: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  };
  