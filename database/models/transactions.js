const { Model } = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    class Transactions extends Model {

        static associate(models) {
            // Transactions.belongsTo(models.Categories, {foreignKey: 'userId'}),
            // Transactions.belongsTo(models.categoryId, {foreignKey: 'categoryId'})
        }
    }
    Transactions.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            field: "user_id"
        },
        categoryId: {
            type: DataTypes.INTEGER,
            field: "category_id"
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        sequelize,
        timestamps: true,
        modelName: 'Transactions'
    })
    return Transactions
}

