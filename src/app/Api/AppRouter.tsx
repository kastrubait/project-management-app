import { Route, Routes } from 'react-router-dom';
import Body from '../modules/Body/Body';
import BoardPage from '../pages/BoardPage';
import EditProfilePage from '../pages/EditProfilePage';
import SignUserPage from '../pages/SignUserPage';
import WelcomePage from '../pages/WelcomePage';
import { useAppSelector } from '../store/redux';

const AppRouter = () => {
  // const isAuthUser = true;
  const isAuthUser = useAppSelector((state) => state.header.isAuthUser);

  return isAuthUser ? (
    //PrivateRoutes
    <>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route path="/BoardPage/:id" element={<BoardPage />} />
        <Route path="/EditProfilePage" element={<EditProfilePage />} />
        <Route path="/Body" element={<Body />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </>
  ) : (
    //PublicRoutes
    <>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route path="/BoardPage" element={<BoardPage />} />
        <Route path="/sign/:id" element={<SignUserPage />} />
        <Route path="/Body" element={<Body />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
