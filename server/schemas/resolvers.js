

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      try {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('savedBooks');

          return userData;
        }

        throw new AuthenticationError('Not logged in');
      } catch (error) {
        console.error('Error in me resolver:', error);
        throw error; // Re-throw the error to be caught by Apollo Server
      }
    },
  },

  Mutation: {
    saveBook: async (parent, { authors, description, title, bookId, image, link }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: { authors, description, title, bookId, image, link } } },
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      } catch (error) {
        console.error('Error in saveBook resolver:', error);
        throw error; // Re-throw the error to be caught by Apollo Server
      }
    },
  
    removeBook: async (parent, { bookId }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      } catch (error) {
        console.error('Error in removeBook resolver:', error);
        throw error; // Re-throw the error to be caught by Apollo Server
      }
    },
  
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error in login resolver:', error);
        throw error; // Re-throw the error to be caught by Apollo Server
      }
    },

    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error in addUser resolver:', error);
        throw error; // Re-throw the error to be caught by Apollo Server
      }
    },
  },
};

module.exports = { resolvers };