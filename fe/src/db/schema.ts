/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  pgTable,
  integer,
  varchar,
  boolean,
  date,
  decimal,
  text,
  serial,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const apartmentTypeEnum = pgEnum("apartment_type", [
  "studio",
  "1_bed",
  "2_bed",
  "3_bed",
]);
export const maintenanceStatusEnum = pgEnum("maintenance_status", [
  "pending",
  "received",
  "resolved",
  "cancelled",
]);
export const contractTypeEnum = pgEnum("contract_type", ["rent", "sale"]);

export const floor = pgTable("floor", {
  id: serial("id").primaryKey(),
  floorNumber: integer("floor_number"),
  buildingName: varchar("building_name", { length: 255 }),
});

export const apartments = pgTable("apartments", {
  id: serial("id").primaryKey(),
  roomNumber: integer("room_number"),
  type: apartmentTypeEnum("type"),
  status: boolean("status"),
  floorId: integer("floor_id").references(() => floor.id),
});

export const residents = pgTable("residents", {
  id: serial("id").primaryKey(),
  moveInDate: date("move_in_date"),
  isPrimary: boolean("is_primary"),
  userId: text("user_id").references(() => user.id),
  apartmentId: integer("apartment_id").references(() => apartments.id),
});

export const maintenanceRequests = pgTable("maintenance_requests", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  status: maintenanceStatusEnum("status"),
  createdAt: date("created_at"),
  updatedAt: date("updated_at"),
  residentId: integer("resident_id").references(() => residents.id),
  apartmentId: integer("apartment_id").references(() => apartments.id),
});

export const notification = pgTable("notification", {
  id: serial("id").primaryKey(),
  message: text("message"),
  createdAt: date("created_at"),
  userId: text("user_id").references(() => user.id),
  maintenanceRequestId: integer("maintenance_request_id").references(
    () => maintenanceRequests.id
  ),
});

export const contract = pgTable("contract", {
  id: serial("id").primaryKey(),
  signDate: date("sign_date"),
  expireDate: date("expire_date"),
  value: decimal("value"),
  type: contractTypeEnum("type"),
  status: boolean("status"),
  apartmentId: integer("apartment_id").references(() => apartments.id),
});

export const furnitures = pgTable("furnitures", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  defaultImage: varchar("default_image", { length: 255 }),
  createdAt: date("created_at"),
});

export const apartmentFurnitures = pgTable("apartment_furnitures", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity"),
  condition: varchar("condition", { length: 100 }),
  lastCheckedAt: date("last_checked_at"),
  apartmentId: integer("apartment_id").references(() => apartments.id),
  furnitureId: integer("furniture_id").references(() => furnitures.id),
});

export const property = pgTable("property", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  createdAt: date("created_at"),
});

export const floorProperty = pgTable("floor_property", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity"),
  floorId: integer("floor_id").references(() => floor.id),
  propertyId: integer("property_id").references(() => property.id),
});


