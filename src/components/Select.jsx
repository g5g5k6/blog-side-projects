import React , {useId} from "react"

function Select({
    options,
    label,
    className,
    ...props
    }, ref
    ){
    const id = useId()
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id}
                className='inline-block mb-1 pl-1'>
                {label}
                </label>
            )}
            <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none
             focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
            {
            options.map((option) => {
                const isObject = typeof option === 'object';
                const value = isObject ? option.value : option;
                const label = isObject ? option.label : option;
                
                return (
                    <option
                    key={value} 
                    value={value}
                    >{label}</option>
                );
            })
            }
            </select>
        </div>
    )
}

export default React.forwardRef(Select)