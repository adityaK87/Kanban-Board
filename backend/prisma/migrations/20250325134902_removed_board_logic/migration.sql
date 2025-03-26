/*
  Warnings:

  - You are about to drop the column `boardId` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `List` table. All the data in the column will be lost.
  - The `priority` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('high', 'medium', 'low');

-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_userId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_boardId_fkey";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "boardId",
DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "priority",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'low';

-- DropTable
DROP TABLE "Board";

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
