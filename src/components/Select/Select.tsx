import { customStyles, customTheme } from './SelectCustomStyles';
import { ISelect } from '@/types/types';
import Select from 'react-select';

interface IMySelect {
  selectedItem: ISelect | null;
  handleChange: (selectedOption: ISelect | null) => void;
  options: ISelect[];
}

export function CustomSelect({ selectedItem, handleChange, options }: IMySelect) {
  return (
    <Select
      className="filters-select"
      value={selectedItem}
      onChange={handleChange}
      options={options}
      styles={customStyles}
      theme={customTheme}
    />
  );
}
