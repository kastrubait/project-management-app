import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Body from '../modules/Body/Body';
import BoardPage from '../pages/BoardPage';
import EditProfilePage from '../pages/EditProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import SignUserPage from '../pages/SignUserPage';
import WelcomePage from '../pages/WelcomePage';
import { LOADING_TRUE } from '../shared/constants';
import { setIsAuthUser } from '../store/reducers/HeaderSlice';
import { useAppDispatch, useAppSelector } from '../store/redux';

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const isAuthUser = useAppSelector((state) => state.header.isAuthUser);
  const status = useAppSelector((state) => state.header.status);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(setIsAuthUser(true));
    }
  }, [dispatch]);

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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
