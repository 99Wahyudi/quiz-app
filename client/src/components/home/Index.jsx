import React, { useEffect, useState } from 'react';

export default function Index() {
  const [coba, setCoba] = useState(['lala', 'lili']);

  useEffect(() => {
    setCoba([...coba, 'lulu']);
  }, []);

  console.log(coba);

  return (
    <div className='text-3xl font-bold underline'>index</div>
  );
}
