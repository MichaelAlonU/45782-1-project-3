import { MeetDraft } from "./MeetDraft";
import { Team } from "./Teams";

export interface Meet extends MeetDraft {
    id: string
    createdAt: string
    updatedAt: string
    team?: Team
}