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
  taskContent: string;

  @Column()
  status: string;

  @Column()
  priority: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column()
  frequency: string;

  @Column({ nullable: true })
  result: string;

  @Column('text', { array: true })
  relatedProjects: string[];

  @Column('text', { array: true })
  relatedDepartments: string[];

  @Column({ nullable: true })
  jiraId: string;

  @Column()
  assignee: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
