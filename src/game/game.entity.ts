import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TurnEntity } from './turn.entity';

@Entity({ name: 'game' })
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  dimension: number;
  @Column('datetime')
  creation: Date;
  @Column("simple-json")
  sequence: string[];
  @OneToMany(type => TurnEntity, turn => turn.game)
  turns: TurnEntity[];
}