const ParseError = message => message.replace("GraphQL error:", "").trim();
export default ParseError;
