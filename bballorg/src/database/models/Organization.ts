import { Model, DataTypes, Sequelize, HasManyGetAssociationsMixin, Association } from "sequelize";
import { Organization as OrganizationAttributes } from "../attributes";
import UserDetails from "./UserDetails";

export type OrganizationCreationArrtibutes = OrganizationAttributes

class Organization 
  extends Model {
    
  public static associations: {
    userDetails: Association<Organization, UserDetails>
  };

  static initModel(sequelize: Sequelize): void {
    Organization.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: "organizations"
      }
    );
  }

  public static associateModel(): void {
    Organization.hasMany(UserDetails, { foreignKey: "organizationId", sourceKey: "id", as: 'userDetails' });
  }
}

export default Organization;