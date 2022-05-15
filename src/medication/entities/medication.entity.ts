import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Name: string;

  @Column()
  Weight: number;

  @Column({ unique: true })
  Code: string;

  @Column()
  Image: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  CreatedAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  UpdatedAt: Date;
}
