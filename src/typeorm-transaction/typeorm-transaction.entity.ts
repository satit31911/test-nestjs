/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeOrmTransaction {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  VPN_ID: string;

  @Column()
  EMAIL_ID: string;

  @Column()
  STATUS: string;

  @Column()
  BY_USER_ID: string;

  @Column()
  ACTIVITY_TYPE: string;

  @Column()
  RECORD_ADD_USER: string;

  @Column()
  RECORD_ADD_DATE: Date;
}