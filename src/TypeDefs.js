/** INTERFACES **/


interface BaseResource  {
}



interface LogicalModel  {
    name : String!
    description : String!
}



interface NamedResource  {
    name : String!
    description : String!
}



interface StatisticalObject  {
}



interface DataSet  {
    name : String!
    description : String!
}



interface DataStructure  {
}



interface DescribedValueDomain  {
    dataType : String!
    format : String
    name : String!
    description : String!
}



interface InformationSet  {
    name : String!
    description : String!
}



interface ValueDomain  {
    name : String!
    description : String!
}



interface Node  {
    name : String!
    description : String!
}



interface NodeSet  {
    name : String!
    description : String!
}



/** TYPES **/


type AlternateID {
    alternateID : String!
    identifierDomain : IdentifierDomain!
}



type IdentifierDomain implements NamedResource & StatisticalObject & BaseResource {
    iDIsUnique : Boolean!
    iDFormat : String!
    name : String!
    description : String!
}



type Concept implements NamedResource & StatisticalObject & BaseResource {
    conceptLabel : [String]
    isCharacteristic : Boolean
    name : String!
    description : String!
    isComparableTo : [Concept]
    isQualificationOf : [Concept]
}



type DataStructureComponent implements AIMStructureComponent & LogicalModelComponent & NamedResource & StatisticalObject & BaseResource {
    actsAsAnIdentifier : Boolean!
    actsAsAMeasure : Boolean!
    actsAsAnAttribute : Boolean!
    actsAsAReference : Boolean!
    actsAsAReferencePeriod : Boolean!
    actsAsACollectionPoint : Boolean!
    actsAsACellESC : Boolean!
    actsAsAReportingPeriod : Boolean!
    actsAsARecordESC : Boolean!
    isSensitive : Boolean!
    name : String!
    description : String!
    isOfDSCType : [DataStructureComponentType]
    isDefinedBy : RepresentedVariable!
}



type DateTimeValueDomain implements DescribedValueDomain & ValueDomain & NamedResource & StatisticalObject & BaseResource {
    representationType : String!
    default : Date
    dataType : String!
    format : String
}



type EnumeratedValueDomain implements ValueDomain & NamedResource & StatisticalObject & BaseResource {
    unitOfMeasure : String
    name : String!
    description : String!
    excludes : [Level]
    defaultItem : Node
    hasAllowedValuesFrom : [NodeSet]
}



type InstanceVariable implements NamedResource & StatisticalObject & BaseResource {
    isNullable : Boolean!
    isHighUsage : Boolean!
    mDMID : String
    shortName : String
    name : String!
    description : String!
    measures : Population!
    isOfType : InstanceVariableType
    takesMeaningFrom : RepresentedVariable!
    component : DataStructureComponent!
}



type NumericValueDomain implements DescribedValueDomain & ValueDomain & NamedResource & StatisticalObject & BaseResource {
    maximumValue : Decimal
    minimumValue : Decimal
    representationType : String!
    default : Decimal
    dataType : String!
    format : String
    name : String!
    description : String!
    unitOfMeasure : UnitOfMeasure!
}



type Population implements NamedResource & StatisticalObject & BaseResource {
    geography : String
    populationExclusions : String
    populationInclusions : String
    populationUsage : [String]
    referencePeriodEnd : Date
    referencePeriodStart : Date
    referencePeriodType : String
    name : String!
    description : String!
    child : Population
    isSpecificationOf : [UnitType]!
    references : [Concept]!
}



type RepresentedVariable implements NamedResource & StatisticalObject & BaseResource {
    shortName : String
    isTypicallySensitive : Boolean!
    name : String!
    description : String!
    takesMeaningFrom : Variable!
    isMeasuredBy : ValueDomain!
    rVType : RepresentedVariableType
}



type StatisticalProgram implements BusinessDomain & NamedResource & StatisticalObject & BaseResource {
    alternativeName : [String]
    statisticalProgramID : String!
    budgetCode : Int
    dateended : Date
    dateInitiated : Date
    purpose : String!
    responsibleManager : String!
    scope : String!
    section : [String]!
    topicalCoverage : [String]
    subjectMatterDomain : [String]!
    name : String!
    description : String!
    relatedTo : [StatisticalProgram]
    uses : StatisticalProgramDesign
    isChildOf : StatisticalFamily
    repetitionPeriod : [TimeDuration]
    statisticalProgramStatus : StatisticalProgramStatusCVIReference!
    collectionStatus : CollectionStatusCVIReference!
    sourceOfFunding : SourceOfFundingCVIReference!
    legalFramework : LegalFrameworkCVIReference!
}



type TextValueDomain implements DescribedValueDomain & ValueDomain & NamedResource & StatisticalObject & BaseResource {
    maximumLength : Int
    minimumLength : Int
    default : String
    dataType : String!
    format : String
    name : String!
    description : String!
}



