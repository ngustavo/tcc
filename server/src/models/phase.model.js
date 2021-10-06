export default (sequelize, Sequelize) => {
    const Phase = sequelize.define('Phase', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hint: {
            type: Sequelize.STRING,
        },
        points: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            validate: {
                isInt: true,
            },
        },
    })
    Phase.associate = (models) => {
        Phase.belongsToMany(models.User, {
            through: models.Journey,
            foreignKey: 'phaseId',
        })
    }
    return Phase
}
