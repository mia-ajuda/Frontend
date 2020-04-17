function extractNumbers(text) {
  return text.replace(/[^\d]+/g, "");
}

export default extractNumbers;
