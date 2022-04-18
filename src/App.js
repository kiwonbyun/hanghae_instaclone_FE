import React from "react";
import { createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";

import AddPost from "./pages/AddPost";
import DetailPost from "./pages/DetailPost";
import CommentList from "./Component/CommentList";

function App() {

    return (
        <>
            <Routes>
                <Route path="/write" element={<AddPost/>} />
                <Route path="/detail" element={<DetailPost/>} />
                <Route path="/comment" element={<CommentList/>} />
            </Routes>
            <GlobalStyle />
        </>
    );
}

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;