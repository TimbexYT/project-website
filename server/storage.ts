import { 
  type User, 
  type InsertUser,
  type SensorReading,
  type InsertSensorReading,
  type Alert,
  type InsertAlert,
  users,
  sensorReadings,
  alerts
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Sensor reading methods
  createSensorReading(reading: InsertSensorReading): Promise<SensorReading>;
  getRecentSensorReadings(limit: number): Promise<SensorReading[]>;
  getLatestSensorReading(): Promise<SensorReading | undefined>;
  
  // Alert methods
  createAlert(alert: InsertAlert): Promise<Alert>;
  getRecentAlerts(limit: number): Promise<Alert[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Sensor reading methods
  async createSensorReading(reading: InsertSensorReading): Promise<SensorReading> {
    const [sensorReading] = await db
      .insert(sensorReadings)
      .values(reading)
      .returning();
    return sensorReading;
  }

  async getRecentSensorReadings(limit: number = 50): Promise<SensorReading[]> {
    return await db
      .select()
      .from(sensorReadings)
      .orderBy(desc(sensorReadings.timestamp))
      .limit(limit);
  }

  async getLatestSensorReading(): Promise<SensorReading | undefined> {
    const [reading] = await db
      .select()
      .from(sensorReadings)
      .orderBy(desc(sensorReadings.timestamp))
      .limit(1);
    return reading || undefined;
  }

  // Alert methods
  async createAlert(alert: InsertAlert): Promise<Alert> {
    const [newAlert] = await db
      .insert(alerts)
      .values(alert)
      .returning();
    return newAlert;
  }

  async getRecentAlerts(limit: number = 50): Promise<Alert[]> {
    return await db
      .select()
      .from(alerts)
      .orderBy(desc(alerts.timestamp))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
