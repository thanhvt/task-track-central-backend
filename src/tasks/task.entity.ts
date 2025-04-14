import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ITask } from './interfaces/task.interface';

@Entity('tasks')
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  taskType: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: string;

  @Column()
  priority: string;

  @Column({ type: 'datetime', nullable: true })
  startDate?: Date;

  @Column({ type: 'datetime', nullable: true })
  endDate?: Date;

  @Column({ type: 'datetime', nullable: true })
  dueDate?: Date;

  @Column()
  frequency: string;

  @Column({ nullable: true })
  result?: string;

  @Column('simple-array')
  relatedProjects: string[];

  @Column('simple-array')
  relatedDepartments: string[];

  @Column({ nullable: true })
  jiraId?: string;

  @Column()
  assignee: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
