'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      queryInterface.addColumn(
          'capsules',
          'is_active', {
              type: Sequelize.BOOLEAN,
              defaultValue: false
          }
      );
  },

  async down (queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'capsules',
          'is_active'
      );
  }
};
