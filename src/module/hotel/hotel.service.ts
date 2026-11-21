import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel } from './hotel.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel.name) public _hotel:Model<Hotel>){}

  async create(data:any) {
    let add = await this._hotel.create(data);
    return add._id;
  }

  async findAll(data:any){
    let limit = 10;
    let skip = (data.page - 1) * limit;
    let condition = Object.fromEntries(new URLSearchParams(data.query));

    let [hotel, count, location] = await Promise.all([
      this._hotel.find(condition).skip(skip).limit(limit).sort({_id:-1}),
      this._hotel.countDocuments(),
      this._hotel.aggregate([{$group:{_id:'$location'}}])
    ]);
    return {hotel, pagination:{count, limit, page:Number(data.page), total:Math.ceil(count/limit)}, location};
  }

  async findOne(id: string) {
    return await this._hotel.findOne({_id:id}).exec();
  }

  async update(rec:any) {
    return await this._hotel.updateOne({_id:rec.id}, rec); 
  }

  async remove(id: string) {
    return await this._hotel.deleteOne({_id:id});
  }
}
