import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const columns = [
  'PRODUCT',
  'CATEGORY',
  'SUB CATEGORY',
  'PRICE',
  'SALES',
  'RATING',
  'ACTION'
];

const ProductsSkeleton = ({ rows = 5 }) => {
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="products table skeleton">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox disabled size="small" />
            </TableCell>
            {columns.map((col, index) => (
              <TableCell key={index}>
                <Skeleton variant="text" width={80} height={20} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(new Array(rows)).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                <Checkbox disabled size="small" />
              </TableCell>
              {/* Product column */}
              <TableCell>
                <div className="flex items-center gap-4 w-[300px]">
                  <Skeleton variant="rectangular" width={65} height={65} />
                  <div className="flex flex-col gap-1">
                    <Skeleton variant="text" width={150} height={18} />
                    <Skeleton variant="text" width={100} height={14} />
                  </div>
                </div>
              </TableCell>

              {/* Category */}
              <TableCell>
                <Skeleton variant="text" width={80} height={18} />
              </TableCell>

              {/* Sub Category */}
              <TableCell>
                <Skeleton variant="text" width={100} height={18} />
              </TableCell>

              {/* Price */}
              <TableCell>
                <Skeleton variant="text" width={60} height={16} />
                <Skeleton variant="text" width={60} height={16} />
              </TableCell>

              {/* Sales */}
              <TableCell>
                <Skeleton variant="text" width={50} height={16} />
              </TableCell>

              {/* Rating */}
              <TableCell>
                <Skeleton variant="rectangular" width={80} height={20} />
              </TableCell>

              {/* Action */}
              <TableCell>
                <div className="flex gap-2">
                  <Skeleton variant="circular" width={35} height={35} />
                  <Skeleton variant="circular" width={35} height={35} />
                  <Skeleton variant="circular" width={35} height={35} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsSkeleton;
