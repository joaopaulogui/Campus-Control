/*
  Warnings:

  - The values [BUILING] on the enum `EntityType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EntityType_new" AS ENUM ('BUILDING', 'FLOOR', 'ROOM', 'AIR_CONDITIONER', 'PROJECTOR', 'SCHEDULE', 'ITEM', 'LOAN', 'USER');
ALTER TABLE "audits" ALTER COLUMN "event_entity" TYPE "EntityType_new" USING ("event_entity"::text::"EntityType_new");
ALTER TYPE "EntityType" RENAME TO "EntityType_old";
ALTER TYPE "EntityType_new" RENAME TO "EntityType";
DROP TYPE "public"."EntityType_old";
COMMIT;
