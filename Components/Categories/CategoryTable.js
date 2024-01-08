import React from "react";
import useSWR from "swr";
import DeleteModal from "../Products/DeleteModal";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CategoryTable = () => {
  const { data, error, isLoading } = useSWR(
    "/api/categories/categoryApi",
    fetcher,
    {
      refreshInterval: 10,
    }
  );

  const tableHead = ["Category Name", "Actions"];

  if (isLoading || !data || data.length === 0) {
    return (
      <h3 className="d-flex justify-content-center align-items-center">
        Loading ...
      </h3>
    );
  }


  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {tableHead.map((head, index) => (
              <th scope="col" key={index}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data?.map((item) => (
            <tr key={item?._id}>
              <th scope="row">{item?.categoryName}</th>
              <td>
                <DeleteModal
                  id={item?._id}
                  title={item?.categoryName}
                  deleteType="category"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
