/*
  Warnings:

  - You are about to drop the column `isOn` on the `AirConditioner` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `AirConditioner` table. All the data in the column will be lost.
  - The primary key for the `ChatParticipant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatId` on the `ChatParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ChatParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `responsibleName` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `responsibleRegistration` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `returnDate` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `floorId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `isLocked` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `AirConditioner` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `AirConditioner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `chat_id` to the `ChatParticipant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ChatParticipant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `building_id` to the `Floor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `available_quantity` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_quantity` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deadline` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_id` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible_name` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible_registration` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor_id` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_keeper` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('WORKING', 'WARNING', 'BROKEN');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('EQUIPMENT', 'STATIONARY', 'OTHERS');

-- CreateEnum
CREATE TYPE "EntityTypes" AS ENUM ('BUILING', 'FLOOR', 'ROOM', 'AIR_CONDITIONER', 'PROJECTOR', 'SCHEDULE', 'ITEM', 'LOAN', 'USER');

-- DropForeignKey
ALTER TABLE "AirConditioner" DROP CONSTRAINT "AirConditioner_roomId_fkey";

-- DropForeignKey
ALTER TABLE "ChatParticipant" DROP CONSTRAINT "ChatParticipant_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatParticipant" DROP CONSTRAINT "ChatParticipant_userId_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_floorId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_roomId_fkey";

-- AlterTable
ALTER TABLE "AirConditioner" DROP COLUMN "isOn",
DROP COLUMN "roomId",
ADD COLUMN     "is_on" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "room_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "EquipmentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "ChatParticipant" DROP CONSTRAINT "ChatParticipant_pkey",
DROP COLUMN "chatId",
DROP COLUMN "userId",
ADD COLUMN     "chat_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "ChatParticipant_pkey" PRIMARY KEY ("chat_id", "user_id");

-- AlterTable
ALTER TABLE "Floor" ADD COLUMN     "building_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "quantity",
ADD COLUMN     "available_quantity" INTEGER NOT NULL,
ADD COLUMN     "total_quantity" INTEGER NOT NULL,
ADD COLUMN     "type" "ItemType" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "createdAt",
DROP COLUMN "itemId",
DROP COLUMN "responsibleName",
DROP COLUMN "responsibleRegistration",
DROP COLUMN "returnDate",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "item_id" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "responsible_name" TEXT NOT NULL,
ADD COLUMN     "responsible_registration" TEXT NOT NULL,
ADD COLUMN     "returned_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "chatId",
DROP COLUMN "createdAt",
DROP COLUMN "senderId",
ADD COLUMN     "chat_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sender_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "floorId",
DROP COLUMN "isLocked",
ADD COLUMN     "floor_id" TEXT NOT NULL,
ADD COLUMN     "is_locked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "endDate",
DROP COLUMN "roomId",
DROP COLUMN "startDate",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "room_id" TEXT NOT NULL,
ADD COLUMN     "room_keeper" TEXT NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL;

-- DropEnum
DROP TYPE "AirConditionerStatus";

-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projector" (
    "id" TEXT NOT NULL,
    "status" "EquipmentStatus" NOT NULL,
    "room_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Projector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "event_type" "EntityTypes" NOT NULL,
    "event_entity" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Floor" ADD CONSTRAINT "Floor_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "Floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirConditioner" ADD CONSTRAINT "AirConditioner_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projector" ADD CONSTRAINT "Projector_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatParticipant" ADD CONSTRAINT "ChatParticipant_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatParticipant" ADD CONSTRAINT "ChatParticipant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
