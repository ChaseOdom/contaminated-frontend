import { UserTable } from "@/components/userTable";
import { QueryBar} from "@/components/queryBar";

const columns = [
  {
    key: "EmailAddress",
    label: "Email Address",
  },
  {
    key: "EmailName",
    label: "Email Name",
  },
  {
    key: "EmailURL",
    label: "Email URL",
  },
  {
    key: "password",
    label: "Password"
  }
];

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const queryType = searchParams["fullAddress"];
  const queryVal = searchParams["query"];
  let url = "https://k38d3ejtuf.execute-api.us-east-2.amazonaws.com/contaminated-api";
  if(queryType != undefined && queryType == "true" && queryVal != undefined && queryVal != ""){
    url += "/emailaddress/" + queryVal;
  } else if (queryType != undefined && queryVal != undefined && queryVal != ""){
    url += "/emailurl/" + queryVal;
  }

  let data = await fetch(url);
  var users = '';
  await data.json().then((d)=>{
    users = d["result"]
  });

  return (
    <div>
      <QueryBar></QueryBar>
      <UserTable columns={columns} items={users}></UserTable>
    </div>
  )
}