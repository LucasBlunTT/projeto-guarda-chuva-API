import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Branch from './Branch';
import Product from './Product';

@Entity('movements')
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destination_branch_id: number;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'destination_branch_id' })
  destinationBranch: Branch;

  @Column()
  product_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'IN_PROGRESS', 'FINISHED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'IN_PROGRESS' | 'FINISHED';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
