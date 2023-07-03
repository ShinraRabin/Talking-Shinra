module.exports = (sequelize, Sequelize,DataTypes, bcrypt, crypto) => {
    const Message = sequelize.define(
      "message",
      {
        sender: {
          type: Sequelize.STRING,
        },
        reciver: {
          type: Sequelize.STRING,
        },
        message: {
          type: Sequelize.STRING,
        },
      },
      {
        timestamps: false,
      }
    );
  
    return Message;
  };
  