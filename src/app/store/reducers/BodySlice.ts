import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiService } from '../../Api/ApiService';
import { TaskForm } from '../../components/Task/Task';
import { IBoard, IBoardData } from '../../Interfaces/IBoard';
import { IColumn, IColumnData } from '../../Interfaces/IColumn';
import { DeleteTask } from '../../Interfaces/Interfaces';
import { ITask, ITaskData } from '../../Interfaces/ITask';
import { sortByOrder } from '../../shared/utils/sortByOrder';
import { RootState, store } from '../store';
import { getAllUsers } from './HeaderSlice';

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
      const data: IColumnData[] = response;
      thunkAPI.dispatch(setInitialTasks());
      thunkAPI.dispatch(getAllUsers());
      if (data[0].id) {
        data.forEach((item) => {
          console.log(item.id);
          store.dispatch(getAllTaskColumnThunk(item.id));
        });
      }
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
      thunkAPI.dispatch(getAllColumnThunk(state.body.boardId));
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
      thunkAPI.dispatch(getAllColumnThunk(state.body.boardId));
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
  async (data: TaskForm, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const response = await ApiService.createTasksById(state.body.boardId, state.body.columnId, {
        ...data,
        userId: localStorage.getItem('userId') as string,
      });
      console.log(`test response in createTaskThunk`, response);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const getAllTaskColumnThunk = createAsyncThunk(
  'header/getTaskThunk',
  async (columnId: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const response = await ApiService.getAllTasks(state.body.boardId, columnId);
      console.log(`test response in getAllTaskThunk`, response);
      return response;
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
        const response = await ApiService.updateTasks(data, state.body.taskId);
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

export const deleteTaskThunk = createAsyncThunk(
  'header/deleteTaskThunk',
  async ({ taskId, columnId }: DeleteTask, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const response = await ApiService.deleteTasksById(state.body.boardId, columnId, taskId);
      console.log(`test response in deleteTaskThunk`, response.status);
      return taskId;
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
  task: ITaskData;
  tasks: ITaskData[];
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
    order: 0,
    title: '',
    userId: '',
  },
  tasks: [],
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
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setCurrentColumnId: (state, action: PayloadAction<string>) => {
      state.columnId = action.payload;
    },
    setCurrentTaskd: (state, action: PayloadAction<string>) => {
      state.taskId = action.payload;
    },
    setInitialColumns: (state) => {
      state.columns = [];
    },
    setInitialTasks: (state) => {
      state.tasks = [];
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
        state.status = null;
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    // deleteTaskThunk

    builder
      .addCase(deleteTaskThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.tasks = state.tasks.filter((task) => task.id !== action.payload && task);
        state.status = null;
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });

    // getAllTaskColumnThunk

    builder
      .addCase(getAllTaskColumnThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(getAllTaskColumnThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        if (action.payload.length) {
          if (state.tasks.length) {
            if (state.tasks.every((item) => item.columnId !== action.payload[0].columnId)) {
              state.tasks = state.tasks.concat(action.payload);
            }
          } else {
            state.tasks = state.tasks.concat(action.payload);
          }
        }
      })
      .addCase(getAllTaskColumnThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export const {
  setError,
  setCurrentBoardId,
  setCurrentColumnId,
  setInitialTasks,
  setInitialColumns,
  setCurrentTaskd,
} = bodySlice.actions;

export default bodySlice.reducer;
