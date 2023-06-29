let expect = require("expect");
const { generateMessage } = require("./message");

describe("Generate Message", () => {
  it("should generate correct message object", () => {
    let from = "Chuppi",
      text = "chuppi don",
      message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});
