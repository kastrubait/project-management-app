import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBodyProps } from '../../Interfaces/Interfaces';

interface BodyState {
  bodyData: IBodyProps[];
}

const initialState: BodyState = {
  bodyData: [
    {
      module: 'blablo',
      nextModule: false,
    },
  ],
};

export const bodySlice = createSlice({
  name: 'body',

  initialState,
  reducers: {
    setBodyData: (state, action: PayloadAction<IBodyProps[]>) => {
      state.bodyData = action.payload;
    },
  },
});

export const { setBodyData } = bodySlice.actions;

export default bodySlice.reducer;
