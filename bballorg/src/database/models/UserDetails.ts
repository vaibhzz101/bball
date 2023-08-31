import { Model, Sequelize, DataTypes } from "sequelize";
// import { UserDetails as UserDetailsAttributes } from "../attributes";
import Department from "./Department";
import Organization from "./Organization";



class UserDetails extends Model {


  public static associations: {
  };

  static initModel(sequelize: Sequelize): void {
    UserDetails.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize,
        underscored: true,
        tableName: "userDetails"
      }
    );
  }
  static associateModel(): void {
    UserDetails.belongsTo(Organization, { targetKey: 'id', as: 'organization' });
    UserDetails.belongsTo(Department, { targetKey: 'id', as: 'department' });
  }

}

export default UserDetails;