import React from "react";
import { Pagination } from "react-bootstrap";
import Link from "next/link";

interface PaginateProps {
  pages: number;
  page: number;
  keyword?: string;
  isAdmin?: boolean;
}

const Paginate = ({
  pages,
  page,
  keyword = "",
  isAdmin = false,
}: PaginateProps) => {
  // if (keyword) {
  //   keyword = keyword.split("?keyword=")[1].split("&")[0];
  // }

  return pages > 1 ? (
    <Pagination>
      {/* keys returns a new Array iterator contians the keys for each index */}
      {[...Array(pages).keys()].map((x) => (
        <Link
          passHref
          key={x + 1}
          //   we use this component in home and admin/productlist page
          href={
            !isAdmin
              ? `/?keyword=${keyword}&page=${x + 1}`
              : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </Link>
      ))}
    </Pagination>
  ) : null;
};

export default Paginate;
