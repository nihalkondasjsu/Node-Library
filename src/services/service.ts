import Repository from '../repositories/repository';

export default interface Service{
    repository : Repository;
    get : Function,
    getAll : Function,
    create : Function,
    update : Function,
    updatePartial : Function,
    delete : Function,
    [propName: string]: any
}