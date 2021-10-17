import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth-service';
import { PaginatedRequestDto } from 'src/shared/dto/paginated.dto';
import { CreateSongDto } from './dto/create-song-dto';
import { ResponseSongDto } from './dto/response-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './schema/song-schema';

@Injectable()
export class SongsService {

    constructor(
        @InjectModel(Song.name) private songModel: Model<Song>,
        private readonly authSrvc: AuthService,
    ) {
    }

    async createSong(createSongDto: CreateSongDto): Promise<Song> {
        createSongDto.createdBy = this.authSrvc.currentUserId;
        const createNewSong = new this.songModel(createSongDto);
        const newSong = await createNewSong.save();
        return newSong;
    }

    async findOne(id: string) {
        const song = await this.songModel.findById(id);
        return song;
    }

    async findAll(paginationInfo: PaginatedRequestDto): Promise<any> {
        const pagination = new PaginatedRequestDto(
            paginationInfo.pageSize,
            paginationInfo.pageNumber,
            paginationInfo.searchString,
            paginationInfo.filters
        );

        const query = this.songModel
            .find()
            .sort({ timestamp: -1 })
            .limit(pagination.pageSize)
            .skip(pagination.skip);

        const queryCounter = this.songModel.countDocuments();
        const filters = [];

        if (pagination?.filters) {
            if (pagination.filters?.title) {
                filters.push({ 'title': { $regex: new RegExp(`${pagination.filters?.title}`, 'i') } });
            }

            if (pagination.filters?.isFeatured) {
                filters.push({ 'isFeatured': { $eq: +pagination.filters.isFeatured } });
            }

            if (pagination.filters?.date) {
                const filterTimestampStart = new Date(pagination.filters.date);
                filterTimestampStart.setHours(0, 0, 0);
                const filterTimestampEnd = new Date(filterTimestampStart);
                filterTimestampEnd.setHours(23, 59, 59)
                filters.push({ 'timestamp': { $gte: filterTimestampStart.getTime() / 1000, $lt: filterTimestampEnd.getTime() / 1000 } });
            }

            if (pagination.filters?.userId) {
                filters.push({ 'members': { $in: [`${pagination.filters.userId}`] } });
            }

            if (pagination.filters?.chatResult) {
                filters.push({ 'chatResult': { $eq: +pagination.filters.chatResult } });
            }
        }

        if (filters.length) {
            for (const filter of filters) {
                query.and(filter);
                queryCounter.and(filter);
            }
        }

        const count = await queryCounter;
        const documents = await query;

        const responseSongs: ResponseSongDto[] = [];

        for (const song of documents) {
            const newSong = new ResponseSongDto(song);
            responseSongs.push(newSong);
        }

        return { data: responseSongs, totalRecords: count };
    }

    async updateSong(id: string, updateSongDto: UpdateSongDto) {
        return this.songModel.findByIdAndUpdate(id, updateSongDto, { new: true, useFindAndModify: false });
    }

    async removeSong(id: string) {
        const songToRemove = this.songModel.findByIdAndUpdate(
            id, { isDeleted: true }
        );
        return songToRemove.exec();
    }
}
