-- CreateTable
CREATE TABLE "Orgs" (
    "id" UUID NOT NULL,
    "Email" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_Hash" TEXT NOT NULL,

    CONSTRAINT "Orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orgs_Email_key" ON "Orgs"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Orgs_address_key" ON "Orgs"("address");

-- CreateIndex
CREATE INDEX "Orgs_id_idx" ON "Orgs"("id");
