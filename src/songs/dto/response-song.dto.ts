export class ResponseSongDto {
    id: string;
    title: string;
    artistId: string;
    isFeatured: boolean;
    timestamp: number;
    url?: string;
    isDeleted: boolean;
    createdBy: string;

    constructor(data: any) {
        this.id = data._id;
        this.title = data.title;
        this.isFeatured = data.isFeatured;
        this.artistId = data.artistId;
        this.createdBy = data.createdBy;
        this.timestamp = data.timestamp;
        this.url = data.url;
        this.isDeleted = data.isDeleted
    }
}