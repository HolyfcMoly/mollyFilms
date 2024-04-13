import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./layouts/index";
import '@smastrom/react-rating/style.css'
import SideBar from "./layouts/SideBar";
import styles from "./styles/style";
// import Loading from "./components/Loading";
import Movies from "./pages/Movies";
import MovieInformation from "./pages/MovieInformation";
import Profile from "./pages/Profile";
import Footer from "./layouts/Footer";
import TvEpisodesInfo from "./pages/TvEpisodesInfo";
import EpisodeInfo from "./pages/EpisodeInfo";

function App() {
    return (
        <div className="w-full flex flex-col">
            <BrowserRouter basename="/mollyFilms">
            {/* <BrowserRouter > */}
                <Header />
                <div className={`${styles.paddingX}`}>
                    <SideBar />
                    <main className={`md:px-8 xss:px-2 pt-1 flex-1  sfhd:ml-[22rem] xl:ml-[16rem] md:ml-[12.5rem] overflow-hidden`}>
                        {/* <Suspense fallback={<SuspencePreload />}> */}
                            <Routes>
                                <Route path="/" element={<Movies />} />
                                <Route
                                    exact
                                    path="/movie/:id"
                                    element={<MovieInformation />}
                                />
                                <Route exact path="/movie/:id/season/:sNumber" element={<TvEpisodesInfo />} />
                                <Route exact path="/movie/:id/season/:sNumber/episode/:eNumber" element={<EpisodeInfo />} />
                                <Route
                                    exact
                                    path="/profile/:id"
                                    element={<Profile />}
                                />
                            </Routes>
                        {/* </Suspense> */}
                        <Footer />
                    </main>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
