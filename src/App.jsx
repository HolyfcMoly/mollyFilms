import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./layouts/index";
import '@smastrom/react-rating/style.css'
import SideBar from "./layouts/SideBar";
import styles from "./styles/style";
// import Loading from "./components/Loading";
import Movies from "./pages/Movies";
import MovieInformation from "./pages/MovieInformation";
import MovieList from "./components/MovieList";
import Profile from "./pages/Profile";

function App() {
    return (
        <div className="w-full flex flex-col">
            <BrowserRouter>
                <Header />
                <div className={`${styles.paddingX}`}>
                    <SideBar />
                    <main className={`md:${styles.paddingX} px-0 flex-1 mt-4 sfhd:ml-[22rem] md:ml-[12.5rem] overflow-hidden`}>
                        {/* <Suspense fallback={<Loading />}> */}
                            <Routes>
                                <Route path="/" element={<Movies />} />
                                <Route
                                    exact
                                    path="/movie/:id"
                                    element={<MovieInformation />}
                                />
                                <Route
                                    exact
                                    path="/profile/:id"
                                    element={<Profile />}
                                />
                            </Routes>
                        {/* </Suspense> */}
                    </main>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
