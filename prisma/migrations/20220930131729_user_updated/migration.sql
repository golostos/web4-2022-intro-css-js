-- AlterTable
CREATE SEQUENCE "users_id_seq";
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq'),
ALTER COLUMN "name" DROP NOT NULL;
ALTER SEQUENCE "users_id_seq" OWNED BY "users"."id";
