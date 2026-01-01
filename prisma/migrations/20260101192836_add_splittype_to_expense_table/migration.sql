/*
  Warnings:

  - You are about to drop the column `type` on the `splits` table. All the data in the column will be lost.
  - Added the required column `splitType` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "splitType" "SplitType" NOT NULL;

-- AlterTable
ALTER TABLE "splits" DROP COLUMN "type";
