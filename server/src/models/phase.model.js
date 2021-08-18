export default (sequelize, Sequelize) => {
    const Phase = sequelize.define('Phase', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        number: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING(50),
        },
        image: {
            type: Sequelize.BLOB,
        },
        hint: {
            type: Sequelize.STRING(50),
        },
        points: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
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
