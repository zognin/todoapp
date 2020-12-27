import React, { useState } from 'react';

const CheckboxTicked = ({ toggleCheckbox, id }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onClick={toggleCheckbox}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {isHover ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='81'
          height='81'
          viewBox='0 0 81 81'
          id={id}
        >
          <g
            id='Group_17'
            data-name='Group 17'
            transform='translate(-1211 -576)'
          >
            <g
              id='Rectangle_9'
              data-name='Rectangle 9'
              transform='translate(1211 576)'
              fill='#ceedff'
              stroke='#0c129f'
              stroke-width='8'
            >
              <rect width='81' height='81' stroke='none' id={id} />
              <rect x='4' y='4' width='73' height='73' fill='none' id={id} />
            </g>
            <line
              id='Line_1'
              data-name='Line 1'
              x2='14'
              y2='17'
              transform='translate(1233.5 615.5)'
              fill='none'
              stroke='#0c129f'
              stroke-width='8'
              id={id}
            />
            <line
              id='Line_2'
              data-name='Line 2'
              x1='31'
              y2='30'
              transform='translate(1243.5 602.5)'
              fill='none'
              stroke='#0c129f'
              stroke-width='8'
              id={id}
            />
          </g>
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='81'
          height='81'
          viewBox='0 0 81 81'
          preserveAspectRatio='xMaxYMin meet'
          id={id}
        >
          <g id='Group_3' data-name='Group 3' transform='translate(-1207 -399)'>
            <g id='Group_5' data-name='Group 5' transform='translate(-4 -177)'>
              <g
                id='Rectangle_9'
                data-name='Rectangle 9'
                transform='translate(1211 576)'
                fill='#fff'
                stroke='#0c129f'
                strokeWidth='8'
              >
                <rect width='81' height='81' stroke='none' id={id} />
                <rect x='4' y='4' width='73' height='73' fill='none' id={id} />
              </g>
              <line
                id='Line_1'
                data-name='Line 1'
                x2='14'
                y2='17'
                transform='translate(1233.5 615.5)'
                fill='none'
                stroke='#0c129f'
                strokeWidth='8'
                id={id}
              />
              <line
                id='Line_2'
                data-name='Line 2'
                x1='31'
                y2='30'
                transform='translate(1243.5 602.5)'
                fill='none'
                stroke='#0c129f'
                strokeWidth='8'
                id={id}
              />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};

export default CheckboxTicked;
