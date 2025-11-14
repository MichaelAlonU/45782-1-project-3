import axios from "axios";
import { Meet } from "../models/Meet";
import { MeetDraft } from "../models/MeetDraft";

class MeetingsService {
    async getByTeamsId(teamId: string): Promise<Meet[]> {
        const { data } = await axios.get<Meet[]>(`${import.meta.env.VITE_REST_SERVER_URL}/meetings/by-team/${teamId}`);
        return data;
    }

    // async getByMaxPrice(maxPrice: number): Promise<Game[]> {
    //     const { data } = await axios.get<Game[]>(`${import.meta.env.VITE_REST_SERVER_URL}/games/by-max-price?maxPrice=${maxPrice}`);
    //     return data;
    // }

    async create(draft: MeetDraft): Promise<Meet> {
        const { data } = await axios.post<Meet>(`${import.meta.env.VITE_REST_SERVER_URL}/meetings`, draft);
        return data;
    }

}

export default new MeetingsService();
