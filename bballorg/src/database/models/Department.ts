import {
    HasManyGetAssociationsMixin,
    Model,
    Sequelize,
    Association, 
    DataTypes
  } from "sequelize";
  import { Department as DepartmentAttributes } from "../attributes";
  import UserDetails from "./UserDetails";
  
  class Department
    extends Model{

    public static associations: {
      userDetails: Association<Department, UserDetails>
    };
  
  
    static initModel(sequelize: Sequelize): void {
      Department.init(
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
          },
          code: {
            type: DataTypes.STRING,
            allowNull: false // default true
          },
          name: {
            type: DataTypes.TEXT,
            allowNull: false
          },
        },
        {
          sequelize, // pass the database instance here
          underscored: true, // this flag will make table name casing to underscored (eg. user_details)
          tableName: "departments" // here names can be pass in camel case for consistency
        }
      );
    }
  
    public static associateModel(): void {
      Department.hasMany(UserDetails, { sourceKey: "id", foreignKey: "departmentId", as: "userDetails" });
    }
  }
  
  export default Department;