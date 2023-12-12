import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer } from "./containers/index";
import SideBar from "./pages/SideBar";
import styles from "./styles/style";
import Loading from "./components/Loading";
import Movies from "./components/Movies";
import MovieInformation from "./components/MovieInformation";
import MovieList from "./components/MovieList";
import Profile from "./components/Profile";

function App() {
    return (
        <div className={`${styles.paddingX} w-full flex`}>
            <BrowserRouter>
                <Header />
                <SideBar />
                <main className={`${styles.paddingX} w-full flex-1 mt-28`}>
                    <Suspense fallback={<Loading />}>
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
                    </Suspense>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
