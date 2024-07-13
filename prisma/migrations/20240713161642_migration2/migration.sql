/*
  Warnings:

  - You are about to drop the column `procedure` on the `NewSop` table. All the data in the column will be lost.
  - You are about to drop the column `procedure` on the `oldsop` table. All the data in the column will be lost.
  - Added the required column `step1` to the `NewSop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `step2` to the `NewSop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `step3` to the `NewSop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `step1` to the `oldsop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `step2` to the `oldsop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `step3` to the `oldsop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NewSop" DROP COLUMN "procedure",
ADD COLUMN     "step1" TEXT NOT NULL,
ADD COLUMN     "step2" TEXT NOT NULL,
ADD COLUMN     "step3" TEXT NOT NULL,
ADD COLUMN     "step4" TEXT,
ADD COLUMN     "step5" TEXT,
ALTER COLUMN "parameter" DROP NOT NULL,
ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "flag" DROP NOT NULL,
ALTER COLUMN "accuracy" DROP NOT NULL,
ALTER COLUMN "completeness" DROP NOT NULL,
ALTER COLUMN "relevance" DROP NOT NULL;

-- AlterTable
ALTER TABLE "oldsop" DROP COLUMN "procedure",
ADD COLUMN     "step1" TEXT NOT NULL,
ADD COLUMN     "step2" TEXT NOT NULL,
ADD COLUMN     "step3" TEXT NOT NULL,
ADD COLUMN     "step4" TEXT,
ADD COLUMN     "step5" TEXT,
ALTER COLUMN "parameter" DROP NOT NULL,
ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "accuracy" DROP NOT NULL,
ALTER COLUMN "completeness" DROP NOT NULL,
ALTER COLUMN "relevance" DROP NOT NULL;
