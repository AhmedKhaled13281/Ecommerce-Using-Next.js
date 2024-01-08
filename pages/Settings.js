import React from "react";
import { getSession } from "next-auth/react";
import useSWR from "swr";
import Image from "next/image";
import DeleteModal from "@/Components/Products/DeleteModal";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Settings = () => {
  const { data , isLoading } = useSWR("/api/users/usersApi", fetcher,
  {
    refreshInterval: 10,
  });

  console.log(data);
  const tableHead = ["Profile Picture", "Email" , "Actions"];
  if(isLoading) {
    return       <h3 className="d-flex justify-content-center align-items-center">
    Loading ...
  </h3>
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
          {data?.map((email) => (
            <tr key={email?._id}>
              <td>
                <Image
                  src={email.image}
                  width={30}
                  height={30}
                  alt={email.name}
                  className="rounded-circle"
                />
              </td>
              <th scope="row" className="text-break">{email?.email}</th>
              <td>
                <DeleteModal
                  id={email?._id}
                  title={email?.name}
                  deleteType="user"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Settings.layout = "L2";

export default Settings;

