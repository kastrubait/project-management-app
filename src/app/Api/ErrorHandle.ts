import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ErrorProps {
  message: string;
}

const errorHandle = (error: AxiosError<ErrorProps>): void => {
  const { response } = error;
  toast.error(response?.data.message);
};

export { errorHandle };
