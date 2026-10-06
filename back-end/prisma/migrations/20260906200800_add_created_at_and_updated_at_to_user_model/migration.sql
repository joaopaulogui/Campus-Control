/*
  Warnings:

  - Changed the type of `event_type` on the `Log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('BUILING', 'FLOOR', 'ROOM', 'AIR_CONDITIONER', 'PROJECTOR', 'SCHEDULE', 'ITEM', 'LOAN', 'USER');

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "event_type",
ADD COLUMN     "event_type" "EntityType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "EntityTypes";
