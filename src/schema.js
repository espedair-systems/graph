

// Read the complete docs for graphql-tools here:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html

import {
  find,
  filter
} from 'lodash';
import {
  makeExecutableSchema
} from 'graphql-tools';

const typeDefs = `
 
 type Concept {
 	  id: Int!
    conceptLabel : [String]
    isCharacteristic : Boolean
    name : String!
    description : String!
    isComparableTo : [Concept]
    isQualificationOf : [Concept]
 }
 
 type UnitType {
 	  id: Int!
    name : String!
    description : String!
    references : [UnitType]
    isBasedOn : [Concept]!
 }

 
 type Variable {
 	  id: Int!
    name : String!
    description : String!
    isComparableTo : [Variable]
    unitTypeId : UnitType!
    measures : Concept!
    representedVariable : [RepresentedVariable]
 }


 type RepresentedVariable  {
 	id: Int!
    shortName : String
    isTypicallySensitive : Boolean!
    name : String!
    description : String!
    variable : Variable!
  #  isMeasuredBy : ValueDomain!
} 
 
type Question {
	id: Int!
    questionPurpose : String
    questionText : String
    name : String!
    description : String!
    references : [Question]
    representedVariable : RepresentedVariable!
}



type QuestionBlock {
	id: Int!
    name : String!
    description : String!
    questions : [Question]
} 



  # the schema allows the following query:
  type Query {
    getQuestionBlocks : [QuestionBlock],
    getQuestions : [Question],
    getRepresentedVariables : [RepresentedVariable],
    getVariables : [Variable],
    getUnitTypes: [UnitType],
    getConcepts: [Concept],
    
    getQuestionBlock(id: Int!): QuestionBlock,
    getQuestion(id: Int!): Question,
    getRepresentedVariable(id: Int!): RepresentedVariable,
    getVariable(id: Int!): Variable,
    getUnitType(id: Int!): UnitType,
    getConcept(id: Int!): Concept
    
  }

`;



const resolvers = {
  Query: {
    getQuestionBlocks: () => QUESTION_BLOCKS,
    getQuestions: () => QUESTIONS,
    getRepresentedVariables: () => REPRESENTED_VARIABLES,
    getVariables: () => VARIABLES,
    getUnitTypes: () => UNIT_TYPES,
    getConcepts: () => CONCEPTS,

    getQuestionBlock: (_, { id }) => find(QUESTION_BLOCKS, { id: id }),
    getQuestion: (_, { id }) => find(QUESTIONS, { id: id }),
    getRepresentedVariable: (_, { id }) => find(REPRESENTED_VARIABLES, { id: id }),
    getVariable: (_, { id }) => find(VARIABLES, { id: id }),
    getUnitType: (_, { id }) => find(UNIT_TYPES, { id: id }),
    getConcept: (_, { id }) => find(CONCEPTS, { id: id }),

  },
  RepresentedVariable: {
    variable: (representedVariable) => find(VARIABLES, { id: representedVariable.takesMeaningFrom }),
  }, 
  Variable: {
    representedVariable: (variable) => filter(REPRESENTED_VARIABLES, { id: variable }),
  },

  QuestionBlock: {
    questions :  (root) => root.questions.map(quest => {
      return QUESTIONS.filter(
        singleQ => singleQ.id === quest
      )[0];
    }), 
  },

  Question : {
    representedVariable : (question) => find(REPRESENTED_VARIABLES, { id : question.representedVariableId }),
  }

};

 

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});





const CONCEPTS = [
  {
    id: 0,
    name: 'CONCEPT',
    description: 'CONCEPT TBD'
  },
  {
    id: 1,
    name: 'Person',
    description: 'A person is defined as a human being.'
  },
  {
    id: 2,
    name: 'Household',
    description: 'A group of persons who share the same living accommodation, who pool some, or all, of their income and wealth and who consume certain types of goods and services collectively, mainly housing and food.'
  }
];

const UNIT_TYPES = [
  {
    id: 0,
    name: 'UNIT TYPE',
    description: 'UNIT TYPE TBD',
    isBasedOn: 0
  },
  {
    id: 1,
    name: 'Person',
    description: 'A person is defined as a human being.',
    isBasedOn: 1
  },
  {
    id: 2,
    name: 'Household',
    description: 'A group of persons who share the same living accommodation, who pool some, or all, of their income and wealth and who consume certain types of goods and services collectively, mainly housing and food.',
    isBasedOn: 2
  },
  {
    id: 3,
    name: 'Business',
    description: 'An entity engaging in productive activity and/or other forms of economic activity in the economy. Such entities accumulate assets on their own account and/or hold assets on behalf of others, and may incur liabilities.',
    isBasedOn: 3
  },
  {
    id: 4,
    name: 'Social Episode',
    description: 'The Social episode unit type is used when the data is about a characteristic or grouping of social units, rather than a social unit type (i.e.: a person, income unit, family, or household).',
    isBasedOn: 3
  }];


