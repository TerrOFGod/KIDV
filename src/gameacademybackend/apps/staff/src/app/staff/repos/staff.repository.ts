import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StaffEntity } from '../entities/staff.entity';
import { Staff } from '../models/staff.model';

@Injectable()
export class StaffRepository {
  constructor(@InjectModel(Staff.name) private readonly staffModel: Model<Staff>) {}

  async createStaff(staff: StaffEntity) {
    const newStaff = new this.staffModel(staff);
    return newStaff.save();
  }

  async findStaffById(id: string) {
    return this.staffModel.findById(id).exec();
  }

  async findAllStaff(position?: string, researchPosition?: string) {
    const filter: any = {};

    if (position) {
      filter['positions.value'] = { $regex: position, $options: 'i' };
    }

    if (researchPosition) {
      filter.researchPosition = { $regex: researchPosition, $options: 'i' };
    }

    return this.staffModel.find(filter).sort({ name: 1 }).exec();
  }

  async updateStaff(id: string, staff: Partial<StaffEntity>) {
    return this.staffModel.findByIdAndUpdate(id, staff, { new: true }).exec();
  }

  async deleteStaff(id: string) {
    return this.staffModel.findByIdAndDelete(id).exec();
  }

  async searchStaff(searchTerm: string) {
    return this.staffModel
      .find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { 'positions.value': { $regex: searchTerm, $options: 'i' } },
          { researchPosition: { $regex: searchTerm, $options: 'i' } },
          { bio: { $regex: searchTerm, $options: 'i' } },
          { tags: { $regex: searchTerm, $options: 'i' } },
        ],
      })
      .exec();
  }
}
