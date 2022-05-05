import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHeaderProps } from '../../Interfaces/Interfaces';

interface HeaderState {
  headerData: IHeaderProps[];
}

const initialState: HeaderState = {
  headerData: [
    {
      module: 'blablo',
      nextModule: false,
    },
  ],
};

export const headerSlice = createSlice({
  name: 'header',

  initialState,
  reducers: {
    setHeaderData: (state, action: PayloadAction<IHeaderProps[]>) => {
      state.headerData = action.payload;
    },
  },
});

export const { setHeaderData } = headerSlice.actions;

export default headerSlice.reducer;
