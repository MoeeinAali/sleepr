import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@sleepr/common/database/abstract.repository';
import { Reservation } from './models/reservation.schema';

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservation> {}
