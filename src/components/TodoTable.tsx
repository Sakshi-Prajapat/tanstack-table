import { useEffect, useMemo, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { Button, Checkbox, Box, Input, TextField } from '@mui/material';

type TodoData = {
  id: string,
  todo: string,
  completed: boolean,
  usedId: number
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TodoTable = () => {
  const [data, setData] = useState<TodoData[]>([])
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log("Local Storage",tdata)
  // console.log("Converted Data",data)

  const api = async () => {
    const data = await fetch("https://dummyjson.com/todos");
    const jsonData = await data.json();
    console.log("Dataaa", jsonData)
    // const parseData = JSON.parse(String(jsonData.results))
    setData(jsonData.todos)
  }
  useEffect(() => {
    // let tdata = localStorage.getItem("task");
    // const data = JSON.parse(String(tdata));
    api()

  }, [])
  // console.log("JSON",data)

  //   const handaleditclick =(id : string)=>{
  //     console.log('ID---->',id);

  //   }

  const handleEditButton = (id: string) => {
    setOpen(true)
    console.log(id)
  }

  const columns = [
    {
      header: "Index",
      accessorKey: "id",
      footer: "Name"
    },
    {
      header: "Todo",
      accessorKey: "todo",
      footer: "Task"
    },
    {
      header: "Done",
      accessorKey: "completed",
      cell: ({ row: { original: { completed } } }: {
        row: {
          original: {
            completed: boolean
          }
        }
      }) => {
        return (<Checkbox checked={completed} inputProps={{ 'aria-label': 'controlled' }} />)
      }
    },
    {
      header: "Edit",
      // cell: ({ row: { id } }: 
      //   { row: { id :string}
      //  }) => {
      //   return (
      //     // <Button variant='outlined' onClick={()=>{
      //     //   handleEditButton(id)
      //     // }} >Edit</Button>
      //     console.log(id)
      //   )
      // }
      cell: ({ row: { original: { id } } }: {
        row: {
          original: {
            id: string
          }
        }
      }) => {
        return (<Button variant='outlined' onClick={() => {
          handleEditButton(id)
        }} >Edit</Button>)
      }
    },
    {
      header: "Delete",
      // cell: ({ row: { index } }: 
      //  { row: { index :number}
      // }) => {
      //   console.log('ppppppppppp>',)
      //   return (
      //     <Button variant='outlined' onClick={()=>handalclick(index)}>Delete</Button>
      //   )
      // }
    }

  ];



  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ padding: "30px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => {
              return (
                <TableRow key={headerGroup.id}>
                  {
                    headerGroup.headers.map(header => {
                      return (

                        <TableCell key={header.id}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableCell>

                      )
                    })
                  }

                </TableRow>

              )
            })}

          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext()
                        )}
                      </TableCell>

                    )
                  })}

                </TableRow>

              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Todo
          </Typography>
          <Input sx={{

            //   "& .MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary Mui-focused" : {
            //     border : "none",


            // },
            "& .Mui-focused": {
              borderBottom: "none"
            },
            "&:before": {
              borderBottom: "none"
            },
            "&:after": {
              borderBottom: "none"
            },
            "&:hover": {
              borderBottom: "none"
            },

            backgroundColor: "lightblue",
            borderRadius: "10px",
            border: 'none'
          }} />
          <Input sx={{ border: 'none' }} />
        </Box>
      </Modal>
    </div>
  )
}

export default TodoTable;