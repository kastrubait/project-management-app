import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Body from '../modules/Body/Body';
import BoardPage from '../pages/BoardPage';
import EditProfilePage from '../pages/EditProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import SignUserPage from '../pages/SignUserPage';
import WelcomePage from '../pages/WelcomePage';
import { LOADING_TRUE, unAuthorized } from '../shared/constants';
import { setError } from '../store/reducers/BodySlice';
import { setIsAuthUser } from '../store/reducers/HeaderSlice';
import { useAppDispatch, useAppSelector } from '../store/redux';

const AppRouter = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthUser = useAppSelector((state) => state.header.isAuthUser);
  const error = useAppSelector((state) => state.header.error);
  const errors = useAppSelector((state) => state.body.error);
  const status = useAppSelector((state) => state.header.status);
  const isError = errors || error === unAuthorized;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setIsAuthUser(true));
      if (isError) {
        dispatch(setError(undefined));
        dispatch(setIsAuthUser(false));
        localStorage.clear();
        navigate('/welcomePage');
      }
    }
  }, [dispatch, navigate, isError]);

  if (status === LOADING_TRUE) {
    return <LoadingSpinner />;
  }

  return isAuthUser ? (
    //PrivateRoutes
    <>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route path="/BoardPage/:id" element={<BoardPage />} />
        <Route path="/EditProfilePage" element={<EditProfilePage />} />
        <Route path="/Body" element={<Body />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  ) : (
    //PublicRoutes
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route path="/BoardPage" element={<BoardPage />} />
        <Route path="/signIn/:id" element={<SignUserPage />} />
        <Route path="/Body" element={<Body />} />
        {!isError && <Route path="*" element={<NotFoundPage />} />}
      </Routes>
    </>
  );
};

export default AppRouter;
