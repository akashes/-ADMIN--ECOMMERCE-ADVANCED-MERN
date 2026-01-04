import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";

const columns = [
  { id: "Image", label: "IMAGE" },
  { id: "title", label: "TITLE" },
  { id: "description", label: "DESCRIPTION" },
  { id: "action", label: "ACTION" },
];

const BlogListSkeleton = () => {
  const rows = Array.from({ length: 5 }); // show 5 rows

  return (
    <div className="card my-4 shadow-md sm:rounded-lg bg-white p-2">
      <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader aria-label="blog list skeleton">
          <TableHead className="bg-[#f1f1f1]">
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  className={`${index === 0 && " !pl-2 md:!pl-12"} !text-center`}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((_, idx) => (
              <TableRow key={idx}>
                {/* Image */}
                <TableCell className="!pl-1 md:!pl-10">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={80}
                    className="rounded-md"
                  />
                </TableCell>

                {/* Title */}
                <TableCell>
                  <Skeleton variant="text" width="70%" height={25} />
                </TableCell>

                {/* Description */}
                <TableCell>
                  <Skeleton variant="text" width="90%" height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex flex-row justify-center items-center gap-4">
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                    />
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                    />
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogListSkeleton;
