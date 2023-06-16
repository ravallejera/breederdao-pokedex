import  { Pokemon } from '@/app/pokedex/page';
import cn from 'classnames';
import Pills from './pill';



export default function Card({
    data
}: {
    data: Pokemon
}) {
  const {
    name,
    types,
    image
  } = data;



  return (
    <div className={cn('card',
        ''
    )}>
       <h2 className={cn('text-dark')}>{ name }</h2>
       {/* <Pills types={types} /> */}
    </div>
  )
}
