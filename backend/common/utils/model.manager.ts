import { Model, ModelCtor } from 'sequelize-typescript';
import { Includeable, WhereOptions } from 'sequelize/types/model';
import { NotFoundResponse } from '../responses/not-found.response';

type AscDescType<T> =
  | [Extract<keyof T, string>, 'ASC' | 'DESC']
  | [Extract<keyof T, string>, Extract<keyof T, string>, 'ASC' | 'DESC']
  | [Extract<keyof T, string>, Extract<keyof T, string>, Extract<keyof T, string>, 'ASC' | 'DESC']
  | [
      Extract<keyof T, string>,
      Extract<keyof T, string>,
      Extract<keyof T, string>,
      Extract<keyof T, string>,
      'ASC' | 'DESC',
    ];

interface BaseOptions<T> {
  where?: WhereOptions<T>;
  include?: Includeable | Includeable[];
}

interface FilterParams<T> extends BaseOptions<T> {
  ascKeys?: AscDescType<T>;
  descKeys?: AscDescType<T>;
  perPage: number;
  page: number;
}

export interface PaginatedModel<T> {
  currentPage: number;
  totalPages: number;
  rows: T[];
}

export class PaginatedModelClass<T> {
  currentPage: number;
  totalPages: number;
  rows: T[];

  constructor(currentPage: number, totalPages: number, rows: T[]) {
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.rows = rows;
  }
}

export class ModelManager<T extends Model<T>> {
  private readonly _model: ModelCtor<T>;
  constructor(model: ModelCtor<T>) {
    this._model = model;
  }

  public async paginateFindAll(options: FilterParams<T>): Promise<PaginatedModelClass<T>> {
    const offset: number = (options.page - 1) * options.perPage;
    const orderCondition: AscDescType<T>[] = [];
    if (options.ascKeys) {
      orderCondition.push(options.ascKeys);
    }
    if (options.descKeys) {
      orderCondition.push(options.descKeys);
    }
    return await this._model
      .findAndCountAll({
        limit: options.perPage,
        offset: offset,
        where: options.where,
        include: options.include,
        order: orderCondition,
      })
      .then(({ rows, count }): PaginatedModelClass<T> => {
        if (rows.length == 0) {
          throw new NotFoundResponse('Посты не найдены');
        }
        return new PaginatedModelClass<T>(options.page, Math.ceil(count / options.perPage), rows);
      });
  }

  public async multipleIdExistsCheck(ids: number[], options?: BaseOptions<T>, errorMessage?: string): Promise<T[]> {
    const essences: T[] = await this._model.findAll(options);
    if (essences.length !== ids.length) {
      essences.forEach((essence: T): void => {
        const index: number = ids.indexOf(essence.id);
        ids.splice(index, 1);
      });
      throw new NotFoundResponse(errorMessage);
    }
    return essences;
  }
}
