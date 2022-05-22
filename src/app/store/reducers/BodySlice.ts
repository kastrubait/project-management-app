import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiService } from '../../Api/ApiService';
import { IBoard, IBoardData } from '../../Interfaces/IBoard';
import { IColumn, IColumnData } from '../../Interfaces/IColumn';
import { ITask } from '../../Interfaces/Interfaces';
import { sortByOrder } from '../../shared/utils/sortByOrder';
import { RootState } from '../store';

export const createBoardThunk = createAsyncThunk(
  'header/createBoardThunk',
  async (data: IBoard, thunkAPI) => {
    try {
      const response = await ApiService.createBoard(data);
      console.log(`response in thunk`, response);

      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const getBoardByIdThunk = createAsyncThunk(
  'header/getBoardTitleThunk',
  async (boardId: string, thunkAPI) => {
    try {
      const response = await ApiService.getBoardById(boardId);
      console.log(`response TITLE in thunk`, response);

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
      thunkAPI.dispatch(getAllBoardThunk());
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
  async ({ id, title, description }: IBoardData, thunkAPI) => {
    try {
      const response = await ApiService.updateBoardById(id, { title, description });
      thunkAPI.dispatch(getAllBoardThunk());
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
  async (data: IColumn, thunkAPI) => {
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
      console.log('start update', state.body.boardId, id, { title, order });
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

export const incrementOrderColumnsThunk = createAsyncThunk(
  'body/incrementOrderColumnsThunk',
  async (allColumns: IColumnData[], thunkAPI) => {
    try {
      for (let index = allColumns.length - 1; index >= 0; --index) {
        const { order } = allColumns[index];
        await thunkAPI.dispatch(updateColumnThunk({ ...allColumns[index], order: order! + 1 }));
      }
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const decrementOrderColumnsThunk = createAsyncThunk(
  'body/decrementOrderColumnsThunk',
  async (allColumns: IColumnData[], thunkAPI) => {
    try {
      for (let index = 0; index <= allColumns.length - 1; ++index) {
        const { order } = allColumns[index];
        await thunkAPI.dispatch(updateColumnThunk({ ...allColumns[index], order: order! - 1 }));
      }
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const deleteColumnThunk = createAsyncThunk(
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

export const createTaskThunk = createAsyncThunk(
  'header/createTaskThunk',
  async (data: ITask, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      if (state.header.userId !== null) {
        const response = await ApiService.createTasksById(
          state.body.boardId,
          state.body.columnId,
          data
        );
        console.log(`test response in createTaskThunk`, response);
        return response;
      }
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);
export const updateTaskThunk = createAsyncThunk(
  'header/updateTaskThunk',
  async (data: ITask, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      if (state.header.userId !== null) {
        const response = await ApiService.updateTasks(
          state.body.boardId,
          state.body.columnId,
          data.id,
          data
        );
        console.log(`test response in updateTaskThunk`, response);
        return response;
      }
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

interface BodyState {
  boards: IBoardData[];
  board: IBoardData;
  boardTitle: string;
  boardId: string;
  columnId: string;
  columns: IColumnData[];
  status: string | null;
  error: string | undefined;
  task: ITask;
  tasks: ITask[];
  taskId: string;
}

const initialState: BodyState = {
  boards: [],
  board: { id: '', title: '', description: '' },
  boardTitle: '',
  boardId: '',
  columnId: '',
  taskId: '',
  columns: [],
  task: {
    boardId: '',
    columnId: '',
    description: '',
    id: '',
    order: null,
    title: '',
    userId: '',
  },
  tasks: [
    {
      boardId: '',
      columnId: '',
      description: '',
      id: '',
      order: null,
      title: '',
      userId: '',
    },
  ],
  status: null,
  error: undefined,
};

export const bodySlice = createSlice({
  name: 'body',

  initialState,
  reducers: {
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
      .addCase(updateBoardThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        // if(action.payload){
        //   di
        // };
        state.status = null;
      })
      .addCase(updateBoardThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    //getBoardbyIdThunk

    builder
      .addCase(getBoardByIdThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(getBoardByIdThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.board = action.payload;
        state.status = null;
      })
      .addCase(getBoardByIdThunk.rejected, (state, action) => {
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
        const tempAarray = [...action.payload];
        state.columns = [...sortByOrder(tempAarray)];
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
        console.log(`update extraReducer:`, action.payload);
        if (action.payload) {
          const tempAarray = state.columns.slice();
          state.columns = [...sortByOrder(tempAarray)];
        }
        state.status = null;
      })
      .addCase(updateColumnThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    // updateAllColumnThunk

    builder
      .addCase(incrementOrderColumnsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(incrementOrderColumnsThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        console.log(`incrementOrder extraReducer:`, action.payload);
        state.status = null;
      })
      .addCase(incrementOrderColumnsThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    // decrementOrderColumnsThunk

    builder
      .addCase(decrementOrderColumnsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(decrementOrderColumnsThunk.fulfilled, (state) => {
        state.status = 'resolved';
        console.log(`decrementOrder extraReducer:`, state);
        state.status = null;
      })
      .addCase(decrementOrderColumnsThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    // deleteColumnThunk

    builder
      .addCase(deleteColumnThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(deleteColumnThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        console.log(`test extraReducer:`, action.payload);
        state.status = null;
      })
      .addCase(deleteColumnThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    // createTaskThunk

    builder
      .addCase(createTaskThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.taskId = action.payload.id;
        state.tasks.push(action.payload);
        console.log(`test task in reducer:`, state.tasks);
        state.status = null;
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    // updateTaskThunk

    builder
      .addCase(updateTaskThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        /* state.taskId = action.payload.id; */
        state.status = null;
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentBoardId } = bodySlice.actions;

export default bodySlice.reducer;
