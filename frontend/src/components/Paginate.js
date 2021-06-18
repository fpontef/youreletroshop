import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  // pages : total of pages to show given by the backend
  // page : page the user want to show
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => {
          const toPath = !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${p + 1}`
              : `/page/${p + 1}`
            : `/admin/productlist/${p + 1}`;
          return (
            <LinkContainer key={p + 1} to={toPath}>
              <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
};

export default Paginate;
