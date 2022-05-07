import { ActionForm } from '../Interfaces/IActionForm';

export const MOCK_DATA = {
  boards: [
    {
      id: '1',
      title: 'board #1',
    },
    {
      id: '2',
      title: 'board #2',
    },
    {
      id: '3',
      title: 'board #3',
    },
  ],
};

export const CREATE_BOARD = {
  action: ActionForm.create,
  type: 'board',
};
