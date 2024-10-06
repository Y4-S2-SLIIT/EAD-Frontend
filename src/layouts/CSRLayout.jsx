import React from "react";
import { Footer } from "../components";
import { Outlet } from "react-router-dom";

const CSRLayout = () => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default CSRLayout;