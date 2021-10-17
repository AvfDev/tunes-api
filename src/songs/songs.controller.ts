import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './schema/song-schema';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {

    constructor(private readonly songService: SongsService) { }

    @Get()
    async findAll(@Query() query: any): Promise<any> {
        return this.songService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<Song> {
        return this.songService.findOne(id);
    }

    @Post()
    async create(@Body() song: any) {
        const newSong = new CreateSongDto(song);
        return await this.songService.createSong(newSong);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
        return this.songService.updateSong(id, updateSongDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.songService.removeSong(id);
    }
}
