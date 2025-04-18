-- CreateTable
CREATE TABLE "Pets" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "energy_level" TEXT NOT NULL,
    "independency" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "org_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetRequirements" (
    "id" UUID NOT NULL,
    "Requirement" TEXT NOT NULL,
    "pet_id" UUID,

    CONSTRAINT "PetRequirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetRequirements" ADD CONSTRAINT "PetRequirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
