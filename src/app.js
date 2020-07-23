import React, { useState } from "react";
import Uploader from "./uploader";
import Wardrobe from "./wardrobe";

import { Link, BrowserRouter, Route } from "react-router-dom";

export default function App() {
    const [file, setFile] = useState();
    return (
        <BrowserRouter>
            <div>
                <p>This is the App component</p>

                <Uploader setFile={setFile} file={file} />

                <Wardrobe imageFile={file} />
            </div>
        </BrowserRouter>
    );
}
