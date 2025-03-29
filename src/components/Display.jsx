import { Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Table from "./Table"

export default function Display() {
    return (
        <div className="w-[100%] m-2">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/config" element={<Table />} />
            </Routes>
        </div>
    )
}