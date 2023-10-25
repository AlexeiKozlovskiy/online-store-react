import { StylesConfig, ThemeConfig, Theme } from 'react-select';
import { ISelect } from '@/types/types';

export const customStyles: StylesConfig<ISelect, false> = {
  option: (styles, { isSelected }) => ({
    ...styles,
    cursor: 'pointer',
    color: '#747474',
    ':hover': {
      backgroundColor: '#cae0d1 ',
    },
    backgroundColor: isSelected ? '#acbfb2 ' : 'White ',
  }),
  control: (styles) => ({
    ...styles,
    cursor: 'pointer',
    color: '#747474',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#747474',
  }),
};

export const customTheme: ThemeConfig = (theme: Theme) => ({
  ...theme,
  borderRadius: 5,
  colors: {
    ...theme.colors,
    primary: '#9aab9f',
  },
});