const VARIABLES = [
  {
    id: 0,
    name: 'VARIABLE',
    description: 'VARIABLE TBD',
    unitTypeId: 0,
    measures: 0
  },
  {
    id: 1,
    name: 'Victimisation of Person',
    description: 'Whether a person has had physical force or violence used against them',
    unitTypeId: 1,
    measures: 0
  }];


const REPRESENTED_VARIABLES = [
  {
    id: 0,
    name: 'REPRESENTED VARIABLES',
    description: 'REPRESENTED VARIABLES TBD',
    takesMeaningFrom: 0
  },
  {
    id: 1,
    name: 'Person experienced physical force or violence',
    description: 'Whether a person has had physical force or violence used against them',
    takesMeaningFrom: 1
  },
  {
    id: 2,
    name: 'Person experienced physical force or violence',
    description: 'How many times an event occurred',
    takesMeaningFrom: 1
  },
  {
    id: 3,
    name: 'Person threatened with physical harm',
    description: 'Person threatened with physical harm',
    takesMeaningFrom: 1
  },
  {
    id: 4,
    name: 'Person threatened with physical harm',
    description: 'How many times an event occurred',
    takesMeaningFrom: 1
  },
  {
    id: 5,
    name: 'Person\'s home shed or garage broken into',
    description: 'Persons home shed or garage broken into',
    takesMeaningFrom: 1
  },
  {
    id: 6,
    name: 'Person\'s home shed or garage broken into',
    description: 'How many times an event occurred',
    takesMeaningFrom: 1
  },
  {
    id: 7,
    name: 'Signs of attempted break-in to household',
    description: 'Whether a person has noticed any signs of an attempted break-in to their household',
    takesMeaningFrom: 1
  },
  {
    id: 8,
    name: 'Signs of attempted break-in to household',
    description: 'How many times an event occurred',
    takesMeaningFrom: '1'
  },
  {
    id: 9,
    name: 'RV Sexual assault ',
    description: 'Whether a person has been a victim of sexual assault or attempted sexual assault',
    takesMeaningFrom: 1
  }
];


const QUESTIONS = [
  {
    id: 0,
    name: 'QUESTION',
    description: 'QUESTIONS TBD',
    representedVariableId: 0
  },
  {
    id: 1,
    name: 'Person experienced physical force or violence',
    description: 'This question collects whether a person has had physical force or violence used against them. This is a single-response question asked with a pick list.',
    representedVariableId: 1
  },
  {
    id: 2,
    name: 'Person experienced physical force or violence',
    description: 'This question collects how many times a person has had physical force or violence used against them. This question is asked with a numeric entry field.',
    representedVariableId: 2
  },
  {
    id: 3,
    name: 'Person threatened with physical harm',
    description: 'This question collects whether a person  was threatened with physical harm, excluding any cases recorded in the previous question. This is a single-response question asked with a pick list',
    representedVariableId: 3
  },
  {
    id: 4,
    name: 'Person threatened with physical harm',
    description: 'This question collects how many times a person was threatened with physical harm face-to-face, excluding any cases recorded in the previous question. This question is asked with a numeric entry field',
    representedVariableId: 4
  },
  {
    id: 5,
    name: 'Person\'s home shed or garage broken into',
    description: 'This question collects whether a person\'s home, shed or garage was broken into in the last 12 months. This is a single-response question asked with a pick list',
    representedVariableId: 5
  },
  {
    id: 6,
    name: 'Person\'s home shed or garage broken into',
    description: 'This question collects how many times a person\'s home, shed or garage was broken into in the last 12 months. This question is asked with a numeric entry field',
    representedVariableId: 6
  },
  {
    id: 7,
    name: 'Signs of attempted break-in to household',
    description: 'This question collects whether a person has noticed any signs of an attempted beak-in to their home, shed or garage in the last 12 months. This is a single-response question asked with a pick list.',
    representedVariableId: 7
  },
  {
    id: 8,
    name: 'Signs of attempted break-in to household',
    description: 'This question collects how many attempted break-ins a person has noted on their home, shed or garage in the last 12 months. This question is asked with a numeric entry field.',
    representedVariableId: 8
  },
  {
    id: 9,
    name: 'Sexual assault',
    description: 'This question collects whether a person has been a victim of sexual assault or attempted sexual assault in the last 12 months. This is a single-response question asked with a pick list.',
    representedVariableId: 9
  }
];






const QUESTION_BLOCKS = [
  {
    id: 0,
    name: 'QUESTION_BLOCKS',
    description: 'QUESTION_BLOCKS TBD',
    questions: [0]
  },
  {
    id: 1,
    name: 'Victimisation',
    description: 'Victimisation question module',
    questions: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }];

