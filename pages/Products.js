import React , {useState , useEffect} from 'react'
import useSWR, { useSWRConfig } from 'swr'
import ModalProduct from '@/Components/Products/ModalProduct';
import {Pagination } from 'react-bootstrap';
import DeleteModal from '@/Components/Products/DeleteModal';
import EditModal from '@/Components/Products/EditModal';
import LoadingSpinner from '@/Components/UI/LoadingSpinner';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const pageSize = 5;

const Products = () => {
  const { mutate } = useSWRConfig()
  const {data : categories} = useSWR("/api/categories/categoryApi" , fetcher)
  const { data, error, isLoading } = useSWR('/api/products/productApi', fetcher)
  mutate('/api/products/productApi')

  const [currentPage, setCurrentPage] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if(isLoading || !data || !categories) {
    return (
      <LoadingSpinner />
      )
  }

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data?.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ModalProduct categories={categories} show={show} handleClose={handleClose} handleShow={handleShow}/>
      <div className='px-2' style={{fontFamily : "Cairo"}}>
        {currentItems?.map(product => (
          <div
            className="d-flex justify-content-between px-3 mt-3 flex-wrap"
            key={product._id}
          >
            <div>
              <h4>{product.title}</h4>
              <div style={{ maxWidth: "400px" }}>
                <p className="text-break">{product.description}</p>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <EditModal product={product} categories={categories}/>
              </div>
              <div>
                <DeleteModal id={product._id} title={product.title} deleteType="product" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Pagination className="d-flex justify-content-center mt-3">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>


    </div>
  )
}

Products.layout = 'L2'

export default Products

