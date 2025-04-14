import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  taskType: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 'todo' })
  status: string;

  @Column({ default: 'medium' })
  priority: string;

  @Column({ type: 'datetime2', nullable: true })
  startDate: Date;

  @Column({ type: 'datetime2', nullable: true })
  endDate: Date;

  @Column({ type: 'datetime2', nullable: true })
  dueDate: Date;

  @Column()
  frequency: string;

  @Column({ nullable: true })
  result: string;

  @Column('nvarchar', { array: false })
  relatedProjects: string;

  @Column('nvarchar', { array: false })
  relatedDepartments: string;

  @Column({ nullable: true })
  jiraId: string;

  @Column()
  assignee: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
