import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ type: String, format: 'date-time' })
  startDate: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  endDate: Date;

  @ApiProperty({ type: String })
  placeId: string;

  @ApiProperty({ type: String })
  invoiceId: string;
}
