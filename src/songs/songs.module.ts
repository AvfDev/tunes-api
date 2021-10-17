import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth-service';
import { Song, SongSchema } from './schema/song-schema';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
          name: Song.name,
          useFactory: () => {
              const schema = SongSchema;
              // schema.plugin(basePlugin);
              return schema;
          }
      }
  ]),
  ],
  controllers: [SongsController],
  providers: [SongsService, AuthService]
})
export class SongsModule {}
