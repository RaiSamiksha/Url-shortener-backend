const { Addresses } = require('../models');

class UsersService {
  constructor(UsersRepository) {
    console.log('Users Repository Class Created');
    this.UsersRepository = UsersRepository;
  }

  /**
   * A function to asynchronously retrieve all Users.
   *
   * @return {Promise} A Promise that resolves to the collection of Users.
   */
  async getAllUsers() {
    console.log('UsersRepository : Fetching Users CRUD Repo');
    const UsersCollection = await this.UsersRepository.getAll({
      include: { model: Addresses, as: 'UserAddresses' },
    });
    return UsersCollection;
  }

  /**
   * Retrieves a User by their ID.
   *
   * @param {number} id - The ID of the User.
   * @return {Promise} A promise that resolves to the User object.
   */
  async getUserById(req) {
    const id = req.params.id;
    const UserDetails = await this.UsersRepository.get(id);
    const UserAddresses = await UserDetails.getUserAddresses();
    UserDetails.setDataValue('UserAddresses', UserAddresses);
    return UserDetails;
  }
}

module.exports = UsersService;