import { Dialect, Options, Sequelize } from 'sequelize';

class SequalizeConnection {
  private static instance: Sequelize;

  static getInstance() {

    if (!SequalizeConnection.instance) {
      const dbConfig = {} as Options;
      dbConfig.port = 3306;
      dbConfig.host = 'localhost';
      dbConfig.ssl = false;
      dbConfig.database = 'world';
      dbConfig.username = 'root';
      dbConfig.password = 'shubham@7709808681';
      dbConfig.logging = false;
      dbConfig.dialect = 'mysql' as Dialect;

      dbConfig.pool = {
        max: 30,
        acquire: 6000,
        idle: 30000
      }
      SequalizeConnection.instance = new Sequelize(
        dbConfig
      );
    }
    return SequalizeConnection.instance;
  }
  static async connect(): Promise<Sequelize> {
    const sequelize = SequalizeConnection.getInstance();
    try {
      await sequelize.authenticate();
      console.log("Database connection authenticated successfully");
      return sequelize;
    } catch (error) {
      console.log("Error while creation connection to database :: " + error);
      return sequelize;
    }
  }

  static async close(): Promise<Sequelize> {
    const sequelize = SequalizeConnection.getInstance();
    try {
      await sequelize.close();
      console.log("Database connection closed successfully");
      return sequelize;
    } catch (error) {
      console.log("Error while closing database connection :: " + error);
      return sequelize;
    }
  }
}
export default SequalizeConnection;