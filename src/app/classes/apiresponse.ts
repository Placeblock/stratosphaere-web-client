export interface APIResponse<D> {
    code: number,
    msg: string,
    data: D
}