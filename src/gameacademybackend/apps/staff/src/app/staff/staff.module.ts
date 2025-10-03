import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './models/staff.model';
import { StaffRepository } from './repos/staff.repository';
import { StaffCommands } from './staff.commands';
import { StaffQueries } from './staff.queries';
import { StaffService } from './staff.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }])],
  providers: [StaffRepository, StaffService],
  controllers: [StaffCommands, StaffQueries],
})
export class StaffModule {}