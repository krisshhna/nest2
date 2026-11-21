import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelService } from './hotel.service.js';
import { CreateHotelDto } from './dto/create-hotel.dto.js';
import { UpdateHotelDto } from './dto/update-hotel.dto.js';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @MessagePattern('createHotel')
  create(@Payload() rec:any) {
    return this.hotelService.create(rec).then((data)=>({
      result: data
    })).catch((err)=>({
      message:  `Internal issue ${err}`
    }))
  }

  @MessagePattern('allHotel')
  findAll(@Payload() data:any){
    return this.hotelService.findAll(data).then((data)=>({
      result: data
    })).catch((err)=>({
      message:  `Issue in the record ${err}`
    }));
  }

  @MessagePattern('singleHotel')
  findOne(@Payload() data:any) {
    let id = data
    return this.hotelService.findOne(id).then((data)=>({
      result: data
    })).catch((err)=>({
      message:`Internal issue ${err}`
    }))
  }

  @MessagePattern('updateHotel')
  update(@Payload() rec:any) {
    return this.hotelService.update(rec).then((data)=>({
      result: data
    })).catch((err)=>({
      message:  `Internal issue ${err}`
    }))
  }

  @MessagePattern('removeHotel')
  remove(@Param() data:any) {
    let id = data;
    return this.hotelService.remove(id).then((data)=>({
      result: data
    })).catch((err)=>({
      message:  `Error message ${err}`
    }))
  }
}
