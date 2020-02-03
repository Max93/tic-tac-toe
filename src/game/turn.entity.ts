import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GameEntity } from './game.entity';

@Entity({ name: 'turn' })
export class TurnEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('int')
  stepNumber: number;
  @Column("simple-json")
  squares: [][];
  @ManyToOne(type => GameEntity, game => game.turns)
  @JoinColumn({name: 'game_id', referencedColumnName: 'id'})
  game: GameEntity;
}