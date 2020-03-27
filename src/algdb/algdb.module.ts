import { Module } from '@nestjs/common';
import { AlgdbController } from './algdb.controller';
import { TypegooseModule } from "nestjs-typegoose";
import {algPuzzles, algAllClass, algtopCaseGroups, algStats, algpuzzleSet, algpuzzleSubSet, algcaseGroup, algCase, ALG } from './db.model';
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://algdb:xiaoye520@localhost:27017/algdb',
    {
        useNewUrlParser:true,
        useFindAndModify:false,
        useCreateIndex:true
    }),
    TypegooseModule.forFeature([...ALG])
  ],


  controllers: [AlgdbController]
})
export class AlgdbModule {}
