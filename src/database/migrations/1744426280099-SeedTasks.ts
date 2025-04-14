import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTasks1744426280099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            -- Insert tasks data
            INSERT INTO tasks (
                id,
                "taskType",
                title,
                taskContent,
                status,
                priority,
                "startDate",
                "endDate",
                "dueDate",
                frequency,
                result,
                "relatedProjects",
                "relatedDepartments",
                "jiraId",
                assignee,
                "createdAt",
                "updatedAt"
            ) VALUES
            -- Development Tasks
            ('t1', 'development', 'Implement user authentication', 'Create login and registration functionality with JWT', 'in-progress', 'high', '2024-01-01', NULL, '2024-01-15', 'once', '', ARRAY['p1', 'p2'], ARRAY['d1', 'd2'], 'RLOS-123', 'm1', '2024-01-01', '2024-04-11'),
            ('t2', 'development', 'Fix API response time', 'Optimize database queries and add caching', 'todo', 'medium', '2024-03-01', NULL, '2024-03-15', 'once', '', ARRAY['p3'], ARRAY['d1'], 'AVS-456', 'm2', '2024-03-01', '2024-04-11'),
            ('t3', 'development', 'Add new feature to dashboard', 'Implement real-time data visualization', 'done', 'high', '2024-04-01', '2024-04-15', '2024-04-15', 'once', 'Successfully implemented with 100% test coverage', ARRAY['p4'], ARRAY['d2'], 'CRCS-789', 'm1', '2024-04-01', '2024-04-15'),

            -- Project Tasks
            ('t4', 'project', 'Project kickoff meeting', 'Initial project planning and requirements gathering', 'done', 'medium', '2024-01-15', '2024-01-15', '2024-01-15', 'once', 'Project scope defined and timeline established', ARRAY['p5'], ARRAY['d3', 'd4'], 'AWS-101', 'm4', '2024-01-15', '2024-01-15'),
            ('t5', 'project', 'System architecture review', 'Review and update system architecture documentation', 'in-progress', 'high', '2024-03-15', NULL, '2024-03-31', 'once', '', ARRAY['p6'], ARRAY['d2'], 'ECM-202', 'm5', '2024-03-15', '2024-04-11'),
            ('t6', 'project', 'Deployment planning', 'Plan production deployment and rollback strategy', 'todo', 'medium', '2024-04-01', NULL, '2024-04-15', 'once', '', ARRAY['p7'], ARRAY['d1', 'd5'], 'C06-303', 'm6', '2024-04-01', '2024-04-11'),

            -- Documentation Tasks
            ('t7', 'documentation', 'API documentation update', 'Update API documentation with new endpoints', 'todo', 'low', '2024-01-01', NULL, '2024-01-31', 'once', '', ARRAY['p8'], ARRAY['d2'], 'HDDT-404', 'm7', '2024-01-01', '2024-04-11'),
            ('t8', 'documentation', 'User manual revision', 'Update user manual with new features', 'in-progress', 'medium', '2024-03-01', NULL, '2024-03-31', 'once', '', ARRAY['p9'], ARRAY['d6'], 'CORE-505', 'm8', '2024-03-01', '2024-04-11'),
            ('t9', 'documentation', 'Technical specification', 'Write technical specification for new module', 'done', 'high', '2024-04-01', '2024-04-15', '2024-04-15', 'once', 'Documentation completed and reviewed', ARRAY['p1'], ARRAY['d2'], 'RLOS-606', 'm9', '2024-04-01', '2024-04-15'),

            -- Maintenance Tasks
            ('t10', 'maintenance', 'Server maintenance', 'Perform routine server maintenance and updates', 'todo', 'high', '2024-01-15', NULL, '2024-01-31', 'monthly', '', ARRAY['p5'], ARRAY['d5'], 'AWS-707', 'm10', '2024-01-15', '2024-04-11'),
            ('t11', 'maintenance', 'Database optimization', 'Optimize database performance and clean up old data', 'in-progress', 'medium', '2024-03-15', NULL, '2024-03-31', 'quarterly', '', ARRAY['p3'], ARRAY['d1'], 'AVS-808', 'm11', '2024-03-15', '2024-04-11'),
            ('t12', 'maintenance', 'Security patch update', 'Apply latest security patches to all systems', 'done', 'high', '2024-04-01', '2024-04-15', '2024-04-15', 'weekly', 'All systems updated successfully', ARRAY['p2'], ARRAY['d3'], 'CLOS-909', 'm12', '2024-04-01', '2024-04-15'),

            -- Research Tasks
            ('t13', 'research', 'New technology evaluation', 'Research and evaluate new database technologies', 'todo', 'medium', '2024-01-01', NULL, '2024-01-31', 'once', '', ARRAY['p4'], ARRAY['d4'], 'CRCS-1010', 'm13', '2024-01-01', '2024-04-11'),
            ('t14', 'research', 'Market analysis', 'Research market trends and competitor analysis', 'in-progress', 'high', '2024-03-01', NULL, '2024-03-31', 'once', '', ARRAY['p6'], ARRAY['d7'], 'ECM-1111', 'm14', '2024-03-01', '2024-04-11'),
            ('t15', 'research', 'Performance optimization study', 'Research methods to improve system performance', 'done', 'medium', '2024-04-01', '2024-04-15', '2024-04-15', 'once', 'Identified 3 key areas for optimization', ARRAY['p7'], ARRAY['d2'], 'C06-1212', 'm15', '2024-04-01', '2024-04-15'),

            -- Meeting Tasks
            ('t16', 'meeting', 'Sprint planning', 'Plan next sprint tasks and assign resources', 'todo', 'medium', '2024-01-15', NULL, '2024-01-31', 'weekly', '', ARRAY['p8'], ARRAY['d1'], 'HDDT-1313', 'm16', '2024-01-15', '2024-04-11'),
            ('t17', 'meeting', 'Client review', 'Review project progress with client', 'in-progress', 'high', '2024-03-15', NULL, '2024-03-31', 'monthly', '', ARRAY['p9'], ARRAY['d6'], 'CORE-1414', 'm17', '2024-03-15', '2024-04-11'),
            ('t18', 'meeting', 'Team retrospective', 'Review sprint performance and improvements', 'done', 'low', '2024-04-01', '2024-04-15', '2024-04-15', 'weekly', 'Identified 5 improvement areas', ARRAY['p1'], ARRAY['d1'], 'RLOS-1515', 'm18', '2024-04-01', '2024-04-15'),

            -- Other Tasks
            ('t19', 'other', 'Team building event', 'Organize team building activities', 'todo', 'low', '2024-01-01', NULL, '2024-01-31', 'quarterly', '', ARRAY[]::text[], ARRAY['d7'], NULL, 'm19', '2024-01-01', '2024-04-11'),
            ('t20', 'other', 'Training session', 'Conduct technical training for new team members', 'in-progress', 'medium', '2024-03-01', NULL, '2024-03-31', 'once', '', ARRAY[]::text[], ARRAY['d1'], NULL, 'm1', '2024-03-01', '2024-04-11'),
            ('t21', 'other', 'Equipment inventory', 'Update inventory of office equipment', 'done', 'low', '2024-04-01', '2024-04-15', '2024-04-15', 'yearly', 'Inventory completed and documented', ARRAY[]::text[], ARRAY['d7'], NULL, 'm1', '2024-04-01', '2024-04-15'),

            -- Additional Tasks
            ('t22', 'development', 'Mobile app feature implementation', 'Implement push notifications for mobile app', 'todo', 'high', '2024-01-01', NULL, '2024-01-31', 'once', '', ARRAY['p1'], ARRAY['d1'], 'RLOS-1616', 'm2', '2024-01-01', '2024-04-11'),
            ('t23', 'maintenance', 'Network infrastructure upgrade', 'Upgrade network equipment and configurations', 'todo', 'high', '2024-03-01', NULL, '2024-03-31', 'yearly', '', ARRAY['p5'], ARRAY['d5'], 'AWS-1717', 'm10', '2024-03-01', '2024-04-11'),
            ('t24', 'research', 'AI Integration Feasibility Study', 'Research potential AI integration points in current systems', 'todo', 'medium', '2024-04-01', NULL, '2024-04-15', 'once', '', ARRAY['p4', 'p6'], ARRAY['d2', 'd4'], 'CRCS-1818', 'm1', '2024-04-01', '2024-04-11'),
            ('t25', 'documentation', 'Security protocols documentation', 'Document updated security protocols and procedures', 'todo', 'high', '2024-01-15', NULL, '2024-01-31', 'once', '', ARRAY['p2', 'p5'], ARRAY['d3'], 'CLOS-1919', 'm7', '2024-01-15', '2024-04-11'),
            ('t26', 'development', 'Implement OAuth2 Authentication', 'Add OAuth2 authentication support for third-party integrations', 'todo', 'high', '2024-03-15', NULL, '2024-03-31', 'once', '', ARRAY['p1', 'p2'], ARRAY['d1', 'd3'], 'RLOS-2020', 'm1', '2024-03-15', '2024-04-11'),
            ('t27', 'maintenance', 'Database Backup System Review', 'Review and optimize database backup procedures', 'todo', 'medium', '2024-04-01', NULL, '2024-04-15', 'monthly', '', ARRAY['p3', 'p5'], ARRAY['d5'], 'AVS-2121', 'm22', '2024-04-01', '2024-04-11'),
            ('t28', 'research', 'Cloud Migration Assessment', 'Evaluate cloud migration options and create migration strategy', 'todo', 'high', '2024-01-01', NULL, '2024-01-31', 'once', '', ARRAY['p5', 'p6'], ARRAY['d2', 'd5'], 'AWS-2222', 'm23', '2024-01-01', '2024-04-11'),
            ('t29', 'meeting', 'Architecture Review Board', 'Review and approve proposed architecture changes', 'todo', 'medium', '2024-03-01', NULL, '2024-03-31', 'monthly', '', ARRAY['p1', 'p2', 'p3'], ARRAY['d2'], 'CORE-2323', 'm24', '2024-03-01', '2024-04-11'),
            ('t30', 'documentation', 'Disaster Recovery Plan Update', 'Update disaster recovery procedures and documentation', 'todo', 'high', '2024-04-01', NULL, '2024-04-15', 'quarterly', '', ARRAY['p5'], ARRAY['d3', 'd5'], 'AWS-2424', 'm25', '2024-04-01', '2024-04-11');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM tasks WHERE id IN (
                't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10',
                't11', 't12', 't13', 't14', 't15', 't16', 't17', 't18', 't19', 't20',
                't21', 't22', 't23', 't24', 't25', 't26', 't27', 't28', 't29', 't30'
            );
        `);
  }
}
