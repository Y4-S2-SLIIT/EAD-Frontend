import React from "react";
import { Footer, CSRNavBar } from "../components";
import { Outlet } from "react-router-dom";

const CSRLayout = () => {
    return (
        <div>
            <CSRNavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default CSRLayout;