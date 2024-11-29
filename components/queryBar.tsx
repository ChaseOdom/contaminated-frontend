"use client"
import {Input} from "@nextui-org/input";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export const QueryBar = () => {
    const [queryType, setQueryType] = useState("Email Address");
    const [query, setQuery] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateQuery = (newQueryType: string) => {
        setQueryType(newQueryType);
    }

    const updateQueryVal = (newQueryVal: string) => {
        setQuery(newQueryVal);
        if (newQueryVal == undefined){
            setQuery("");
        }
    }

    const searchPressed = () => {
        const sp = new URLSearchParams(searchParams);
        sp.set('fullAddress', (queryType == "Email Address").toString());
        sp.set('query', query);
        router.push(`${pathname}?${sp.toString()}`);
    }

    return(
    <div className="flex m-4 justify-center">

        <Dropdown>
            <DropdownTrigger>
                <Button className="h-15"
                    variant="bordered" 
                >
                    {queryType}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new" onPress={()=>updateQuery("Email Address")}>Email Address</DropdownItem>
                <DropdownItem key="copy"onPress={()=>updateQuery("Email URL")}>Email URL</DropdownItem>
            </DropdownMenu>
        </Dropdown>
      <Input className="pl-3 pr-4 w-800" type="query" label="Search Term" onValueChange={updateQueryVal}/>
      <Button className="h-15" onPress={()=>searchPressed()}>Search</Button>
    </div>
    );
}