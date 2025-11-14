import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import NewMeet from "../../meetings/new/NewMeet";
import Meetings from "../../meetings/list/Meetings";

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/meetings" />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/add-meet" element={<NewMeet />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
