// This example demonstrates a simple server with some
// relational data: Posts and Authors. You can get the
// posts for a particular author, and vice-versa

// Read the complete docs for graphql-tools here:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html

import { find, filter } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }

  type Post {
    id: Int!
    title: String 
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => find(authors, { id: id }),
  },
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts: (author) => filter(posts, { authorId: author.id }),
  },
  Post: {
    author: (post) => find(authors, { id: post.authorId }),
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Apollo', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];


const variables = [
  {
   "id" : "1",
   "name": "Victimisation of Person",
   "description" : "Whether a person has had physical force or violence used against them"
  }
];

const representedVariables = [
  {
    "id"  : "1",
    "name": "Person experienced physical force or violence",
    "description" : "Whether a person has had physical force or violence used against them",
    "variableId" : "1"
  },
  {
    "ID"  : "2",
    "name" : "Person experienced physical force or violence", 
    "description" : "How many times an event occurred",
    "variableId" : "1"
  },
  {
    "ID"  : "3",
    "name": "Person threatened with physical harm", 
    "description" : "Person threatened with physical harm",
    "variableId" : "1"
  },
  {
    "ID"  : "4",
    "name": "Person threatened with physical harm",
    "description" : "How many times an event occurred",
    "variableId" : "1"
  },
  {
    "ID"  : "5",
    "name": "Person's home shed or garage broken into",
    "description" : "Person's home shed or garage broken into",
    "variableId" : "1"
  },
  {
    "ID"  : "6",
    "name": "Person's home shed or garage broken into", 
    "description" : "How many times an event occurred",
    "variableId" : "1"
  },
  {
    "ID"  : "7",
    "name": "Signs of attempted break-in to household", 
    "description" : "Whether a person has noticed any signs of an attempted break-in to their household",
    "variableId" : "1"
  },
  {
    "ID"  : "8",
    "name": "Signs of attempted break-in to household",
    "description" : "How many times an event occurred",
    "variableId" : "1"
  },
  {
    "ID"  : "9",
    "name": "Sexual assault",
    "description" : "Whether a person has been a victim of sexual assault or attempted sexual assault",
    "variableId" : "1"
  }    
];

const questions = [
  {
    "id" : "1",
    "name" : "Person experienced physical force or violence",
    "description" : "This question collects whether a person has had physical force or violence used against them. This is a single-response question asked with a pick list."
  },
  {
    "id" : "2",
    "name" : "Person experienced physical force or violence",
    "description":	"This question collects how many times a person has had physical force or violence used against them. This question is asked with a numeric entry field."
  },
    {
      "id" : "3",
      "name" : "Person threatened with physical harm",
      "description": "This question collects whether a person  was threatened with physical harm, excluding any cases recorded in the previous question. This is a single-response question asked with a pick list"
    },
    {
      "id" : "4",
      "name" : "Person threatened with physical harm",
      "description":"This question collects how many times a person was threatened with physical harm face-to-face, excluding any cases recorded in the previous question. This question is asked with a numeric entry field"
    },
    {
      "id" : "5",
      "name" : "Person's home shed or garage broken into",
      "description": "This question collects whether a person's home, shed or garage was broken into in the last 12 months. This is a single-response question asked with a pick list"
    },
    {
      "id" : "6",
      "name" : "Person's home shed or garage broken into",
      "description": "This question collects how many times a person's home, shed or garage was broken into in the last 12 months. This question is asked with a numeric entry field"
    },
    {
      "id" : "7",
      "name" : "Signs of attempted break-in to household",
      "description" :"This question collects whether a person has noticed any signs of an attempted beak-in to their home, shed or garage in the last 12 months. This is a single-response question asked with a pick list."
    },
    {
      "id" : "8",
      "name" : "Signs of attempted break-in to household", 
      "description": "This question collects how many attempted break-ins a person has noted on their home, shed or garage in the last 12 months. This question is asked with a numeric entry field."
    },
    {
      "id" : "9",
      "name" : "Sexual assault",
      "description": "This question collects whether a person has been a victim of sexual assault or attempted sexual assault in the last 12 months. This is a single-response question asked with a pick list."     
  }
];

const  questionBlock =[
  {
    "name" : "Victimisation",
    "description" : "Victimisation question module",
    "questionsId" : ["1","2","3","4","5","6","7","8","9"]    
  }
];

