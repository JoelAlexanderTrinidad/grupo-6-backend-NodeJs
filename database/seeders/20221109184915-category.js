'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Categories',[{
      name: 'Home',
      description: 'Home is a Category',
      deletedAt: 'Activo',      
      createdAt: new Date(),
      updatedAt: new Date()
     },{
      name: 'School',
      description: 'School is a Category',
      deletedAt: 'Activo',
      createdAt: new Date(),
      updatedAt: new Date()
     },{
      name: 'Worked',
      description: 'Worked is a Category',
      deletedAt: 'Activo',
      createdAt: new Date(),
      updatedAt: new Date()
     },{
      name: 'Staff',
      description: 'Staff is a Category',
      deletedAt: 'Activo',
      createdAt: new Date(),
      updatedAt: new Date()
     }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert('Category', null,{});
  }
};
