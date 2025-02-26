import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateColumnDriverInMoviments1740524556984
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE movements ADD COLUMN driver_id int`);

    await queryRunner.createForeignKey(
      'movements',
      new TableForeignKey({
        columnNames: ['driver_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE movements DROP COLUMN driver_id`);
  }
}