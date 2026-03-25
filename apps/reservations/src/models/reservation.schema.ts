import { Schema } from '@nestjs/mongoose';
import { AbstractDocument } from '@sleepr/common/database/abstract.schema';

@Schema({ versionKey: false })
export class Reservation extends AbstractDocument {
    
}
