module.exports = (sequelize, Sequelize,DataTypes, bcrypt, crypto) => {
    const FriendRequest = sequelize.define(
      "freind_request",
      {
        sender: {
          type: Sequelize.STRING,
        },
        receiver: {
          type: Sequelize.STRING,
        },
      },
      {
        timestamps: false,
      }
    );
  
    return FriendRequest;
  };