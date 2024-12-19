-- CreateTable
CREATE TABLE "SiteAnalysis" (
    "id" SERIAL NOT NULL,
    "siteUrl" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "performance" DOUBLE PRECISION NOT NULL,
    "accessibility" DOUBLE PRECISION NOT NULL,
    "bestPractices" DOUBLE PRECISION NOT NULL,
    "seo" DOUBLE PRECISION NOT NULL,
    "dataAnalise" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SiteAnalysis_pkey" PRIMARY KEY ("id")
);
