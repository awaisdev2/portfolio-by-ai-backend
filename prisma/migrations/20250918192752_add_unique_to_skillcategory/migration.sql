/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SkillCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Experience_title_userId_key" ON "public"."Experience"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_userId_key" ON "public"."Project"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_userId_key" ON "public"."Skill"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillCategory_name_key" ON "public"."SkillCategory"("name");
