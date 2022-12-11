import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav, Footer } from './components';
import {
  Canvas,
  HomePage,
  NotFound,
  ArtworkList,
  ArtworkDetails,
  Auth,
  AuthContextProvider,
  AddArtwork,
  EditArtwork,
  EditProfile,
  ManageDb,
} from './features';

import './fonts/CgMatra-Medium.ttf';
import styles from './App.module.css';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className={styles.pageContainer}>
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/canvas" element={<Canvas />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/login/edit/:userId" element={<EditProfile />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/managedb" element={<ManageDb />} />
            <Route path="/artworks/:page" element={<ArtworkList />} />
            <Route path="/managedb/add" element={<AddArtwork />} />
            <Route path="/managedb/edit/:artworkId" element={<EditArtwork />} />
            <Route
              path="/artworks/:page/:artworkId"
              element={<ArtworkDetails />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export { App };
