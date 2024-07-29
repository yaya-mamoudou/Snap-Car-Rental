import React from 'react'
import { cn, Input as In } from '@nextui-org/react'
import type { InputProps } from '@nextui-org/react'

export default function Input({className,...props}: InputProps) {
    return <In className={cn('', className)}
    classNames={{
        input:
          "border-transparent !ring-0 pl-0 py-0 !shadow-none focus:border-transparent ",
    }}
    {...props}
        
    />
}
