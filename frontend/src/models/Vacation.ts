import VacationDraft from "./VacationDraft";

export default interface Vacation extends VacationDraft {
    id: string,
    imageUrl: string,
    createdAt: string,
    isFollowed: boolean,
    // followersCount: number,

};