import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    Landing
} from "../pages";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
            </Routes>
        </Router>
    )
}
