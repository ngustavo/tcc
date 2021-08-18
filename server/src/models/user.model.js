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
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        role: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        socketId: {
            type: Sequelize.STRING,
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
