import React, { useEffect, useRef, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchUsersListAsync } from "./userSlice";
import List from '@mui/material/List';
import ListItem  from '@mui/material/ListItem';
import ListItemButton  from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { addChip, clearChip } from "../../components/Chip/chipSlice";
import { v4 as uuid } from "uuid";
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';

const UsersList: React.FC<{ }> = () => {

  const dispatch = useAppDispatch();
  const ref = useRef<any>();
  const [filteredList, setFilteredList] = useState<any>([]);

  async function getUsersList() {
    dispatch(fetchUsersListAsync());
  }

  const { users, loading } = useAppSelector(
    (state) => state.user
  );
  
  useEffect(() => {
    getUsersList()
  },[])

  function mouseEnter(direction : any){
    if(direction === "down"){
        ref.current.style.overflow = 'auto';
    }
  }

  function mouseLeave(){
    ref.current.style.overflow = 'hidden';
  }

  const handleListItemClick = (
   data: any
  ) => {
    dispatch(addChip({...data}));
  };

  const filterBySearch = (event:any) => {
    const query = event.target.value;

    var updatedList = [...users];
    
    updatedList = updatedList.filter((item: any) => {
      return item.username.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredList(updatedList);
  };

  useEffect(() => {
    if(users.length > 0) {
      setFilteredList(users);
    }
  },[users])

  return (
    <div
      ref={ref} 
      onMouseOver={() => mouseEnter('down')} 
      onMouseLeave={() => mouseLeave()}
      className="relative bg-white w-full overflow-hidden rounded-lg"
      style={{
        maxWidth: 400,
        height: '40rem',
        maxHeight: '40rem',
      }}
    >
      <List
        sx={{
          width: '100%',
          maxWidth: 380
        }}
      >
        <div className="flex gap-3 justify-center">
          <OutlinedInput
            size="small"
            style={{
              width: '65%',
              marginTop: 5
            }}
            onChange={filterBySearch} 
            placeholder="Search..." 
          />
          <Button 
            size='small'
            onClick={() => {
              dispatch(clearChip([]));
            }}
            style={{
              marginTop: 5
            }} variant="contained">Clear List</Button>
        </div>
        
        {
          loading ? 
            (<div className="flex h-full align-middle justify-center">
            <CircularProgress />
          </div>) 
          : filteredList && filteredList.length > 0 ? (
              <>
                {[...filteredList].map((user: any, index: number) => (
                  <ListItem key={index}>
                    <ListItemButton onClick={(e: any) => handleListItemClick({
                      name: user.username, 
                      id: uuid()
                    })}>
                      <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={user.username} secondary={user.email} />
                    </ListItemButton >
                  </ListItem>
                  
                ))}
              </>
            ) 
          : (<></>)
        }
      </List>
    </div>
  );
};

export default UsersList;
