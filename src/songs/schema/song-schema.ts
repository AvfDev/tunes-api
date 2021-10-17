import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Song extends mongoose.Document {
    @Prop()
    title: string;

    @Prop()
    url: string;

    @Prop()
    artistId: string;

    @Prop()
    timestamp: number;

    @Prop()
    isFeatured: boolean;

    @Prop()
    isDeleted: boolean;

    @Prop()
    createdBy: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);