'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      queryInterface.addColumn(
          'capsules',
          'title', {
              type: Sequelize.STRING,
              after: "message"
          }
      );
  },

  async down (queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'capsules',
          'title'
      );
  }
};
