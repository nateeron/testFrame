import React from "react";
import "./App.css";
import Main_Section from "../components/Section/Main_Section"; // Assuming Main_Section is a valid component

const App: React.FC = () => {
    return (
        <div className="app-container">
            <div className="top-bar">
              <div>111111</div>
              <div>22222222</div>
            </div>
            <div className="main-content">
                <div className="left-bar">Left Bar</div>
                <div className="main-section">
                    <Main_Section />
                </div>
                <div className="right-bar">Right Bar</div>
            </div>
        </div>
    );
};

export default App;
