import Image from 'next/image';

const Heroes = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='flex items-center'>
        <div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]'>
          <Image
            src='/documents.png'
            className='object-contain dark:hidden'
            height={500}
            width={500}
            alt='Documents'
          />
          <Image
            src='/documents-dark.png'
            className='object-contain hidden dark:block'
            height={500}
            width={500}
            alt='Documents'
          />
        </div>

        <div className='relative w-[400px] h-[400px] hidden md:block'>
          <Image
            src='/reading.png'
            className='object-contain dark:hidden'
            height={500}
            width={500}
            alt='Reading'
          />
          <Image
            src='/reading-dark.png'
            className='object-contain hidden dark:block'
            height={500}
            width={500}
            alt='Reading'
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
