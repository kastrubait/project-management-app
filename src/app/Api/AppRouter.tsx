import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Body from '../modules/Body/Body';
import NotFoundPage from '../pages/NotFoundPage';
import SignUserPage from '../pages/SignUserPage';
import WelcomePage from '../pages/WelcomePage';
import { LOADING_TRUE } from '../shared/constants';
import { setIsAuthUser } from '../store/reducers/HeaderSlice';
import { useAppDispatch, useAppSelector } from '../store/redux';

const AppRouter = () => {
  const BoardPage = lazy(() => import('../pages/BoardPage'));
  const EditProfilePage = lazy(() => import('../pages/EditProfilePage'));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthUser = useAppSelector((state) => state.header.isAuthUser);
  const userId = useAppSelector((state) => state.header.userId);
  const error = useAppSelector((state) => state.header.error);
  const errors = useAppSelector((state) => state.body.error);

  const status = useAppSelector((state) => state.header.status);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setIsAuthUser(true));
    }
  }, [dispatch, userId, navigate, errors, error]);

  if (status === LOADING_TRUE) {
    return <LoadingSpinner />;
  }

  return isAuthUser ? (
    //PrivateRoutes
    <>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route
          path="/BoardPage/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <BoardPage />
            </Suspense>
          }
        />

        <Route
          path="/EditProfilePage"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <EditProfilePage />
            </Suspense>
          }
        />
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
        <Route
          path="/BoardPage"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <BoardPage />
            </Suspense>
          }
        />
        <Route path="/signIn/:id" element={<SignUserPage />} />
        <Route path="/Body" element={<Body />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
