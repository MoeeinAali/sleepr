import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @ApiPropertyOptional({ type: String, format: 'date-time' })
  startDate?: Date;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  endDate?: Date;

  @ApiPropertyOptional({ type: String })
  placeId?: string;

  @ApiPropertyOptional({ type: String })
  invoiceId?: string;
}
