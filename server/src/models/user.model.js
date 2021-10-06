export default (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        number: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        total: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        role: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    })
    User.associate = (models) => {
        User.belongsToMany(models.Phase, {
            through: models.Journey,
            foreignKey: 'userId',
        })
    }
    return User
}
