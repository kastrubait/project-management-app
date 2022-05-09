import { Route, Routes } from 'react-router-dom';
import Body from '../modules/Body/Body';
import BoardPage from '../pages/BoardPage';
import EditProfilePage from '../pages/EditProfilePage';
import WelcomePage from '../pages/WelcomePage';

//import { useAuth } from '../Firebase/firebase';

const AppRouter = () => {
  // const currentUser = useAuth();

  const currentUser = true;

  return currentUser ? (
    //PrivateRoutes
    <>
      <Routes>
        <Route path="/welcomePage" element={<WelcomePage />} />
        {/* <Route path="/" element={<WelcomePage />} /> */}
        <Route path="/BoardPage/:id" element={<BoardPage />} />
        <Route path="/EditProfilePage" element={<EditProfilePage />} />
        <Route path="/Body" element={<Body />} />
        <Route path="/" element={<Body />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </>
  ) : (
    //PublicRoutes
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route path="/" element={<Body />} />
        <Route path="/Body" element={<Body />} />
        <Route path="/BoardPage" element={<BoardPage />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
