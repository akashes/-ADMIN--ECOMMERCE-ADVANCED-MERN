import { TableCell, TableRow } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export const HomeSlidesSkeleton = () => {
  return (
    <>
      {/* Generate 5 skeleton rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          {/* Image Column Skeleton */}
          <TableCell className="!pl-2 md:!pl-10">
            <div className="flex items-center gap-2 w-[200px] md:w-[500px] !rounded-md">
              <div className="w-full p-2">
                <Skeleton 
                  variant="rectangular" 
                  height={100} 
                  className="!rounded-md w-[200px] md:w-full" 
                />
              </div>
            </div>
          </TableCell>

          {/* Action Buttons Skeleton */}
          <TableCell>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5">
              {/* Button 1 */}
              <Skeleton variant="circular" width={35} height={35} />
              {/* Button 2 */}
              <Skeleton variant="circular" width={35} height={35} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};