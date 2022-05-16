import { Drone } from 'src/drone/entities/drone.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne((type) => Drone, (drone) => drone.Id, { eager: false })
  Drone: Drone;

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
