export default (sequelize, Sequelize) => sequelize.define('Journey', {
    phaseId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'Phase',
            key: 'id',
        },
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    answer: {
        type: Sequelize.STRING,
    },
    points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
})
