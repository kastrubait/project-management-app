import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Body from '../modules/Body/Body';
import BoardPage from '../pages/BoardPage';
import EditProfilePage from '../pages/EditProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import SignUserPage from '../pages/SignUserPage';
import WelcomePage from '../pages/WelcomePage';
import { LOADING_TRUE } from '../shared/constants';
import { useAppSelector } from '../store/redux';

const AppRouter = () => {
  const isAuthUser = useAppSelector((state) => state.header.isAuthUser);
  const status = useAppSelector((state) => state.header.status);

  if (status === LOADING_TRUE) {
    return <LoadingSpinner />;
  }

  return isAuthUser ? (
    //PrivateRoutes
    <>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route path="/BoardPage" element={<BoardPage />} />
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
        <Route path="/signIn" element={<SignUserPage />} />
        <Route path="/Body" element={<Body />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
