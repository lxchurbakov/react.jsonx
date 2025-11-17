export type Input<T> = { 
    value: T,
    onChange: (value: T) => void 
};

export type PropsOf<T> = T extends React.FC<infer A> ? A : never;
