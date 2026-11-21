import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection:'hotels', timestamps:true})
export class Hotel{
    @Prop({type:String, required:true})
    name:string;

    @Prop({type:String, required:true})
    location:string;

    @Prop({type:String, required:true, unique:true})
    email:string;

    @Prop({type:Number, required:true})
    ratings:number;

    @Prop({type:Number, required:true})
    phone:number;

    @Prop({type:Number, required:true})
    pincode:number;

    @Prop({type:Number, required:true})
    per_night:number;

    @Prop({type:Array, required:true})
    amenities:[];

    @Prop({type:Number, required:true})
    cal:number;

    @Prop({type:String, required:true})
    status:string;

    @Prop({type:String, required:true})
    userId:string;
}
export const HotelFactory = SchemaFactory.createForClass(Hotel);