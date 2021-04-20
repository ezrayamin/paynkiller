import React from "react";
import { FlexboxGrid } from "rsuite";

import { Link } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <FlexboxGrid>
      {pageNumbers.map((number) => (
        <Link to="/products">
          <FlexboxGrid.Item
            key={number}
            colspan={0}
            onClick={() => paginate(number)}
            style={{
              padding: '10px',
              backgroundColor: '#038C73'
            }}
          >
            <p style={{color: 'white'}}>{number}</p>
          </FlexboxGrid.Item>
        </Link>
      ))}
    </FlexboxGrid>
  );
};

export default Pagination;