type UnitDataSet implements SimpleDataSet & DataSet & InformationSet & LogicalModel & NamedResource & StatisticalObject & BaseResource {
    mDMID : String
    dataSetTag : String
    has : [UnitDataRecord]
}



type UnitType implements NamedResource & StatisticalObject & BaseResource {
    name : String!
    description : String!
    references : [UnitType]
    isBasedOn : [Concept]!
}



type Variable implements NamedResource & StatisticalObject & BaseResource {
    name : String!
    description : String!
    isComparableTo : [Variable]
    measures : UnitType!
    measures : Concept!
}



type SimpleDataSet implements DataSet & InformationSet & LogicalModel & NamedResource & StatisticalObject & BaseResource {
    mDMID : String
    dataSetTag : String
    name : String!
    description : String!
    isOfType : SimpleDataSetType
    hasASetOf : DataSetVersion
    isDefinedBy : UnitType!
    references : [InstanceVariable]!
    isStructuredBy : DataStructure!
}



type UnitOfMeasure implements NamedResource & StatisticalObject & BaseResource {
    isSI : Boolean!
    magnitudeRelativeToSI : Decimal!
    preSymbol : String
    postSymbol : String
    name : String!
    description : String!
    isMeasureOf : NumericallyMeasurableProperty
}



type ClassificationItem implements Node & NamedResource & StatisticalObject & BaseResource {
    alternativeName : [String]
    caseLawDates : [Date]
    caseLawDescriptions : [String]
    caseLaws : [String]
    code : String!
    currentlyValid : Boolean
    explanatoryNote : String
    futureEvents : [String]
    isGenerated : Boolean
    officialName : String!
    validFrom : Date
    validTo : Date
    name : String!
    description : String!
    isChildOf : ClassificationItem
}



type CodeItem implements Node & NamedResource & StatisticalObject & BaseResource {
    codeItemLabel : [String]!
    codeValue : String!
    name : String!
    description : String!
    isChildOf : CodeItem
}



type CodeList implements NodeSet & NamedResource & StatisticalObject & BaseResource {
    alternativeName : [String]
    alternativeNameType : [String]
    name : String!
    description : String!
    has : [Level]
    contains : [CodeItem]!
}



type Level implements NamedResource & StatisticalObject & BaseResource {
    levelNumber : Int!
    name : String!
    description : String!
    contains : [Node]!
    isChildOf : Level
    isBasedOn : [Concept]
}



type StatisticalClassification implements NodeSet & NamedResource & StatisticalObject & BaseResource {
    alternativeNames : [String]
    changesFromBaseStatisticalClassification : [String]
    contactPersons : [String]
    copyright : [String]
    disseminationAllowed : Boolean
    introduction : String
    isFloating : Boolean
    isUpdate : Boolean
    isVariant : Boolean
    isVersion : Boolean
    languagesAvailable : [String]
    legalBase : [String]
    publications : [String]
    purposeOfVariant : String
    releaseDate : Date
    terminationDate : Date
    updatesPossible : String
    name : String!
    description : String!
    isBasedOn : StatisticalClassification
    has : [Level]!
    contains : [ClassificationItem]!
}



type BusinessCase implements NamedResource & StatisticalObject & BaseResource {
    dateApproved : Date
    dateImplementationCommenced : Date
    dateInitiated : Date
    outcomes : [String]
    outputs : [String]
    name : String!
    description : String!
    initiates : [StatisticalSupportProgram]
    isBasedOn : [ChangeDefinition]
    uses : [Assessment]
    initiates : [StatisticalProgram]
    businessCaseType : BusinessCaseTypeCVIReference
}



type StatisticalProgramDesign implements NamedResource & StatisticalObject & BaseResource {
    conceptualFramework : [String]
    dateEnded : Date
    dateInitiated : Date
    referencePeriod : String
    name : String!
    description : String!
    has : Workflow
    uses : [ProcessPattern]
    uses : [BusinessService]
    uses : [BusinessFunction]
    isBasedOn : [BusinessCase]
    completionStatus : CollectionStatusCVIReference
    collectionFrequency : CollectionFrequencyCVIReference
}



type Question implements NamedResource & StatisticalObject & BaseResource {
    questionPurpose : String
    questionText : String!
    name : String!
    description : String!
    references : [Question]
    references : [AssociatedFile]
    rV : RepresentedVariable!
    questionType : QuestionType
}



type QuestionBlock implements NamedResource & StatisticalObject & BaseResource {
    questionBlockPurpose : String
    name : String!
    description : String!
    has : QuestionnaireLogic
    includes : [QuestionBlock]
    includes : [Statement]
    includes : [Question]
    references : [AssociatedFile]
    structure : DataStructure
}



