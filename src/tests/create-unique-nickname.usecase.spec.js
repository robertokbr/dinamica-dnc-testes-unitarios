const { CreateUniqueNicknameUsecase } = require("../create-unique-nickname.usecase");

let mockUsersRepository = {
    findById: async (userId) => {
        return {
            username: 'kira'
        }
    }
}

let mockNickNameGeneratorProvider = {
    generate: (gender) => {
        return gender === 'M' ? "the-neymar" : "the-marta";
    }
}

describe('CreateUniqueNicknameUsecase',  () => {
    it('should be able to create a nickname', async () => {
        const createUniqueNicknameUsecase = new CreateUniqueNicknameUsecase(
            mockNickNameGeneratorProvider,
            mockUsersRepository,
        );

        const data = { userId: 'id', gender: 'M' }

        const user = await createUniqueNicknameUsecase.execute(data);

        expect(user.nickname).toBe("kira-the-neymar-01")
    });
});