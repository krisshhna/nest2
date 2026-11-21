import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service.js';
import { HotelController } from './hotel.controller.js';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelFactory } from './hotel.schema.js';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Hotel.name, schema:HotelFactory}
    ])
  ],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
