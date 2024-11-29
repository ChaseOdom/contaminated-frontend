"use client"
import {Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { useState, useEffect, useReducer } from "react";

interface UserTableProps {
    columns: {
        key: string,
        label: string
    }[],
    items: {
        EmailAddress: string,
        EmailName: string,
        EmailURL: string,
        password: string
    }[]
}

export const UserTable = (props: UserTableProps) => {
    

    const [curItems, setCurItems] = useState(props.items.slice(0, 15));
    const pages = Math.ceil(props.items.length / 15);
    const [selected, setSelected] = useState(0);
    const [curLength, setCurLength] = useState(0);
    const [pageButtons, setPageButtons] = useState<(string | React.JSX.Element)[]>([]);

    useEffect(()=>{
        if(curLength != pages){
            setCurLength(pages);
            setCurItems(props.items.slice(0, 15));
            console.log(pages);

            let tempPageButtons = [];
            if (pages < 8){
                for(let i = 0; i < pages; i++){
                    tempPageButtons.push(<Button className="m-2" onPress={()=>buttonPressed(i)}>{i + 1}</Button>);
                }
            } else {
                for(let i = 0; i < 6; i++){
                    tempPageButtons.push(<Button className="m-2" onPress={()=>buttonPressed(i)}>{i + 1}</Button>);
                }
                tempPageButtons.push(".....");
                tempPageButtons.push(<Button className="m-2" onPress={()=>buttonPressed(pages - 1)}>{pages}</Button>)
            }
            setPageButtons(tempPageButtons);
        }
    })
    

    const buttonPressed = (index: number) => {
        setCurItems(props.items.slice(index*15, index*15 + 15));
        setSelected(index);
        let tempPageButtons = [];
        if (pages >= 8){
            tempPageButtons.push(<Button className="m-2" onPress={()=>buttonPressed(0)}>{1}</Button>);

            let midpoint = index;
            let enddotFlag = false;
            if (midpoint < 4){
                midpoint = 4;
            } else {
                tempPageButtons.push(".....");
            }
            if (midpoint > pages - 5){
                midpoint = pages - 5;
            } else {
                enddotFlag = true;
                
            }

            for(let i = midpoint - 2; i < midpoint + 3; i++){
                tempPageButtons.push(<Button className="m-2" onPress={()=>buttonPressed(i)}>{i + 1}</Button>);
            }
            
            if(enddotFlag){
                tempPageButtons.push(".....");
            }
            tempPageButtons.push(<Button className="m-2" onPress={()=>buttonPressed(pages - 1)}>{pages}</Button>);
            setPageButtons(tempPageButtons);
        }
    }

    return(
    <div >
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {props.columns.map((column) =>
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {curItems.map((row) =>
          <TableRow key={row.EmailAddress}>
            {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    <div className="flex justify-center items-end">
    {pageButtons.map((button)=>(
        button
      ))}
    </div>
    </div>
    )
}