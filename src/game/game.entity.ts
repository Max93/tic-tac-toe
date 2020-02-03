import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'game' })
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('datetime')
  creation: Date;
  @Column()
  step: number;
  @Column("simple-array")
  sequence: string;
  @Column("simple-array")
  squares: string;
}