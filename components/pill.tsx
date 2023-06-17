import cn from 'classnames';

interface PillsProps {
  types: string[];
  className?: string;
}

const bgColorMap: Record<string, string> = {
  Bug: '#BACA34',
  Electric: '#FEDB49',
  Fairy: '#F8A3FC',
  Fighting: '#9E4940',
  Fire: '#FD4240',
  Flying: '#6E9CFA',
  Ghost: '#6D6BC7',
  Grass: '#7ED252',
  Ground: '#E4BE55',
  Ice: '#88F1FD',
  Normal: '#B6B5A8',
  Poison: '#9A4D8F',
  Psychic: '#F751A3',
  Rock: '#C5B26E',
  Steel: '#BDBBD8',
  Water: '#49A7FB',
};

export default function Pills({ types, className }: PillsProps) {
  const pillClass = 'flex items-center justify-center text-dark text-[12px] bg-black min-w-[58px] h-[17px] rounded-[11px] shadow-pill';

  return (
    <div className="pills flex gap-x-3">
      {types.map((text, index) => (
        <span key={index} className={cn(pillClass, className)} style={{ background: bgColorMap[text] || bgColorMap.Normal }}>
          {text}
        </span>
      ))}
    </div>
  );
}
