import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiService } from '../../Api/ApiService';
import { IBoard, IBoardData } from '../../Interfaces/IBoard';
import { IAddColumnSlice, IColumnData } from '../../Interfaces/IColumn';
import { IBodyProps } from '../../Interfaces/Interfaces';
import { RootState } from '../store';

export const createBoardThunk = createAsyncThunk(
  'header/createBoardThunk',
  async (title: string, thunkAPI) => {
    try {
      const response = await ApiService.createBoard(title);
      console.log(`response in thunk`, response);

      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const getBoardTitleThunk = createAsyncThunk(
  'header/getBoardTitleThunk',
  async (boardId: string, thunkAPI) => {
    try {
      const response = await ApiService.getBoardById(boardId);
      console.log(`response in thunk`, response);

      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const deleteBoardThunk = createAsyncThunk(
  'header/deleteBoardThunk',
  async (boardId: string, thunkAPI) => {
    try {
      const response = await ApiService.deleteBoardById(boardId);
      console.log(`response in thunk`, response);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const getAllBoardThunk = createAsyncThunk('header/getAllBoardThunk', async (_, thunkAPI) => {
  try {
    const response = await ApiService.getAllBoard();
    console.log(`response in thunk`, response);

    return response;
  } catch (err) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
});

export const updateBoardThunk = createAsyncThunk(
  'header/ updatetBoardThunk',
  async ({ id, title }: IBoardData, thunkAPI) => {
    try {
      const response = await ApiService.updateBoardById(id, title);
      console.log(`response in thunk`, response);

      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

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
  'body/deleteColumnThunk',
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
  boards: IBoardData[];
  boardTitle: string;
  boardId: string;
  columnId: string;
  columns: IColumnData[];
  status: string | null;
  error: string | undefined;
  bodyData: IBodyProps[];
}

const initialState: BodyState = {
  boards: [],
  boardTitle: '',
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
    //createBoardThunk

    builder
      .addCase(createBoardThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(createBoardThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.boards.push(action.payload);
        state.status = null;
      })
      .addCase(createBoardThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //deleteBoardThunk

    builder
      .addCase(deleteBoardThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(deleteBoardThunk.fulfilled, (state) => {
        state.status = 'resolved';
        state.status = null;
      })
      .addCase(deleteBoardThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //getAllBoardThunk

    builder
      .addCase(getAllBoardThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(getAllBoardThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.boards = [...action.payload];
        state.status = null;
      })
      .addCase(getAllBoardThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //updateBoardThunk

    builder
      .addCase(updateBoardThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(updateBoardThunk.fulfilled, (state) => {
        state.status = 'resolved';
        // state.boards = [...action.payload];
        state.status = null;
      })
      .addCase(updateBoardThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //getBoardTitleThunk

    builder
      .addCase(getBoardTitleThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(getBoardTitleThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.boardTitle = action.payload.title;
        state.status = null;
      })
      .addCase(getBoardTitleThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

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
