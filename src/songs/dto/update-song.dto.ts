export class UpdateSongDto {
    readonly title: string;
    readonly artistId: string;
    readonly originChannel: string;
    readonly isFeatured: boolean;
    readonly timestamp: number;
    readonly completedAt?: number;
    readonly unreadCount: number;
    readonly chatResult?: number;
    readonly isDeleted: boolean;
    createdBy: string;

    constructor(data: any) {
        Object.assign(this, data);
    }
}