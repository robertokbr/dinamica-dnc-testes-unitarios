class CreateUniqueNicknameUsecase {
  constructor(
    nicknameGeneratorProvider,
    usersRepository,
  ) {
    this.nicknameGeneratorProvider = nicknameGeneratorProvider;
    this.usersRepository = usersRepository;
  }

  async generateUniqueNickname(username, gender, counter = 1) {
    const nickname = this.nicknameGeneratorProvider.generate(gender);

    const uniqueNickname = `${username}-${nickname}-${counter}`;

    const userWithSameNickname = await this.usersRepository.findByNickname(uniqueNickname);

    if (userWithSameNickname) return this.generateUniqueNickname(username, gender, counter+1);

    return uniqueNickname;
  }

  async execute(data) {
    const user = await this.usersRepository.findById(data.userId);

    if (!user) {
      throw new NotFoundError('User not found!');
    }

    const uniqueNickname = await this.generateUniqueNickname(user.username, data.gender);

    user.nickname = uniqueNickname;

    await this.usersRepository.update(user);

    return user;
  }
}

module.exports = {
  CreateUniqueNicknameUsecase,
};