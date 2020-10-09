import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Post: Prisma.Post
  Profile: Prisma.Profile
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'name' | 'posts' | 'profile'
      ordering: 'id' | 'email' | 'name'
    }
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'published' | 'content' | 'title' | 'authorId' | 'author'
      ordering: 'id' | 'createdAt' | 'published' | 'content' | 'title' | 'authorId'
    }
    profiles: {
      filtering: 'AND' | 'OR' | 'NOT' | 'bio' | 'id' | 'userId' | 'user'
      ordering: 'bio' | 'id' | 'userId'
    }
  },
  User: {
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'published' | 'content' | 'title' | 'authorId' | 'author'
      ordering: 'id' | 'createdAt' | 'published' | 'content' | 'title' | 'authorId'
    }
  }
  Post: {

  }
  Profile: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    post: 'Post'
    posts: 'Post'
    profile: 'Profile'
    profiles: 'Profile'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOnePost: 'Post'
    updateOnePost: 'Post'
    updateManyPost: 'BatchPayload'
    deleteOnePost: 'Post'
    deleteManyPost: 'BatchPayload'
    upsertOnePost: 'Post'
    createOneProfile: 'Profile'
    updateOneProfile: 'Profile'
    updateManyProfile: 'BatchPayload'
    deleteOneProfile: 'Profile'
    deleteManyProfile: 'BatchPayload'
    upsertOneProfile: 'Profile'
  },
  User: {
    id: 'Int'
    email: 'String'
    name: 'String'
    posts: 'Post'
    profile: 'Profile'
  }
  Post: {
    id: 'Int'
    createdAt: 'DateTime'
    published: 'Boolean'
    content: 'String'
    title: 'String'
    authorId: 'Int'
    author: 'User'
  }
  Profile: {
    bio: 'String'
    id: 'Int'
    userId: 'Int'
    user: 'User'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Post: Typegen.NexusPrismaFields<'Post'>
  Profile: Typegen.NexusPrismaFields<'Profile'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  