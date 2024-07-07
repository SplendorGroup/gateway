import {
    error,
    exception,
    Prisma,
} from '@prisma/client';

export type ModelName =
    | 'error'
    | 'exception'

export type PrismaModels = {
    error: Prisma.errorDelegate<any>;
};
export type ModelType<M extends keyof PrismaModels> = PrismaModels[M];

interface Data {
    error: error,
    exception: exception
}

export type DataType<T extends keyof Data> = Data[T];

export interface IPrisma<T extends keyof Data> {
    create: (data: Partial<DataType<T>>) => Promise<DataType<T>>;
    createMany: (data: Partial<DataType<T>>[]) => Promise<DataType<T>[]>;
    findOne: (filter: Partial<DataType<T>>) => Promise<DataType<T> | null>;
    findById: (id: string) => Promise<DataType<T> | null>;
    findAll: (
        filter?: { skip?: number; take?: number } & Partial<DataType<T>>,
    ) => Promise<DataType<T>[]>;
    update: (id: string, data: Partial<DataType<T>>) => Promise<T | null>;
    updateMany: (
        filter: Partial<DataType<T>>,
        data: Partial<DataType<T>>,
    ) => Promise<T[]>;
    deleteById: (id: string) => Promise<void>;
    deleteMany: (filter: Partial<DataType<T>>) => Promise<void>;
    count: (filter: Partial<unknown>) => Promise<number | null>;
}

export interface IRepository {
    create: (data: unknown) => Promise<unknown>;
    createMany: (data: unknown[]) => Promise<any[]>;
    findOne: (filter: Partial<unknown>) => Promise<unknown | null>;
    findById: (id: string) => Promise<unknown | null>;
    findAll: (filter: Partial<unknown>) => Promise<unknown[]>;
    update: (id: string, data: Partial<unknown>) => Promise<unknown | null>;
    updateMany: (
        filter: Partial<unknown>,
        data: Partial<unknown>,
    ) => Promise<unknown | null>;
    deleteById: (id: string) => Promise<void>;
    deleteMany: (filter: Partial<unknown>) => Promise<void>;
    count: (filter: Partial<unknown>) => Promise<number | null>;
}
