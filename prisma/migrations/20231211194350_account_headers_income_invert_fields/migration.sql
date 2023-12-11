-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "headers" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "income_field" VARCHAR(255),
ADD COLUMN     "invert_values" BOOLEAN NOT NULL DEFAULT false;
