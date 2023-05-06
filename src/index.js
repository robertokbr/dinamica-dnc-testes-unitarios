const { CreateUniqueNicknameUsecase } = require("./create-unique-nickname.usecase");
const NickNameGenerator = require("./providers/nickname-generator.provider");

async function main() {
    const nicknameGeneratorProvider = new NickNameGenerator();
    const createUniqueNicknameUsecase =  new CreateUniqueNicknameUsecase(
        nicknameGeneratorProvider,
        usersRepository    
    );

    const user = await createUniqueNicknameUsecase.execute({
        userId: 1,
        gender: 'M'
    });

    console.log(user);
}

main();