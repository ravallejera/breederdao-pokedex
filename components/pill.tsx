import cn from 'classnames';




export default function Pills({
    types,
    className,
}: {
    types: string[],
    className?: string,
}) {
  
  return (
    <div className={cn('pills')}>
      {types.map((text, index) => <span key={index} className={cn('pill')}>{ text }</span>)}
    </div>
  )
}
