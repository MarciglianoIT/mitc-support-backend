const sequelize = require("../util/database");
const User = require("../models/user");
const UserData = require("../models/userdata");

const transaction = async (callBack, data) => {
  try {
    await sequelize.transaction(callBack);
    console.log(data);
    const result = await getUser(data.id);
    return { status: 200, data: result };
  } catch (error) {
    return { status: 403, error: error.message };
  }
};

const getUser = async (id) => {
  return User.findByPk(id, {
    include: UserData,
  });
};

const updateUser = async (data) => {
  const update = async (t) => {
    await User.update(
      data,
      {
        where: { id: data.id },
      },
      { transaction: t }
    );
    await UserData.update(
      data.UserDatum,
      {
        where: { id: data.id },
      },
      { transaction: t }
    );
  };
  return transaction(update, data);
};

const createUser = async (data) => {
  const create = async (t) => {
    await User.create(data, {
      transaction: t,
    });
    await UserData.create(data.UserDatum, {
      transaction: t,
    });
  };
  return transaction(create, data);
};

const deleteUser = async (data) => {
  const deletedUser = (t) => {
    return User.destroy(
      {
        where: { id: data.id },
      },
      {
        transaction: t,
      }
    );
  };
  return transaction(deletedUser, data);
};

exports.createOrUpdateUserData = async (req, res, next) => {
  try {
    const data = req.body;

    const userExists = await User.findByPk(data.id);
    let response;
    if (userExists) {
      response = await updateUser(data);
    } else {
      response = await createUser(data);
    }

    if (response.data) {
      return res.status(response.status).send(response.data);
    }
    return res.status(response.status).send(response.error);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.deleteUserData = async (req, res, next) => {
  try {
    const data = req.body;

    const response = await deleteUser(data);
    if (response.data) {
      return res.status(response.status).send(response.data);
    }
    return res.status(response.status).send(response.error);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
  }
}
