
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContractCall } from '@/hooks/contracts/useContractRead';

const Home = () => {
  const { data } = useContractCall('getEmployeeCount', [], true);

  // Convert the data to a number
  const productLength = data ? Number(data.toString()) : 0;

  return (
    <div className='p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Employees</CardTitle>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='h-4 w-4 text-muted-foreground'
          >
            <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
            <circle cx='9' cy='7' r='4' />
            <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
          </svg>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{productLength}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
