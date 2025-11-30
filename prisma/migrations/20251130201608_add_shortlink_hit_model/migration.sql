-- CreateTable
CREATE TABLE "ShortLinkHit" (
    "id" TEXT NOT NULL,
    "shortLinkId" TEXT NOT NULL,
    "hitAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(45) NOT NULL,

    CONSTRAINT "ShortLinkHit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ShortLinkHit_hitAt_shortLinkId_idx" ON "ShortLinkHit"("hitAt", "shortLinkId");

-- AddForeignKey
ALTER TABLE "ShortLinkHit" ADD CONSTRAINT "ShortLinkHit_shortLinkId_fkey" FOREIGN KEY ("shortLinkId") REFERENCES "ShortLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
