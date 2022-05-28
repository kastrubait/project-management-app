import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiService } from '../../Api/ApiService';
import { IBoard, IBoardData } from '../../Interfaces/IBoard';
import { IColumn, IColumnData, IColumnWithTasks } from '../../Interfaces/IColumn';
import { ITask, ITaskData, IUpdateTask, IDeleteTask } from '../../Interfaces/ITask';
import { sortByOrder } from '../../shared/utils/sortByOrder';
import { RootState } from '../store';
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
      const data: IColumnWithTasks[] = response;
      thunkAPI.dispatch(setInitialTasks());
      thunkAPI.dispatch(getAllUsers());
      if (data[0].id) {
        data.forEach((item) => {
          thunkAPI.dispatch(getAllTaskColumnThunk(item.id));
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
  'body/createTaskThunk',
  async (data: ITask, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const response = await ApiService.createTasks(state.body.boardId, state.body.columnId, {
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
  'body/getTaskThunk',
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
  'body/updateTaskThunk',
  async ({ columnId, taskId, newData }: IUpdateTask, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      if (state.header.userId !== null) {
        console.log('boardId->', state.body.boardId, columnId, newData.columnId);
        const response = await ApiService.updateTasks(columnId, taskId, newData);
        thunkAPI.dispatch(getAllColumnThunk(state.body.boardId ?? ''));
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
  'body/deleteTaskThunk',
  async ({ taskId, columnId }: IDeleteTask, thunkAPI) => {
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
  boardId: string;
  columnId: string;
  column: IColumnWithTasks;
  columns: IColumnWithTasks[];
  status: string | null;
  error: string | undefined;
  task: ITaskData;
  tasks: ITaskData[];
  taskId: string;
}

const initialState: BodyState = {
  boards: [],
  board: { id: '', title: '', description: '' },
  boardId: '',
  columnId: '',
  taskId: '',
  columns: [],
  column: { id: '', title: '', order: 0, tasks: [] },
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
    setArrayTasksToColumn: (state, action: PayloadAction<ITaskData[]>) => {
      const { columnId } = action.payload[0];
      const index = state.columns.findIndex((el) => el.id === columnId);
      console.log('set array->', index, action.payload);
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
        const { columnId } = action.payload;
        const index = state.columns.findIndex((el) => el.id === columnId);
        state.columns[index].tasks?.push(action.payload);
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

    // updateTaskThunk

    builder
      .addCase(updateTaskThunk.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.status = 'resolved';
        console.log(`update extraReducer:`, action.payload);
        if (action.payload) {
          const tempAarray = state.columns.slice();
          state.columns = [...sortByOrder(tempAarray)];
        }
        state.status = null;
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentBoardId,
  setCurrentColumnId,
  setInitialTasks,
  setInitialColumns,
  setCurrentTaskd,
  setArrayTasksToColumn,
} = bodySlice.actions;

export default bodySlice.reducer;
