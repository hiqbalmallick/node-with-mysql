import * as Sequelize from "sequelize";
import {
  IAddressInstance,
  IAddressAttributes,
} from "../interfaces/models/Address";
import { generateId } from "../helpers/generalHelper";

/**
 * Defining main sequelize function for binding on the model index
 *
 * @param {Sequelize.Sequelize} sequelize
 * @returns
 */
export default function (
  sequelize: Sequelize.Sequelize
): Sequelize.Model<IAddressInstance, IAddressAttributes> {
  const address = sequelize.define<IAddressInstance, IAddressAttributes>(
    "address",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: function () {
          return generateId();
        },
        allowNull: false,
      },
      deliveryAddress: Sequelize.STRING,
      type: Sequelize.ENUM("home", "work", "other"),
      area: Sequelize.STRING,
      city: Sequelize.ENUM("karachi", "lahore", "islamabad", "hyderabad"),
      additionalInfo: Sequelize.STRING,
      userId: Sequelize.STRING,
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    }
  );

  return address;
}
