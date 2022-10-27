import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import LogoIcon from '@/assets/images/favicon.ico';

const Logo = () => {
  return (
    <Link className='px-layout mb-10 block' href='/'>
      <Image
        alt='online-cinema'
        src={LogoIcon}
        width={247}
        height={34}
        draggable={false}
      />
    </Link>
  );
};

export default Logo;
