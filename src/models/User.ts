import * as Sequelize from "sequelize";
import { IUserInstance, IUserAttributes } from "../interfaces/models/User";
import { generateId } from "../helpers/generalHelper";

/**
 * Defining main sequelize function for binding on the model index
 *
 * @param {Sequelize.Sequelize} sequelize
 * @returns
 */
export default function (
  sequelize: Sequelize.Sequelize
): Sequelize.Model<IUserInstance, IUserAttributes> {
  const user = sequelize.define<IUserInstance, IUserAttributes>("users", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: function () {
        return generateId();
      },
      allowNull: false,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    imgUrl: Sequelize.STRING,
    dateOfBirth: Sequelize.STRING,
    gender: Sequelize.STRING,
    isVerified: Sequelize.BOOLEAN,
    phoneNumber: Sequelize.STRING,
    type: Sequelize.ENUM("merchant", "consumer", "admin"),
    credentialId: {
      type: Sequelize.STRING,
      references: {
        model: "credentials",
        key: "id",
      },
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  user.associate = function (models: any) {
    user.belongsTo(models.credential, {
      foreignKey: "credentialId",
      as: "credential",
    });
  };

  return user;
}
