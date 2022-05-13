import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiService } from '../../Api/ApiService';
import { IAddColumnSlice, IColumnData } from '../../Interfaces/IColumn';
import { IBodyProps } from '../../Interfaces/Interfaces';
import { RootState } from '../store';

export const getAllColumnThunk = createAsyncThunk(
  'body/getAllColumnThunk',
  async (boardId: string, thunkAPI) => {
    try {
      const response = await ApiService.getAllColumn(boardId);
      console.log(`column response`, response);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const createColumnThunk = createAsyncThunk(
  'body/addColumnThunk',
  async ({ data }: IAddColumnSlice, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await ApiService.createColumn(state.body.boardId, data);
      console.log(`column response`, response);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const updateColumnThunk = createAsyncThunk(
  'body/updateColumnThunk',
  async ({ id, title, order }: IColumnData, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await ApiService.updateColumnById(state.body.boardId, id, { title, order });
      console.log(`column response`, response);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const deleteСolumnThunk = createAsyncThunk(
  'header/deleteColumnThunk',
  async (columnId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await ApiService.deleteColumnById(state.body.boardId, columnId);
      console.log(`response in thunk`, response);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

interface BodyState {
  boardId: string;
  columnId: string;
  columns: IColumnData[];
  status: string | null;
  error: string | undefined;
  bodyData: IBodyProps[];
}

const initialState: BodyState = {
  boardId: '',
  columnId: '',
  columns: [],
  status: null,
  error: undefined,
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
    setCurrentBoardId: (state, action: PayloadAction<string>) => {
      state.boardId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getAllColumnThunk

    builder
      .addCase(getAllColumnThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(getAllColumnThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.columns = [...action.payload];
        state.status = null;
      })
      .addCase(getAllColumnThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    // createColumnThunk

    builder
      .addCase(createColumnThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(createColumnThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        console.log(`test extraReducer:`, action.payload);
        state.columns.push(action.payload);
        state.status = null;
      })
      .addCase(createColumnThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    // updateColumnThunk

    builder
      .addCase(updateColumnThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(updateColumnThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        console.log(`test extraReducer:`, action.payload);
        state.status = null;
      })
      .addCase(updateColumnThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    // deleteColumnThunk

    builder
      .addCase(deleteСolumnThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(deleteСolumnThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        console.log(`test extraReducer:`, action.payload);
        state.status = null;
      })
      .addCase(deleteСolumnThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export const { setBodyData, setCurrentBoardId } = bodySlice.actions;

export default bodySlice.reducer;
