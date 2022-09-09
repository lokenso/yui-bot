const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input

const apiId = 7179733;
const apiHash = "e87f8e3f2c3d8a6836a41f31bc73545b";
const stringSession = new StringSession(""); // preencha isso mais tarde com o valor de session.save()

(async () => {
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Por favor, digite seu número: "),
    password: async () => await input.text("Por favor, insira sua senha: "),
    phoneCode: async () =>
      await input.text("Por favor, digite o código que você recebeu: "),
    onError: (err) => console.log(err),
  });
  console.log("Agora você deve estar conectado.");
  console.log(client.session.save()); // Salve esta string para evitar fazer login novamente
  await client.sendMessage("me", { message: "Hello!" });
})();