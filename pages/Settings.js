import React from "react";
import useSWR from "swr";
import Image from "next/image";
import DeleteModal from "@/Components/Products/DeleteModal";
import LoadingSpinner from "@/Components/UI/LoadingSpinner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Settings = () => {
  const { data , isLoading } = useSWR("/api/users/usersApi", fetcher,
  {
    refreshInterval: 10,
  });
  console.log(data);
  console.log(process.env.GOOGLE_ID);
  console.log(process.env.GITHUB_SECRET);
  console.log(process.env.NEXTAUTH_URL);
  const tableHead = ["Profile Picture", "Email" , "Actions"];

  if(isLoading || !data) {
    return  <LoadingSpinner />;
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

