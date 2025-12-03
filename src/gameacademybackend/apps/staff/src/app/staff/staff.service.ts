import { Injectable } from '@nestjs/common';
import { StaffRepository } from './repos/staff.repository';
import { StaffEntity } from './entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(private readonly staffRepository: StaffRepository) {}

  async createStaff(dto: any) {
    const existingStaff = await this.staffRepository.findStaffById(dto._id);
    if (existingStaff) {
      throw new Error('Staff with this slug already exists');
    }

    const staffEntity = new StaffEntity(dto);
    const newStaff = await this.staffRepository.createStaff(staffEntity);
    return { id: newStaff._id.toString() };
  }

  async getStaffById(id: string) {
    const staff = await this.staffRepository.findStaffById(id);
    if (!staff) {
      throw new Error('Staff not found');
    }
    return new StaffEntity(staff.toObject()).getPublicInfo();
  }

  async getStaffList(position?: string, researchPosition?: string) {
    const staff = await this.staffRepository.findAllStaff(position, researchPosition);
    return staff.map((item) => new StaffEntity(item.toObject()).getPublicInfo());
  }

  async updateStaff(dto: any) {
    const existingStaff = await this.staffRepository.findStaffById(dto.id);
    if (!existingStaff) {
      throw new Error('Staff not found');
    }

    const staffEntity = new StaffEntity(dto);
    await this.staffRepository.updateStaff(dto.id, staffEntity);
    return { success: true };
  }

  async deleteStaff(id: string) {
    const result = await this.staffRepository.deleteStaff(id);
    if (!result) {
      throw new Error('Staff not found');
    }
    return { success: true };
  }

  async searchStaff(searchTerm: string) {
    const staff = await this.staffRepository.searchStaff(searchTerm);
    return staff.map((item) => new StaffEntity(item.toObject()).getPublicInfo());
  }
}
