-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "NewSop" (
    "id" TEXT NOT NULL,
    "oldsopid" TEXT NOT NULL,
    "uploaderId" TEXT NOT NULL,
    "uploadername" TEXT NOT NULL,
    "parameter" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "procedure" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flag" INTEGER NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "completeness" INTEGER NOT NULL,
    "relevance" INTEGER NOT NULL,

    CONSTRAINT "NewSop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oldsop" (
    "id" TEXT NOT NULL,
    "newsopid" TEXT NOT NULL,
    "uploaderid" TEXT NOT NULL,
    "uploadername" TEXT NOT NULL,
    "parameter" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "procedure" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "completeness" INTEGER NOT NULL,
    "relevance" INTEGER NOT NULL,

    CONSTRAINT "oldsop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentbox" (
    "id" TEXT NOT NULL,
    "sopid" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "commentbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
