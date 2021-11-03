module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Categories',{
      title:{
        type: DataTypes.STRING, 
        allowNull: false
      }
  })
}