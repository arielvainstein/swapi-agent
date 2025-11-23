module.exports = {
  readStreamableValue: async function* (stream) {
    // Simple mock – feed the full string once
    yield typeof stream === "string" ? stream : "";
  },
  StreamableValue: class {},
};
