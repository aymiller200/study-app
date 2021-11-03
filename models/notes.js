module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Notes', {
    title: {
      type: DataTypes.STRING,
    },

    tag: {
      type: DataTypes.STRING,
      allowNull: false
    },

    body: {
      type: DataTypes.STRING,
      allowNull: false
    },

    links: {
      type: DataTypes.STRING
    }
  })
}
