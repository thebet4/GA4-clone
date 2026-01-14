import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('daily_metrics')
@Unique(['projectId', 'date', 'metricName'])
export class DailyMetric {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'uuid', name: 'project_id' })
  @Index()
  projectId!: string

  @Column({ type: 'date' })
  @Index()
  date!: string

  @Column({ type: 'varchar', name: 'metric_name' })
  metricName!: string

  @Column({ type: 'bigint', name: 'metric_value', default: 0 })
  metricValue!: string | number

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt!: Date
}
