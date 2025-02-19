export type TypeInput = {
    type: string,
    placeholder: string,
    name: string,
    value?: string,
    onChange?: (e: any) => void,
    className: string
    onKeyDown?: (e: any) => void
}