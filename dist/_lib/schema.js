"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.schema = void 0;
var schema_1 = require("nexus-plugin-prisma/schema");
var schema_2 = require("@nexus/schema");
var seed_1 = require("./seed");
var path_1 = __importDefault(require("path"));
var User = schema_2.objectType({
    name: 'User',
    definition: function (t) {
        t.model.id();
        t.model.name();
        t.model.email();
        t.model.posts({
            pagination: false
        });
    }
});
var Post = schema_2.objectType({
    name: 'Post',
    definition: function (t) {
        t.model.id();
        t.model.title();
        t.model.content();
        t.model.published();
        t.model.author();
        t.model.authorId();
    }
});
var Profile = schema_2.objectType({
    name: 'Profile',
    definition: function (t) {
        t.model.id();
        t.model.bio();
        t.model.user();
        t.model.userId();
    }
});
var Query = schema_2.objectType({
    name: 'Query',
    definition: function (t) {
        t.crud.post();
        t.crud.profile();
        t.crud.users();
        t.list.field('allProfiles', {
            type: 'Profile',
            resolve: function (_, args, ctx) {
                return ctx.prisma.profile.findMany();
            }
        });
        t.list.field('feed', {
            type: 'Post',
            resolve: function (_, args, ctx) {
                return ctx.prisma.post.findMany({
                    where: { published: true }
                });
            }
        });
        t.list.field('filterPosts', {
            type: 'Post',
            args: {
                searchString: schema_2.stringArg({ required: true })
            },
            resolve: function (_, _a, ctx) {
                var searchString = _a.searchString;
                return ctx.prisma.post.findMany({
                    where: {
                        OR: [
                            { title: { contains: searchString } },
                            { content: { contains: searchString } },
                        ]
                    }
                });
            }
        });
    }
});
var Mutation = schema_2.objectType({
    name: 'Mutation',
    definition: function (t) {
        var _this = this;
        t.crud.createOneUser({ alias: 'signupUser' });
        t.crud.deleteOnePost();
        t.list.field('seed', {
            type: 'User',
            resolve: function (_, args, ctx) { return __awaiter(_this, void 0, void 0, function () {
                var createdUsers, _i, seedUsers_1, userData, createdUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ctx.prisma.post.deleteMany({})];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, ctx.prisma.profile.deleteMany({})];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, ctx.prisma.user.deleteMany({})];
                        case 3:
                            _a.sent();
                            createdUsers = [];
                            _i = 0, seedUsers_1 = seed_1.seedUsers;
                            _a.label = 4;
                        case 4:
                            if (!(_i < seedUsers_1.length)) return [3 /*break*/, 7];
                            userData = seedUsers_1[_i];
                            return [4 /*yield*/, ctx.prisma.user.create({
                                    data: userData,
                                    include: { posts: true }
                                })];
                        case 5:
                            createdUser = _a.sent();
                            createdUsers.push(createdUser);
                            _a.label = 6;
                        case 6:
                            _i++;
                            return [3 /*break*/, 4];
                        case 7: return [2 /*return*/, createdUsers];
                    }
                });
            }); }
        });
        t.field('createDraft', {
            type: 'Post',
            args: {
                title: schema_2.stringArg({ nullable: false }),
                content: schema_2.stringArg(),
                authorEmail: schema_2.stringArg({ required: true })
            },
            resolve: function (_, _a, ctx) {
                var title = _a.title, content = _a.content, authorEmail = _a.authorEmail;
                return ctx.prisma.post.create({
                    data: {
                        title: title,
                        content: content,
                        published: false,
                        author: {
                            connect: { email: authorEmail }
                        }
                    }
                });
            }
        });
        t.field('publish', {
            type: 'Post',
            nullable: true,
            args: {
                id: schema_2.intArg()
            },
            resolve: function (_, _a, ctx) {
                var id = _a.id;
                return ctx.prisma.post.update({
                    where: { id: Number(id) },
                    data: { published: true }
                });
            }
        });
    }
});
var generateArtifacts = Boolean(process.env.GENERATE_ARTIFACTS);
exports.schema = schema_2.makeSchema({
    types: [Query, Mutation, Post, User, Profile],
    plugins: [
        schema_1.nexusSchemaPrisma({
            experimentalCRUD: true,
            shouldGenerateArtifacts: generateArtifacts,
            outputs: {
                typegen: path_1["default"].join(__dirname, '/generated/prisma-nexus.ts')
            }
        }),
    ],
    shouldGenerateArtifacts: generateArtifacts,
    outputs: {
        schema: path_1["default"].join(__dirname, '/../../schema.graphql'),
        typegen: path_1["default"].join(__dirname, '/generated/nexus.ts')
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma'
            },
            {
                source: require.resolve('./context'),
                alias: 'Context'
            },
        ]
    }
});
