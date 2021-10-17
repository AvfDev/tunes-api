import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration/configuration';
import { SongsModule } from './songs/songs.module';

const { user, password, host, database } = configuration().database;

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule
      .forRoot(`mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`),
    SongsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
