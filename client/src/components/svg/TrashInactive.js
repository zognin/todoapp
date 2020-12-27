import React, { useState } from 'react';

const TrashInactive = ({ handleDeleteClick, id }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onClick={handleDeleteClick}
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
            id='Group_18'
            data-name='Group 18'
            transform='translate(-1211 -576)'
          >
            <g
              id='Rectangle_9'
              data-name='Rectangle 9'
              transform='translate(1211 576)'
              fill='#bcbcbc'
              stroke='#bcbcbc'
              stroke-width='8'
            >
              <rect width='81' height='81' stroke='none' id={id} />
              <rect x='4' y='4' width='73' height='73' fill='none' id={id} />
            </g>
            <g
              id='Group_13'
              data-name='Group 13'
              transform='translate(-84 -163)'
            >
              <g
                id='Path_1'
                data-name='Path 1'
                transform='translate(1323 767)'
                fill='none'
              >
                <path
                  d='M8-.017h9c4.418,0,10.486-1.011,10.486,2.848L25,25.311c0,3.859-3.582,6.987-8,6.987H8c-4.418,0-8-3.128-8-6.987L-3.2,2.831C-3.2-1.028,3.582-.017,8-.017Z'
                  stroke='none'
                />
                <path
                  d='M 2.977325439453125 2.86323356628418 C 1.187198638916016 2.86323356628418 0.2998676300048828 3.022470474243164 -0.1230564117431641 3.149452209472656 L 2.970085144042969 24.88882255554199 L 2.999994277954102 25.09906387329102 L 2.999994277954102 25.3114128112793 C 2.999994277954102 26.29886245727539 3.467575073242188 27.25106239318848 4.316614151000977 27.99261283874512 C 5.280895233154297 28.83482360839844 6.589014053344727 29.29864311218262 8.000003814697266 29.29864311218262 L 17.00000381469727 29.29864311218262 C 18.41098403930664 29.29864311218262 19.7191047668457 28.83482360839844 20.68337440490723 27.99261283874512 C 21.53241539001465 27.25106239318848 21.9999942779541 26.29886245727539 21.9999942779541 25.3114128112793 L 21.9999942779541 25.14606285095215 L 22.01816558837891 24.98170280456543 L 24.43834495544434 3.093868255615234 C 24.06991004943848 2.990299224853516 23.3148250579834 2.863212585449219 21.8278751373291 2.86323356628418 C 21.07534408569336 2.86323356628418 20.25662422180176 2.893142700195312 19.4648551940918 2.922052383422852 C 18.64876556396484 2.951862335205078 17.80488586425781 2.982683181762695 17.00000381469727 2.982683181762695 L 8.000003814697266 2.982683181762695 C 7.209934234619141 2.982683181762695 6.392824172973633 2.954042434692383 5.527744293212891 2.923713684082031 C 4.679534912109375 2.893983840942383 3.802453994750977 2.86323356628418 2.977325439453125 2.86323356628418 M 2.977329254150391 -0.1367702484130859 C 4.683248519897461 -0.1367702484130859 6.480951309204102 -0.01731681823730469 8.000003814697266 -0.01731681823730469 L 17.00000381469727 -0.01731681823730469 C 18.51878547668457 -0.01731681823730469 20.23276519775391 -0.1367549896240234 21.82785034179688 -0.1367702484130859 C 24.87301254272461 -0.1368026733398438 27.48571395874023 0.2984142303466797 27.48571395874023 2.830842971801758 L 24.9999942779541 25.3114128112793 C 24.9999942779541 29.17035293579102 21.41827392578125 32.29864120483398 17.00000381469727 32.29864120483398 L 8.000003814697266 32.29864120483398 C 3.581724166870117 32.29864120483398 -5.7220458984375e-06 29.17035293579102 -5.7220458984375e-06 25.3114128112793 L -3.198604583740234 2.830842971801758 C -3.198604583740234 0.2986488342285156 -0.2785453796386719 -0.1367702484130859 2.977329254150391 -0.1367702484130859 Z'
                  stroke='none'
                  fill='#0c129f'
                />
              </g>
              <g
                id='Rectangle_18'
                data-name='Rectangle 18'
                transform='translate(1314 761)'
                fill='none'
                stroke='#0c129f'
                stroke-width='3'
              >
                <rect width='42' height='9' rx='4.5' stroke='none' id={id} />
                <rect
                  x='1.5'
                  y='1.5'
                  width='39'
                  height='6'
                  rx='3'
                  fill='none'
                  id={id}
                />
              </g>
              <g
                id='Rectangle_19'
                data-name='Rectangle 19'
                transform='translate(1328 755)'
                fill='none'
                stroke='#0c129f'
                stroke-width='3'
              >
                <rect width='14' height='9' rx='4.5' stroke='none' id={id} />
                <rect
                  x='1.5'
                  y='1.5'
                  width='11'
                  height='6'
                  rx='3'
                  fill='none'
                  id={id}
                />
              </g>
              <path
                id='Path_3'
                data-name='Path 3'
                d='M.085,0,0,16.859'
                transform='translate(1331.5 774.641)'
                fill='#0c129f'
                stroke='#0c129f'
                stroke-width='2'
              />
              <path
                id='Path_2'
                data-name='Path 2'
                d='M0,0,2.812,16.635'
                transform='translate(1338.988 774.641) rotate(11)'
                fill='#0c129f'
                stroke='#0c129f'
                stroke-width='2'
              />
            </g>
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
          <g
            id='Group_12'
            data-name='Group 12'
            transform='translate(-1211 -576)'
          >
            <g
              id='Rectangle_9'
              data-name='Rectangle 9'
              transform='translate(1211 576)'
              fill='#0c129f'
              stroke='#0c129f'
              strokeWidth='8'
            >
              <rect width='81' height='81' stroke='none' id={id} />
              <rect x='4' y='4' width='73' height='73' fill='none' id={id} />
            </g>
            <g
              id='Group_13'
              data-name='Group 13'
              transform='translate(-84 -163)'
            >
              <g
                id='Path_1'
                data-name='Path 1'
                transform='translate(1323 767)'
                fill='none'
              >
                <path
                  d='M8-.017h9c4.418,0,10.486-1.011,10.486,2.848L25,25.311c0,3.859-3.582,6.987-8,6.987H8c-4.418,0-8-3.128-8-6.987L-3.2,2.831C-3.2-1.028,3.582-.017,8-.017Z'
                  stroke='none'
                />
                <path
                  d='M 2.977325439453125 2.86323356628418 C 1.187198638916016 2.86323356628418 0.2998676300048828 3.022470474243164 -0.1230564117431641 3.149452209472656 L 2.970085144042969 24.88882255554199 L 2.999994277954102 25.09906387329102 L 2.999994277954102 25.3114128112793 C 2.999994277954102 26.29886245727539 3.467575073242188 27.25106239318848 4.316614151000977 27.99261283874512 C 5.280895233154297 28.83482360839844 6.589014053344727 29.29864311218262 8.000003814697266 29.29864311218262 L 17.00000381469727 29.29864311218262 C 18.41098403930664 29.29864311218262 19.7191047668457 28.83482360839844 20.68337440490723 27.99261283874512 C 21.53241539001465 27.25106239318848 21.9999942779541 26.29886245727539 21.9999942779541 25.3114128112793 L 21.9999942779541 25.14606285095215 L 22.01816558837891 24.98170280456543 L 24.43834495544434 3.093868255615234 C 24.06991004943848 2.990299224853516 23.3148250579834 2.863212585449219 21.8278751373291 2.86323356628418 C 21.07534408569336 2.86323356628418 20.25662422180176 2.893142700195312 19.4648551940918 2.922052383422852 C 18.64876556396484 2.951862335205078 17.80488586425781 2.982683181762695 17.00000381469727 2.982683181762695 L 8.000003814697266 2.982683181762695 C 7.209934234619141 2.982683181762695 6.392824172973633 2.954042434692383 5.527744293212891 2.923713684082031 C 4.679534912109375 2.893983840942383 3.802453994750977 2.86323356628418 2.977325439453125 2.86323356628418 M 2.977329254150391 -0.1367702484130859 C 4.683248519897461 -0.1367702484130859 6.480951309204102 -0.01731681823730469 8.000003814697266 -0.01731681823730469 L 17.00000381469727 -0.01731681823730469 C 18.51878547668457 -0.01731681823730469 20.23276519775391 -0.1367549896240234 21.82785034179688 -0.1367702484130859 C 24.87301254272461 -0.1368026733398438 27.48571395874023 0.2984142303466797 27.48571395874023 2.830842971801758 L 24.9999942779541 25.3114128112793 C 24.9999942779541 29.17035293579102 21.41827392578125 32.29864120483398 17.00000381469727 32.29864120483398 L 8.000003814697266 32.29864120483398 C 3.581724166870117 32.29864120483398 -5.7220458984375e-06 29.17035293579102 -5.7220458984375e-06 25.3114128112793 L -3.198604583740234 2.830842971801758 C -3.198604583740234 0.2986488342285156 -0.2785453796386719 -0.1367702484130859 2.977329254150391 -0.1367702484130859 Z'
                  stroke='none'
                  fill='#bcbcbc'
                />
              </g>
              <g
                id='Rectangle_18'
                data-name='Rectangle 18'
                transform='translate(1314 761)'
                fill='none'
                stroke='#bcbcbc'
                strokeWidth='3'
              >
                <rect width='42' height='9' rx='4.5' stroke='none' id={id} />
                <rect
                  x='1.5'
                  y='1.5'
                  width='39'
                  height='6'
                  rx='3'
                  fill='none'
                  id={id}
                />
              </g>
              <g
                id='Rectangle_19'
                data-name='Rectangle 19'
                transform='translate(1328 755)'
                fill='none'
                stroke='#bcbcbc'
                strokeWidth='3'
              >
                <rect width='14' height='9' rx='4.5' stroke='none' id={id} />
                <rect
                  x='1.5'
                  y='1.5'
                  width='11'
                  height='6'
                  rx='3'
                  fill='none'
                  id={id}
                />
              </g>
              <path
                id='Path_3'
                data-name='Path 3'
                d='M.085,0,0,16.859'
                transform='translate(1331.5 774.641)'
                fill='none'
                stroke='#bcbcbc'
                strokeWidth='2'
              />
              <path
                id='Path_2'
                data-name='Path 2'
                d='M0,0,2.812,16.635'
                transform='translate(1338.988 774.641) rotate(11)'
                fill='none'
                stroke='#bcbcbc'
                strokeWidth='2'
              />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};

export default TrashInactive;
