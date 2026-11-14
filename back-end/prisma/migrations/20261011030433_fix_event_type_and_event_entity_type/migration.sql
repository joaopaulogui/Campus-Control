/*
  Warnings:

  - Changed the type of `event_type` on the `audits` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `event_entity` on the `audits` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_sender_id_fkey";

-- AlterTable
ALTER TABLE "audits" DROP COLUMN "event_type",
ADD COLUMN     "event_type" TEXT NOT NULL,
DROP COLUMN "event_entity",
ADD COLUMN     "event_entity" "EntityType" NOT NULL;

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "sender_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
