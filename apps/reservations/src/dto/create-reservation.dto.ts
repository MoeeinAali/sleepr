import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @ApiProperty({ type: String, format: 'date-time' })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({ type: String, description: 'ID of the place being reserved' })
  @IsString()
  @IsNotEmpty()
  placeId: string;

  @ApiProperty({ type: String, description: 'ID of the invoice' })
  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
