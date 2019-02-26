export default {
  Mutation: {
    user: (_, { username, email, check }, { cache }) => {
      const data = {
        user: { username, email, check, __typename: "User" }
      };

      cache.writeData({ data });
      return null;
    },
    /**
     * Set error tu cache
     */
    setError: (_, { message }, { cache }) => {
      const data = {
        error: { message, __typename: "Error" }
      };
      cache.writeData({ data });
      return null;
    }
  },
  Query: {}
};
