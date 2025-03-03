import { FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";
import { CreateUserDto } from "../dtos/users/CreateUser.dto";
import { User } from "../entities/user";
import { userRepository } from "../repositories/userRepository";

export class UserService {
  private userRepository = userRepository;

  /**
   * Creates a new user.
   * @param {CreateUserDto} payload - Data for creating the user.
   * @returns {Promise<User>} The created user.
   */
  async create(payload: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(payload);
    return await this.userRepository.save(user);
  }

  /**
   * Retrieves multiple users based on the provided options.
   * @param {FindManyOptions<User>} [options] - Query options.
   * @returns {Promise<User[]>} A list of users.
   */
  async find(options?: FindManyOptions<User> | undefined): Promise<User[]> {
    const user = await this.userRepository.find(options);
    return user;
  }

  /**
   * Retrieves a single user based on the provided options.
   * @param {FindOneOptions<User>} options - Query options.
   * @returns {Promise<User | null>} The found user or null if not found.
   */
  async findOne(options: FindOneOptions<User>): Promise<User | null> {
    const user = await this.userRepository.findOne(options);
    return user;
  }

  /**
   * Retrieves a single user based on the provided options and throws an error if not found.
   * @param {FindOneOptions<User>} options - Query options.
   * @returns {Promise<User>} The found user.
   * @throws {Error} If no user is found.
   */
  async findOneOrFail(options: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOneOrFail(options);
    return user;
  }
}
